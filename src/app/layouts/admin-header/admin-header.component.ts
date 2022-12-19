import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AdminServiceService } from 'src/app/services/admin-service.service';


@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document,private service :AdminServiceService) { }
  adminid:any;
  notifications:any;
  username:any;
  ngOnInit(): void {
    this.username = localStorage.getItem('adminname')
    this.adminid = localStorage.getItem('adminid');
    this.service.getnotification(this.adminid).then((res)=>{
      this.notifications = res.data;
    }).catch((err)=>{

    })

    setInterval(() => {
      this.service.getnotification(this.adminid).then((res)=>{
        this.notifications = res.data;
      }).catch((err)=>{
  
      })
    }, 10000);
  }
  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
  removenotification(id:any){
    var noti:any = this.document.getElementById('noti'+id);
    noti.style.display = "none";
    this.service.removenotification(id).then((res)=>{
      
    }).catch((err)=>{

    })
  }

  
}