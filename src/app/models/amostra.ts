import { Exame } from './exame';
export interface Amostra {
    id?: number;
    nome: string;
    numeroDeRegistro: number;
    exames: Exame[];
  }