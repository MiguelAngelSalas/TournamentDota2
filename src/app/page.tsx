"use client"
import { use, useEffect, useState } from "react";
import { useHero } from "../hooks/useHero";
import {usePlayer} from "../hooks/usePlayer"
import { useMatches } from "../hooks/useMatches";
import LlaveIzquierda from "./components/LlavesIzquierda";
import { FullWidth } from "./components/FullWidht";

export default function Home() {

const {player, charge, errore, cargarPlayer} = usePlayer()
const {matches, irror, carga, cargarMatches} = useMatches()
const {hero, cargando, error, cargarHero} = useHero();

const [busqueda, setBusqueda] = useState("")
const [idPlayer, setIdPlayer] = useState("")
const [idMatches, setIdMatches] = useState<number | string>("")
const [idMatchesActualizado, setIdeMatchesActualizado] = useState<number | string |  undefined>(undefined)

useEffect(()=>{
  if (!idMatches) {
    setIdeMatchesActualizado(undefined)
    return 
  }
  const temporizador = setTimeout(()=>{
  setIdeMatchesActualizado(Number(idMatches))
}, 400)
return ()=>clearTimeout(temporizador)
}, [idMatches])
console.log(idMatches)



const heroesFiltrado = hero.filter((charFind)=>(
  charFind.name.toLowerCase().includes(busqueda.toLocaleLowerCase())
))
console.log(heroesFiltrado)
  return (
    <div>
      <h1>My Tournament Dota 2</h1>
      
      <FullWidth texto="Buscar partidas por ID" value={idMatches} change={(e:any)=>setIdMatches(e.target.value)} />
      <LlaveIzquierda value= {idMatchesActualizado}  />
  
    </div>
    
    
    
  );
  
}
