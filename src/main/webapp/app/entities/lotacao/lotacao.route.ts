import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILotacao, Lotacao } from 'app/shared/model/lotacao.model';
import { LotacaoService } from './lotacao.service';
import { LotacaoComponent } from './lotacao.component';
import { LotacaoDetailComponent } from './lotacao-detail.component';
import { LotacaoUpdateComponent } from './lotacao-update.component';

@Injectable({ providedIn: 'root' })
export class LotacaoResolve implements Resolve<ILotacao> {
  constructor(private service: LotacaoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILotacao> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((lotacao: HttpResponse<Lotacao>) => {
          if (lotacao.body) {
            return of(lotacao.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Lotacao());
  }
}

export const lotacaoRoute: Routes = [
  {
    path: '',
    component: LotacaoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'migriApp.lotacao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LotacaoDetailComponent,
    resolve: {
      lotacao: LotacaoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'migriApp.lotacao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LotacaoUpdateComponent,
    resolve: {
      lotacao: LotacaoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'migriApp.lotacao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LotacaoUpdateComponent,
    resolve: {
      lotacao: LotacaoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'migriApp.lotacao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
