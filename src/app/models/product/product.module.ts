
export interface categories{

  id:number,
  title:string,
  created_at:number,
  created_by:string




}



export interface ProductModelServer{

  id:number,
  product_code:string,
  title:string,
  image:string,
  description:string,
  total_quantity_in_stock:number,
  category:categories,
  price:number,
  quantity:number,
  is_deleted:boolean,
  is_verified:boolean,
  delivery_fee:number,
  quantity_to_sell:number,




}

export  interface ServerResponse{
  count:number;
  products:ProductModelServer[];
}
