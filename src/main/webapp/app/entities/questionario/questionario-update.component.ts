import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IQuestionario, Questionario } from 'app/shared/model/questionario.model';
import { QuestionarioService } from './questionario.service';
import { ILotacao } from 'app/shared/model/lotacao.model';
import { LotacaoService } from 'app/entities/lotacao/lotacao.service';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { PessoaService } from 'app/entities/pessoa/pessoa.service';

type SelectableEntity = ILotacao | IPessoa;

@Component({
  selector: 'jhi-questionario-update',
  templateUrl: './questionario-update.component.html',
})
export class QuestionarioUpdateComponent implements OnInit {
  isSaving = false;
  lotacaos: ILotacao[] = [];
  pessoas: IPessoa[] = [];
  dataRealizacaoDp: any;

  editForm = this.fb.group({
    id: [],
    identificacao: [],
    dataRealizacao: [],
    lotacao: [],
    pessoa: [],
  });

  constructor(
    protected questionarioService: QuestionarioService,
    protected lotacaoService: LotacaoService,
    protected pessoaService: PessoaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ questionario }) => {
      this.updateForm(questionario);

      this.lotacaoService.query().subscribe((res: HttpResponse<ILotacao[]>) => (this.lotacaos = res.body || []));

      this.pessoaService.query().subscribe((res: HttpResponse<IPessoa[]>) => (this.pessoas = res.body || []));
    });
  }

  updateForm(questionario: IQuestionario): void {
    this.editForm.patchValue({
      id: questionario.id,
      identificacao: questionario.identificacao,
      dataRealizacao: questionario.dataRealizacao,
      lotacao: questionario.lotacao,
      pessoa: questionario.pessoa,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const questionario = this.createFromForm();
    if (questionario.id !== undefined) {
      this.subscribeToSaveResponse(this.questionarioService.update(questionario));
    } else {
      this.subscribeToSaveResponse(this.questionarioService.create(questionario));
    }
  }

  private createFromForm(): IQuestionario {
    return {
      ...new Questionario(),
      id: this.editForm.get(['id'])!.value,
      identificacao: this.editForm.get(['identificacao'])!.value,
      dataRealizacao: this.editForm.get(['dataRealizacao'])!.value,
      lotacao: this.editForm.get(['lotacao'])!.value,
      pessoa: this.editForm.get(['pessoa'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuestionario>>): void {
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
