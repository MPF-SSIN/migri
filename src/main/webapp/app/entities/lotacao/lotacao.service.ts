import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILotacao } from 'app/shared/model/lotacao.model';

type EntityResponseType = HttpResponse<ILotacao>;
type EntityArrayResponseType = HttpResponse<ILotacao[]>;

@Injectable({ providedIn: 'root' })
export class LotacaoService {
  public resourceUrl = SERVER_API_URL + 'api/lotacaos';

  constructor(protected http: HttpClient) {}

  create(lotacao: ILotacao): Observable<EntityResponseType> {
    return this.http.post<ILotacao>(this.resourceUrl, lotacao, { observe: 'response' });
  }

  update(lotacao: ILotacao): Observable<EntityResponseType> {
    return this.http.put<ILotacao>(this.resourceUrl, lotacao, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILotacao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILotacao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
