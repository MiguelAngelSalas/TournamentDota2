import {Hero} from "../types"

export const obtenerPersonajes = async (): Promise<Hero[]>=>{
    try{
            const respuesta = await fetch("https://api.opendota.com/api/heroes");
            if (!respuesta){
                throw new Error("Error al traer los datos")
            }

            const datosCrudos = await respuesta.json()

            const personajeProcesado : Hero[]= datosCrudos.map((heroe:any)=>{
                return{
                    id: heroe.id,
                    name: heroe.localized_name,
                    attackType:heroe.attack_type,
                    atriPrimary: heroe.primary_attr,
                };
            });
            return personajeProcesado
    }catch(error){
        console.error("Hubo un problema con la conexion", error);
        return []
    }
}

