import { Component, OnInit } from '@angular/core';
import { ApiProductService } from '../api-product.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  numberItem:any=0
  items:string = ""
  constructor(private _ApiProductService:ApiProductService) { }

  ngOnInit(): void {
    this._ApiProductService.getNumItems()
    this._ApiProductService.numItem.subscribe({
      next : () => {
        if(this._ApiProductService.numItem.getValue() != null)
        {
          this.numberItem = this._ApiProductService.numItem
          this.items =this.numberItem.getValue();
        }
      }
    })

  }

}
