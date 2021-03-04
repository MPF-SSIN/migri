import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MigriTestModule } from '../../../test.module';
import { FatorUpdateComponent } from 'app/entities/fator/fator-update.component';
import { FatorService } from 'app/entities/fator/fator.service';
import { Fator } from 'app/shared/model/fator.model';

describe('Component Tests', () => {
  describe('Fator Management Update Component', () => {
    let comp: FatorUpdateComponent;
    let fixture: ComponentFixture<FatorUpdateComponent>;
    let service: FatorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MigriTestModule],
        declarations: [FatorUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(FatorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FatorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FatorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Fator(123);
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
        const entity = new Fator();
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
