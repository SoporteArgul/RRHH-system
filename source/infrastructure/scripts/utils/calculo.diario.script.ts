import EmpleadoModel from "../../model/empleado.model"
import moment from "moment"





export default async()=>{
    const empleado=await EmpleadoModel.find({rotacion:"6x1"})
    const fecha_ayer=moment().subtract(1,"days").format('l').toString();
    if (empleado){
        let jornadas=null
        for (const emp of empleado){            
            for (const jornada of emp.jornada) {
                jornadas = jornada.flat().find((j:any) => moment(j.fecha).format('l') === fecha_ayer);
            };
            const hora_entrada=moment(jornadas?.entrada).hours();
            const hora_salida=moment(jornadas?.salida).hours();
            const hora_entrada_extra=moment(jornadas?.entrada_horas_extra).hours();
            const hora_salida_extra=moment(jornadas?.salida_horas_extra).hours();
            const entrada_descanso=moment(jornadas?.entrada_descanso);
            const salida_descanso=moment(jornadas?.salida_descanso);
            if(jornadas){
                const diferencia=salida_descanso.diff(entrada_descanso,"minutes")
                //Turno mañana
                if (emp.turno=="mañana"){
                    //Calculo de la jornada normal
                    if(hora_entrada==6 && hora_salida==14){
                        if (jornadas.feriado)jornadas.horas_diurnas_100+=8  
                        else jornadas.horas_diurnas+=8
                    }               
                    //Calculo de las horas extra 
                    if (hora_entrada_extra==14 ){
                        if(jornadas?.feriado){
                            if(hora_salida_extra==15)jornadas.horas_diurnas_100+=1;
                            if(hora_salida_extra==16)jornadas.horas_diurnas_100+=2;
                            if(hora_salida_extra==17)jornadas.horas_diurnas_100+=3;
                            if(hora_salida_extra==18)jornadas.horas_diurnas_100+=4;
                        }else{
                            if(hora_salida_extra==15)jornadas.horas_diurnas_50+=1;
                            if(hora_salida_extra==16)jornadas.horas_diurnas_50+=2;
                            if(hora_salida_extra==17)jornadas.horas_diurnas_50+=3;
                            if(hora_salida_extra==18)jornadas.horas_diurnas_50+=4;
                        }       
                    }  
                }
                //Turno tarde
                if (emp.turno=="tarde"){
                    //Jornada comun
                    if (hora_entrada==14 && hora_salida==22){
                        if (jornadas.feriado)jornadas.horas_diurnas_100+=7,jornadas.horas_nocturnas_100+=1
                        else jornadas.horas_diurnas+=7,jornadas.horas_nocturnas+=1
                    }
                    //Jornada extra
                    if (hora_salida_extra==14 ){
                        if(jornadas?.feriado){
                            if(hora_entrada_extra==10)jornadas.horas_diurnas_100+=4;
                            if(hora_entrada_extra==11)jornadas.horas_diurnas_100+=3;
                            if(hora_entrada_extra==12)jornadas.horas_diurnas_100+=2;
                            if(hora_entrada_extra==13)jornadas.horas_diurnas_100+=1;
                        }else{
                            if(hora_entrada_extra==10)jornadas.horas_diurnas_50+=4;
                            if(hora_entrada_extra==11)jornadas.horas_diurnas_50+=3;
                            if(hora_entrada_extra==12)jornadas.horas_diurnas_50+=2;
                            if(hora_entrada_extra==13)jornadas.horas_diurnas_50+=1;
                        }       
                    }  
                }
                //Turno noche
                if (emp.turno=="noche"){
                    //Jornada comun
                    if (hora_entrada==22 && hora_salida==6){
                        if (jornadas.feriado)jornadas.horas_nocturnas_100+=6,jornadas.horas_nocturnas+=2
                        else jornadas.horas_nocturnas+=8
                    }
                    //Jornada extra
                    if (hora_salida_extra==22 ){
                        if(jornadas?.feriado){
                            if(hora_entrada_extra==18)jornadas.horas_diurnas_100+=4;
                            if(hora_entrada_extra==19)jornadas.horas_diurnas_100+=3;
                            if(hora_entrada_extra==20)jornadas.horas_diurnas_100+=2;
                            if(hora_entrada_extra==21)jornadas.horas_diurnas_100+=1;
                        }else{
                            if(hora_entrada_extra==18)jornadas.horas_diurnas_50+=4;
                            if(hora_entrada_extra==19)jornadas.horas_diurnas_50+=3;
                            if(hora_entrada_extra==20)jornadas.horas_diurnas_50+=2;
                            if(hora_entrada_extra==21)jornadas.horas_diurnas_50+=1;
                        }       
                    }  
                }
                //revisamos que haya 30 minutos de descanso, si se excedio va a aparecer en false
                if (diferencia<=30){
                    jornadas.descanso=true;
                }else{
                    jornadas.descanso=false;
                }

                emp.markModified("jornada")
                const resultado=await emp.save()   
                    
            }
            

        }
    }
    console.log("calculo diario de las horas realizado con exito")
    }