import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sale } from 'src/app/models/sale';
import { ApiSaleService } from 'src/app/services/apiSale/api-sale.service';
import { DialogSaleComponent } from './dialogSale/dialogSale.component';

@Component({
  selector: 'app-sales-view',
  templateUrl: './sales-view.component.html',
  styleUrls: ['./sales-view.component.scss']
})
export class SalesViewComponent implements OnInit {

  public list!: Sale[];
  public tableColumns: string[] = 
  ["ID", "Date", "IDUserClient", "Total", "Select"]

  constructor(private apiSales: ApiSaleService,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.getSales();
  }

  getSales(){
    this.apiSales.get().subscribe( response => {
      this.list = response.data;
    })
  }

  selectSale(selectedSale: Sale){
    const dialogRef = this.dialog.open(DialogSaleComponent, {
      width: "600px",
      data: {
        sale: selectedSale
      }
    });

  }


}
