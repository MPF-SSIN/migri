import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IResposta, Resposta } from 'app/shared/model/resposta.model';
import { RespostaService } from './resposta.service';
import { IQuestao } from 'app/shared/model/questao.model';
import { QuestaoService } from 'app/entities/questao/questao.service';

type SelectableEntity = IQuestao | IResposta;

@Component({
  selector: 'jhi-resposta-update',
  templateUrl: './resposta-update.component.html',
})
export class RespostaUpdateComponent implements OnInit {
  isSaving = false;
  questaos: IQuestao[] = [];
  respostas: IResposta[] = [];

  editForm = this.fb.group({
    id: [],
    texto: [],
    score: [],
    selecionado: [],
    questao: [],
    resposta: [],
  });

  constructor(
    protected respostaService: RespostaService,
    protected questaoService: QuestaoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ resposta }) => {
      this.updateForm(resposta);

      this.questaoService.query().subscribe((res: HttpResponse<IQuestao[]>) => (this.questaos = res.body || []));

      this.respostaService.query().subscribe((res: HttpResponse<IResposta[]>) => (this.respostas = res.body || []));
    });
  }

  updateForm(resposta: IResposta): void {
    this.editForm.patchValue({
      id: resposta.id,
      texto: resposta.texto,
      score: resposta.score,
      selecionado: resposta.selecionado,
      questao: resposta.questao,
      resposta: resposta.resposta,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const resposta = this.createFromForm();
    if (resposta.id !== undefined) {
      this.subscribeToSaveResponse(this.respostaService.update(resposta));
    } else {
      this.subscribeToSaveResponse(this.respostaService.create(resposta));
    }
  }

  private createFromForm(): IResposta {
    return {
      ...new Resposta(),
      id: this.editForm.get(['id'])!.value,
      texto: this.editForm.get(['texto'])!.value,
      score: this.editForm.get(['score'])!.value,
      selecionado: this.editForm.get(['selecionado'])!.value,
      questao: this.editForm.get(['questao'])!.value,
      resposta: this.editForm.get(['resposta'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IResposta>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
