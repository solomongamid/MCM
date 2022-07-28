import { LightningElement, track, wire } from 'lwc';
import getAllCurrencies from '@salesforce/apex/DisplayCurrenciesRate_CTR.getAllCurrencies';

const columns = [{
    label: 'Currency ISO Code',
    fieldName: 'IsoCode',
    type: 'text',
    sortable: true
},
{
    label: 'Conversion Rate',
    fieldName: 'ConversionRate',
    type: 'Currency',
    sortable: true
}
];
export default class CurrenciesRateDisplayer extends LightningElement {
    columns = columns;
    @track results;
    defaultSortDirection = 'asc';

    @wire(getAllCurrencies, {}) 
    valueList({ error, data }) {
        console.log(data);
        this.results = data;
        this.error = error;
    }
}