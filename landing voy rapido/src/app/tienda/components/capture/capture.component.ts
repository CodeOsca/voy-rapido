import { environment } from './../../../../environments/environment';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss'],
})
export class CaptureComponent implements OnInit {
  API = environment.API;

  constructor(@Inject(MAT_DIALOG_DATA) public path: string) {}

  ngOnInit(): void {}
}
