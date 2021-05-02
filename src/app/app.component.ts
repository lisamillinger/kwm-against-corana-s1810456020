import { Component, VERSION } from '@angular/core';
import {Vaccination} from "./shared/vaccination";

@Component({
  selector: 'my-app',
  template: '<app-vaccination-list></app-vaccination-list>',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;

  vaccination: Vaccination;
}
