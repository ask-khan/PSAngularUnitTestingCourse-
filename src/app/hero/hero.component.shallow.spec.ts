 import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "./hero.component";

describe("HeroComponent Shallow Test" ,()=> {
    let fixture:ComponentFixture<HeroComponent>;
    beforeEach(()=> {
        TestBed.configureTestingModule({
            declarations:[HeroComponent],
            schemas:[NO_ERRORS_SCHEMA]
        })
        fixture = TestBed.createComponent( HeroComponent );
    });

    it('Should have the correct hero', ()=> {
        fixture.componentInstance.hero = { id: 1, name:'Super Dude', strength: 3 };
        expect(fixture.componentInstance.hero.name).toEqual('Super Dude');
    });

    it('Should render hero name and anchor tag', ()=> {
        fixture.componentInstance.hero = { id: 1, name:'Super Dude', strength: 3 };
        fixture.detectChanges();

        let de = fixture.debugElement.query( By.css('a') );
        expect( de.nativeElement.textContent).toContain('Super Dude');

        expect(fixture.nativeElement.querySelector('a').textContent).toContain('Super Dude');
    });

});