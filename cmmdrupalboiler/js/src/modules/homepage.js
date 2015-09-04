/**
 * Homepage
 * @requires jquery
 */
define([
  'jquery',
], function ($) {
  'use strict';

  /**
   * object constructor
   */
  var Homepage = function() {
		this.init();
  };

  /**
   * init homepage module
   */
  Homepage.prototype.init = function() {
		var self = this;
		console.log("Homepage JS Init", self);
  };

  /**
   * DOM ready
   */
  $(function () {
    var home = new Homepage();
  });
});



