export type LotofacilLatestProps = {
  acumulou: boolean;
  concurso: number;
  data: string;
  dezenas: string[];
  dataProximoConcurso: string;
  localGanhadores: LocalGanhadores[];
  premiacoes: Premiacao[];
  valorEstimadoProximoConcurso: number;
}

interface LocalGanhadores {
  ganhadores: number;
  municipio: string;
  uf: string;
}

interface Premiacao {
  descricao: string
  ganhadores: number
  valorPremio: number
}