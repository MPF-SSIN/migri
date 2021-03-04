import { IQuestao } from 'app/shared/model/questao.model';
import { IQuestionario } from 'app/shared/model/questionario.model';

export interface IFator {
  id?: number;
  nome?: string;
  pontuacao?: number;
  questoes?: IQuestao[];
  questionario?: IQuestionario;
}

export class Fator implements IFator {
  constructor(
    public id?: number,
    public nome?: string,
    public pontuacao?: number,
    public questoes?: IQuestao[],
    public questionario?: IQuestionario
  ) {}
}
