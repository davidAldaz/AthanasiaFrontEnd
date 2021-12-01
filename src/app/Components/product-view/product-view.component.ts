import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ApiProductService } from 'src/app/services/apiProducts/api-product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  public list!: Product[];
  public tableColumns: string[] = 
  ["Name", "Genre", "Quantity", "Unit Price"]

  constructor(
    private apiProduct: ApiProductService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this.apiProduct.get().subscribe( response => {
      this.list = response.data;
    })
  }
}
