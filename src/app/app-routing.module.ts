import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductComponent } from './all-product/all-product.component';
import { CardsComponent } from './cards/cards.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {path:'' , redirectTo:'products' , pathMatch:'full'},
  {path:'products' , component:AllProductComponent},
  {path:'details/:id' , component:ProductDetailsComponent},
  {path:'cards' , component:CardsComponent},
  {path:'**' , component:NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
