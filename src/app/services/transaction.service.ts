import { Injectable } from "@angular/core";

@Injectable

({
  providedIn: 'root'
})
export class TransactionService {

  deposit(amount: number): boolean {
    
    if (amount <= 0){
       return false;
    }

    const user = JSON.parse(localStorage.getItem('currentUser')!);

    user.balance += amount;

    user.transactions = user.transactions || [];
    user.transactions.push({
      type: 'Deposit',
      amount: amount
    });

    this.saveUser(user);
    return true;
  }

  withdraw(amount: number): boolean {
    if (amount <= 0) return false;

    const user = JSON.parse(localStorage.getItem('currentUser')!);

    if (user.balance < amount) {
      alert('Insufficient balance');
      return false;
    }

    user.balance -= amount;

    user.transactions = user.transactions || [];
    user.transactions.push({
      type: 'Withdraw',
      amount: amount
    });

    this.saveUser(user);
    return true;
  }

  private saveUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex((u: any) => u.email === user.email);

    if (index !== -1) {
      users[index] = user;
      localStorage.setItem('users', JSON.stringify(users));
    }
  }
}