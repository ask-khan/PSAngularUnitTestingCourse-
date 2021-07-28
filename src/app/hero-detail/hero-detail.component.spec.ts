import { TestBed, ComponentFixture, fakeAsync, tick, flush, async } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component";
import { Location } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { of } from 'rxjs';
import { Directive, Input } from "@angular/core";
import { HeroComponent } from "../hero/hero.component";
import { By } from "@angular/platform-browser";


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

describe('Hero Detail Component',()=> {
    let fixture : ComponentFixture<HeroDetailComponent>; 
    let mockActivateRoute, mockHeroService, mockLocation;
    let HEROES;
    beforeEach(()=>{
        mockActivateRoute = {
            snapshot: { paramMap: { get:() => { return '3';  } } }
        }
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);
        TestBed.configureTestingModule({
            imports:[FormsModule],
            declarations:[HeroDetailComponent, RouteLinkDirectiveStub],
            providers:[
                { provide: ActivatedRoute, useValue: mockActivateRoute},
                { provide: HeroService, useValue: mockHeroService},
                { provide: Location, useValue: mockLocation},
            ]
            //,schemas:[NO_ERRORS_SCHEMA]
        })

        fixture = TestBed.createComponent( HeroDetailComponent );
        mockHeroService.getHero.and.returnValue(of({ id:3, name:'SuperDude', strength:100 }));
    });

    it("should render hero name in an h2 tag", ()=> {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
    });

    // it("should call updated hero when save is called",( done  )=> {
    //     mockHeroService.updateHero.and.returnValue(of({}));
    //     fixture.detectChanges();

    //     fixture.componentInstance.save();
    //     setTimeout(()=> {
    //         expect( mockHeroService.updateHero ).toHaveBeenCalled();
    //         done();
    //     }, 300);
        
    // }); 

    // it("should call updated hero when save is called", fakeAsync(()=> {
    //     mockHeroService.updateHero.and.returnValue(of({}));
    //     fixture.detectChanges();

    //     fixture.componentInstance.save();
    //     //tick(250);
    //     flush();
    //     expect( mockHeroService.updateHero ).toHaveBeenCalled();
           
    // })) 
    

    it("should call updated hero when save is called", async (()=> {
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();
        fixture.whenStable().then(() => {
            expect( mockHeroService.updateHero ).toHaveBeenCalled();
        });
        //tick(250);
        //flush();
        
           
    })) 

});  

