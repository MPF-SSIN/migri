import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IQuestionario } from 'app/shared/model/questionario.model';

type EntityResponseType = HttpResponse<IQuestionario>;
type EntityArrayResponseType = HttpResponse<IQuestionario[]>;

@Injectable({ providedIn: 'root' })
export class QuestionarioService {
  public resourceUrl = SERVER_API_URL + 'api/questionarios';

  constructor(protected http: HttpClient) {}

  create(questionario: IQuestionario): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(questionario);
    return this.http
      .post<IQuestionario>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(questionario: IQuestionario): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(questionario);
    return this.http
      .put<IQuestionario>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IQuestionario>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IQuestionario[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(questionario: IQuestionario): IQuestionario {
    const copy: IQuestionario = Object.assign({}, questionario, {
      dataRealizacao:
        questionario.dataRealizacao && questionario.dataRealizacao.isValid() ? questionario.dataRealizacao.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataRealizacao = res.body.dataRealizacao ? moment(res.body.dataRealizacao) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((questionario: IQuestionario) => {
        questionario.dataRealizacao = questionario.dataRealizacao ? moment(questionario.dataRealizacao) : undefined;
      });
    }
    return res;
  }
}
