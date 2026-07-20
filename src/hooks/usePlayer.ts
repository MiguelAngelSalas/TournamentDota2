import { Player } from "../types";
import { useState} from "react";
import {obtenerPlayer} from "../services/player"

export function usePlayer(){
    const [player, setPlayer] = useState<Player[]>([])
    const [charge, setCharge] = useState(false)
    const [errore, setErrore] = useState<string | null>(null)
    
    const cargarPlayer= async(idJugador: string)=>{
        try{
            setCharge(true)
            setErrore(null)
            const players = await obtenerPlayer(idJugador);
            console.log(players)
            setPlayer(players)
        }catch(error){
            setErrore("Hubo un error al cargar Player")
        }finally{
            setCharge(false)
        }
    };
    return {
        player, charge, errore, cargarPlayer
    }
}