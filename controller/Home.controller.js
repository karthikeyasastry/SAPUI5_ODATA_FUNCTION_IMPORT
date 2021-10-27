sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/core/Fragment',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/m/Token',
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,Fragment, Filter, FilterOperator, Token) {
		"use strict";

		return Controller.extend("com.hirose.mnp.lotmarkprint.ziemnplotmarkprint.controller.Home", {
			onInit: function () {

            },

            onDownload: function (){
                this.onODataString('X');    
            },
            onPrint: function (){
                this.onODataString(' '); 
            },
            onODataString: function(download){
                var Plant = this.byId("multiPlantInput").getTokens();
                var PlantText = " ";
                for (let i = 0; i < Plant.length; i++) {
                    PlantText += Plant[i].getText() + ",";
                }
                var WCC = this.byId("multiWCCInput").getTokens();
                var WCCText = " ";
                for (let i = 0; i < WCC.length; i++) {
                    WCCText += WCC[i].getText() + ",";
                }
                var WCR = this.byId("multiWCRPInput").getTokens();
                var WCRText = "";
                for (let i = 0; i < WCR.length; i++) {
                    WCRText += WCR[i].getText() + ",";
                }
                var WC = this.byId("multiWCInput").getTokens();
                var WCText = "";
                for (let i = 0; i < WC.length; i++) {
                    WCText += WC[i].getText() + ",";
                }
                var Printer = this.byId('printer').getValue();
                //var oDataString = PlantText + WCCText + WCRText + WCText;
                //..oDataString += "&Download=" + "'" + download + "'";
                this._postDataToBackend(PlantText, WCCText, WCRText, WCText, Printer, download);
            },

            _postDataToBackend: function (PlantText, WCCText, WCRText, WCText, Printer, download) {
                //var oModel = this.getView().getModel();
                var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZNW_MNP_PROD_ORDER_LOT_MNGMNT_SRV/");
                oModel.callFunction("/ProductionLineQRCode", "POST", {
                    "Plant": PlantText,
                    "WorkCenterCat": WCCText,
                    "WorkCenterResp": WCRText,
                    "WorkCenter": WCText,
                    "PrinterName": Printer,
                    "Download": download
                },
                null,        
                function(oData, response) { 
                    console.log(oData);
                }, // callback function for success
                function(oError){
                    console.log(oError);
                }  
                );
            },
        handlePlantValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue(),
				oView = this.getView();
            this._pValueHelpDialog = '';
			// create value help dialog
			if (!this._pValueHelpDialog) {
				this._pValueHelpDialog = Fragment.load({
					id: oView.getId(),
					name: "com.hirose.mnp.lotmarkprint.ziemnplotmarkprint.view.Plant",
					controller: this
				}).then(function (oValueHelpDialog) {
					oView.addDependent(oValueHelpDialog);
					return oValueHelpDialog;
				});
			}

			this._pValueHelpDialog.then(function (oValueHelpDialog) {
				// create a filter for the binding
				oValueHelpDialog.getBinding("items").filter([new Filter(
					"Plant",
					FilterOperator.Contains,
					sInputValue
				)]);
				// open value help dialog filtered by the input value
				oValueHelpDialog.open(sInputValue);
			});
        },

        _handlePlantValueHelpClose: function (evt) {
			var aSelectedItems = evt.getParameter("selectedItems"),
				oMultiInput = this.byId("multiPlantInput");

			if (aSelectedItems && aSelectedItems.length > 0) {
				aSelectedItems.forEach(function (oItem) {
					oMultiInput.addToken(new Token({
						text: oItem.getTitle()
					}));
				});
			}
        },

        handleWCValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue(),
				oView = this.getView();
            // create value help dialog
            this._pValueHelpDialog = '';
			if (!this._pValueHelpDialog) {
				this._pValueHelpDialog = Fragment.load({
					id: oView.getId(),
					name: "com.hirose.mnp.lotmarkprint.ziemnplotmarkprint.view.WorkCenter",
					controller: this
				}).then(function (oValueHelpDialog) {
					oView.addDependent(oValueHelpDialog);
					return oValueHelpDialog;
				});
			}

			this._pValueHelpDialog.then(function (oValueHelpDialog) {
				// create a filter for the binding
				oValueHelpDialog.getBinding("items").filter([new Filter(
					"WorkCenter",
					FilterOperator.Contains,
					sInputValue
				)]);
				// open value help dialog filtered by the input value
				oValueHelpDialog.open(sInputValue);
			});
        },
        _handleWCValueHelpClose: function (evt) {
			var aSelectedItems = evt.getParameter("selectedItems"),
				oMultiInput = this.byId("multiWCInput");

			if (aSelectedItems && aSelectedItems.length > 0) {
				aSelectedItems.forEach(function (oItem) {
					oMultiInput.addToken(new Token({
						text: oItem.getTitle()
					}));
				});
			}
        },
         handleWCCValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue(),
				oView = this.getView();

            // create value help dialog
            this._pValueHelpDialog = '';
			if (!this._pValueHelpDialog) {
				this._pValueHelpDialog = Fragment.load({
					id: oView.getId(),
					name: "com.hirose.mnp.lotmarkprint.ziemnplotmarkprint.view.WorkCenterCategory",
					controller: this
				}).then(function (oValueHelpDialog) {
					oView.addDependent(oValueHelpDialog);
					return oValueHelpDialog;
				});
			}

			this._pValueHelpDialog.then(function (oValueHelpDialog) {
				// create a filter for the binding
				oValueHelpDialog.getBinding("items").filter([new Filter(
					"WorkCenterCategoryCode",
					FilterOperator.Contains,
					sInputValue
				)]);
				// open value help dialog filtered by the input value
				oValueHelpDialog.open(sInputValue);
			});
        },
        _handleWCCValueHelpClose: function (evt) {
			var aSelectedItems = evt.getParameter("selectedItems"),
				oMultiInput = this.byId("multiWCCInput");

			if (aSelectedItems && aSelectedItems.length > 0) {
				aSelectedItems.forEach(function (oItem) {
					oMultiInput.addToken(new Token({
						text: oItem.getTitle()
					}));
				});
			}
        },
        handleWCRValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue(),
				oView = this.getView();

            // create value help dialog
            this._pValueHelpDialog = '';
			if (!this._pValueHelpDialog) {
				this._pValueHelpDialog = Fragment.load({
					id: oView.getId(),
					name: "com.hirose.mnp.lotmarkprint.ziemnplotmarkprint.view.WorkCenterResp",
					controller: this
				}).then(function (oValueHelpDialog) {
					oView.addDependent(oValueHelpDialog);
					return oValueHelpDialog;
				});
			}

			this._pValueHelpDialog.then(function (oValueHelpDialog) {
				// create a filter for the binding
				oValueHelpDialog.getBinding("items").filter([new Filter(
					"WorkCenterResponsible",
					FilterOperator.Contains,
					sInputValue
				)]);
				// open value help dialog filtered by the input value
				oValueHelpDialog.open(sInputValue);
			});
        },
        _handleWCRValueHelpClose: function (evt) {
			var aSelectedItems = evt.getParameter("selectedItems"),
				oMultiInput = this.byId("multiWCRPInput");

			if (aSelectedItems && aSelectedItems.length > 0) {
				aSelectedItems.forEach(function (oItem) {
					oMultiInput.addToken(new Token({
						text: oItem.getTitle()
					}));
				});
			}
		}
		});
	});
