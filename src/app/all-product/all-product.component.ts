import { Component, OnInit } from '@angular/core';
import { ApiProductService } from '../api-product.service';
import { Product } from './../product';
import { Card } from './../card';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss']
})
export class AllProductComponent implements OnInit {

  allProduct:Product[]=[]
  allCategory:string[]=[]
  isLoading:boolean= false
  cardProducts:Card[]=[]

  constructor(private _ApiProductService:ApiProductService) { }

  getAllProduct()
  {
    this.isLoading=true;
    this._ApiProductService.getAllProducts().subscribe({
      next : (response) =>
      {
        this.allProduct = response;
        this.isLoading= false;
      },
      error: (error)=>
      {
        // console.log(error);
        this.isLoading= false;
      }
    })
  }

  getAllCategory()
  {
    this.isLoading= true;
    this._ApiProductService.getAllCategory().subscribe({
      next : (response) => 
      {
        // console.log(response);
        this.allCategory = response;
        this.isLoading= false;
      },
      error: (error)=>
      {
        // console.log(error);
        this.isLoading= false;
      }
    })
  }

  filterCategory(category:any)
  {
    this.isLoading= true;
    let value = category.target.value;
    if (value == 'all')
    {
      this.getAllProduct()
    }
    else 
    {
      this._ApiProductService.getProductByCategory(value).subscribe({
        next : (response) => 
        {
          // console.log(response);
          this.allProduct = response;
          this.isLoading= false;
        }
      })
    }
  }

  addToCard(event:any)
  { 
    if(localStorage.getItem('card'))
    {
      this.cardProducts = JSON.parse(localStorage.getItem('card')!);
      let repeatId = this.cardProducts.find( (item) => item.item.id == event.item.id)
      if(repeatId)
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Product Is already in Your Card Add or Remove From Card',
        })
      }
      else
      {
        this.cardProducts.push(event)
        localStorage.setItem('card' , JSON.stringify(this.cardProducts))
        localStorage.setItem('numberItem' , JSON.stringify(this.cardProducts.length))
        this._ApiProductService.getNumItems()
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your Product has been saved',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    else
    {
      this.cardProducts.push(event)
      localStorage.setItem('card' , JSON.stringify(this.cardProducts))
      localStorage.setItem('numberItem' , JSON.stringify(this.cardProducts.length)) 
      this._ApiProductService.getNumItems() 
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Product has been saved',
        showConfirmButton: false,
        timer: 1500,
      });
    }
    
  }

  ngOnInit(): void {
    this.getAllProduct()
    this.getAllCategory()
  }

}
