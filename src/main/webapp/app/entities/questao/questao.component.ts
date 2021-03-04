import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IQuestao } from 'app/shared/model/questao.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { QuestaoService } from './questao.service';
import { QuestaoDeleteDialogComponent } from './questao-delete-dialog.component';

@Component({
  selector: 'jhi-questao',
  templateUrl: './questao.component.html',
})
export class QuestaoComponent implements OnInit, OnDestroy {
  questaos: IQuestao[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected questaoService: QuestaoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.questaos = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.questaoService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IQuestao[]>) => this.paginateQuestaos(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.questaos = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInQuestaos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IQuestao): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInQuestaos(): void {
    this.eventSubscriber = this.eventManager.subscribe('questaoListModification', () => this.reset());
  }

  delete(questao: IQuestao): void {
    const modalRef = this.modalService.open(QuestaoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.questao = questao;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateQuestaos(data: IQuestao[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.questaos.push(data[i]);
      }
    }
  }
}
