//#region Imports&Component
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { Sale } from 'src/app/models/sale';
import { SaleDetail } from 'src/app/models/saleDetail';
import { SaleDetailBill } from 'src/app/models/saleDetailBill';
import { User } from 'src/app/models/user';
import { ApiAuthClientService } from 'src/app/services/apiAuth/api-auth-client.service';
import { ApiProductService } from 'src/app/services/apiProducts/api-product.service';
import { ApiSaleService } from 'src/app/services/apiSale/api-sale.service';
import { Response } from 'src/app/models/response';
import { Router } from '@angular/router';

var newSale: Sale;
var saleDetails: SaleDetail[] = [];
var saleDetailsBill: SaleDetailBill[] = [];

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.scss']
})
//#endregion
export class NewSaleComponent implements OnInit {
  
  public user!: User;
  public actualProduct!: Product;
  public filterList: Product[] = [];
  public saleDetailsTable: SaleDetailBill[] = [];
  public productList: Product[] = [];

  public tableProductsColumns: string[] = 
  ["Name", "Unit Price", "Add"];
  public tableBillColumns: string[] = 
  ["Name", "Qty.", "Subtotal", "Options"];

  public addProduct = this.formBuilder.group({
    'ProductName': [{value: '', disabled: true}, Validators.required],
    'ProductQuantity': [{value: 0, disabled: true}, Validators.required],
    'ProductTotal': [{value: 0, disabled: true}, Validators.required]
  })

  constructor(
    private formBuilder: FormBuilder,
    private apiProduct: ApiProductService,
    private apiAuthClientService: ApiAuthClientService,
    private apiSale: ApiSaleService,
    private router: Router
  ) { 
    this.apiAuthClientService.us.subscribe(res => {
      this.user = res;
    });
  }

  ngOnInit(): void {
    this.getProducts();
    this.updateBillTable();
  }
  getProducts(){
    this.apiProduct.get().subscribe( response => {
      response.data.forEach((element: Product) => {
        if(element.quantity != 0){

          this.productList.push(element);
        }
      });         
        this.filterList = this.productList;
    })
  }
//#region Product Selected
selectProduct(product: Product){
  this.addProduct = this.formBuilder.group({
    'ProductName': [{value: product.name, disabled: true},  Validators.required],
    'ProductQuantity': [{value: 1, disabled: false},  Validators.required],
    'ProductTotal': [{value: product.unitPrice, disabled: true}, Validators.required]
      })
  this.actualProduct = product;
}
calculateProductTotal(qty: String){
  if(Number(qty) >= 1 && Number(qty) <= this.actualProduct.quantity){
    this.addProduct = this.formBuilder.group({
      'ProductQuantity': [qty],
      'ProductTotal': [{value: this.actualProduct.unitPrice * Number(qty), disabled: true}, Validators.required]
    });
  } else{
    if(Number(qty) === 0){
      this.addProduct = this.formBuilder.group({
        'ProductQuantity': [1],
        'ProductTotal': [{value: this.actualProduct.unitPrice * 1, disabled: true}, Validators.required]
      });
    }
    if(Number(qty) > this.actualProduct.quantity){
      this.addProduct = this.formBuilder.group({
        'ProductQuantity': [this.actualProduct.quantity],
        'ProductTotal': [{value: this.actualProduct.unitPrice * this.actualProduct.quantity, disabled: true}, Validators.required]
      });
    }
  }
}
//#endregion
//#region Bill
  addSaleDetail(qty: String){
    if(!this.checkIfSaleDetailRepeats(Number(qty))){
      saleDetails.push({IDProduct: this.actualProduct.id, Quantity: Number(qty)});
      saleDetailsBill.push({ID: this.actualProduct.id, Name: this.actualProduct.name, Quantity: Number(qty), Subtotal: this.actualProduct.unitPrice * Number(qty)})
    }
    this.updateBillTable();
  }
  removeSaleDetail(productRemoved: SaleDetailBill){
    var cont: number = 0;
    saleDetails.forEach(element => {
      if(element.IDProduct === productRemoved.ID){
        saleDetails.splice(cont, 1);
        saleDetailsBill.splice(cont, 1);
      } else {
        cont++;
      }
    });
    this.updateBillTable();
  }
  checkIfSaleDetailRepeats(qty: number): boolean{
    var result = false;
      saleDetailsBill.forEach(element => {
        if(element.ID === this.actualProduct.id){
          element.Quantity += qty;
          element.Subtotal += this.actualProduct.unitPrice * qty;
          result = true;
        }
      });
      if(result){
        saleDetails.forEach(element => {
          if(element.IDProduct === this.actualProduct.id){
            element.Quantity += qty;
          }
        });
      }
      return result;
  }
  updateBillTable(){
    this.saleDetailsTable = [...saleDetailsBill];
  }
  addSale(){
    newSale = { IDUserClient: this.user.id, saleDetails: saleDetails};
    this.apiSale.add(newSale).subscribe((r: Response) => 
      {
          if(r.success){
            saleDetailsBill = [];
            this.saleDetailsTable = [];
            saleDetails = [];
            this.updateBillTable();
            this.router.navigate(["/sale-completed"]);
          }
      });
  }
//#endregion 
  getTotal(){
    return saleDetailsBill.map(t => t.Subtotal).reduce((acc, value) => acc + value, 0);
  }
}