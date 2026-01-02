import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FdService {

   private interestRate = 7.5;

  createFD(amount: number, tenure: number): boolean {
    
    const storedUser = localStorage.getItem('currentUser');

    if (!storedUser || amount <= 0) {
      return false;
    }

    const user = JSON.parse(storedUser);

    if (user.balance < amount) {
      alert('Insufficient balance to create FD');
      return false;
    }

    user.balance -= amount;

    const maturityAmount = amount + (amount * this.interestRate * tenure / 100);

    const newFD = {
      id: Date.now(),
      amount: amount,
      tenure: tenure,
      interestRate: this.interestRate,
      date: new Date(),
      status: 'ACTIVE',
      maturityAmount: maturityAmount
    };

    user.fds.push(newFD);

    user.transactions.push({
      type: 'FD_CREATED',
      amount: amount,
      date: new Date(),
      balanceAfter: user.balance
    });

    localStorage.setItem('currentUser', JSON.stringify(user));

    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const index = allUsers.findIndex((u:any) => u.email === user.email);
    
    if (index !== -1) {
      allUsers[index] = user;
      localStorage.setItem('users', JSON.stringify(allUsers));
    }

    return true;
  }
}
