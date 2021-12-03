//#region Imports&Component
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { Sale } from 'src/app/models/sale';
import { SaleDetail } from 'src/app/models/saleDetail';
import { User } from 'src/app/models/user';
import { ApiAuthClientService } from 'src/app/services/apiAuth/api-auth-client.service';
import { ApiProductService } from 'src/app/services/apiProducts/api-product.service';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.scss']
})
//#endregion
export class NewSaleComponent implements OnInit {

  
  public newSale!: Sale;
  public saleDetails!: SaleDetail[];
  public user!: User;
  public actualProduct!: Product;
  public list: Product[] = [];
  public tableColumns: string[] = 
  ["Name", "Unit Price", "Add"];

  public addProduct = this.formBuilder.group({
    'ProductName': [{value: '', disabled: true}, Validators.required],
    'ProductQuantity': [{value: 0, disabled: true}, Validators.required],
    'ProductTotal': [{value: 0, disabled: true}, Validators.required]
  })

  constructor(
    private formBuilder: FormBuilder,
    private apiProduct: ApiProductService,
    private apiAuthClientService: ApiAuthClientService
  ) { 
    this.apiAuthClientService.us.subscribe(res => {
      this.user = res;
    });
    this.saleDetails = [];
    this.newSale = { IDClient: this.user.id, SaleDetails: []};
  }

  ngOnInit(): void {
    this.getProducts();
    
  }
  getProducts(){
    this.apiProduct.get().subscribe( response => {
      this.list = response.data;
      console.log(this.list);
    })
  }

  selectProduct(product: Product){
    this.addProduct = this.formBuilder.group({
      'ProductName': [{value: product.name, disabled: true},  Validators.required],
      'ProductQuantity': [{value: 1, disabled: false},  Validators.required],
      'ProductTotal': [{value: product.unitPrice, disabled: true}, Validators.required]
        })
    this.actualProduct = product;
  }
  addSaleDetail(){

  }
  addSale(){

  }
  calculateProductTotal(qty: String){
    console.log(this.actualProduct.quantity);
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
          'ProductTotal': [{value: this.actualProduct.unitPrice * (Number(qty) - 1), disabled: true}, Validators.required]
        });
      }

    }
  }
}