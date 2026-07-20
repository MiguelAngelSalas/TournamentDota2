"use client"
import {Hero} from "../types"
import { useState } from "react"
import { obtenerPersonajes } from "../services/heroes"    

export function useHero(){
    const [hero, setHero] = useState<Hero[]>([])
    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const cargarHero = async()=>{
        try{
            setCargando(true)
            setError(null)
            const heroes = await obtenerPersonajes();
            setHero(heroes);
        }catch(error){
            setError("Hubo un error al conectar con la taberna de heroes");
        }finally{
            setCargando(false);
        }
    };
    return {
        hero, cargando, error, cargarHero
    }
}