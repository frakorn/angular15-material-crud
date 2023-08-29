import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Optional } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { ACTIONS } from '../models/dialog-box-models';
import { UsersData } from '../../models/samples.models';
import { SampleService } from '../../services/samples.service';


@Component({
    standalone: true,
    imports: [CommonModule, MaterialModule, FormsModule],
    selector: 'app-dialog-box',
    templateUrl: './dialog-box.component.html',
    styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

    action: string;
    formData: any;
    obj: any;
    type: string;
    LABEL = ACTIONS;
    onAction = new EventEmitter();
    onActionEnd = new EventEmitter();

    ngOnInit(): void {
    }

    constructor(
        private samplesService: SampleService,
        public dialogRef: MatDialogRef<DialogBoxComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
        this.obj = data;
        this.type = this.obj.type;
        this.formData = { ...data };
        this.type = this.LABEL[this.type];
    }

    doAction() {
        this.onAction.emit();
        this.dialogRef.close({ event: this.obj.action, data: this.formData });
      
        const type = this.obj.type?.toUpperCase();
        const id = this.obj.id;
        const parentId = this.obj.sampleId;
        const name = this.formData.name;
        const description = this.formData.description;
       
        switch (this.obj.action) {
          case 'create':
            if (type === 'SAMPLE') {
              this.samplesService.createSample(name, description).subscribe(
                (value) => this.actionSuccess('sample created'),
                (error) => this.actionError('sample create error',error)
              );
            } else if (type === 'TEST') {
              this.samplesService.createTest(name, parentId).subscribe(
                (value) => this.actionSuccess('test created'),
                (error) => this.actionError('test create error',error)
              );
            }
            break;
      
          case 'delete':
            if (type === 'SAMPLE') {
              this.samplesService.deleteSample(id).subscribe(
                (value) => this.actionSuccess('test deleted'),
                (error) => this.actionError('test delete error',error)
              );
            } else if (type === 'TEST') {
              this.samplesService.deleteTest(id).subscribe(
                (value) => this.actionSuccess('test deleted'),
                (error) => this.actionError('test deleted error',error)
              );
            }
            break;
      
          case 'edit':
            if (type === 'SAMPLE') {
              this.samplesService.editSample(id, name, description).subscribe(
                (value) => this.actionSuccess('sample edited'),
                (error) => this.actionError('sample edited error',error)
              );
            } else if (type === 'TEST') {
              this.samplesService.editTest(id, name, parentId).subscribe(
                (value) => this.actionSuccess('test edited'),
                (error) => this.actionError('test edited error',error)
              );
            }
            break;
        }
      }

    actionSuccess(msg){
        console.log(msg);
        this.onAction.emit('success');
    }

    actionError(msg,err){
        console.log(msg,err);
        this.onAction.emit('error');
    }

    closeDialog() {
        this.dialogRef.close({ event: 'Cancel' });
    }

}