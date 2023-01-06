import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.sass'],
})
export class PersonComponent {
  @Input() person!: Person; // TODO: ! es para decirle a typescript que no es undefined pero si null
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onSelected = new EventEmitter<Person>();
  imc = '';

  calcIMC() {
    this.imc = this.person.calcIMC();
  }

  onClick() {
    this.onSelected.emit(this.person);
  }
}
