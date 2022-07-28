public with sharing class DisplayCurrenciesRate_CTR {

    //TODO get user currency 

    //TODO query Exchange Rate for only user currency

    //TODO querry all Currencies Exchange Rates
    @AuraEnabled(cacheable=true)
    public static List<CurrencyType> getAllCurrencies(){
        List<CurrencyType> currencyRates;
        //Check user access to the object
        if(
            CurrencyType.SObjectType.getDescribe().isAccessible() &&
            Schema.SObjectType.CurrencyType.fields.ConversionRate.isAccessible() &&
            Schema.SObjectType.CurrencyType.fields.LastModifiedDate.isAccessible()
        ) {
            currencyRates = [Select Id, IsoCode, ConversionRate, LastModifiedDate From CurrencyType where isActive = true];
        }
        
        return currencyRates;
    }
    
}
