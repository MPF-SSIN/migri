import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IQuestao, Questao } from 'app/shared/model/questao.model';
import { QuestaoService } from './questao.service';
import { IFator } from 'app/shared/model/fator.model';
import { FatorService } from 'app/entities/fator/fator.service';

@Component({
  selector: 'jhi-questao-update',
  templateUrl: './questao-update.component.html',
})
export class QuestaoUpdateComponent implements OnInit {
  isSaving = false;
  fators: IFator[] = [];

  editForm = this.fb.group({
    id: [],
    tipo: [],
    recomendacao: [],
    pergunta: [],
    multiplo: [],
    fator: [],
  });

  constructor(
    protected questaoService: QuestaoService,
    protected fatorService: FatorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ questao }) => {
      this.updateForm(questao);

      this.fatorService.query().subscribe((res: HttpResponse<IFator[]>) => (this.fators = res.body || []));
    });
  }

  updateForm(questao: IQuestao): void {
    this.editForm.patchValue({
      id: questao.id,
      tipo: questao.tipo,
      recomendacao: questao.recomendacao,
      pergunta: questao.pergunta,
      multiplo: questao.multiplo,
      fator: questao.fator,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const questao = this.createFromForm();
    if (questao.id !== undefined) {
      this.subscribeToSaveResponse(this.questaoService.update(questao));
    } else {
      this.subscribeToSaveResponse(this.questaoService.create(questao));
    }
  }

  private createFromForm(): IQuestao {
    return {
      ...new Questao(),
      id: this.editForm.get(['id'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      recomendacao: this.editForm.get(['recomendacao'])!.value,
      pergunta: this.editForm.get(['pergunta'])!.value,
      multiplo: this.editForm.get(['multiplo'])!.value,
      fator: this.editForm.get(['fator'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuestao>>): void {
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

  trackById(index: number, item: IFator): any {
    return item.id;
  }
}
