import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  deposit(amount:number): boolean{

    if(amount<=0){
      return false;
    }

    const storedUser = localStorage.getItem('currentUser');

    if(!storedUser){
      return false;
    }

    const user = JSON.parse(storedUser);

    user.balance += amount;

    const transaction = {
      type : 'DEPOSIT',
      amount: amount,
      date: new Date(),
      balanceAfter: user.balance
    };

    user.transactions.push(transaction);

    localStorage.setItem('currentUser', JSON.stringify(user));

    const usersFromStorage = localStorage.getItem('users');

    const users = usersFromStorage?JSON.parse(usersFromStorage):[];

    const index = users.findIndex((u:any)=>{
      u.email === user.email
    });

    if(index!==-1){
      users[index] = user;

      localStorage.setItem('users', JSON.stringify(users))
    }

    return true;

  }

  withdraw(amount:number):boolean{

  }

}
