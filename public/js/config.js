System.config({
  baseURL: "/js",
  transpiler: "babel",
  map: {
    "babel": "vendor/browser.js",
    "jquery": "vendor/jquery.js",
    "hammer": "vendor/hammer.js",
    "greensock": "vendor/TweenMax.js",
    "waitforimages": "vendor/jquery.waitforimages.js",
    "sidr": "vendor/jquery.sidr.min.js",
    "sliderrevolution": "vendor/jquery.themepunch.revolution.js",
    "photoswipe": "vendor/photoswipe.js",
    "photoswipeui": "vendor/photoswipe-ui-default.js",
    "uri": "vendor/URI.js"
  },
  meta: {
    'vendor/hammer.js': {
      format: 'global',
      exports: 'Hammer'
    },
    'vendor/jquery.waitforimages.js': {
      format: 'global',
      deps: [
        'vendor/jquery.js'
      ],
      globals: {
        jQuery: 'vendor/jquery.js'
      },
      exports: 'jQuery.fn.waitForImages'
    },
    'vendor/jquery.sidr.min.js': {
      format: 'global',
      deps: [
        'vendor/jquery.js'
      ],
      globals: {
        jQuery: 'vendor/jquery.js'
      }
    },
    'vendor/jquery.themepunch.revolution.js': {
      format: 'global',
      deps: [
        'vendor/jquery.js',
        'vendor/hammer.js',
        'vendor/TweenMax.js',
        'vendor/jquery.waitforimages.js'
      ],
      globals: {
        jQuery: 'vendor/jquery.js',
        Hammer: 'vendor/hammer.js',
        TweenLite: 'vendor/TweenMax.js'
      }
    }
  }
});
