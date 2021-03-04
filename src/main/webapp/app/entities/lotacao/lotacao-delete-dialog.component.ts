import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILotacao } from 'app/shared/model/lotacao.model';
import { LotacaoService } from './lotacao.service';

@Component({
  templateUrl: './lotacao-delete-dialog.component.html',
})
export class LotacaoDeleteDialogComponent {
  lotacao?: ILotacao;

  constructor(protected lotacaoService: LotacaoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.lotacaoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('lotacaoListModification');
      this.activeModal.close();
    });
  }
}
