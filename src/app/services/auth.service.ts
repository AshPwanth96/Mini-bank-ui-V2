import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authStatus = new BehaviorSubject<boolean>(this.isLoggedIn());

  isLoggedIn$ = this.authStatus.asObservable()


  signup(userData: any): boolean{

  const usersFromStorage = localStorage.getItem('users');

  const users = usersFromStorage?JSON.parse(usersFromStorage):[];

  const userExist = users.find((u:any)=> u.email === userData.email)

  if(userExist){
    return false;
  }

  const user = {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    balance: userData.balance,
    transactions: [],
    fds: []
  }

  users.push(user)

  localStorage.setItem('users', JSON.stringify(users));

  return true;

  }

  login(credentials: any): boolean{

    const usersFromStorage = localStorage.getItem('users')

    const users = usersFromStorage?JSON.parse(usersFromStorage):[];

    const user = users.find((u:any)=>
      u.email === credentials.email && u.password === credentials.password
    )

    if(user){
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.authStatus.next(true);
      return true;      
    }else{
      return false;
    }

  }

  logout(){
    localStorage.removeItem('currentUser');
    this.authStatus.next(false);

  }

  isLoggedIn(){
    return !!localStorage.getItem('currentUser')
  }


}
