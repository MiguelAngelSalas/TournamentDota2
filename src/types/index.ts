export interface Hero{
    id:number;
    name: string;
    attackType: string;
    atriPrimary: string;
}

export interface Player{
    rankTier : number;
    mmr: number;
    profile:{
        id: number;
        personaname: string;
    }
}

export interface idPlayer{
    value: string | number | undefined
}

export interface StageResult {
  etapa: string;
  resultado: "Clasificado" | "Eliminado" | "Pendiente";
  score: string;
  useHeros: number[],
}

export interface Matches{
    matchId : number;
    radiantWin: false;
    gameMode: number;
    heroId: number;
    playerSlot: number;
    siteMap: string;
    victoria : "Gano" | "Perdio";
}

export interface MartchTournament{
    id: number;
    ronda: number;
    rival: string;
    resultado?: "Gano"|"Perdio"|"Pendiente";
}

export interface TournamentHistory{
    numero: number;
    estadoFinal: string; 
    etapas: StageResult[];
}

export interface TournamentStage{
    name: string;
    requireWin: number;
    deleteLose: number;
}



