import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFator } from 'app/shared/model/fator.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { FatorService } from './fator.service';
import { FatorDeleteDialogComponent } from './fator-delete-dialog.component';

@Component({
  selector: 'jhi-fator',
  templateUrl: './fator.component.html',
})
export class FatorComponent implements OnInit, OnDestroy {
  fators: IFator[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected fatorService: FatorService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.fators = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.fatorService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IFator[]>) => this.paginateFators(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.fators = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFators();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFator): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFators(): void {
    this.eventSubscriber = this.eventManager.subscribe('fatorListModification', () => this.reset());
  }

  delete(fator: IFator): void {
    const modalRef = this.modalService.open(FatorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.fator = fator;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateFators(data: IFator[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.fators.push(data[i]);
      }
    }
  }
}
