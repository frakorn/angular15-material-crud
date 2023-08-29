import { FlatTreeControl } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { DialogBoxComponent } from '../dialog-box/components/dialog-box.component';
import { ApiService } from 'src/app/services/api.service';
import { FlatNode, SampleNode } from '../models/samples.models';

@Component({
  standalone: true,
  imports: [CommonModule, MaterialModule],
  selector: 'app-sample',
  styleUrls: ['sample.component.scss'],
  templateUrl: 'sample.component.html',
})
export class SampleComponent implements OnInit {

  isAdmin: boolean;
  isLoading: boolean = false;

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level,
    node => node.expandable, node => node.tests);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  displayedColumns: string[] = ['name', 'description', 'action'];
  hasChild = (_: number, node: FlatNode) => node.expandable;

  constructor(public dialog: MatDialog,
    private apiService: ApiService,
    private route: ActivatedRoute) {
    this.dataSource.data = this.route.snapshot.data['sample'];
  }

  ngOnInit(): void {
    this.isAdmin =  this.apiService.currentUser.roles.indexOf('Admin')!==-1;
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '350px',
      data: obj
    });
    const sub = dialogRef.componentInstance.onAction.subscribe((data) => {
      this.isLoading = data ? false : true;
    });
    dialogRef.afterClosed().subscribe((d) => {
      if (d.event != 'Cancel'){
        this.isLoading = true;
        this.apiService.getSamples().subscribe({
          next: (data: any) => {
            this.dataSource.data = data;
            this.isLoading = false;
          },
          error: (error) => {
            console.log('error get samples', error);
            this.isLoading = false;
          },
        });
      }
    })
  }

  private transformer(node: SampleNode, level: number) {
    return {
      id: node.id,
      expandable: (!!node.tests && node.tests.length > 0) && level == 0,
      name: node.name,
      description: node.description,
      count: node.count,
      level: level,
      type: level === 0 ? 'sample' : 'test',
      sampleId: node.sampleId || null,
    };
  }

}
