import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  constructor(private apiService: ApiService) { }

  logout(){
    return this.apiService.logout();
  }

}