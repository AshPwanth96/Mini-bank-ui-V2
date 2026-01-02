import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name= '';
  email='';
  password= '';
  balance = 0;


  constructor(private authService:AuthService,
    private route: Router
  ) { }

  signup(){

    this.email = this.email.trim();
    this.password = this.password.trim();

    if(!this.name || !this.email || !this.password){
      alert('All fields are mandatory');
      return;
    }

    const  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!emailRegex.test(this.email) ){
      alert('Email format should be proper');
      return;
    }

    if(this.balance<1000){
      alert('initial balance should be atleaset 1000')
      return;
    }

    if(this.password.length<6){
      alert("Password length should be atleast 6");
      return;
    }

    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      balance: this.balance,
      transactions: [],
      fds: []
    };

    const success = this.authService.signup(user);

    if(!success){
      alert('User Already Exists')
      return;
    }

    alert('signup successfull')

    this.route.navigate(['/login'])

  }

  ngOnInit(): void {
  }

}
