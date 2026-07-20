import { obtenerPersonajes } from "../services/heroes"
export const HEROES_DOTA = obtenerPersonajes()

console.log(HEROES_DOTA)