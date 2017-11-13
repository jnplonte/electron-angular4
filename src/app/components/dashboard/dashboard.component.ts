import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public people: Array<any>;
  public form: any;

  constructor(@Inject('pouchService') private pouchService: any) {
      this.people = [];
      this.form = {
          'username': '',
          'firstname': '',
          'lastname': ''
      }
  }

  ngOnInit() {
      this.pouchService.fetch().then(result => {
          this.people = [];

          for (let i: number = 0; i < result.rows.length; i++) {
              this.people.push(result.rows[i].doc);
          }
      }, error => {
          console.error(error);
      });
  }

  insert() {
    if (this.form.username && this.form.firstname && this.form.lastname) {
        let returnVal: any = this.pouchService.put(this.form.username, this.form);
        this.people.push(this.form);

        this.form = {
          'username': '',
          'firstname': '',
          'lastname': ''
      }
    }
  }

  sync() {
      this.pouchService.sync().then(results => {
          if (results) {
              console.log('success sync');
          }
      })
  }

}
