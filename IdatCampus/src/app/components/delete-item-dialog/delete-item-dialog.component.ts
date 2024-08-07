import { Component, inject, Inject, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-item-dialog',
  standalone: true,
  imports: [
    MatButtonModule,   
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,    
    MatDialogTitle
  ],
  templateUrl: './delete-item-dialog.component.html',
  styleUrl: './delete-item-dialog.component.scss'
})

export class DeleteItemDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteItemDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any){}
    
  cancel(){
    this.dialogRef.close({action:'cancel'});
  }
  confirm(){
    this.dialogRef.close({action:'confirm'});
  }  

}
