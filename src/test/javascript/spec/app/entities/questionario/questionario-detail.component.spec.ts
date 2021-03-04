import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MigriTestModule } from '../../../test.module';
import { QuestionarioDetailComponent } from 'app/entities/questionario/questionario-detail.component';
import { Questionario } from 'app/shared/model/questionario.model';

describe('Component Tests', () => {
  describe('Questionario Management Detail Component', () => {
    let comp: QuestionarioDetailComponent;
    let fixture: ComponentFixture<QuestionarioDetailComponent>;
    const route = ({ data: of({ questionario: new Questionario(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MigriTestModule],
        declarations: [QuestionarioDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(QuestionarioDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(QuestionarioDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load questionario on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.questionario).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
