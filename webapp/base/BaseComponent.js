sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/base/util/deepClone"
], function(UIComponent, deepClone) {
	"use strict";

	const BaseComponent = UIComponent.extend("be.rpan.nested.comps.base.BaseComponent", /** @lends be.rpan.nested.comps.base.BaseComponent.prototype */ {

	});

	BaseComponent.prototype.init = function () {
		UIComponent.prototype.init.apply(this, arguments);

		const router = this.getRouter();
		router.getViews().attachCreated(this._processEventMappingOnTargetCreated, this);
		router.initialize();
	};

	BaseComponent.prototype._processEventMappingOnTargetCreated = function (event) {
		if (!this.eventMappings) return;

		const type = event.getParameter("type");
		const object = event.getParameter("object");
		const options = event.getParameter("options");
		let events = [];

		function processComponentTargetInfo(componentTargetInfo, event) {
			Object.keys(componentTargetInfo).forEach(function(targetName) {
				const info = componentTargetInfo[targetName];

				if (info.parameters) {
					Object.keys(info.parameters).forEach(function(name) {
						const paramName = info.parameters[name];
						const eventValue = event.getParameter(paramName);

						// expand the parameter mapping with the parameter value from
						// the event
						info.parameters[name] = eventValue;
					});
				}

				if (info.componentTargetInfo) {
					processComponentTargetInfo(info.componentTargetInfo, event);
				}
			});
		}

		if (type === "Component") {
			events = this.eventMappings[options.usage];
			if (Array.isArray(events)) {
				events.forEach(function(eventMapping) {
					object.attachEvent(eventMapping.name, function(event) {
						let componentTargetInfo;
						if (eventMapping.route) { // route information defined, call 'navTo'
							if (eventMapping.componentTargetInfo) {
								// if there's information for component target defined, replace the
								// event parameter mapping with the value from the event object
								componentTargetInfo = deepClone(eventMapping.componentTargetInfo);
								processComponentTargetInfo(componentTargetInfo, event);
							}

							this.getRouter().navTo(eventMapping.route, {}, componentTargetInfo);
						} else if (eventMapping.forward) { // event should be forwarded with the same parameters
							this.fireEvent(eventMapping.forward, event.getParameters());
						}
					}.bind(this));
				}.bind(this));
			}
		}
	};

	return BaseComponent;
});
