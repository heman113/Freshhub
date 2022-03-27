import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  images = ['../assets/Banner1.jfif','../assets/Banner2.png','../assets/Banner3.jpg']

  ngOnInit(): void {
  }

}
