import { Component, OnInit } from "@angular/core";
import { Vaccination, People, Location } from "../shared/vaccination";
import {VaccinationStoreService} from '../shared/vaccination-store.service';

@Component({
  selector: "app-vaccination-list",
  templateUrl: "./vaccination-list.component.html",
  styleUrls: ["./vaccination-list.component.css"]
})
export class VaccinationListComponent implements OnInit {
  vaccinations: Vaccination[];
  people: People

  constructor(private app: VaccinationStoreService) {}

  ngOnInit() {
    this.app.getAll().subscribe(res => this.vaccinations = res);
    
  }
}
