import { Component, OnInit, Input } from '@angular/core';
import { Vaccination, People, Location } from '../shared/vaccination';
import { VaccinationStoreService } from '../shared/vaccination-store.service';

@Component({
  selector: 'a.app-people-list-item',
  templateUrl: './people-list-item.component.html',
  styleUrls: ['./people-list-item.component.css']
})
export class PeopleListItemComponent implements OnInit {
  @Input() people: People;

  constructor() {}

  ngOnInit() {}
}
