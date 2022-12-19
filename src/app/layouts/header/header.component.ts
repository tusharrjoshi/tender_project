import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document,private service:AdminServiceService) { }
  username:any;
  userid:any;
  notifications:any;
  ngOnInit(): void {
    this.username=localStorage.getItem('username');
    this.userid=localStorage.getItem('userid');
    this.service.getnotification(this.userid).then((res)=>{
      this.notifications = res.data;
    }).catch((err)=>{
      console.log(222);
      
    })
    this.service.getnotification('user').then((res)=>{
      this.notifications = res.data;
    }).catch((err)=>{
      console.log(222);
      
    })

    setInterval(() => {
      this.service.getnotification(this.userid).then((res)=>{
        this.notifications = res.data;
      }).catch((err)=>{
  
      })
      this.service.getnotification('user').then((res)=>{
        this.notifications = res.data;
      }).catch((err)=>{
        console.log(222);
        
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
