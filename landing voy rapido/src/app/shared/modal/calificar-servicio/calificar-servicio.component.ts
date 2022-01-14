import { Comment } from './../../../tienda/shared/interfaces/comment.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calificar-servicio',
  templateUrl: './calificar-servicio.component.html',
  styleUrls: [
    './calificar-servicio.component.scss',
    '../../../shared/scss/modal-two.scss',
  ],
})
export class CalificarServicioComponent implements OnInit {
  form: FormGroup;

  @Input() ver: boolean = false;
  @Input() comment: Comment;
  @Output() cerrar = new EventEmitter<boolean>();
  @Output() commentReturn = new EventEmitter<Comment>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [this.comment?.description, [Validators.required]],
      rating: [this.comment?.rating, [Validators.required]],
    });
  }

  onSubmit() {
    const valid = this.form.valid;
    if (valid) {
      const { rating, description } = this.form.value;
      this.commentReturn.emit({ rating, description });
      this.cerrar.emit(false);
    }
  }

  calificar(valor: number) {
    this.form.controls['rating'].setValue(valor);
  }
}
