sap.ui.define(
	["be/rpan/nested/comps/base/BaseController", "sap/base/Log"],
	function(BaseController, Log) {
		"use strict";
		const HomeController = BaseController.extend(
			"be.rpan.nested.comps.controller.App",
			/** @lends be.rpan.nested.comps.controller.App.prototype */ {}
		);

		HomeController.prototype.onInit = function() {
			Log.info(this.getView().getControllerName(), "onInit");
			this.getOwnerComponent()
				.getRouter()
				.attachBypassed(this._onBypassed, this);
		};

		HomeController.prototype_onBypassed = function(event) {
			var hash = event.getParameter("hash");
			Log.info(this.getView().getControllerName(), "_onBypassed Hash=" + hash);
		};

		HomeController.prototype.onPressItem = function (event) {
			const componentId = event.getSource().getCells()[0].getTitle();
			switch (componentId) {
				case "Products":
					this.getOwnerComponent().getRouter().navTo("products");
					break;
				case "Suppliers":
					this.getOwnerComponent().getRouter().navTo("suppliers");
					break;
				default:
					Log.error(this.getView().getControllerName(), "Unexpected component!");
					break;
			}
		};

		return HomeController;
	}
);
