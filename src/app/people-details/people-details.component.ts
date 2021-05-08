import { Component, OnInit } from '@angular/core';
import { People } from '../shared/people';
import { PeopleFactory } from '../shared/people-factory';
import { ActivatedRoute, Router } from '@angular/router';
import { VaccinationStoreService } from '../shared/vaccination-store.service';

@Component({
  selector: 'a.app-people-details',
  templateUrl: './people-details.component.html',
  styleUrls: ['./people-details.component.css']
})
export class PeopleDetailsComponent implements OnInit {
  person: People = PeopleFactory.empty();
  
  constructor(
    private app: VaccinationStoreService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.params;
    console.log(params);
    this.app.getSinglePerson(params['id']).subscribe(b => (this.person = b));
    console.log(this.person);

    this.getVaccinationForPeople();
  }

  getVaccinationForPeople() {
    const params = this.route.snapshot.params;
    this.app.getVaccinationForPerson();
    console.log(this.app.getVaccinationForPerson());
  }

  getRating(num: number) {
    return new Array(num);
  }
}
