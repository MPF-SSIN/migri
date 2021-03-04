import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQuestionario } from 'app/shared/model/questionario.model';

@Component({
  selector: 'jhi-questionario-detail',
  templateUrl: './questionario-detail.component.html',
})
export class QuestionarioDetailComponent implements OnInit {
  questionario: IQuestionario | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ questionario }) => (this.questionario = questionario));
  }

  previousState(): void {
    window.history.back();
  }
}
