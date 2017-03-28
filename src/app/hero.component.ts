import { Component } from '@angular/core';
import {Hero} from './hero';

import { Http, Response, Headers,ConnectionBackend,JsonpModule } from "@angular/http";
import {OdooRPCService} from './odoorpc.service';
import "rxjs/add/operator/toPromise";
import {HeroService} from "./hero.service";
import {Router } from '@angular/router';


const HEROES: Hero[] = [];
@Component({
  selector: 'my-heroes',
  styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .heroes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .heroes li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .heroes li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .heroes .text {
      position: relative;
      top: -3px;
    }
    .heroes .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
`],
template: `
  
  <h2>Heroes</h2>
  <ul class="heroes">
    
    <li *ngFor="let hero of heroes" [class.selected]="hero === selectedHero" (click)="onSelect(hero)">
      <span class="badge">{{hero.id}}</span>{{hero.name}}
    </li>
    <div *ngIf="selectedHero">
      <h2>
        {{selectedHero.name | uppercase}} is my hero
      </h2>
      <button (click)="gotoDetail()">View Details</button>
    </div>
  </ul>
  <my-hero-detail [hero]="selectedHero"></my-hero-detail>
`,
providers:[OdooRPCService,HeroService]

})
export class HeroComponent  {
  
  heroes=HEROES;
  selectedHero:Hero;
  constructor(private router :Router,private heroservice:HeroService,private odoo:OdooRPCService){
        this.odoo.init({
            odoo_server: "http://quilqax.com"
        });
      
        //console.log(odoo.buildRequest("http://localhost:8069/ecommerce_quilqax/productos_destacados",[]))
        /*
       
        odoo.call("quilqax.productodestacado","getName",[""],[])
        .then((data:any)=>{console.log("success",data)})
        .catch((err:any)=>{console.log("error",err)});
        */
 
/*
        this.odoo.call("res.users","read",{},{}).then(function(res:any){
          console.log(res);
        }).catch(function(err){
          console.log("Errorrr",err);
        });
  
*/
     let params = {
                db : "quilqaxdb",
                login :  'daniel.moreno@quilqax.com',
                password : 'Pumpfiesta_18'
            };
             this.odoo.sendRequest("/web/session/authenticate",params).then((data:any)=>{
                console.log(data);
                 this.odoo.call("quilqax.productodestacado","search_read",[],{limit:100,domain:[['id', '>', '0' ]],fields: [ 'producto_id' ]})
                  .then((data:any)=>console.log(data)); 
              })  ;
             
            /*
      this.odoo.sendRequest("/web/session/authenticate",params).then((data:any)=>{
        
          this.odoo.sendRequest("/destacados/",[[]])
          .then((data:any)=>console.log(data)); 
          this.odoo.searchRead("quilqax.productodestacado",[[]],{'fields':['producto_id'],"limit":5})
          .then((data:any)=>console.log(data)); 
      })  ;
         this.odoo.login('quilqaxdb3', 'daniel.moreno@quilqax.com', 'Pumpfiesta_18').then(res => {
            console.log('login success');
            console.log(res);
            this.odoo.call("quilqax.productodestacado","read",{ids:[2,3]},{'fields':['producto_id']})
            .then((data:any)=>console.log(data)); 

        }).catch( err => {
            console.error('login failed', err);
        })
     */
   
   
                                                                              
        /*
        this.odoo.init({
            odoo_server: "http://localhost:8069"
        });
        this.odoo.login('quilqaxdb3', 'daniel.moreno@quilqax.com', 'Pumpfiesta_18').then(res => {
            console.log('login success');
            console.log(res);
        }).catch( err => {
            console.error('login failed', err);
        })
        --disable-web-security --user-data-dir="D:/Chrome"
        */
        
  }
  ngOnInit():void{
    this.getHeroes();
  }
  onSelect(hero:Hero):void{
      this.selectedHero=hero;
  }
  getHeroes(){
    this.heroservice.getHeroes().then(heroes=>this.heroes=heroes);
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
  
}

