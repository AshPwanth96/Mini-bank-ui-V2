import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password='';

  constructor(private authService: AuthService,
    private route:Router
  ) { }

  login(){
    if(!this.email||!this.password){
      alert('All fields are mandatory');
      return;
    }

    this.email = this.email.trim();
    this.password = this.password.trim();

    const success = this.authService.login({
      email: this.email,
      password: this.password
    });

    if(success){
      alert('login successfull');
      this.route.navigate(['/dashboard'])
    }else{
      alert('Invalid Email and password');
      return;
    }


  }



  ngOnInit(): void {
  }

}
