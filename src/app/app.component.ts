import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { HttpServiceService } from './services/http-service.service';
import { IResponse, ISorting, SORT_LIST } from './models/searchResponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  private debounce: number = 1000;
  public resultSet:IResponse = {};
  public searching:boolean = false;
  public subject: Subject<string> = new Subject();
  public sortList:Array<ISorting> = SORT_LIST;

  constructor(private httpService: HttpServiceService) { }

  ngOnInit() {
    this.subject.pipe(
      debounceTime(this.debounce)
    ).subscribe(searchTextValue => {
      if(searchTextValue){
        this.searching = true;
        this.handleSearch(searchTextValue);
      } else {
        this.resultSet = {};
        this.resultSet.items = [];  
      }
    });
      
  }

  public onInputChange(value:string): void {
    this.subject.next(value);
  }

  public handleSearch(param:string){
    this.httpService.getRepository(param).subscribe((result:IResponse) => {
      this.resultSet = result;
      this.searching = false;
      this.refreshData();
    }, error => {
      this.searching = false;
    });
  }

  public navigate(url:string){
    window.open(url, "_blank");
  }

  public refreshData(){
    this.sortList.forEach(val => {
      val.asc = false;
      val.desc =false;
    })
  }

  public sortData(list:ISorting){
    let prop = list?.name;
    if(!list?.asc && !list?.desc){
      list.desc = true; 
    } else if(list?.asc && !list?.desc){
      list.desc = true;
      list.asc = false;
    } else if(!list?.asc && list?.desc){
      list.desc = false;
      list.asc = true;
    } 
    if(list.desc){
      this.resultSet?.items?.sort((a:any, b:any) => {
        if (a[prop] < b[prop]) {
          return 1;
        }
        if (a[prop] > b[prop]) {
            return -1;
        }
        return 0;
      });
    } else {
      this.resultSet?.items?.sort((a:any, b:any) => {
        if (a[prop] > b[prop]) {
          return 1;
        }
        if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
      });
    }
  }
}
