import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  SIMPLIROUTE = environment.SIMPLIROUTE;

  formSimpliroute: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formSimpliroute = this.fb.group({
      tracking: ['', Validators.required],
    });
  }
  submitSimpliroute() {
    window.open(
      `${this.SIMPLIROUTE}${this.formSimpliroute.value.tracking}`,
      '_blank'
    );
  }

}
