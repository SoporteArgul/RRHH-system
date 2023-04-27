export default async (grupo:string,jornada:Date,turno:string,hora:Date,h:any)=>{
     if (grupo=="A"&& jornada==null){
        if (turno =="mañana"&& h>="05:00:00" && h<="06:05:00"){
            jornada=hora
        }
        if (turno =="tarde"&& h>="13:00:00" && h<="14:05:00"){
            jornada=hora
        }
        if (turno =="noche"&& h>="21:00:00"&& h<="22:05:00"){
            jornada=hora
        }
        };
}