//#region Imports
import { Component, Inject, OnInit, ViewChild } from "@angular/core";

import { MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { SaleDetailBill } from "src/app/models/saleDetailBill";
import { ApiProductService } from "src/app/services/apiProducts/api-product.service";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiSaleDetailsService } from "src/app/services/apiSaleDetails/api-sale-details.service";
import { SaleDetails } from "src/app/models/saleDetails";
import { Product } from "src/app/models/product";
//#endregion

@Component({
    templateUrl: "./dialogSale.component.html",
    styleUrls: ["./dialogSale.component.scss"]
})
export class DialogSaleComponent implements OnInit{

    public detailsList: SaleDetails[] = [];
    public list: SaleDetailBill[] = [];

    public tableColumns: string[] = 
    ["ID", "Name", "Quantity", "Subtotal"];

    public dataSource!: MatTableDataSource<SaleDetailBill>;
    @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;   

    constructor(
        public dialogRef: MatDialogRef<DialogSaleComponent>,
        private apiProducts: ApiProductService,
        private apiSaleDetails: ApiSaleDetailsService,
         @Inject(MAT_DIALOG_DATA) public data: any
    ){

    }
    ngOnInit(): void{
        this.getSpecifiedSaleDetails();  
    }

    getSpecifiedSaleDetails(){
        this.apiSaleDetails.getSpecifyDetails(this.data.sale.id).subscribe(response => {
            this.detailsList = response.data;
            this.fillTableandGetSpecifiedProducts(this.detailsList);         
        });
    }
    fillTableandGetSpecifiedProducts(details: SaleDetails[]){
        details.forEach(detail => {
            this.apiProducts.getSpecifiedProduct(detail.idproduct).subscribe(response => {
                var product: Product = response.data[0];
                this.list.push({ID: detail.idproduct, Name: product.name, Quantity: detail.quantity,
                Subtotal: detail.quantity * product.unitPrice});
                this.dataSource = new MatTableDataSource(this.list);
                this.dataSource.paginator = this.paginator;  
            });        
        });
    }
    close(){
        this.dialogRef.close();
    }
}