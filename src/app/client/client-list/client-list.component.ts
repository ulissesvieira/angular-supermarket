import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClientService } from '../client.service';
import { Client } from '../client.class';

@Component({
   selector: 'app-client-list',
   templateUrl: './client-list.component.html',
   styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
   clients: Client[] = [];

   constructor(private clientService: ClientService,
               private router: Router) { }

   ngOnInit() {
      this.getAllClients();
   }

   getAllClients() {
      this.clientService.getAllClients().subscribe(
         res => {
            this.clients = res;
         },
         err => {
            console.log(err);
         }
      );
   }

   editClientPage(client: Client) {
      this.router.navigate(['client/edit', client.id]);
   }

   deleteClientPage(client: Client) {
      this.clientService.deleteClient(client).subscribe(
         res => {
            if (res) {
               this.getAllClients();
            }
         },
         err => {
            console.log(err);
         }
      );
   }

   redirectNewClientPage() {
      this.router.navigate(['client/create']);
   }
}
