import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' ;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private _http: HttpClient
  ) { }

  getProducts(){
    return this._http.get('/products')
  }
  postProduct(form_data){
    return this._http.post('/products', form_data)
  }
  deleteProduct(id){
    return this._http.delete(`/products/${id}`)
  }
  getById(id){
    return this._http.get(`/products/${id}`)
  }
  putProduct(product_data){
    return this._http.put(`/products/${product_data._id}`, product_data)
  }
}
