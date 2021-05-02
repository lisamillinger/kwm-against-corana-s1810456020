import { Component, OnInit, Input, Output } from "@angular/core";
import { Vaccination } from "../shared/vaccination";
import { VaccinationStoreService } from "../shared/vaccination-store.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-vaccination-details",
  templateUrl: "./vaccination-details.component.html",
  styleUrls: ["./vaccination-details.component.css"]
})
export class VaccinationDetailsComponent implements OnInit {
  vaccination: Vaccination;

  constructor(
    private app: VaccinationStoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.vaccination = this.app.getSingle(params["key"]);
  }
}
