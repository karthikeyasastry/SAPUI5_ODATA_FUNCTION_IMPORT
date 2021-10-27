/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comhirose.mnp.lotmarkprint./zie_mnp_lot_mark_print/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
