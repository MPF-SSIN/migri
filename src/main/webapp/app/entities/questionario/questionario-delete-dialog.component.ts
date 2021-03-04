import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQuestionario } from 'app/shared/model/questionario.model';
import { QuestionarioService } from './questionario.service';

@Component({
  templateUrl: './questionario-delete-dialog.component.html',
})
export class QuestionarioDeleteDialogComponent {
  questionario?: IQuestionario;

  constructor(
    protected questionarioService: QuestionarioService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.questionarioService.delete(id).subscribe(() => {
      this.eventManager.broadcast('questionarioListModification');
      this.activeModal.close();
    });
  }
}
