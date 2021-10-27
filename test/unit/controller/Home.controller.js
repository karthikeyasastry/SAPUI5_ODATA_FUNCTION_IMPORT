/*global QUnit*/

sap.ui.define([
	"comhirose.mnp.lotmarkprint./zie_mnp_lot_mark_print/controller/Home.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Home Controller");

	QUnit.test("I should test the Home controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
