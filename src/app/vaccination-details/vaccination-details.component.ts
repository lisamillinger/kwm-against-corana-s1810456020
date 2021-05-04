import { Component, OnInit, Input, Output } from "@angular/core";
import { Vaccination } from "../shared/vaccination";
import { People } from "../shared/people";
import { VaccinationStoreService } from "../shared/vaccination-store.service";
import { ActivatedRoute, Router } from "@angular/router";
import { VaccinationFactory } from "../shared/vaccination-factory";

@Component({
  selector: "app-vaccination-details",
  templateUrl: "./vaccination-details.component.html",
  styleUrls: ["./vaccination-details.component.css"]
})
export class VaccinationDetailsComponent implements OnInit {
  vaccination: Vaccination = VaccinationFactory.empty();

  constructor(
    private app: VaccinationStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.app.getSingle(params["key"]).subscribe(v => (this.vaccination = v));
  }

  removeVaccination() {
    if (confirm("Impfung wirklich löschen?")) {
      this.app
        .remove(this.vaccination.key)
        .subscribe(res =>
          this.router.navigate(["../"], { relativeTo: this.route })
        );
    }
  }

  getmax_participants(num: number) {
    return new Array(num);
  }
}
