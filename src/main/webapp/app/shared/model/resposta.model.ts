import { IQuestao } from 'app/shared/model/questao.model';

export interface IResposta {
  id?: number;
  texto?: string;
  score?: number;
  selecionado?: boolean;
  detalhes?: IResposta[];
  questao?: IQuestao;
  respostaPai?: IResposta;
}

export class Resposta implements IResposta {
  constructor(
    public id?: number,
    public texto?: string,
    public score?: number,
    public selecionado?: boolean,
    public detalhes?: IResposta[],
    public questao?: IQuestao,
    public respostaPai?: IResposta
  ) {
    this.selecionado = this.selecionado || false;
  }
}
