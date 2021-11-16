sap.ui.define([
		"sap/ui/core/mvc/Controller",
	],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("com.isuzu.zmmsayimkokpit.controller.Main", {
			onInit: function () {
				this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				this._jsonModel = this.getView().getModel();
            	this._oRouter.getRoute("Main").attachPatternMatched(this._onObjectMatched, this);
			},
			_onObjectMatched: function (oEvent) {
                var name = oEvent.getParameter("name");
                if (name === "Main") {
					//this.onRefreshButtonPressed(oEvent);
                }
    
            },

			onRefreshButtonPressed: function (oEvent) {
				var oView = this.getView();
				var oTable = oView.byId("idMalzemeTable");
				oTable.removeSelections();
				oTable.getBinding("items").refresh(true);
			},
			onPress: function (oEvent) {
				var oView = this.getView();
				var oModel = this.getView().getModel();
				var oTable = this.getView().byId("idMalzemeTable");
				var item = oTable.getSelectedItem();
				var sPath = item.getBindingContext().sPath;
				var obj = oModel.getObject(sPath);
				this._oRouter.navTo("Detail", {
					MalzemeNumarasi: obj.MalzemeNumarasi,
					UretimYeri: obj.UretimYeri,
					DepoYeri: obj.DepoYeri
				});

				/*var jModel = this.getView().getModel();
				var oView = this.getView();
				var oTable = oView.byId("idMalzemeTable");
				var itemIndex = oTable.indexOfItem(oTable.getSelectedItem());
 				if(itemIndex !== -1) {
                    var item = oTable.getSelectedItem();
                   var sPath = item.getBindingContext().sPath;
                    var obj = jModel.getObject(sPath);
					alert(obj.MalzemeNumarasi);	
				}*/

			},
		});
	});