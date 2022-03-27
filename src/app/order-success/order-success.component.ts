import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  constructor(route: Router) { 
    setTimeout(() => {
      route.navigate(['/'])
    }, 5000 )
  }

  ngOnInit(): void {
  }

}
