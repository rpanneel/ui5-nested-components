sap.ui.define(
	["be/rpan/nested/comps/base/BaseComponent", "sap/ui/core/Component"],
	function(BaseComponent, Component) {
		"use strict";

		const AppComponent = BaseComponent.extend(
			"be.rpan.nested.comps.Component",
			/** @lends be.rpan.nested.comps.Component.prototype */ {
				metadata: {
					manifest: "json"
				},
				// define the events which are fired from the reuse components
				//
				// this component registers handler to those events and navigates
				// to the other reuse components
				//
				// see the implementation in BaseComponent for processing the event
				// mapping
				eventMappings: {
					suppliersComponent: [
						{
							name: "toProduct",
							route: "products",
							componentTargetInfo: {
								products: {
									route: "detail",
									parameters: {
										id: "productId"
									}
								}
							}
						}
					],
					productsComponent: [
						{
							name: "toSupplier",
							route: "suppliers",
							componentTargetInfo: {
								suppliers: {
									route: "detail",
									parameters: {
										id: "supplierId"
									},
									componentTargetInfo: {
										products: {
											route: "list",
											parameters: {
												basepath: "supplierKey"
											}
										}
									}
								}
							}
						},
						{
							name: "toProduct",
							route: "products",
							componentTargetInfo: {
								products: {
									route: "detail",
									parameters: {
										id: "productId"
									}
								}
							}
						}
					]
				}
			}
		);

		AppComponent.prototype.init = function() {
			BaseComponent.prototype.init.apply(this, arguments);
		};

		return AppComponent;
	}
);
