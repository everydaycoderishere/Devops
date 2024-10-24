import { LightningElement,track } from 'lwc';
import getAccounts from '@salesforce/apex/LazyLoadingControllerTemp.getAccounts';

const columns = [
    { label: 'Id', fieldName: 'Id', type: 'text' },
    { label: 'Name', fieldName: 'Name', type: 'text'},
    { label: 'Rating', fieldName: 'Rating', type: 'text'}
  
];
export default class LazyLoadingPOC_Temp extends LightningElement {
    @track accounts=[];
    error;
    columns = columns;
    rowLimit =1;
    rowOffSet=0;
    @track accountName='';
    @track accRating = '';
  
    
    inputChangeHandler(event){
            this.rowLimit =1;
            this.rowOffSet=0;
        this.accountName=event.target.value;
        console.log('input value ',this.accountName)
        if(this.accountName==''){
            console.log('input value  blank ')
            this.rowLimit =1;
            this.rowOffSet=0;
        }
       
    }
    searchHandler(event){
        this.rowLimit =1;
        this.rowOffSet=0;
        this.accounts.splice(0,this.accounts.length)
       this.loadData()
    }

    connectedCallback() {
        this.loadData();
       
    }

    loadData(){
        return  getAccounts({acctName:this.accountName, ratingStr: this.accRating , limitSize: this.rowLimit , offset : this.rowOffSet })
        .then(result => {
            let updatedRecords = [...this.accounts, ...result];
            this.accounts = updatedRecords;
            this.error = undefined;
            console.log(updatedRecords,' fetched records')
        })
        .catch(error => {
            this.error = error;
            this.accounts = undefined;
        });
    }

    loadMoreData(event) {
        const currentRecord = this.accounts;
        const { target } = event;
        target.isLoading = true;

        this.rowOffSet = this.rowOffSet + this.rowLimit;
        this.loadData()
            .then(()=> {
                target.isLoading = false;
            });   
    }


}