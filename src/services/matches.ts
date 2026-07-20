import { Matches } from "../types";

export const obtenerMatches = async(account_id: string|number): Promise<Matches[]>=>{
    try{
        const con = await fetch(`https://api.opendota.com/api/players/${account_id}/matches`)
        if(!con.ok){
            throw new Error("Hubo un error con la conexion de Dota")
        }
        const matchesFind = await con.json()
        console.log(matchesFind)
        
        const matchesProcess: Matches []=matchesFind.map((partidaCruda: any)=>{
            let victoria = ""
            if (partidaCruda.player_slot<=127){
                partidaCruda.player_slot = "Radiant"
            } else{
                partidaCruda.player_slot= "Dire"
            }
            
            if(partidaCruda.player_slot === "Radiant" && partidaCruda.radiant_win){
                victoria = "Gano"
            }else if (partidaCruda.player_slot === "Dire" && !partidaCruda.radiant_win){
                victoria= "Gano"
            }else{
                victoria="Perdio"
            }
            return {
                matchId : partidaCruda.match_id,
                radiantWin: partidaCruda.radiant_win,
                gameMode: partidaCruda.game_mode,
                heroId: partidaCruda.hero_id,
                playerSlot: partidaCruda.player_slot,
                victoria : victoria,
            }
        })
        console.log(matchesProcess)
        return matchesProcess;

    }catch(error){
        console.error("Error al obtener partidas", error)
        return []
    }

}