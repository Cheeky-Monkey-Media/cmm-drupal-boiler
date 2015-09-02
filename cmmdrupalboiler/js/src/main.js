/**
 * function to help elminate the requirejs caching
 */
var __getrev = function () {
  'use strict';
  var rev = document.getElementById('requirejs').getAttribute('data-rev');
  return rev || (new Date()).getTime();
};


/**
 * require config
 */
requirejs.config({
  paths: {
    // vendor
    'intention': 'vendor/intention',
    'underscore': 'vendor/underscore-min',
    'viewportsize': 'vendor/viewportSize-min',

    // custom
    'jquery': 'modules/jquery-global',
    'intentcontext': 'modules/intentcontext',
    'homepage': 'modules/homepage',
  },
  shim: {
  },
  map: {
  }
});

requirejs.config({
  urlArgs: 'rev=' + __getrev(),
});


/**
 * common JS loaded on all pages
 */
require([
  'jquery',
  'underscore',
  'intentcontext',
  ], function ($, _, IntentContext) {
  'use strict';

   // DOM ready
  $(function() {

    // init the DOM elements with intentionJS
    IntentContext.intent.elements(document);

    IntentContext.intent.on('desktop', function () { });
    IntentContext.intent.on('tablet', function () { });
    IntentContext.intent.on('mobile', function () { });

    // js loaded only on homepage
    if ($('body').hasClass('front')) {
      require(['homepage']);
    }

  }); // DOM ready
  
});