import { Component, OnInit } from '@angular/core';
import { FdService } from '../services/fd.service';

@Component({
  selector: 'app-fd',
  templateUrl: './fd.component.html',
  styleUrls: ['./fd.component.css']
})
export class FdComponent implements OnInit {

  user: any = null;
  amount = 0;
  tenure=1;
  

  constructor(private fdService:FdService) { }

  ngOnInit(): void {
    this.loadUser();
  }

    loadUser(){
    const storedUser = localStorage.getItem('currentUser');

    if(storedUser){
      this.user = JSON.parse(storedUser);
    }
  }

   createFD() {
    if (this.amount < 500) {
      alert('Minimum FD amount is 500');
      return;
    }

    const success = this.fdService.createFD(this.amount, this.tenure);
    if (success) {
      alert('FD Created!');
      this.loadUser(); 
      this.amount = 0;
    }
  }
}
