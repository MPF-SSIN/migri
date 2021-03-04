import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILotacao } from 'app/shared/model/lotacao.model';

@Component({
  selector: 'jhi-lotacao-detail',
  templateUrl: './lotacao-detail.component.html',
})
export class LotacaoDetailComponent implements OnInit {
  lotacao: ILotacao | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lotacao }) => (this.lotacao = lotacao));
  }

  previousState(): void {
    window.history.back();
  }
}
