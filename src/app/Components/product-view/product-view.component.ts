import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  public dataSource!: MatTableDataSource<Product>;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;   

  constructor(
    private apiProduct: ApiProductService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this.apiProduct.get().subscribe( response => {
      this.list = response.data;
      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.paginator = this.paginator;  
    })
  }
  searchProducts(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}