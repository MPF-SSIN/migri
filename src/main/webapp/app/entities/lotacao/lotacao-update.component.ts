import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILotacao, Lotacao } from 'app/shared/model/lotacao.model';
import { LotacaoService } from './lotacao.service';

@Component({
  selector: 'jhi-lotacao-update',
  templateUrl: './lotacao-update.component.html',
})
export class LotacaoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [],
    sigla: [],
    latitude: [],
    longitude: [],
  });

  constructor(protected lotacaoService: LotacaoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lotacao }) => {
      this.updateForm(lotacao);
    });
  }

  updateForm(lotacao: ILotacao): void {
    this.editForm.patchValue({
      id: lotacao.id,
      nome: lotacao.nome,
      sigla: lotacao.sigla,
      latitude: lotacao.latitude,
      longitude: lotacao.longitude,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const lotacao = this.createFromForm();
    if (lotacao.id !== undefined) {
      this.subscribeToSaveResponse(this.lotacaoService.update(lotacao));
    } else {
      this.subscribeToSaveResponse(this.lotacaoService.create(lotacao));
    }
  }

  private createFromForm(): ILotacao {
    return {
      ...new Lotacao(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      sigla: this.editForm.get(['sigla'])!.value,
      latitude: this.editForm.get(['latitude'])!.value,
      longitude: this.editForm.get(['longitude'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILotacao>>): void {
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
}
