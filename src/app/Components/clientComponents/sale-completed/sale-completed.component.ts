import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sale } from 'src/app/models/sale';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-sale-completed',
  templateUrl: './sale-completed.component.html',
  styleUrls: ['./sale-completed.component.scss']
})
export class SaleCompletedComponent implements OnInit {

  sale!: Sale;
  subscription!: Subscription;
  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.subscription = this.data.currentLastSale.subscribe(message => this.sale = message)
    console.log(this.sale);
  }
}
