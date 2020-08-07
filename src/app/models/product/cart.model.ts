import{ProductModelServer}from '../product/product.module'


export interface CartModelServer{
  total:number;
  data:[{
    product:ProductModelServer,
    numInCart:number
  }];

}

export interface CartModelpublic{
  total:number;
  prodData:[{
    id:number,
    incart:number
  }];
}
