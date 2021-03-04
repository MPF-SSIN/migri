import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFator } from 'app/shared/model/fator.model';
import { FatorService } from './fator.service';

@Component({
  templateUrl: './fator-delete-dialog.component.html',
})
export class FatorDeleteDialogComponent {
  fator?: IFator;

  constructor(protected fatorService: FatorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fatorService.delete(id).subscribe(() => {
      this.eventManager.broadcast('fatorListModification');
      this.activeModal.close();
    });
  }
}
