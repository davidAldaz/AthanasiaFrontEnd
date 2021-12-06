import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ApiClientsService } from 'src/app/services/apiClients/api-clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  constructor(private apiClients: ApiClientsService) { }

  public list!: Client[];
  public tableColumns: string[] = 
  ["ID", "Name", "Email", "Cedula"]

  ngOnInit(): void {
    this.getClients();
  }
  getClients(){
    this.apiClients.get().subscribe( response => {
      console.log(response);
      this.list = response.data;
    })
  }
}
