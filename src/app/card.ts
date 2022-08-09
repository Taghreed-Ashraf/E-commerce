export interface Card {
  item:{
    id?:number,
    image: string,
    title:string,
    description:string,
    category:string,
    price:number,
    rate:number,
    count:number,
  }
  quantity:number,
}
