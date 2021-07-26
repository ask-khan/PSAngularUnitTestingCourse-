import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { By } from "@angular/platform-browser";
import { of } from 'rxjs';
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";
import { Hero } from "../hero";


@Component({
    selector: 'app-hero',
    template: '<div></div>'
  })
 class HeroComponent {
    @Input() hero: Hero;
    

  }

describe("HeroesComponent Shallow Test" ,()=> {
    let fixture:ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;
    beforeEach(()=> {
        HEROES = [
            { id:1 , name:'Super Dude', strength:8 },
            { id:2 , name:'Wonderful woman', strength:28 }
        ]
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        TestBed.configureTestingModule({
            declarations:[HeroesComponent, HeroComponent],
            providers:[{
                provide: HeroService, useValue: mockHeroService
            }],
            schemas:[NO_ERRORS_SCHEMA]
        })
        fixture = TestBed.createComponent( HeroesComponent );
    });

    it('Should set heroes correctly from the service', ()=> {
        mockHeroService.getHeroes.and.returnValue(of( HEROES ));
        fixture.detectChanges();
        expect( fixture.componentInstance.heroes.length ).toBe(2);
    });


});