import { HeroesComponent } from "./heroes.component"
import { Hero } from '../hero';
import { of } from 'rxjs';

describe( 'HeroesComponent' ,() => {
    let component:HeroesComponent;
    let HEROES:Hero[];
    let mockHeroService

    beforeEach(() => {
        HEROES = [
            {
                id:1, name: 'SpiderDude', strength:8
            },
            {
                id:2, name: 'SpiderDude', strength:8
            }
        ]

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])
        component = new HeroesComponent( mockHeroService );
    })
    
    describe( 'delete',()=> {
        it('should be remove the indication hero from the hero list',() => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            component.delete( HEROES[1] );
            expect( component.heroes.length ).toBe(1);

        })

        it('should call deleteHero',() => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            component.delete( HEROES[1] );
            expect( mockHeroService.deleteHero ).toHaveBeenCalledWith( HEROES[1] );

        })
    });


});