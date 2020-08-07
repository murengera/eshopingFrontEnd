import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ApiServiceService } from '../api-service/api-service.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  [x: string]: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

isLoading: boolean;

categoryName: any =null;
  constructor(private breakpointObserver: BreakpointObserver,private api:ApiServiceService) { }

  ngOnInit(): void {
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
