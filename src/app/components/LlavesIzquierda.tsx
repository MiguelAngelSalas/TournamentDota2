import React, { useState, useEffect } from "react";
import { idPlayer, Matches, StageResult, TournamentHistory } from "@/src/types"; // Asegurate de tener TorneoHistorico acá
import { obtenerMatches } from "../../services/matches"; 
import { obtenerPersonajes } from "@/src/services/heroes";



// 1. IMPORTAMOS EL SUPER MOTOR DESDE TU OTRO ARCHIVO
import { procesarTodosLosTorneos } from "../../services/allTournament"; // <-- Cambiá esta ruta por la tuya
import GrillaActual from "./ui/GrillaActual";

export default function LlaveIzquierda({value}:idPlayer) {
  // Unificamos el estado: ahora guardamos directamente la lista de torneos
  const [torneos, setTorneos] = useState<TournamentHistory[]>([]);
  const [heroes, setHeroes] = useState<Record<number, string>>({});
  const [cargando, setCargando] = useState(true);
  
  // Estado para controlar qué torneo del historial está desplegado
  const [torneoDesplegado, setTorneoDesplegado] = useState<number | null>(null);
  console.log(value)

  useEffect(() => {
    if(!value){
      
      setCargando(false)
      return 
    }
    const procesarTorneo = async () => {
      setCargando(true);
      try {
        const [historialCompleto, listaHeroes] = await Promise.all([
          obtenerMatches(value), 
          obtenerPersonajes()
        ]);

        const diccionarioHeros: Record<number, string> = {};
        listaHeroes.forEach((heroe) => {
          diccionarioHeros[heroe.id] = heroe.name;
        });
        setHeroes(diccionarioHeros);

        // Usamos el historial tal cual lo tenías
        const historialCronologico = [...historialCompleto].reverse();
        
        // Magia: calculamos TODOS los torneos de una sola pasada
        const todosLosTorneos = procesarTodosLosTorneos(historialCronologico);
        
        setTimeout(() => {
          setTorneos(todosLosTorneos);
          setCargando(false);
        }, 600);

      } catch (error) {
        console.error("Error al procesar el torneo", error);
        setCargando(false);
      }
    };

    procesarTorneo();
  }, [value]);

  // --- VARIABLES DERIVADAS PARA LA UI ---
  const torneosGanados = torneos.filter(t => t.estadoFinal.includes("Campeón")).length;
  const torneosPerdidos = torneos.length - torneosGanados;
  
  // El torneo actual siempre es el último de la lista
  const torneoActual = torneos[torneos.length - 1];
  
  // Los pasados son todos menos el último, y los damos vuelta para ver el más reciente primero
  const historialPasado = torneos.slice(0, -1).reverse();

  return (
    <div>
      <h1>El Camino del Héroe</h1>
      
      {/* ESTADÍSTICAS GLOBALES */}
      <div>
        <span>🏆 Ganados: {torneosGanados}</span><br />
        <span>❌ Perdidos: {torneosPerdidos}</span>
      </div>
      <hr />

      {cargando ? (
        <p>SINCRONIZANDO HISTORIAL...</p>
      ) : (
        <div>
          {/* --- TORNEO ACTUAL --- */}
          <h2>TORNEO ACTUAL (# {torneoActual?.numero})</h2>
          <p>Estado general: {torneoActual?.estadoFinal}</p>
          <div>
              {torneoActual &&(<GrillaActual torneo= {torneoActual} heroesDict={heroes}/>)}
          </div>
          
          {torneoActual?.etapas.map((item: any, index: any) => (
            <div key={index}>
              <h3>{item.etapa}</h3>
              <ul>
                <li>Estado: {item.resultado}</li>
                <li>Score: {item.score}</li>
                {item.useHeros && item.useHeros.length > 0 && (
                  <li>
                    Heroes Jugados: {""}
                    {item.useHeros.map((idHeroe: any, i: any) => (
                      <span key={i}>
                        {heroes[idHeroe] || "desconocido"}
                        {i < item.useHeros.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </li>
                )}
              </ul>
              <hr />
              
            </div>
            
            
          ))}

          {/* --- HISTORIAL DE TORNEOS PASADOS --- */}
          {historialPasado.length > 0 && (
            <>
              <h2>HISTORIAL DE TORNEOS PASADOS</h2>
              {historialPasado.map((torneo) => (
                <div key={torneo.numero} style={{ marginBottom: "10px", border: "1px solid gray", padding: "10px" }}>
                  <div 
                    style={{ cursor: "pointer", display: "flex", justifyContent: "space-between" }}
                    onClick={() => setTorneoDesplegado(torneoDesplegado === torneo.numero ? null : torneo.numero)}
                  >
                    <strong>Torneo #{torneo.numero}</strong>
                    <span>{torneo.estadoFinal} {torneoDesplegado === torneo.numero ? "▲" : "▼"}</span>
                  </div>

                  {/* Si el torneo está desplegado, mostramos sus etapas */}
                  {torneoDesplegado === torneo.numero && (
                    <div style={{ marginTop: "10px" }}>
                      {torneo.etapas.map((etapa: any, idx: any) => (
                        <div key={idx} style={{ marginLeft: "15px", marginBottom: "10px" }}>
                          <p style={{ margin: "0", fontWeight: "bold" }}>{etapa.etapa}: {etapa.resultado} ({etapa.score})</p>
                          {etapa.useHeros && etapa.useHeros.length > 0 && (
                            <p style={{ margin: "0", fontSize: "0.9em", color: "gray" }}>
                              Héroes: {etapa.useHeros.map((id: any) => heroes[id] || "desc.").join(", ") }
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
        
      )}
      
    </div>
  );
}