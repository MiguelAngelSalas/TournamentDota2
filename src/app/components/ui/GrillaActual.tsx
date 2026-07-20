import React from "react";
import { TournamentHistory } from "@/src/types";

interface Props {
  torneo: TournamentHistory;
  heroesDict: Record<number, string>;
}

export default function GrillaActual({ torneo, heroesDict }: Props) {
  if (!torneo) return null;

  return (
    <div style={{ marginTop: "20px", padding: "20px", overflowX: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        🏆 LLAVE DEL TORNEO #{torneo.numero} 🏆
      </h2>

      {/* Contenedor principal FLEX para poner todo en fila horizontal */}
      <div style={{ display: "flex", alignItems: "center", minWidth: "800px" }}>
        
        {torneo.etapas.map((etapa:any, index:any) => {
          const esClasificado = etapa.resultado === "Clasificado";
          const esEliminado = etapa.resultado === "Eliminado";
          
          // Colores dinámicos según cómo te fue
          let colorBorde = "gray";
          if (esClasificado) colorBorde = "green";
          if (esEliminado) colorBorde = "red";

          return (
            <React.Fragment key={index}>
              {/* LA CAJA DE LA ETAPA */}
              <div 
                style={{ 
                  border: `2px solid ${colorBorde}`, 
                  borderRadius: "8px",
                  padding: "15px",
                  minWidth: "150px",
                  textAlign: "center",
                  backgroundColor: esEliminado ? "#ffe6e6" : esClasificado ? "#e6ffe6" : "#f5f5f5"
                }}
              >
                <h4 style={{ margin: "0 0 10px 0", color: colorBorde }}>{etapa.etapa}</h4>
                <p style={{ margin: "5px 0", fontWeight: "bold" }}>{etapa.score}</p>
                
                {/* Héroes */}
                {etapa.useHeros && etapa.useHeros.length > 0 && (
                  <div style={{ fontSize: "0.8em", color: "#555", marginTop: "10px" }}>
                    {etapa.useHeros.map((id: any) => heroesDict[id] || "Desc.").join(", ")}
                  </div>
                )}
              </div>

              {/* LA LÍNEA CONECTORA (se dibuja siempre, menos después de la Final) */}
              {index < torneo.etapas.length - 1 && (
                <div 
                  style={{
                    height: "4px",
                    width: "40px",
                    backgroundColor: esClasificado ? "green" : "gray",
                    transition: "background-color 0.3s"
                  }}
                />
              )}
            </React.Fragment>
          );
        })}

        {/* LA COPA FINAL (Solo se ilumina si ganaste la final) */}
        <div style={{ marginLeft: "20px", textAlign: "center" }}>
          <div style={{ 
            fontSize: "40px", 
            opacity: torneo.estadoFinal.includes("Campeón") ? 1 : 0.3,
            filter: torneo.estadoFinal.includes("Campeón") ? "none" : "grayscale(100%)"
          }}>
            🏆
          </div>
        </div>

      </div>
      
      <p style={{ textAlign: "center", marginTop: "20px", fontWeight: "bold" }}>
        Estado: {torneo.estadoFinal}
      </p>
    </div>
  );
}