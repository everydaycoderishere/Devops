import { LightningElement,track } from 'lwc';

export default class HelloWorld1 extends LightningElement {
    @track greeting = 'World';
    changeHandler(event){
        this.greeting = event.target.value;
    }
}