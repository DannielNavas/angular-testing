import { Component } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.sass'],
})
export class PeopleComponent {
  person: Person = new Person('Navarro', 'Samuel', 4, 15, 90);
}
