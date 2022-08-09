import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from './../product';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() data!:Product
  @Output() item = new EventEmitter();
  addBtn:boolean=false;
  amount:number=0;

  constructor() { }

  addProductToCard()
  {
    this.item.emit({item:this.data , quantity:this.amount})
  }

  ngOnInit(): void {
  }

}
