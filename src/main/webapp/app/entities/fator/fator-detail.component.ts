import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFator } from 'app/shared/model/fator.model';

@Component({
  selector: 'jhi-fator-detail',
  templateUrl: './fator-detail.component.html',
})
export class FatorDetailComponent implements OnInit {
  fator: IFator | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fator }) => (this.fator = fator));
  }

  previousState(): void {
    window.history.back();
  }
}
