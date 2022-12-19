import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

  constructor(private service:ServiceService) { }
  username:any;
  email:any;
  user:any;

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('user');
    var userid = localStorage.getItem('userid');

    this.service.getuserdata(userid).then((res)=>{
      this.user = res.data[0];
    }).catch((err)=>{

    })

  }

}
