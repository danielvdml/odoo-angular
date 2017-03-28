import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule ,ConnectionBackend} from '@angular/http';

import {AppComponent} from './app.component'
import { HeroComponent }  from './hero.component';
import { HeroDetailComponent } from './hero-detail.component';

import {HeroService} from "./hero.service"
import {OdooRPCService} from './odoorpc.service';
import { AppRoutingModule }   from './app-routing.module';
import {DashboardComponent} from "./dashboard.component";

@NgModule({
  imports:      [ BrowserModule,
                  HttpModule, 
                  BrowserModule, 
                  FormsModule,
                  AppRoutingModule
                  ],
  declarations: [ AppComponent,HeroDetailComponent,HeroComponent,DashboardComponent],
  bootstrap:    [ AppComponent],
  providers: [ HeroService,OdooRPCService]
})
export class AppModule { }

