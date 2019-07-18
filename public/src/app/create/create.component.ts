import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service' ;
import { ActivatedRoute, Params, Router } from '@angular/router';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  newProduct = {
    title : "",
    price: "",
    url : ""
  }
  errMessage = {
    title : "",
    price: "",
    url : ""
  }

  constructor(
    private _httpService: HttpService,
    private _router: Router

  ) { }

  ngOnInit() {
  }
  createProduct(){
    this.errMessage = {
      title : "",
      price: "",
      url : ""
    }
    this._httpService.postProduct(this.newProduct).subscribe(data =>{
      if (data['message']['errors'] != undefined){
        console.log("Error creating product", data)
        this.errMessage = {
          title : data['error']['errors']['title'] == undefined ? "" : data['error']['errors']['title']['message'],
          price: data['error']['errors']['price'] == undefined ? "" : data['error']['errors']['price']['message'],
          url : ""
        }
      }else{
        console.log("Created new product and returned", data)
        this.newProduct = {
          title : "",
          price: "",
          url : ""
        }
        this._router.navigate(['/list']);
      }
    })
  }

}
