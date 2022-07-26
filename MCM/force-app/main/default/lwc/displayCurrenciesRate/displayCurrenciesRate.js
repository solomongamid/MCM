import { LightningElement,api,wire,track } from 'lwc';
import getAllCurrencies from '@salesforce/apex/DisplayCurrenciesRate_CTR.getAllCurrencies'; 



export default class DisplayCurrenciesRate extends LightningElement {
    @track columns = [{
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

    @track error;
    @track currList ;
    @wire(getAllCurrencies)
    wiredCurrencies({
        error,
        data
    }) {
        if (data) {
            this.currList = data;
        } else if (error) {
            this.error = error;
        }
    }

    /*@track columns = [
        { label: 'Currency ISO Code', fieldName: 'IsoCode' },
        {
            label: 'Exchange Rate',
            fieldName: 'ConversionRate',
            type: 'number',
            sortable: true,
            cellAttributes: { alignment: 'left' },
        },
    ];
    @track currencyRates;
    @track errors;

    @wire(getAllCurrencies) currencyRates;
    wiredCurrencies({ error, data }) {
        console.log('data :: '+data);
        if (data) {
            this.currencyRates = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.currencyRates = undefined;
        }
        console.log('currencyRates :: '+currencyRates);
    }

    //data = currencyRates;
    columns = this.columns;
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;

    

    // Used to sort the 'Age' column
    /*sortBy(field, reverse, primer) {
        const key = primer
            ? function (x) {
                  return primer(x[field]);
              }
            : function (x) {
                  return x[field];
              };

        return function (a, b) {
            a = key(a);
            b = key(b);
            return reverse * ((a > b) - (b > a));
        };
    }

    onHandleSort(event) {
        const { fieldName: sortedBy, sortDirection } = event.detail;
        const cloneData = [...this.currencyRates];

        cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
        this.currencyRates = cloneData;
        this.sortDirection = sortDirection;
        this.sortedBy = sortedBy;
    }*/
}