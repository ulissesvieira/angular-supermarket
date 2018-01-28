import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDatepicker } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { ClientService } from '../client.service';
import { Client } from '../client.class';

@Component({
   selector: 'app-client-create',
   templateUrl: './client-create.component.html',
   styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent implements OnInit, OnDestroy {
   clientForm: FormGroup;
   @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;

   private clientId: number;
   private errors: any;
   private sub: Subscription;

   constructor(private formBuilder: FormBuilder,
               private clientService: ClientService,
               private router: Router,
               private route: ActivatedRoute) { }

   ngOnInit() {
      this.sub = this.route.params.subscribe(
         params => this.clientId = Number(params['id'])
      );

      this.createForm();

      if (!this.clientId) {
         const nexId = this.clientService.getLastId();
         this.clientForm.patchValue({
            id: Number(nexId),
         });
      } else {
         this.clientService.findById(this.clientId).subscribe(
            cli => {
               if (cli.id > 0) {
                  this.clientForm.setValue({
                     id: Number(cli.id),
                     name: cli.name,
                     birthday: new Date(cli.birthday)
                  });
               } else {
                  this.handleErrors('Client ' + this.clientId + ' not found!');
                  this.redirectListingPage();
               }
            },
            error => this.handleErrors(error),
         );
      }
   }

   ngOnDestroy() {
      this.sub.unsubscribe();
   }

   createForm() {
      this.clientForm = this.formBuilder.group({
         id: ['', Validators.required],
         name: ['', [Validators.required, Validators.minLength(3)]],
         birthday: ['', Validators.required]
      });
   }

   onSubmit() {
      if (this.clientForm.valid) {
         const clientModel = this.getModel();

         if (this.clientId) {
            this.clientService.updateClient(clientModel).subscribe(
               cli => {
                  this.updateModel(cli);
                  this.redirectListingPage();
               },
               error => this.handleErrors(error),
            );
         } else {
            this.clientService.saveClient(clientModel).subscribe(
               cli => {
                  this.updateModel(cli);
                  this.redirectListingPage();
               },
               error => this.handleErrors(error),
            );
         }
      }
   }

   getModel(): Client {
      const client: Client = new Client(
         this.clientForm.controls['id'].value,
         this.clientForm.controls['name'].value,
         this.clientForm.controls['birthday'].value
      );

      return client;
   }

   updateModel(client: Client) {
      this.clientForm.setValue({
         id: Number(client.id),
         name: client.name,
         birthday: client.birthday
      });
   }

   redirectListingPage() {
      this.router.navigate(['clients']);
   }

   private handleErrors(errs: any) {
      this.errors = errs;
      console.log(errs);
   }
}
