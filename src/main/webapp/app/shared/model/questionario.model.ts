import { Moment } from 'moment';
import { IFator } from 'app/shared/model/fator.model';
import { ILotacao } from 'app/shared/model/lotacao.model';
import { IPessoa } from 'app/shared/model/pessoa.model';

export interface IQuestionario {
  id?: number;
  identificacao?: string;
  dataRealizacao?: Moment;
  fatores?: IFator[];
  lotacao?: ILotacao;
  pessoa?: IPessoa;
}

export class Questionario implements IQuestionario {
  constructor(
    public id?: number,
    public identificacao?: string,
    public dataRealizacao?: Moment,
    public fatores?: IFator[],
    public lotacao?: ILotacao,
    public pessoa?: IPessoa
  ) {}
}
