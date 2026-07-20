import { TournamentStage } from "@/src/types";
import { Matches } from "@/src/types";
import { obtenerMatches } from "../../services/matches";


const reglasTorneo: TournamentStage[] = [
  { name: "Fase de Grupos", requireWin: 2, deleteLose: 2 }, // 3 de 3 (Si perdés 1, chau)
  { name: "Octavos de Final", requireWin: 2, deleteLose: 2 }, // Mejor de 3 (Bo3)
  { name: "Cuartos de Final", requireWin: 2, deleteLose: 2 }, // Mejor de 3 (Bo3)
  { name: "Semifinal", requireWin: 2, deleteLose: 2 },      // Mejor de 3 (Bo3)
  { name: "Final", requireWin: 3, deleteLose: 3 }         // Mejor de 5 (Bo5)
];



export const calcularTorneo = (partidas:Matches[])=>{
    let indicePartida = 0;
    let torneoFinalizado = false;
    let etapasCompletas = []

    for (const etapa of reglasTorneo){
        if(torneoFinalizado) break;

        let victorias = 0
        let derrotas = 0
        let partidasDeEstaEtapa = []

        while (victorias <etapa.requireWin && derrotas<etapa.deleteLose){
            if (indicePartida>= partidas.length){
                torneoFinalizado = true;
                break;
            }
            const partidasActual = partidas[indicePartida];
            partidasDeEstaEtapa.push(partidasActual);

            if (partidasActual.victoria === "Gano"){
                victorias++;
            }else{
                derrotas++;
            }
            indicePartida++;
        }

        const pasoDeRonda = victorias === etapa.requireWin

        etapasCompletas.push({
            etapa: etapa.name,
            historial: partidasDeEstaEtapa,
            resultado: pasoDeRonda? "Clasificado": "Eliminado",
            score: `${victorias} - ${derrotas}`
        });

        if(!pasoDeRonda) {
            torneoFinalizado= true
        }
    }
    return etapasCompletas
}