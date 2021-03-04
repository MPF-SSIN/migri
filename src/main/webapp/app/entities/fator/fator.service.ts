import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFator } from 'app/shared/model/fator.model';

type EntityResponseType = HttpResponse<IFator>;
type EntityArrayResponseType = HttpResponse<IFator[]>;

@Injectable({ providedIn: 'root' })
export class FatorService {
  public resourceUrl = SERVER_API_URL + 'api/fators';

  constructor(protected http: HttpClient) {}

  create(fator: IFator): Observable<EntityResponseType> {
    return this.http.post<IFator>(this.resourceUrl, fator, { observe: 'response' });
  }

  update(fator: IFator): Observable<EntityResponseType> {
    return this.http.put<IFator>(this.resourceUrl, fator, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFator>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFator[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
