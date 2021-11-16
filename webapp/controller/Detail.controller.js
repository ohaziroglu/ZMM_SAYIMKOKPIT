sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
	"sap/m/MessageToast",
    "sap/ui/core/routing/History"
], function(
    Controller,
	MessageBox,
	MessageToast,History
) {
    "use strict";


    return Controller.extend("com.isuzu.zmmsayimkokpit.controller.Detail", {

        /**
         * @override
         */
        onInit: function() {
            // this._model = this.getOwnerComponent().getModel("detail");
            // this.getView().setModel(this._model, "detail");
            this._oDataModel = this.getOwnerComponent().getModel();
            this._mainModel = this.getOwnerComponent().getModel("mainModel");
            
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);
            
        },
        

         _onObjectMatched: function (oEvent) {
                var name = oEvent.getParameter("name");
                var MalzemeNumarasi = oEvent.getParameter("arguments").MalzemeNumarasi;
                var UretimYeri = oEvent.getParameter("arguments").UretimYeri;
                var DepoYeri = oEvent.getParameter("arguments").DepoYeri;
                if (name === "Detail") {
                    var path = this._oDataModel.createKey("/MalzemeListesiSet", {
                        MalzemeNumarasi: MalzemeNumarasi, 
                        UretimYeri: UretimYeri,
                        DepoYeri : DepoYeri
                      });
                    var obj = this._oDataModel.getObject(path);
                    delete obj.__metadata;
                    this._mainModel.setProperty("/Item",obj);
                }
    
            },
            onRefreshButtonPressed: function(oEvent) {

                
            },
            onNavBack : function(){
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("Main", true);
                }
            },
            
            onSaveButtonPressed: function(oEvent) {
                var _this=this;
                sap.m.MessageBox.confirm("Kaydetmek istediğinzden emin misiniz?", {
                    title: "Onaylıyor musunuz?",                                    // default
                    onClose: function(sButton) {
                        if (sButton === sap.m.MessageBox.Action.OK) {
                            _this.sendMalzemeSayim();
                        };
                    },                                       // default
                    styleClass: "",                                      // default
                    actions: [ sap.m.MessageBox.Action.OK,
                               sap.m.MessageBox.Action.CANCEL ],         // default
                    emphasizedAction: sap.m.MessageBox.Action.OK,        // default
                    initialFocus: null,                                  // default
                    textDirection: sap.ui.core.TextDirection.Inherit     // default
                    
                });
                //this.sendMalzemeSayim();

            },

            sendMalzemeSayim : function(){
                var _this=this;
                var jModel = this.getView().getModel("mainModel");
                var oEntry = jModel.getObject("/Item");
                oEntry.Statu = "03";
                console.log(oEntry);
                var oModel = this.getView().getModel();
                var oView = this.getView();
                oView.setBusy(true);
                oModel.create("/MalzemeListesiSet", oEntry, {
                    success: function (oData) {
                        oView.setBusy(false);
                        console.log(oData);
                        if(oData.Mesaj == "OK"){
                            sap.m.MessageToast.show(("Mesaj geri bildirimi kaydedildi"), {closeOnBrowserNavigation: false});
                            _this.onNavBack();
                        } else {console.log("ts");
                            MessageBox.error("Product A does not exist.", {
                            });
                        };
                                                                  
                    },
                    error: function (oError) {
                        oView.setBusy(false);
                        console.log(oError);
                        MessageBox.error("Product A does not exist.", {
                        });

                        //_this.getOwnerComponent().openMessageDialog("E" , "" , "Hata alındı!");
                   
                    }
                });


            }
            
        

    });
});
