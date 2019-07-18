import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service' ;
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editProduct = {
    id : "",
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
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.findEditProduct(params['id'])
  });
  }
  findEditProduct(id){
    this._httpService.getById(id).subscribe(data =>{
      console.log("Got product by id and retured",data)
      this.editProduct = data['data']
    })
  }
  editProductbyID(){
    console.log("edit this product", this.editProduct)
    this.errMessage = {
      title : "",
      price: "",
      url : ""
    }
    // this._httpService.putProduct(this.editProduct).subscribe(data =>{
    //   if (data['error']) {
    //     console.log("Error updating product", data)
    //   }else {
    //     console.log(" Updated author successfully", data)
    //   }
    // })
    this._httpService.putProduct(this.editProduct).subscribe(data =>{
      if (data['message']== "Error"){
        console.log("Error creating product", data)
        this.errMessage = {
          title : data['error']['errors']['title'] == undefined ? "" : data['error']['errors']['title']['message'],
          price: data['error']['errors']['price'] == undefined ? "" : data['error']['errors']['price']['message'],
          url : ""
        }
      }else{
        console.log("Created new product and returned", data)
        this.editProduct = {
          id: "",
          title : "",
          price: "",
          url : ""
        }
        this._router.navigate(['/list']);
      }
    })
  }
}


