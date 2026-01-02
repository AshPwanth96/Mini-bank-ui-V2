import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any;

  constructor(private authService:AuthService, 
    private route:Router
  ) { }

  ngOnInit(): void {

    const storedUser = localStorage.getItem('currentUser');

    if(!storedUser){
      this.route.navigate(['/login'])
      return;
    }

    this.user = JSON.parse(storedUser);

  }

  logout(){
    this.authService.logout();
    this.route.navigate(['/login'])
  }

}
