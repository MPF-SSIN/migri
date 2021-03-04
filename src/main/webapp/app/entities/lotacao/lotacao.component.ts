import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILotacao } from 'app/shared/model/lotacao.model';
import { LotacaoService } from './lotacao.service';
import { LotacaoDeleteDialogComponent } from './lotacao-delete-dialog.component';

@Component({
  selector: 'jhi-lotacao',
  templateUrl: './lotacao.component.html',
})
export class LotacaoComponent implements OnInit, OnDestroy {
  lotacaos?: ILotacao[];
  eventSubscriber?: Subscription;

  constructor(protected lotacaoService: LotacaoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.lotacaoService.query().subscribe((res: HttpResponse<ILotacao[]>) => (this.lotacaos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLotacaos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILotacao): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLotacaos(): void {
    this.eventSubscriber = this.eventManager.subscribe('lotacaoListModification', () => this.loadAll());
  }

  delete(lotacao: ILotacao): void {
    const modalRef = this.modalService.open(LotacaoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.lotacao = lotacao;
  }
}
