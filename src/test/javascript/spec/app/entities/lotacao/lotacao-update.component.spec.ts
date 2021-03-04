import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MigriTestModule } from '../../../test.module';
import { LotacaoUpdateComponent } from 'app/entities/lotacao/lotacao-update.component';
import { LotacaoService } from 'app/entities/lotacao/lotacao.service';
import { Lotacao } from 'app/shared/model/lotacao.model';

describe('Component Tests', () => {
  describe('Lotacao Management Update Component', () => {
    let comp: LotacaoUpdateComponent;
    let fixture: ComponentFixture<LotacaoUpdateComponent>;
    let service: LotacaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MigriTestModule],
        declarations: [LotacaoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(LotacaoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LotacaoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LotacaoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Lotacao(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Lotacao();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
