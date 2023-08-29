import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { ApiService } from 'src/app/services/api.service';
import { MenuItem } from '../../samples/models/samples.models';

@Component({
    selector: 'app-cards',
    standalone: true,
    imports: [CommonModule, MaterialModule],
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  menuList: MenuItem[] = [];

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createMenuList();
  }

  createMenuList() {
    // eventuale gestione menu in base al ruolo utente
    this.menuList = [
      { id: 'samples', subtitle: 'Sample', title: 'I tuoi Sample', icon: 'content_paste_search', role: ['admin','user'], route: 'samples' }
    ];
  }

  goTo(item: string) {
    this.router.navigate(['dashboard', item]);
  }
}