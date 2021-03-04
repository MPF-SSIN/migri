import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MigriTestModule } from '../../../test.module';
import { LotacaoComponent } from 'app/entities/lotacao/lotacao.component';
import { LotacaoService } from 'app/entities/lotacao/lotacao.service';
import { Lotacao } from 'app/shared/model/lotacao.model';

describe('Component Tests', () => {
  describe('Lotacao Management Component', () => {
    let comp: LotacaoComponent;
    let fixture: ComponentFixture<LotacaoComponent>;
    let service: LotacaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MigriTestModule],
        declarations: [LotacaoComponent],
      })
        .overrideTemplate(LotacaoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LotacaoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LotacaoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Lotacao(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.lotacaos && comp.lotacaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
