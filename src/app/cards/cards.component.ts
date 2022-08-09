import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';
import { Card } from './../card';
import Swal from 'sweetalert2'
import { ApiProductService } from '../api-product.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  cardProducts:Card[]=[];
  total:number = 0;
  constructor(private _CardService:CardService , private _ApiProductService:ApiProductService) { }

  getCardProducts()
  {
    if(localStorage.getItem('card'))
    {
      this.cardProducts = JSON.parse(localStorage.getItem('card')!);
    }
    // console.log(this.cardProducts); 
    this.getCardTotal()
  }

  getCardTotal()
  {
    this.total = 0
    for (let x in this.cardProducts)
    {
      this.total += this.cardProducts[x].item.price * this.cardProducts[x].quantity
    }
  }

  addQuantity(index:number)
  {
    this.cardProducts[index].quantity++
    this.getCardTotal()
    localStorage.setItem('card' , JSON.stringify(this.cardProducts))
  }

  minQuantity(index:number)
  {
    if(this.cardProducts[index].quantity >= 1)
    {
      this.cardProducts[index].quantity--
      this.getCardTotal()
      localStorage.setItem('card' , JSON.stringify(this.cardProducts))
    }
  }

  detectedChanges()
  {
    localStorage.setItem('card' , JSON.stringify(this.cardProducts))
    this.getCardTotal();
  }

  deleteProduct(index:number)
  { 

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
    .then((result) => {
      if (result.isConfirmed) {
      this.cardProducts.splice(index,1)
      this.getCardTotal()
      localStorage.setItem('card' , JSON.stringify(this.cardProducts))
      localStorage.setItem('numberItem' , JSON.stringify(this.cardProducts.length))
      this._ApiProductService.getNumItems()
        Swal.fire('Deleted!', 'Your Product has been deleted.', 'success');
      }
    });

  
  }

  clearAllCards()
  {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete all!",
    })
    .then((result) => {
      if (result.isConfirmed) {
      this.cardProducts.splice(0);
      this.getCardTotal()
      localStorage.setItem('card' , JSON.stringify(this.cardProducts))
      localStorage.setItem('numberItem' , JSON.stringify(this.cardProducts.length))
        this._ApiProductService.getNumItems()
        Swal.fire('Deleted!', 'All Product has been deleted.', 'success');
      }
    });
  }

  sendCard()
  {
    let products = this.cardProducts.map(item => 
      {
        return {productId:item.item.id , quantity:item.quantity}
      })
    let Model = 
    {
      userId:5,
      date:new Date(),
      products :products
    }
    this._CardService.sendCard(Model).subscribe({
      next: (response) =>
      {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your Products has been Send',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    })
    
  }

  ngOnInit(): void {
    this.getCardProducts()
  }

}
