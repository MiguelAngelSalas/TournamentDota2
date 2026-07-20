
import {Player} from "../types"

export const obtenerPlayer = async (account_id: string|number): Promise<Player[]>=>{
    try{
        const respuesta = await fetch(`https://api.opendota.com/api/players/${account_id}`)
        if (!respuesta){
            throw new Error("Error al traer los datos")
        }
        const datosCrudos = await respuesta.json()
        console.log(datosCrudos)
        const playerProcesado : Player= {
                rankTier: datosCrudos.rank_tier,
                mmr: datosCrudos.computed_mmr,
                profile: {id: datosCrudos.profile?.account_id, personaname: datosCrudos.profile?.personaname}
                
            };
            
            return [playerProcesado]
        }catch(error){
        console.error("Fallo en la peticion", error)
        return []
    }
}