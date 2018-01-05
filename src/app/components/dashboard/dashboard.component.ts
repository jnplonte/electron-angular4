import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(@Inject('dataBaseMainService') private dataBaseMainService: any) {

  }

  ngOnInit() {
   
  }
}
