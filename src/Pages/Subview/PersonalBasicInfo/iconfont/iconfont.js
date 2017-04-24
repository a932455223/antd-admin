;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-jian" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M515.223926 94.323249c-231.245711 0-418.709267 187.462532-418.709267 418.711314 0 231.248781 187.463556 418.712337 418.709267 418.712337 231.249805 0 418.71336-187.462532 418.71336-418.712337C933.937287 281.785781 746.474754 94.323249 515.223926 94.323249zM650.300344 541.687136 380.151601 541.687136c-15.824407 0-28.652574-12.828167-28.652574-28.652574s12.828167-28.652574 28.652574-28.652574l270.149766 0c15.824407 0 28.652574 12.828167 28.652574 28.652574S666.124751 541.687136 650.300344 541.687136z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-J" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 122c-215.391 0-390 174.609-390 390s174.609 390 390 390 390-174.609 390-390-174.609-390-390-390z m240 420h-210v210h-60v-210h-210v-60h210v-210h60v210h210v60z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)