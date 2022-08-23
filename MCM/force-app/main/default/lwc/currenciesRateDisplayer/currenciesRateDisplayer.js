import { LightningElement, track, wire, api } from "lwc";
import getAllCurrencies from "@salesforce/apex/DisplayCurrenciesRate_CTR.getAllCurrencies";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";

import CurrencyIsoCode_FIELD from "@salesforce/schema/Opportunity.CurrencyIsoCode";

const columns = [
  {
    label: "Currency ISO Code",
    fieldName: "IsoCode",
    type: "text",
    sortable: true
  },
  {
    label: "Conversion Rate",
    fieldName: "ConversionRate",
    type: "Decimal",
    typeAttributes: { step: "0.01" }, //add currencyCode: 'EUR' to to display currency on Euro
    cellAttributes: { alignment: "left" },
    sortable: true
  }
];
const fields = [CurrencyIsoCode_FIELD];

export default class CurrenciesRateDisplayer extends LightningElement {
  @api recordId;
  //TODO : Use design Attribute to let admin choose btn display all change rates or only opportunity change rate
  @api displayAllChangeRates;
  @api displayOppCurrChangeRate;
  columns = columns;
  @track currCodes;
  @track error;
  @track oppCurrIsoCodeValue;
  @track corporateCurr = "EURO";
  @track connectedCallbackexecuted = false;
  @track oppCurrConversionRate;
  defaultSortDirection = "asc";
  oppRecord;
  oppError;

  //TODO : Dispaly only opportunity currency Exchange rate
  @wire(getRecord, { recordId: "$recordId", fields })
  wiredOpp({data, error}){
    if(data){
      console.log("this.data INfo :: " + JSON.stringify(data));
      this.oppRecord = data;
      this.oppCurrIsoCodeValue = this.oppRecord.fields.CurrencyIsoCode.value;
    } else if(error){
      
      this.oppError = error;
    }
  }

  connectedCallback() {
    var corporateCurrItem;
    this.connectedCallbackexecuted = false;
    console.log("this.recordId INfo :: " + this.recordId);
    console.log("this.oppCurrIsoCodeValue INfo :: " + this.oppCurrIsoCodeValue);
    getAllCurrencies()
      .then((results) => {
        this.currCodes = results;
        this.error = undefined;
        console.log("this.currCodes INfo :: " + JSON.stringify(this.currCodes));
        console.log("this.corporateCurr INfo :: " + this.corporateCurr);
        corporateCurrItem = this.currCodes.find((obj) => {
          return obj.IsCorporate === true;
        });
        this.corporateCurr = corporateCurrItem.IsoCode;
        console.log("this.corporateCurr INfo :: " + this.corporateCurr);
        //As renderedCallback executes twice before and after getAllCurrencies, so put a variable to execute only after getAllCurrencies method
        this.connectedCallbackexecuted = true;
      })
      .catch((error) => {
        this.error = error;
      });
      
  }

  renderedCallback(){
    if(this.connectedCallbackexecuted === true){
      console.log("this.oppCurrIsoCodeValue renderedCallback INfo :: " + this.oppCurrIsoCodeValue);
      console.log("this.currCodes renderedCallback INfo :: " + JSON.stringify(this.currCodes));
      this.oppCurrConversionRate = this.currCodes.find((obj) => { return obj.IsoCode === this.oppCurrIsoCodeValue;}).ConversionRate;
    }
    
  }
}
