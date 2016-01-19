/**
 * InitIntent
 * @requires:    jquery, intentcontext
 *
 * @description: This will initialize the axis(s) on which there
 *               are intention objects.
 *               This file should always be called last (in main.js)
 *               so that intention will do on page loads properly.
 */
define([
  'jquery',
  'intentcontext'
], function ($, IntentContext) {
  'use strict';

  /**
   * object constructor
   */
  var InitIntent = function() {
    this.init();
  };

  /**
   * init function module
   */
  InitIntent.prototype.init = function() {
    var self = this;

    /*
     * initialize all contexts for the axis(s)
     */
    IntentContext.horizontal_axis.respond();
    $(window).on('resize', IntentContext.horizontal_axis.respond);
  };

  /**
   * DOM ready
   */
  $(function () {
    var initintent = new InitIntent();
  });
});



