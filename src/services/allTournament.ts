import { TournamentHistory } from "../types";
import { Matches } from "../types";
import { StageResult } from "../types";
import { TournamentStage } from "../types";

const reglasTorneo: TournamentStage[] = [
  { name: "Fase de Grupos", requireWin: 2, deleteLose: 2 , },
  { name: "Octavos de Final", requireWin: 2, deleteLose: 2 },
  { name: "Cuartos de Final", requireWin: 2, deleteLose: 2 },
  { name: "Semifinal", requireWin: 2, deleteLose: 2 },
  { name: "Final", requireWin: 3, deleteLose: 3 } // Mejor de 5
];

export const procesarTodosLosTorneos = (historialCompleto: Matches[]): TournamentHistory[] => {
  let indiceGlobal = 0;
  let numeroTorneo = 1;
  const historialDeTorneos: TournamentHistory[] = [];

  while (indiceGlobal < historialCompleto.length) {
    let torneoFinalizado = false;
    let estadoDelTorneo = "Campeón 🏆"; // Asumimos la victoria hasta que se demuestre lo contrario
    const etapasCompletadas: StageResult[] = [];

    for (const etapa of reglasTorneo) {
      if (torneoFinalizado) {
        etapasCompletadas.push({ etapa: etapa.name, resultado: "Pendiente", score: "-", useHeros: [] });
        continue;
      }

      let victorias = 0;
      let derrotas = 0;
      const heroesDeEstaEtapa: number[] = [];

      while (victorias < etapa.requireWin && derrotas < etapa.deleteLose) {
        if (indiceGlobal >= historialCompleto.length) break;

        const partidaActual = historialCompleto[indiceGlobal];
        heroesDeEstaEtapa.push(partidaActual.heroId);

        if (partidaActual.victoria === "Gano") victorias++;
        else derrotas++;
        
        indiceGlobal++;
      }

      const pasoDeRonda = victorias === etapa.requireWin;
      const eliminadoAhora = derrotas === etapa.deleteLose;

      etapasCompletadas.push({
        etapa: etapa.name,
        resultado: pasoDeRonda ? "Clasificado" : (eliminadoAhora ? "Eliminado" : "Pendiente"),
        score: `${victorias} - ${derrotas}`,
        useHeros: heroesDeEstaEtapa
      });

      if (!pasoDeRonda) {
        torneoFinalizado = true;
        if (eliminadoAhora) {
          estadoDelTorneo = `Eliminado en ${etapa.name} ❌`;
        } else {
          estadoDelTorneo = "Torneo en curso ⏳";
        }
      }
    }

    // Evitamos guardar un torneo fantasma si el historial se quedó sin partidas justo al arrancar uno nuevo
    if (etapasCompletadas[0].useHeros.length === 0) break;

    historialDeTorneos.push({
      numero: numeroTorneo,
      estadoFinal: estadoDelTorneo,
      etapas: etapasCompletadas
    });

    numeroTorneo++;
  }

  return historialDeTorneos;
};