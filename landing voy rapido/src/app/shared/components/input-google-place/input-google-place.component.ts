import {
  Component,
  ElementRef,
  forwardRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-input-google-place',
  templateUrl: './input-google-place.component.html',
  styleUrls: ['./input-google-place.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputGooglePlaceComponent),
      multi: true,
    },
  ],
})
export class InputGooglePlaceComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  currentValue = '';
  _onChange: (_: any) => void;
  _onTouched: () => void;
  options: any = {
    types: [],
    componentRestrictions: { country: 'CL' },
  };

  constructor() {}

  ngOnInit(): void {}

  public handleAddressChange(address: Address) {
    const { formatted_address } = address;
    this.changeValue(formatted_address);
  }
  changeValue(value: string) {
    this.currentValue = value;
    this._onTouched();
    this._onChange(this.currentValue);
  }
  writeValue(value: string) {
    this.currentValue = value;
  }

  registerOnChange(fn: (_: any) => void) {
    this._onChange = fn;
  }
  registerOnTouched(fn: () => void) {
    this._onTouched = fn;
  }

  validate() {
    const value = this.input.nativeElement.value;
    if (!!value || value === '') {
      this.changeValue('');
    }
  }
}
