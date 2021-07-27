import { Directive, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { By } from "@angular/platform-browser";
import { of } from 'rxjs';
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";
import { Hero } from "../hero";
import { HeroComponent } from "../hero/hero.component";

@Directive({
    selector:'[routerLink]',
    host: { '(click)': 'onClick()' }
})

export class RouteLinkDirectiveStub {
    @Input('routerLink') linkParams:any;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}


describe("HeroesComponent Deep Test" ,()=> {
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
            declarations:[HeroesComponent, HeroComponent, RouteLinkDirectiveStub],
            providers:[{
                provide: HeroService, useValue: mockHeroService
            }],
            schemas:[NO_ERRORS_SCHEMA]
        })
        fixture = TestBed.createComponent( HeroesComponent );
        
    });

    it('Should set heroes correctly from the service', ()=> {
        mockHeroService.getHeroes.and.returnValue(of( HEROES ));
        // run ngoninit
        fixture.detectChanges();
        const heroComponentDes = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect( heroComponentDes.length ).toEqual(2);
        for ( let i = 0 ; i < HEROES.length ; i++ ) {
            expect( heroComponentDes[i].componentInstance.hero ).toEqual( HEROES[i] );
        }
    });

    it (`should call heroService.delete hero when the hero component delete button is clicked`, ()=> {
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of( HEROES ));
        // run ngoninit
        fixture.detectChanges();
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        //(<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);
        //heroComponents[0].query(By.css('Button')).triggerEventHandler('click', {  stopPropagation : () => {} });
        heroComponents[0].triggerEventHandler('delete',null);

        expect( fixture.componentInstance.delete ).toHaveBeenCalledWith( HEROES[0] );
    }); 


    it('It should add a new hero to the hero list when the add button is clicked ',()=> {
        mockHeroService.getHeroes.and.returnValue(of( HEROES ));
        // run ngoninit
        fixture.detectChanges();
        const name = "Mr ice";
        mockHeroService.addHero.and.returnValue(of( { id:5, name:name, strength:4 } ));
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];
        inputElement.value = name;
        addButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
        console.log( heroText );
        expect( heroText ).toContain( name );
    });

    it('should have the correct route for the first hero',()=> {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const heroComponents =  fixture.debugElement.queryAll(By.directive(HeroComponent));
        let routeLink = heroComponents[0].query(By.directive( RouteLinkDirectiveStub ))
        .injector.get(RouteLinkDirectiveStub);

        heroComponents[0].query(By.css('a')).triggerEventHandler('click',null);
        console.log(routeLink.navigatedTo);
        expect(routeLink.navigatedTo).toBe('/detail/1');
    })

});