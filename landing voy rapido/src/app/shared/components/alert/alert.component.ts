import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  alert: any = { mensaje: '', tipo: '' };
  color: string;
  className: string;
  display: string = 'none';
  setTime: any;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.getAlert.subscribe((result) => {
      this.display = 'none';
      clearTimeout(this.setTime);
      if (result !== null) {
        this.alert = result;
        const tipo = this.alert.tipo.toUpperCase();

        switch (tipo) {
          case 'CREATE':
            this.color = 'cornflowerblue';
            this.className = 'fa-user-check';
            break;

          case 'UPDATE':
            this.color = 'limegreen';
            this.className = 'fa-user-edit';
            break;

          case 'DELETE':
            this.color = 'red';
            this.className = 'fa-user-times';
            break;

          case 'ERROR':
            this.color = 'red';
            this.className = 'fa-exclamation-triangle';
            break;

          case 'SUCCESS':
            this.color = 'cornflowerblue';
            this.className = 'fa-check-circle';
            break;
        }

        this.display = 'flex';
        this.setTime = setTimeout(() => (this.display = 'none'), 5000);
      }
    });
  }

  closeAlert() {
    this.display = 'none';
  }
}
