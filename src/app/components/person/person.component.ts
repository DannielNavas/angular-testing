import { Component, Input } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.sass'],
})
export class PersonComponent {
  @Input() person!: Person; // ! es para decirle a typescript que no es undefined pero si null
  imc = '';

  calcIMC() {
    this.imc = this.person.calcIMC();
  }
}
