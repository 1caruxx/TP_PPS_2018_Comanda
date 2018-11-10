import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: 'spinner.html'
})
export class SpinnerComponent {

  text: string;

  constructor() {
    console.log('Hello SpinnerComponent Component');
    this.text = 'Hello World';
  }

}
