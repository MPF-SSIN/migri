import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFator, Fator } from 'app/shared/model/fator.model';
import { FatorService } from './fator.service';
import { IQuestionario } from 'app/shared/model/questionario.model';
import { QuestionarioService } from 'app/entities/questionario/questionario.service';

@Component({
  selector: 'jhi-fator-update',
  templateUrl: './fator-update.component.html',
})
export class FatorUpdateComponent implements OnInit {
  isSaving = false;
  questionarios: IQuestionario[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    pontuacao: [],
    questionario: [],
  });

  constructor(
    protected fatorService: FatorService,
    protected questionarioService: QuestionarioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fator }) => {
      this.updateForm(fator);

      this.questionarioService.query().subscribe((res: HttpResponse<IQuestionario[]>) => (this.questionarios = res.body || []));
    });
  }

  updateForm(fator: IFator): void {
    this.editForm.patchValue({
      id: fator.id,
      nome: fator.nome,
      pontuacao: fator.pontuacao,
      questionario: fator.questionario,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fator = this.createFromForm();
    if (fator.id !== undefined) {
      this.subscribeToSaveResponse(this.fatorService.update(fator));
    } else {
      this.subscribeToSaveResponse(this.fatorService.create(fator));
    }
  }

  private createFromForm(): IFator {
    return {
      ...new Fator(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      pontuacao: this.editForm.get(['pontuacao'])!.value,
      questionario: this.editForm.get(['questionario'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFator>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IQuestionario): any {
    return item.id;
  }
}
