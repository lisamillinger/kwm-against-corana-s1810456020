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
  vaccination: Vaccination;

  constructor(private app: VaccinationStoreService) {}

  ngOnInit() {
    this.app.getAllPeople().subscribe(res => (this.people = res));
  }

  changeStatus(svnumber) {
    console.log(svnumber);

    for (let p of this.people) {
      if (svnumber == p.sv_number) {
        if (p.isVaccinated == false) {
          p.isVaccinated = true;
        } else {
          p.isVaccinated = false;
        }
        this.app.vaccinatePerson(p).subscribe();
        console.log(p);
      }
    }
  }
}
