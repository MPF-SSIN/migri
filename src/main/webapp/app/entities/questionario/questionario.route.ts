import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IQuestionario, Questionario } from 'app/shared/model/questionario.model';
import { QuestionarioService } from './questionario.service';
import { QuestionarioComponent } from './questionario.component';
import { QuestionarioDetailComponent } from './questionario-detail.component';
import { QuestionarioUpdateComponent } from './questionario-update.component';

@Injectable({ providedIn: 'root' })
export class QuestionarioResolve implements Resolve<IQuestionario> {
  constructor(private service: QuestionarioService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IQuestionario> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((questionario: HttpResponse<Questionario>) => {
          if (questionario.body) {
            return of(questionario.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Questionario());
  }
}

export const questionarioRoute: Routes = [
  {
    path: '',
    component: QuestionarioComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'migriApp.questionario.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: QuestionarioDetailComponent,
    resolve: {
      questionario: QuestionarioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'migriApp.questionario.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: QuestionarioUpdateComponent,
    resolve: {
      questionario: QuestionarioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'migriApp.questionario.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: QuestionarioUpdateComponent,
    resolve: {
      questionario: QuestionarioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'migriApp.questionario.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
