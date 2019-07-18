import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service' ;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  products = [];

  constructor(
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.getProductsFromService()
  }
  getProductsFromService(){
    this._httpService.getProducts().subscribe( data =>{
      console.log("Got our task and returned", data)
      this.products = data['data']
    })
  }
  deletebyID(id){
    console.log("Delete this", id)
    this._httpService.deleteProduct(id).subscribe(data =>{
      console.log("Deleted by product by ID and returned", data)
      this.getProductsFromService()
    })
  }

}
