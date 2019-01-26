(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.WHATWGFetch = {})));
}(this, (function (exports) { 'use strict';

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob:
      'FileReader' in self &&
      'Blob' in self &&
      (function() {
        try {
          new Blob();
          return true
        } catch (e) {
          return false
        }
      })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj)
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ];

    var isArrayBufferView =
      ArrayBuffer.isView ||
      function(obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
      };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return {done: value === undefined, value: value}
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      };
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ', ' + value : value;
  };

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null
  };

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  };

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push(name);
    });
    return iteratorFor(items)
  };

  Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) {
      items.push(value);
    });
    return iteratorFor(items)
  };

  Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items)
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function(body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        this._bodyText = body = Object.prototype.toString.call(body);
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      };

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      };
    }

    this.text = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    };

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      };
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    };

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'same-origin';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body);
  }

  Request.prototype.clone = function() {
    return new Request(this, {body: this._bodyInit})
  };

  function decode(body) {
    var form = new FormData();
    body
      .trim()
      .split('&')
      .forEach(function(bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  };

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''});
    response.type = 'error';
    return response
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  };

  exports.DOMException = self.DOMException;
  try {
    new exports.DOMException();
  } catch (err) {
    exports.DOMException = function(message, name) {
      this.message = message;
      this.name = name;
      var error = Error(message);
      this.stack = error.stack;
    };
    exports.DOMException.prototype = Object.create(Error.prototype);
    exports.DOMException.prototype.constructor = exports.DOMException;
  }

  function fetch(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);

      if (request.signal && request.signal.aborted) {
        return reject(new exports.DOMException('Aborted', 'AbortError'))
      }

      var xhr = new XMLHttpRequest();

      function abortXhr() {
        xhr.abort();
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.onabort = function() {
        reject(new exports.DOMException('Aborted', 'AbortError'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });

      if (request.signal) {
        request.signal.addEventListener('abort', abortXhr);

        xhr.onreadystatechange = function() {
          // DONE (success or failure)
          if (xhr.readyState === 4) {
            request.signal.removeEventListener('abort', abortXhr);
          }
        };
      }

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    })
  }

  fetch.polyfill = true;

  if (!self.fetch) {
    self.fetch = fetch;
    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;
  }

  exports.Headers = Headers;
  exports.Request = Request;
  exports.Response = Response;
  exports.fetch = fetch;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],2:[function(require,module,exports){
/*

© Copyright 2016, 2017, 2018 AJ Jordan

This file is part of strugee.net.

strugee.net is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

strugee.net is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with strugee.net.  If not, see <http://www.gnu.org/licenses/>.

*/

if (!window.Promise) {
	console.log('Your browser doesn\'t support window.Promise; cannot retrieve Webmentions. Please upgrade.');
	return;
}

// Polyfills

require('whatwg-fetch');

(function() {
	'use strict';

	function strip(html) {
		// https://stackoverflow.com/a/822486/1198896
		var div = document.createElement('div');
		div.innerHTML = html;
		return div.textContent || div.innerText || '';
	}

	// Kick off the fetch ASAP because it doesn't require the DOM and so we don't want to wait for that
	var req = fetch('https://webmention.io/api/mentions?target=' + window.location);

	var initialized = false;

	function init() {
		if (initialized) return;
		initialized = true;

		var mentionsElement = document.getElementById('webmentions');
		// Sometimes happens because of Turbolinks?
		if (!mentionsElement) return;
		if (mentionsElement.getAttribute('data-initialized') === "true") return;

		// Only when the DOM is ready do we register Promise stuff that interacts with it
		req.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			if (data.links.length === 0) {
				// No replies, so we bail
				var noReplies = document.createElement('p');
				noReplies.appendChild(document.createTextNode('No replies - yet! Maybe you\'d like to be the first?'));
				mentionsElement.appendChild(noReplies);

				var webmentionDocs = document.createElement('p');
				var webmentionLink = document.createElement('a');
				webmentionDocs.appendChild(document.createTextNode('See '));
				webmentionLink.appendChild(document.createTextNode('webmention.net'));
				webmentionLink.href = 'https://webmention.net';
				webmentionDocs.appendChild(webmentionLink);
				webmentionDocs.appendChild(document.createTextNode(' for the docs.'));
				mentionsElement.appendChild(webmentionDocs);

				return;
			}

			data.links.forEach(function(link) {
				// TODO handle this, maybe?
				if (link.private) return;

				// TODO this probably doesn't handle all types? But I couldn't find sufficient documentation

				// TODO look at what "verified" actually means
				if (!link.verified) return;

				var p = document.createElement('p');

				// Avatar
				// TODO do something better with missing avatars
				if (link.data.author.photo) {
					var avatarLink = document.createElement('a');
					avatarLink.setAttribute('href', link.data.author.url);
					var avatar = document.createElement('img');
					avatar.classList.add('webmention-avatar');
					avatar.setAttribute('src', link.data.author.photo);
					avatar.setAttribute('alt', link.data.author.name + '\'s avatar');
					avatarLink.appendChild(avatar);
					p.appendChild(avatarLink);
				}

				p.appendChild(document.createTextNode(' '));

				// "Alyssa P. Hacker"...
				var author = document.createElement('a');
				author.setAttribute('href', link.data.author.url);
				author.appendChild(document.createTextNode(link.data.author.name));
				p.appendChild(author);

				var shortContent = strip(link.data.content);
				if (shortContent.length > 60) {
					// TODO slice on word boundaries
					shortContent = shortContent.slice(0, 60) + '…';
				}

				// TODO DRY this up
				switch (link.activity.type) {
				case 'reply':
					// ..."replied with"...

					p.appendChild(document.createTextNode(' replied with '));

					// ..."check out this article! http://example.com"
					var source = document.createElement('a');
					source.setAttribute('href', link.data.url);
					source.appendChild(document.createTextNode(shortContent));
					p.appendChild(source);
					break;
				case 'link':
					// ..."linked to this and added "...

					p.appendChild(document.createTextNode(' linked to this and added '));

					// ..."check out this article! http://example.com"
					var source = document.createElement('a');
					source.setAttribute('href', link.data.url);
					source.appendChild(document.createTextNode(shortContent));
					p.appendChild(source);
					break;
				case 'like':
					// ..."liked this"
					p.appendChild(document.createTextNode(' '));
					var likeSource = document.createElement('a');
					likeSource.appendChild(document.createTextNode('liked this'));
					likeSource.setAttribute('href', link.data.url);
					p.appendChild(likeSource);
					break;
				case 'bookmark':
					// ..."bookmarked this"
					p.appendChild(document.createTextNode(' '));
					var bookmarkSource = document.createElement('a');
					bookmarkSource.appendChild(document.createTextNode('bookmarked this'));
					bookmarkSource.setAttribute('href', link.data.url);
					p.appendChild(bookmarkSource);
					break;
				default:
					// ..."sent a "...
					p.appendChild(document.createTextNode(' sent a '));
					// ..."Webmention notification"
					var mentionSource = document.createElement('a');
					mentionSource.appendChild(document.createTextNode('Webmention notification'));
					mentionSource.setAttribute('href', link.data.url);
					p.appendChild(mentionSource);
					break;
				}

				mentionsElement.appendChild(p);
			});
		})
		.catch(function(err) {
			console.log('Encountered Webmention error:', err);
			mentionsElement.appendChild(document.createTextNode('Couldn\'t fetch Webmentions. Try refreshing?'));
		});

		mentionsElement.setAttribute('data-initialized', 'true');
	}

	document.addEventListener('turbolinks:load', function() {
		req = fetch('https://webmention.io/api/mentions?target=' + window.location);
		initialized = false;
		init();
	}, false);

	// TODO add in some "Loading..." text or something
})();

},{"whatwg-fetch":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvd2hhdHdnLWZldGNoL2Rpc3QvZmV0Y2gudW1kLmpzIiwic3JjL2pzL3dlYm1lbnRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbmhCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6XG4gIChmYWN0b3J5KChnbG9iYWwuV0hBVFdHRmV0Y2ggPSB7fSkpKTtcbn0odGhpcywgKGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxuICB2YXIgc3VwcG9ydCA9IHtcbiAgICBzZWFyY2hQYXJhbXM6ICdVUkxTZWFyY2hQYXJhbXMnIGluIHNlbGYsXG4gICAgaXRlcmFibGU6ICdTeW1ib2wnIGluIHNlbGYgJiYgJ2l0ZXJhdG9yJyBpbiBTeW1ib2wsXG4gICAgYmxvYjpcbiAgICAgICdGaWxlUmVhZGVyJyBpbiBzZWxmICYmXG4gICAgICAnQmxvYicgaW4gc2VsZiAmJlxuICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIG5ldyBCbG9iKCk7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9KSgpLFxuICAgIGZvcm1EYXRhOiAnRm9ybURhdGEnIGluIHNlbGYsXG4gICAgYXJyYXlCdWZmZXI6ICdBcnJheUJ1ZmZlcicgaW4gc2VsZlxuICB9O1xuXG4gIGZ1bmN0aW9uIGlzRGF0YVZpZXcob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBEYXRhVmlldy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihvYmopXG4gIH1cblxuICBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlcikge1xuICAgIHZhciB2aWV3Q2xhc3NlcyA9IFtcbiAgICAgICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBGbG9hdDY0QXJyYXldJ1xuICAgIF07XG5cbiAgICB2YXIgaXNBcnJheUJ1ZmZlclZpZXcgPVxuICAgICAgQXJyYXlCdWZmZXIuaXNWaWV3IHx8XG4gICAgICBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiAmJiB2aWV3Q2xhc3Nlcy5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSA+IC0xXG4gICAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKTtcbiAgICB9XG4gICAgaWYgKC9bXmEtejAtOVxcLSMkJSYnKisuXl9gfH5dL2kudGVzdChuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBjaGFyYWN0ZXIgaW4gaGVhZGVyIGZpZWxkIG5hbWUnKVxuICAgIH1cbiAgICByZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLy8gQnVpbGQgYSBkZXN0cnVjdGl2ZSBpdGVyYXRvciBmb3IgdGhlIHZhbHVlIGxpc3RcbiAgZnVuY3Rpb24gaXRlcmF0b3JGb3IoaXRlbXMpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSB7XG4gICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKTtcbiAgICAgICAgcmV0dXJuIHtkb25lOiB2YWx1ZSA9PT0gdW5kZWZpbmVkLCB2YWx1ZTogdmFsdWV9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgICBpdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvclxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlcmF0b3JcbiAgfVxuXG4gIGZ1bmN0aW9uIEhlYWRlcnMoaGVhZGVycykge1xuICAgIHRoaXMubWFwID0ge307XG5cbiAgICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCB2YWx1ZSk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVycykpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoaGVhZGVyWzBdLCBoZWFkZXJbMV0pO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfSBlbHNlIGlmIChoZWFkZXJzKSB7XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhoZWFkZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgaGVhZGVyc1tuYW1lXSk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpO1xuICAgIHZhbHVlID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMubWFwW25hbWVdO1xuICAgIHRoaXMubWFwW25hbWVdID0gb2xkVmFsdWUgPyBvbGRWYWx1ZSArICcsICcgKyB2YWx1ZSA6IHZhbHVlO1xuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlWydkZWxldGUnXSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV07XG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xuICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpO1xuICAgIHJldHVybiB0aGlzLmhhcyhuYW1lKSA/IHRoaXMubWFwW25hbWVdIDogbnVsbFxuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAuaGFzT3duUHJvcGVydHkobm9ybWFsaXplTmFtZShuYW1lKSlcbiAgfTtcblxuICBIZWFkZXJzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5tYXApIHtcbiAgICAgIGlmICh0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXMubWFwW25hbWVdLCBuYW1lLCB0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgaXRlbXMucHVzaChuYW1lKTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW107XG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBpdGVtcy5wdXNoKHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH07XG5cbiAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICBIZWFkZXJzLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gSGVhZGVycy5wcm90b3R5cGUuZW50cmllcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICAgIH1cbiAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc29sdmUocmVhZGVyLnJlc3VsdCk7XG4gICAgICB9O1xuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcik7XG4gICAgICB9O1xuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzQXJyYXlCdWZmZXIoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcik7XG4gICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpO1xuICAgIHJldHVybiBwcm9taXNlXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzVGV4dChibG9iKSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKTtcbiAgICByZWFkZXIucmVhZEFzVGV4dChibG9iKTtcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEFycmF5QnVmZmVyQXNUZXh0KGJ1Zikge1xuICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmKTtcbiAgICB2YXIgY2hhcnMgPSBuZXcgQXJyYXkodmlldy5sZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aWV3Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGFyc1tpXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUodmlld1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBjaGFycy5qb2luKCcnKVxuICB9XG5cbiAgZnVuY3Rpb24gYnVmZmVyQ2xvbmUoYnVmKSB7XG4gICAgaWYgKGJ1Zi5zbGljZSkge1xuICAgICAgcmV0dXJuIGJ1Zi5zbGljZSgwKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zi5ieXRlTGVuZ3RoKTtcbiAgICAgIHZpZXcuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZikpO1xuICAgICAgcmV0dXJuIHZpZXcuYnVmZmVyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gQm9keSgpIHtcbiAgICB0aGlzLmJvZHlVc2VkID0gZmFsc2U7XG5cbiAgICB0aGlzLl9pbml0Qm9keSA9IGZ1bmN0aW9uKGJvZHkpIHtcbiAgICAgIHRoaXMuX2JvZHlJbml0ID0gYm9keTtcbiAgICAgIGlmICghYm9keSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5O1xuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmJsb2IgJiYgQmxvYi5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QmxvYiA9IGJvZHk7XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keTtcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keS50b1N0cmluZygpO1xuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIHN1cHBvcnQuYmxvYiAmJiBpc0RhdGFWaWV3KGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkuYnVmZmVyKTtcbiAgICAgICAgLy8gSUUgMTAtMTEgY2FuJ3QgaGFuZGxlIGEgRGF0YVZpZXcgYm9keS5cbiAgICAgICAgdGhpcy5fYm9keUluaXQgPSBuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSk7XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgKEFycmF5QnVmZmVyLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpIHx8IGlzQXJyYXlCdWZmZXJWaWV3KGJvZHkpKSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChib2R5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkge1xuICAgICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlCbG9iICYmIHRoaXMuX2JvZHlCbG9iLnR5cGUpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCB0aGlzLl9ib2R5QmxvYi50eXBlKTtcbiAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoc3VwcG9ydC5ibG9iKSB7XG4gICAgICB0aGlzLmJsb2IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcyk7XG4gICAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKSlcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgYmxvYicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keVRleHRdKSlcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgdGhpcy5hcnJheUJ1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnN1bWVkKHRoaXMpIHx8IFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYmxvYigpLnRoZW4ocmVhZEJsb2JBc0FycmF5QnVmZmVyKVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIHRoaXMudGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcyk7XG4gICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICByZXR1cm4gcmVhZEJsb2JBc1RleHQodGhpcy5fYm9keUJsb2IpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlYWRBcnJheUJ1ZmZlckFzVGV4dCh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHN1cHBvcnQuZm9ybURhdGEpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oZGVjb2RlKVxuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aGlzLmpzb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKEpTT04ucGFyc2UpXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcbiAgdmFyIG1ldGhvZHMgPSBbJ0RFTEVURScsICdHRVQnLCAnSEVBRCcsICdPUFRJT05TJywgJ1BPU1QnLCAnUFVUJ107XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTWV0aG9kKG1ldGhvZCkge1xuICAgIHZhciB1cGNhc2VkID0gbWV0aG9kLnRvVXBwZXJDYXNlKCk7XG4gICAgcmV0dXJuIG1ldGhvZHMuaW5kZXhPZih1cGNhc2VkKSA+IC0xID8gdXBjYXNlZCA6IG1ldGhvZFxuICB9XG5cbiAgZnVuY3Rpb24gUmVxdWVzdChpbnB1dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5O1xuXG4gICAgaWYgKGlucHV0IGluc3RhbmNlb2YgUmVxdWVzdCkge1xuICAgICAgaWYgKGlucHV0LmJvZHlVc2VkKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpXG4gICAgICB9XG4gICAgICB0aGlzLnVybCA9IGlucHV0LnVybDtcbiAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbnB1dC5jcmVkZW50aWFscztcbiAgICAgIGlmICghb3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKGlucHV0LmhlYWRlcnMpO1xuICAgICAgfVxuICAgICAgdGhpcy5tZXRob2QgPSBpbnB1dC5tZXRob2Q7XG4gICAgICB0aGlzLm1vZGUgPSBpbnB1dC5tb2RlO1xuICAgICAgdGhpcy5zaWduYWwgPSBpbnB1dC5zaWduYWw7XG4gICAgICBpZiAoIWJvZHkgJiYgaW5wdXQuX2JvZHlJbml0ICE9IG51bGwpIHtcbiAgICAgICAgYm9keSA9IGlucHV0Ll9ib2R5SW5pdDtcbiAgICAgICAgaW5wdXQuYm9keVVzZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVybCA9IFN0cmluZyhpbnB1dCk7XG4gICAgfVxuXG4gICAgdGhpcy5jcmVkZW50aWFscyA9IG9wdGlvbnMuY3JlZGVudGlhbHMgfHwgdGhpcy5jcmVkZW50aWFscyB8fCAnc2FtZS1vcmlnaW4nO1xuICAgIGlmIChvcHRpb25zLmhlYWRlcnMgfHwgIXRoaXMuaGVhZGVycykge1xuICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKTtcbiAgICB9XG4gICAgdGhpcy5tZXRob2QgPSBub3JtYWxpemVNZXRob2Qob3B0aW9ucy5tZXRob2QgfHwgdGhpcy5tZXRob2QgfHwgJ0dFVCcpO1xuICAgIHRoaXMubW9kZSA9IG9wdGlvbnMubW9kZSB8fCB0aGlzLm1vZGUgfHwgbnVsbDtcbiAgICB0aGlzLnNpZ25hbCA9IG9wdGlvbnMuc2lnbmFsIHx8IHRoaXMuc2lnbmFsO1xuICAgIHRoaXMucmVmZXJyZXIgPSBudWxsO1xuXG4gICAgaWYgKCh0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgfHwgdGhpcy5tZXRob2QgPT09ICdIRUFEJykgJiYgYm9keSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9keSBub3QgYWxsb3dlZCBmb3IgR0VUIG9yIEhFQUQgcmVxdWVzdHMnKVxuICAgIH1cbiAgICB0aGlzLl9pbml0Qm9keShib2R5KTtcbiAgfVxuXG4gIFJlcXVlc3QucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMsIHtib2R5OiB0aGlzLl9ib2R5SW5pdH0pXG4gIH07XG5cbiAgZnVuY3Rpb24gZGVjb2RlKGJvZHkpIHtcbiAgICB2YXIgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGJvZHlcbiAgICAgIC50cmltKClcbiAgICAgIC5zcGxpdCgnJicpXG4gICAgICAuZm9yRWFjaChmdW5jdGlvbihieXRlcykge1xuICAgICAgICBpZiAoYnl0ZXMpIHtcbiAgICAgICAgICB2YXIgc3BsaXQgPSBieXRlcy5zcGxpdCgnPScpO1xuICAgICAgICAgIHZhciBuYW1lID0gc3BsaXQuc2hpZnQoKS5yZXBsYWNlKC9cXCsvZywgJyAnKTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBzcGxpdC5qb2luKCc9JykucmVwbGFjZSgvXFwrL2csICcgJyk7XG4gICAgICAgICAgZm9ybS5hcHBlbmQoZGVjb2RlVVJJQ29tcG9uZW50KG5hbWUpLCBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgcmV0dXJuIGZvcm1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhyYXdIZWFkZXJzKSB7XG4gICAgdmFyIGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgIC8vIFJlcGxhY2UgaW5zdGFuY2VzIG9mIFxcclxcbiBhbmQgXFxuIGZvbGxvd2VkIGJ5IGF0IGxlYXN0IG9uZSBzcGFjZSBvciBob3Jpem9udGFsIHRhYiB3aXRoIGEgc3BhY2VcbiAgICAvLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMCNzZWN0aW9uLTMuMlxuICAgIHZhciBwcmVQcm9jZXNzZWRIZWFkZXJzID0gcmF3SGVhZGVycy5yZXBsYWNlKC9cXHI/XFxuW1xcdCBdKy9nLCAnICcpO1xuICAgIHByZVByb2Nlc3NlZEhlYWRlcnMuc3BsaXQoL1xccj9cXG4vKS5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgIHZhciBwYXJ0cyA9IGxpbmUuc3BsaXQoJzonKTtcbiAgICAgIHZhciBrZXkgPSBwYXJ0cy5zaGlmdCgpLnRyaW0oKTtcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcGFydHMuam9pbignOicpLnRyaW0oKTtcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGhlYWRlcnNcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSk7XG5cbiAgZnVuY3Rpb24gUmVzcG9uc2UoYm9keUluaXQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG5cbiAgICB0aGlzLnR5cGUgPSAnZGVmYXVsdCc7XG4gICAgdGhpcy5zdGF0dXMgPSBvcHRpb25zLnN0YXR1cyA9PT0gdW5kZWZpbmVkID8gMjAwIDogb3B0aW9ucy5zdGF0dXM7XG4gICAgdGhpcy5vayA9IHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMDtcbiAgICB0aGlzLnN0YXR1c1RleHQgPSAnc3RhdHVzVGV4dCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuc3RhdHVzVGV4dCA6ICdPSyc7XG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKTtcbiAgICB0aGlzLnVybCA9IG9wdGlvbnMudXJsIHx8ICcnO1xuICAgIHRoaXMuX2luaXRCb2R5KGJvZHlJbml0KTtcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpO1xuXG4gIFJlc3BvbnNlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UodGhpcy5fYm9keUluaXQsIHtcbiAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICBzdGF0dXNUZXh0OiB0aGlzLnN0YXR1c1RleHQsXG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh0aGlzLmhlYWRlcnMpLFxuICAgICAgdXJsOiB0aGlzLnVybFxuICAgIH0pXG4gIH07XG5cbiAgUmVzcG9uc2UuZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogMCwgc3RhdHVzVGV4dDogJyd9KTtcbiAgICByZXNwb25zZS50eXBlID0gJ2Vycm9yJztcbiAgICByZXR1cm4gcmVzcG9uc2VcbiAgfTtcblxuICB2YXIgcmVkaXJlY3RTdGF0dXNlcyA9IFszMDEsIDMwMiwgMzAzLCAzMDcsIDMwOF07XG5cbiAgUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICAgIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHN0YXR1cyBjb2RlJylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IHN0YXR1cywgaGVhZGVyczoge2xvY2F0aW9uOiB1cmx9fSlcbiAgfTtcblxuICBleHBvcnRzLkRPTUV4Y2VwdGlvbiA9IHNlbGYuRE9NRXhjZXB0aW9uO1xuICB0cnkge1xuICAgIG5ldyBleHBvcnRzLkRPTUV4Y2VwdGlvbigpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBleHBvcnRzLkRPTUV4Y2VwdGlvbiA9IGZ1bmN0aW9uKG1lc3NhZ2UsIG5hbWUpIHtcbiAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgdmFyIGVycm9yID0gRXJyb3IobWVzc2FnZSk7XG4gICAgICB0aGlzLnN0YWNrID0gZXJyb3Iuc3RhY2s7XG4gICAgfTtcbiAgICBleHBvcnRzLkRPTUV4Y2VwdGlvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG4gICAgZXhwb3J0cy5ET01FeGNlcHRpb24ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gZXhwb3J0cy5ET01FeGNlcHRpb247XG4gIH1cblxuICBmdW5jdGlvbiBmZXRjaChpbnB1dCwgaW5pdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoaW5wdXQsIGluaXQpO1xuXG4gICAgICBpZiAocmVxdWVzdC5zaWduYWwgJiYgcmVxdWVzdC5zaWduYWwuYWJvcnRlZCkge1xuICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBleHBvcnRzLkRPTUV4Y2VwdGlvbignQWJvcnRlZCcsICdBYm9ydEVycm9yJykpXG4gICAgICB9XG5cbiAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgZnVuY3Rpb24gYWJvcnRYaHIoKSB7XG4gICAgICAgIHhoci5hYm9ydCgpO1xuICAgICAgfVxuXG4gICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgIHN0YXR1czogeGhyLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgICAgICBoZWFkZXJzOiBwYXJzZUhlYWRlcnMoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpIHx8ICcnKVxuICAgICAgICB9O1xuICAgICAgICBvcHRpb25zLnVybCA9ICdyZXNwb25zZVVSTCcgaW4geGhyID8geGhyLnJlc3BvbnNlVVJMIDogb3B0aW9ucy5oZWFkZXJzLmdldCgnWC1SZXF1ZXN0LVVSTCcpO1xuICAgICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgcmVzb2x2ZShuZXcgUmVzcG9uc2UoYm9keSwgb3B0aW9ucykpO1xuICAgICAgfTtcblxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSk7XG4gICAgICB9O1xuXG4gICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpO1xuICAgICAgfTtcblxuICAgICAgeGhyLm9uYWJvcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBleHBvcnRzLkRPTUV4Y2VwdGlvbignQWJvcnRlZCcsICdBYm9ydEVycm9yJykpO1xuICAgICAgfTtcblxuICAgICAgeGhyLm9wZW4ocmVxdWVzdC5tZXRob2QsIHJlcXVlc3QudXJsLCB0cnVlKTtcblxuICAgICAgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdpbmNsdWRlJykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAocmVxdWVzdC5jcmVkZW50aWFscyA9PT0gJ29taXQnKSB7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJztcbiAgICAgIH1cblxuICAgICAgcmVxdWVzdC5oZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIobmFtZSwgdmFsdWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZXF1ZXN0LnNpZ25hbCkge1xuICAgICAgICByZXF1ZXN0LnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0WGhyKTtcblxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gRE9ORSAoc3VjY2VzcyBvciBmYWlsdXJlKVxuICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgcmVxdWVzdC5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydFhocik7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICB4aHIuc2VuZCh0eXBlb2YgcmVxdWVzdC5fYm9keUluaXQgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHJlcXVlc3QuX2JvZHlJbml0KTtcbiAgICB9KVxuICB9XG5cbiAgZmV0Y2gucG9seWZpbGwgPSB0cnVlO1xuXG4gIGlmICghc2VsZi5mZXRjaCkge1xuICAgIHNlbGYuZmV0Y2ggPSBmZXRjaDtcbiAgICBzZWxmLkhlYWRlcnMgPSBIZWFkZXJzO1xuICAgIHNlbGYuUmVxdWVzdCA9IFJlcXVlc3Q7XG4gICAgc2VsZi5SZXNwb25zZSA9IFJlc3BvbnNlO1xuICB9XG5cbiAgZXhwb3J0cy5IZWFkZXJzID0gSGVhZGVycztcbiAgZXhwb3J0cy5SZXF1ZXN0ID0gUmVxdWVzdDtcbiAgZXhwb3J0cy5SZXNwb25zZSA9IFJlc3BvbnNlO1xuICBleHBvcnRzLmZldGNoID0gZmV0Y2g7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxufSkpKTtcbiIsIi8qXG5cbsKpIENvcHlyaWdodCAyMDE2LCAyMDE3LCAyMDE4IEFKIEpvcmRhblxuXG5UaGlzIGZpbGUgaXMgcGFydCBvZiBzdHJ1Z2VlLm5ldC5cblxuc3RydWdlZS5uZXQgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG50aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuc3RydWdlZS5uZXQgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbmJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG5NRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG5HTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG5hbG9uZyB3aXRoIHN0cnVnZWUubmV0LiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuXG4qL1xuXG5pZiAoIXdpbmRvdy5Qcm9taXNlKSB7XG5cdGNvbnNvbGUubG9nKCdZb3VyIGJyb3dzZXIgZG9lc25cXCd0IHN1cHBvcnQgd2luZG93LlByb21pc2U7IGNhbm5vdCByZXRyaWV2ZSBXZWJtZW50aW9ucy4gUGxlYXNlIHVwZ3JhZGUuJyk7XG5cdHJldHVybjtcbn1cblxuLy8gUG9seWZpbGxzXG5cbnJlcXVpcmUoJ3doYXR3Zy1mZXRjaCcpO1xuXG4oZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRmdW5jdGlvbiBzdHJpcChodG1sKSB7XG5cdFx0Ly8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzgyMjQ4Ni8xMTk4ODk2XG5cdFx0dmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5pbm5lckhUTUwgPSBodG1sO1xuXHRcdHJldHVybiBkaXYudGV4dENvbnRlbnQgfHwgZGl2LmlubmVyVGV4dCB8fCAnJztcblx0fVxuXG5cdC8vIEtpY2sgb2ZmIHRoZSBmZXRjaCBBU0FQIGJlY2F1c2UgaXQgZG9lc24ndCByZXF1aXJlIHRoZSBET00gYW5kIHNvIHdlIGRvbid0IHdhbnQgdG8gd2FpdCBmb3IgdGhhdFxuXHR2YXIgcmVxID0gZmV0Y2goJ2h0dHBzOi8vd2VibWVudGlvbi5pby9hcGkvbWVudGlvbnM/dGFyZ2V0PScgKyB3aW5kb3cubG9jYXRpb24pO1xuXG5cdHZhciBpbml0aWFsaXplZCA9IGZhbHNlO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0aWYgKGluaXRpYWxpemVkKSByZXR1cm47XG5cdFx0aW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG5cdFx0dmFyIG1lbnRpb25zRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWJtZW50aW9ucycpO1xuXHRcdC8vIFNvbWV0aW1lcyBoYXBwZW5zIGJlY2F1c2Ugb2YgVHVyYm9saW5rcz9cblx0XHRpZiAoIW1lbnRpb25zRWxlbWVudCkgcmV0dXJuO1xuXHRcdGlmIChtZW50aW9uc0VsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWluaXRpYWxpemVkJykgPT09IFwidHJ1ZVwiKSByZXR1cm47XG5cblx0XHQvLyBPbmx5IHdoZW4gdGhlIERPTSBpcyByZWFkeSBkbyB3ZSByZWdpc3RlciBQcm9taXNlIHN0dWZmIHRoYXQgaW50ZXJhY3RzIHdpdGggaXRcblx0XHRyZXEudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdFx0cmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcblx0XHR9KVxuXHRcdC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdGlmIChkYXRhLmxpbmtzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHQvLyBObyByZXBsaWVzLCBzbyB3ZSBiYWlsXG5cdFx0XHRcdHZhciBub1JlcGxpZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHRcdG5vUmVwbGllcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnTm8gcmVwbGllcyAtIHlldCEgTWF5YmUgeW91XFwnZCBsaWtlIHRvIGJlIHRoZSBmaXJzdD8nKSk7XG5cdFx0XHRcdG1lbnRpb25zRWxlbWVudC5hcHBlbmRDaGlsZChub1JlcGxpZXMpO1xuXG5cdFx0XHRcdHZhciB3ZWJtZW50aW9uRG9jcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdFx0dmFyIHdlYm1lbnRpb25MaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXHRcdFx0XHR3ZWJtZW50aW9uRG9jcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnU2VlICcpKTtcblx0XHRcdFx0d2VibWVudGlvbkxpbmsuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ3dlYm1lbnRpb24ubmV0JykpO1xuXHRcdFx0XHR3ZWJtZW50aW9uTGluay5ocmVmID0gJ2h0dHBzOi8vd2VibWVudGlvbi5uZXQnO1xuXHRcdFx0XHR3ZWJtZW50aW9uRG9jcy5hcHBlbmRDaGlsZCh3ZWJtZW50aW9uTGluayk7XG5cdFx0XHRcdHdlYm1lbnRpb25Eb2NzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcgZm9yIHRoZSBkb2NzLicpKTtcblx0XHRcdFx0bWVudGlvbnNFbGVtZW50LmFwcGVuZENoaWxkKHdlYm1lbnRpb25Eb2NzKTtcblxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGRhdGEubGlua3MuZm9yRWFjaChmdW5jdGlvbihsaW5rKSB7XG5cdFx0XHRcdC8vIFRPRE8gaGFuZGxlIHRoaXMsIG1heWJlP1xuXHRcdFx0XHRpZiAobGluay5wcml2YXRlKSByZXR1cm47XG5cblx0XHRcdFx0Ly8gVE9ETyB0aGlzIHByb2JhYmx5IGRvZXNuJ3QgaGFuZGxlIGFsbCB0eXBlcz8gQnV0IEkgY291bGRuJ3QgZmluZCBzdWZmaWNpZW50IGRvY3VtZW50YXRpb25cblxuXHRcdFx0XHQvLyBUT0RPIGxvb2sgYXQgd2hhdCBcInZlcmlmaWVkXCIgYWN0dWFsbHkgbWVhbnNcblx0XHRcdFx0aWYgKCFsaW5rLnZlcmlmaWVkKSByZXR1cm47XG5cblx0XHRcdFx0dmFyIHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cblx0XHRcdFx0Ly8gQXZhdGFyXG5cdFx0XHRcdC8vIFRPRE8gZG8gc29tZXRoaW5nIGJldHRlciB3aXRoIG1pc3NpbmcgYXZhdGFyc1xuXHRcdFx0XHRpZiAobGluay5kYXRhLmF1dGhvci5waG90bykge1xuXHRcdFx0XHRcdHZhciBhdmF0YXJMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXHRcdFx0XHRcdGF2YXRhckxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgbGluay5kYXRhLmF1dGhvci51cmwpO1xuXHRcdFx0XHRcdHZhciBhdmF0YXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblx0XHRcdFx0XHRhdmF0YXIuY2xhc3NMaXN0LmFkZCgnd2VibWVudGlvbi1hdmF0YXInKTtcblx0XHRcdFx0XHRhdmF0YXIuc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rLmRhdGEuYXV0aG9yLnBob3RvKTtcblx0XHRcdFx0XHRhdmF0YXIuc2V0QXR0cmlidXRlKCdhbHQnLCBsaW5rLmRhdGEuYXV0aG9yLm5hbWUgKyAnXFwncyBhdmF0YXInKTtcblx0XHRcdFx0XHRhdmF0YXJMaW5rLmFwcGVuZENoaWxkKGF2YXRhcik7XG5cdFx0XHRcdFx0cC5hcHBlbmRDaGlsZChhdmF0YXJMaW5rKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHAuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJyAnKSk7XG5cblx0XHRcdFx0Ly8gXCJBbHlzc2EgUC4gSGFja2VyXCIuLi5cblx0XHRcdFx0dmFyIGF1dGhvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblx0XHRcdFx0YXV0aG9yLnNldEF0dHJpYnV0ZSgnaHJlZicsIGxpbmsuZGF0YS5hdXRob3IudXJsKTtcblx0XHRcdFx0YXV0aG9yLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGxpbmsuZGF0YS5hdXRob3IubmFtZSkpO1xuXHRcdFx0XHRwLmFwcGVuZENoaWxkKGF1dGhvcik7XG5cblx0XHRcdFx0dmFyIHNob3J0Q29udGVudCA9IHN0cmlwKGxpbmsuZGF0YS5jb250ZW50KTtcblx0XHRcdFx0aWYgKHNob3J0Q29udGVudC5sZW5ndGggPiA2MCkge1xuXHRcdFx0XHRcdC8vIFRPRE8gc2xpY2Ugb24gd29yZCBib3VuZGFyaWVzXG5cdFx0XHRcdFx0c2hvcnRDb250ZW50ID0gc2hvcnRDb250ZW50LnNsaWNlKDAsIDYwKSArICfigKYnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gVE9ETyBEUlkgdGhpcyB1cFxuXHRcdFx0XHRzd2l0Y2ggKGxpbmsuYWN0aXZpdHkudHlwZSkge1xuXHRcdFx0XHRjYXNlICdyZXBseSc6XG5cdFx0XHRcdFx0Ly8gLi4uXCJyZXBsaWVkIHdpdGhcIi4uLlxuXG5cdFx0XHRcdFx0cC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnIHJlcGxpZWQgd2l0aCAnKSk7XG5cblx0XHRcdFx0XHQvLyAuLi5cImNoZWNrIG91dCB0aGlzIGFydGljbGUhIGh0dHA6Ly9leGFtcGxlLmNvbVwiXG5cdFx0XHRcdFx0dmFyIHNvdXJjZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblx0XHRcdFx0XHRzb3VyY2Uuc2V0QXR0cmlidXRlKCdocmVmJywgbGluay5kYXRhLnVybCk7XG5cdFx0XHRcdFx0c291cmNlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHNob3J0Q29udGVudCkpO1xuXHRcdFx0XHRcdHAuYXBwZW5kQ2hpbGQoc291cmNlKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnbGluayc6XG5cdFx0XHRcdFx0Ly8gLi4uXCJsaW5rZWQgdG8gdGhpcyBhbmQgYWRkZWQgXCIuLi5cblxuXHRcdFx0XHRcdHAuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJyBsaW5rZWQgdG8gdGhpcyBhbmQgYWRkZWQgJykpO1xuXG5cdFx0XHRcdFx0Ly8gLi4uXCJjaGVjayBvdXQgdGhpcyBhcnRpY2xlISBodHRwOi8vZXhhbXBsZS5jb21cIlxuXHRcdFx0XHRcdHZhciBzb3VyY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cdFx0XHRcdFx0c291cmNlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGxpbmsuZGF0YS51cmwpO1xuXHRcdFx0XHRcdHNvdXJjZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzaG9ydENvbnRlbnQpKTtcblx0XHRcdFx0XHRwLmFwcGVuZENoaWxkKHNvdXJjZSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2xpa2UnOlxuXHRcdFx0XHRcdC8vIC4uLlwibGlrZWQgdGhpc1wiXG5cdFx0XHRcdFx0cC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnICcpKTtcblx0XHRcdFx0XHR2YXIgbGlrZVNvdXJjZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblx0XHRcdFx0XHRsaWtlU291cmNlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdsaWtlZCB0aGlzJykpO1xuXHRcdFx0XHRcdGxpa2VTb3VyY2Uuc2V0QXR0cmlidXRlKCdocmVmJywgbGluay5kYXRhLnVybCk7XG5cdFx0XHRcdFx0cC5hcHBlbmRDaGlsZChsaWtlU291cmNlKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnYm9va21hcmsnOlxuXHRcdFx0XHRcdC8vIC4uLlwiYm9va21hcmtlZCB0aGlzXCJcblx0XHRcdFx0XHRwLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcgJykpO1xuXHRcdFx0XHRcdHZhciBib29rbWFya1NvdXJjZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblx0XHRcdFx0XHRib29rbWFya1NvdXJjZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnYm9va21hcmtlZCB0aGlzJykpO1xuXHRcdFx0XHRcdGJvb2ttYXJrU291cmNlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGxpbmsuZGF0YS51cmwpO1xuXHRcdFx0XHRcdHAuYXBwZW5kQ2hpbGQoYm9va21hcmtTb3VyY2UpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdC8vIC4uLlwic2VudCBhIFwiLi4uXG5cdFx0XHRcdFx0cC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnIHNlbnQgYSAnKSk7XG5cdFx0XHRcdFx0Ly8gLi4uXCJXZWJtZW50aW9uIG5vdGlmaWNhdGlvblwiXG5cdFx0XHRcdFx0dmFyIG1lbnRpb25Tb3VyY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cdFx0XHRcdFx0bWVudGlvblNvdXJjZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnV2VibWVudGlvbiBub3RpZmljYXRpb24nKSk7XG5cdFx0XHRcdFx0bWVudGlvblNvdXJjZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBsaW5rLmRhdGEudXJsKTtcblx0XHRcdFx0XHRwLmFwcGVuZENoaWxkKG1lbnRpb25Tb3VyY2UpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bWVudGlvbnNFbGVtZW50LmFwcGVuZENoaWxkKHApO1xuXHRcdFx0fSk7XG5cdFx0fSlcblx0XHQuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnRW5jb3VudGVyZWQgV2VibWVudGlvbiBlcnJvcjonLCBlcnIpO1xuXHRcdFx0bWVudGlvbnNFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdDb3VsZG5cXCd0IGZldGNoIFdlYm1lbnRpb25zLiBUcnkgcmVmcmVzaGluZz8nKSk7XG5cdFx0fSk7XG5cblx0XHRtZW50aW9uc0VsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWluaXRpYWxpemVkJywgJ3RydWUnKTtcblx0fVxuXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3R1cmJvbGlua3M6bG9hZCcsIGZ1bmN0aW9uKCkge1xuXHRcdHJlcSA9IGZldGNoKCdodHRwczovL3dlYm1lbnRpb24uaW8vYXBpL21lbnRpb25zP3RhcmdldD0nICsgd2luZG93LmxvY2F0aW9uKTtcblx0XHRpbml0aWFsaXplZCA9IGZhbHNlO1xuXHRcdGluaXQoKTtcblx0fSwgZmFsc2UpO1xuXG5cdC8vIFRPRE8gYWRkIGluIHNvbWUgXCJMb2FkaW5nLi4uXCIgdGV4dCBvciBzb21ldGhpbmdcbn0pKCk7XG4iXX0=
