import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MigriTestModule } from '../../../test.module';
import { FatorDetailComponent } from 'app/entities/fator/fator-detail.component';
import { Fator } from 'app/shared/model/fator.model';

describe('Component Tests', () => {
  describe('Fator Management Detail Component', () => {
    let comp: FatorDetailComponent;
    let fixture: ComponentFixture<FatorDetailComponent>;
    const route = ({ data: of({ fator: new Fator(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MigriTestModule],
        declarations: [FatorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(FatorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FatorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load fator on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.fator).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
