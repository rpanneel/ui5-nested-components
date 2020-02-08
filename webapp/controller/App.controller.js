sap.ui.define(
	["be/rpan/nested/comps/base/BaseController", "sap/base/Log"],
	function(BaseController, Log) {
		"use strict";
		const AppController = BaseController.extend(
			"be.rpan.nested.comps.controller.App",
			/** @lends be.rpan.nested.comps.controller.App.prototype */ {}
		);

		AppController.prototype.onInit = function() {
			Log.info(this.getView().getControllerName(), "onInit");
			this.getOwnerComponent()
				.getRouter()
				.attachBypassed(this._onBypassed, this);
		};

		AppController.prototype_onBypassed = function(oEvent) {
			var sHash = oEvent.getParameter("hash");
			Log.info(this.getView().getControllerName(), "_onBypassed Hash=" + sHash);
		};

		return AppController;
	}
);
