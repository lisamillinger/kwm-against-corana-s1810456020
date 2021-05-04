import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl
} from "@angular/forms";
import { VaccinationFactory } from "../shared/vaccination-factory";
import { VaccinationStoreService } from "../shared/vaccination-store.service";
import { Vaccination, Location } from "../shared/vaccination";
import { VaccinationValidators } from "../shared/vaccination-validators";
import { VaccinationFormErrorMessages } from "./vaccination-form-error-messages";

@Component({
  selector: "app-vaccination-form",
  templateUrl: "./vaccination-form.component.html",
  styleUrls: ["./vaccination-form.component.css"]
})
export class VaccinationFormComponent implements OnInit {
  vaccinationForm: FormGroup;
  vaccination = VaccinationFactory.empty();
  isUpdatingVaccination = false;
  locations: FormArray;
  errors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private app: VaccinationStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const key = this.route.snapshot.params["key"];
    if (key) {
      this.isUpdatingVaccination = true;
      this.app.getSingle(key).subscribe(vaccination => {
        this.vaccination = vaccination;
        this.initVaccination();
      });
    }
    this.initVaccination();
  }

  initVaccination() {
    this.buildLocationsArray();
    this.vaccinationForm = this.fb.group({
      id: this.vaccination.id,
      key: [
        this.vaccination.key,
        [Validators.required],
        this.isUpdatingVaccination
          ? null
          : VaccinationValidators.keyExists(this.app)
      ],
      date: [this.vaccination.date],
      information: [this.vaccination.information],
      max_participants: [
        this.vaccination.max_participants,
        [Validators.min(1), Validators.max(100)]
      ],
      isFull: [this.vaccination.isFull],
      locations: this.locations
    });

    this.vaccinationForm.statusChanges.subscribe(() =>
      this.updateErrorMessages()
    );
  }

  buildLocationsArray() {
    console.log("ICH BUILDE EINE LCOATION");
    this.locations = this.fb.array([]);

    for (let location of this.vaccination.locations) {
      let fg = this.fb.group({
        post_code: new FormControl(location.post_code),
        address: new FormControl(location.address, [Validators.required]),
        city: new FormControl(location.city, [Validators.required])
      });
      console.log(location.post_code);
      this.locations.push(fg);
    }
  }

  addLocationControl() {
    this.locations.push(
      this.fb.group({ post_code: null, address: null, city: null })
    );
  }

  submitForm() {
    this.vaccinationForm.value.locations = this.vaccinationForm.value.locations.filter(
      thumbnail => thumbnail.url
    );

    const vaccination: Vaccination = VaccinationFactory.fromObject(
      this.vaccinationForm.value
    );

    console.log(vaccination.locations);

    vaccination.people = this.vaccination.people;

    //BESTEHENDE LOCATION UPDATEN
    if (this.isUpdatingVaccination) {
      console.log(vaccination);
      this.app
        .remove(this.vaccination.key)
        .subscribe(res =>
          this.router.navigate(["../vaccinations"], { relativeTo: this.route })
        );

      this.app.create(vaccination).subscribe(
        res => {
          this.vaccination = VaccinationFactory.empty();
          this.vaccinationForm.reset(VaccinationFactory.empty());
          this.router.navigate(["../vaccinations"], {
            relativeTo: this.route
          });
        },
        err => {
          console.log("Fehler ist passiert", err);
        }
      );
      //NEUE LOCATION ANLEGEN
    } else {
      //vaccination.user_id = 1;
      //console.log(book);
      this.app.create(vaccination).subscribe(
        res => {
          this.vaccination = VaccinationFactory.empty();
          this.vaccinationForm.reset(VaccinationFactory.empty());
          this.router.navigate(["../vaccinations"], {
            relativeTo: this.route
          });
        },
        err => {
          console.log("Fehler ist passiert", err);
        }
      );
    }
  }

  updateErrorMessages() {
    console.log("form invalid? " + this.vaccinationForm.invalid);

    this.errors = {};

    for (const message of VaccinationFormErrorMessages) {
      const control = this.vaccinationForm.get(message.forControl);

      if (
        control &&
        control.dirty &&
        control.invalid &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
}
