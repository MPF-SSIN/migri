import { IResposta } from 'app/shared/model/resposta.model';
import { IFator } from 'app/shared/model/fator.model';

export interface IQuestao {
  id?: number;
  tipo?: string;
  recomendacao?: string;
  pergunta?: string;
  multiplo?: boolean;
  respostas?: IResposta[];
  fator?: IFator;
}

export class Questao implements IQuestao {
  constructor(
    public id?: number,
    public tipo?: string,
    public recomendacao?: string,
    public pergunta?: string,
    public multiplo?: boolean,
    public respostas?: IResposta[],
    public fator?: IFator
  ) {
    this.multiplo = this.multiplo || false;
  }
}
