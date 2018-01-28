import { Component, Input, OnChanges} from '@angular/core';

@Component({
   selector: 'app-extended-input',
   templateUrl: './extended-input.component.html',
   styleUrls: ['./extended-input.component.css']
})
export class ExtendedInputComponent implements OnChanges {
   @Input()
   labelText: '';
   @Input()
   inputErrors: any;
   @Input()
   errorDefs: any;

   errorMessage = '';

   constructor() { }

   ngOnChanges(changes: any): void {
      if (!changes.inputErrors) {
         return;
      }

      const errors: any = changes.inputErrors.currentValue;
      this.errorMessage = '';

      if (errors) {
         Object.keys(this.errorDefs).some(
            key => {
               if (errors[key]) {
                  this.errorMessage = this.errorDefs[key];
                  return true;
               }
            }
         );
      }
   }
}
