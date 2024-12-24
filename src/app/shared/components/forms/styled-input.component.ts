import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'styled-input',
  imports: [],
  templateUrl: './styled-input.component.html',
  styles: ``,
})
export class StyledInputComponent implements OnInit {
  @Input()
  label?: string;

  @Input()
  placeholder!: string;

  @Input()
  type: 'text' | 'email' | 'password' = 'text';

  @Input()
  value: string = '';

  @Input()
  disabled: boolean = false;

  @Input()
  required: boolean = false;

  @Input()
  error: string = '';

  @Input()
  name!: string;

  @Input()
  id!: string;

  ngOnInit(): void {
    if (!this.placeholder) {
      throw new Error('Placeholder for StyledInputComponent is required');
    }

    if (!this.name) {
      throw new Error('Name for StyledInputComponent is required');
    }

    if (!this.id) {
      throw new Error('Id for StyledInputComponent is required');
    }
  }
}
