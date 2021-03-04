import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MigriTestModule } from '../../../test.module';
import { QuestionarioUpdateComponent } from 'app/entities/questionario/questionario-update.component';
import { QuestionarioService } from 'app/entities/questionario/questionario.service';
import { Questionario } from 'app/shared/model/questionario.model';

describe('Component Tests', () => {
  describe('Questionario Management Update Component', () => {
    let comp: QuestionarioUpdateComponent;
    let fixture: ComponentFixture<QuestionarioUpdateComponent>;
    let service: QuestionarioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MigriTestModule],
        declarations: [QuestionarioUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(QuestionarioUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(QuestionarioUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(QuestionarioService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Questionario(123);
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
        const entity = new Questionario();
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
