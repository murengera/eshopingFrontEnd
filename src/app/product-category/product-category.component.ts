import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service/api-service.service';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  items:Array<any>=[];
  categoryName: any = null;


  constructor(public router:Router,private api:ApiServiceService,private route: ActivatedRoute) {

  }



  ngOnInit() {


this.categires()
  }

  categires(){

    this.api.categoryProducts().subscribe((response) => {
      this.categoryName = response
      console.log(" response",this.categoryName)
    },error => {
      console.log(error);
    })
  }


}
