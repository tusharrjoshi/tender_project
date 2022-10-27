import {Component, Inject, Injectable,OnInit} from  '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  constructor(private  dialogRef:  MatDialogRef<PopupComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any) { }
  ngOnInit(): void {
  }
  closeMe() {
    this.dialogRef.close();
}

}
