import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleFactory } from '../shared/people-factory';
import { Vaccination, People, Location } from '../shared/vaccination';
import { VaccinationStoreService } from '../shared/vaccination-store.service';

@Component({
  selector: 'a.app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
  people: People[];

  constructor(private app: VaccinationStoreService) {}

  ngOnInit() {
    let person = this.app.getAllPeople();
    console.log(person);
    this.app.getAllPeople().subscribe(res => (this.people = res));
  }
}
