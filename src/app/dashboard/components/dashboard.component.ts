import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service'; 
import { DashboardService } from '../services/dashboard.service';
import { User } from '../models/dashboard.models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav: MatSidenav;
  user: User;

  toggle() {
    this.sidenav.toggle();
  }

  constructor(private apiService: ApiService,
    private router: Router,
    private dashboardService: DashboardService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initUserInfo();
  }

  initUserInfo(){
    if(!this.apiService.currentUser)
      this.apiService.setUserInfo(this.route.snapshot.data['user'])
    this.user = this.apiService.currentUser;
  }

  goToHome(){
    this.router.navigate(['dashboard/cards']);
  }

  logout(){
    this.dashboardService.logout();
  }

}