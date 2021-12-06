import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  constructor() { }

  public list!: Client[];
  public tableColumns: string[] = 
  ["ID", "Name", "Email", "Cedula"]

  ngOnInit(): void {
  }

}
