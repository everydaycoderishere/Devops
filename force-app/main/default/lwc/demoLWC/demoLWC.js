import { LightningElement,api } from 'lwc';

export default class DemoLWC extends LightningElement {
    firstName = "ANKUR"
    lastName = "BANKAR"

    @api pageSize = 10 
    @api total = 200

    //  @api message // public property 
    //  value //private property

    get totalPages(){
        return Math.ceil(this.total/this.pageSize)
    }
   
     greeting = 'world'
     changeHandler(event){
        this.greeting = event.target.value
     }
}