import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiProductService } from '../api-product.service';
import { Product } from './../product';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  currentId:number = 0
  productData!:Product
  isLoading:boolean=false;

  constructor(private ActivatedRoute:ActivatedRoute , private _ApiProductService:ApiProductService) { }

  getId()
  {
    this.currentId = this.ActivatedRoute.snapshot.params['id'];
  }

  getProductDetails()
  {
    this.isLoading = true;
    this._ApiProductService.getProductDetails(this.currentId).subscribe({
      next: (response)=>
      {
        console.log(response);
        this.productData = response;
        this.isLoading = false;
      },
      error:()=>
      {
        alert('error')
      }
    })
  }

  ngOnInit(): void {
    this.getId();
    this.getProductDetails()
  }

}
