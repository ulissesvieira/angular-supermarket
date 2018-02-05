import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../authentication.service';
import { Login } from '../login.class';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   loginForm: FormGroup;

   constructor(private formBuilder: FormBuilder,
               private authenticationService: AuthenticationService) { }

   ngOnInit() {
      this.createForm();
   }

   createForm() {
      this.loginForm = this.formBuilder.group({
         username: ['', [Validators.required, Validators.minLength(3)]],
         password: ['', [Validators.required, Validators.minLength(3)]]
      });
   }

   getModel(): Login {
      const login: Login = new Login(
         this.loginForm.controls['username'].value,
         this.loginForm.controls['password'].value
      );

      return login;
   }

   onSubmit() {
      this.authenticationService.obtainAccessToken(this.getModel());
   }
}
