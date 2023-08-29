import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private apiService: ApiService) { }

  signIn(email,password){
    return this.apiService.signIn(email,password);
  }

}