import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  message: string;
  timerOn: boolean = false;

  constructor(@Inject('alertService') private alertService: any) {

  }

  ngOnInit() {
      this.alertService.getMessage().subscribe(message => {
        this.message = message;
        if (!this.timerOn) {
            this.timerOn = true;
            setTimeout(() => {
                this.onClose();
            }, 3000);
        }
      });
  }

  onClose() {
      this.message = '';
      this.timerOn = false;
  }
}
