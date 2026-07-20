import { Matches } from "../types";
import { obtenerMatches } from "../services/matches";
import { useState } from "react";

export function useMatches(){
    const [matches, setMatches] = useState<Matches[]>([])
    const [irror, setIrror] = useState<string|null>(null)
    const [carga, setCarga] = useState(false)
    const [siteMap, setSiteMap] = useState<string|null>(null)
    

    const cargarMatches = async(idJugador: string)=>{
        try{
            setCarga(true)
            setIrror(null)
            const matchesObtenidos = await obtenerMatches(idJugador)
            setMatches(matchesObtenidos)
        }catch(error){
            setIrror("Hubo un error en el envio de datos")
        }finally{
            setCarga(false)
        }
    } 
    return {
        matches, irror, carga, cargarMatches
    }
}