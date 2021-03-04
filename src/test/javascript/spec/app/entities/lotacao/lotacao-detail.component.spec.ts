import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MigriTestModule } from '../../../test.module';
import { LotacaoDetailComponent } from 'app/entities/lotacao/lotacao-detail.component';
import { Lotacao } from 'app/shared/model/lotacao.model';

describe('Component Tests', () => {
  describe('Lotacao Management Detail Component', () => {
    let comp: LotacaoDetailComponent;
    let fixture: ComponentFixture<LotacaoDetailComponent>;
    const route = ({ data: of({ lotacao: new Lotacao(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MigriTestModule],
        declarations: [LotacaoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(LotacaoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LotacaoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load lotacao on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.lotacao).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
