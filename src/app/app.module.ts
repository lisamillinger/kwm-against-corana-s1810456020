import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { VaccinationListComponent } from './vaccination-list/vaccination-list.component';
import { VaccinationListItemComponent } from './vaccination-list-item/vaccination-list-item.component';
import { VaccinationDetailsComponent } from './vaccination-details/vaccination-details.component';
import { VaccinationStoreService } from './shared/vaccination-store.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, VaccinationListComponent, VaccinationListItemComponent, VaccinationDetailsComponent, HomeComponent ],
  bootstrap:    [ AppComponent ],
  providers: [VaccinationStoreService]
})
export class AppModule { }
