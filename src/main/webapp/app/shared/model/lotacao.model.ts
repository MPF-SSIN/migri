export interface ILotacao {
  id?: number;
  nome?: string;
  sigla?: string;
  latitude?: number;
  longitude?: number;
}

export class Lotacao implements ILotacao {
  constructor(public id?: number, public nome?: string, public sigla?: string, public latitude?: number, public longitude?: number) {}
}
