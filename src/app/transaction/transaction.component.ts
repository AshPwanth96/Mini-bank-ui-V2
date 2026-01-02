import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { retry } from 'rxjs';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  amount : number = 0;
  user:any = null;

  constructor(private transactionService: TransactionService) { }

   ngOnInit(): void {
    this.loadUser();
  }

  loadUser(){
    const storedUser = localStorage.getItem('currentUser');

    if(storedUser){
      this.user = JSON.parse(storedUser);
    }
  }

  deposit(){
    if(this.amount<=0){
      alert('Deposit should be more than 0')
      return;
    }

    const success = this.transactionService.deposit(this.amount);

    if(!success){
      alert('Deposit failed');
      return;
    }

    this.loadUser();
    this.amount = 0;
  }

  withdraw(){
    if(this.amount<=0){
      alert('Withdraw should be more than 0');
      return;
    }

    const success = this.transactionService
  }

 

}
