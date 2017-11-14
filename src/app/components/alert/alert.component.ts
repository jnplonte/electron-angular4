import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  message: any;

  constructor(@Inject('alertService') private alertService: any) {

  }

  ngOnInit() {
      this.alertService.getMessage().subscribe(message => {
          this.message = message;
      });
  }
}
