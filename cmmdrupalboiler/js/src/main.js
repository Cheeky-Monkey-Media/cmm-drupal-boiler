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
    'initintent': 'modules/initintent'
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

    // js loaded only on homepage
    if ($('body').hasClass('front')) {
      require(['homepage']);
    }

    if ($('html').length > 0) {
      require(['initintent']);
    }

  }); // DOM ready
  
});