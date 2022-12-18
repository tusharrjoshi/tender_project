import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'


@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { }
  username:any;
  notifications:any;
  ngOnInit(): void {
    this.username = localStorage.getItem('adminname');
  }
  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
  removenotification(id:any){
    
  }
}