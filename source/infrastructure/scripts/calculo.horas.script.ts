import EmpleadoModel from "../model/empleado.model";
import moment from "moment";
import jornadaComun from "../helpers/acumulador50"
import jornadaExtra1 from "../helpers/acumulador50"

export default async()=>{
    try{
      const empleado=await EmpleadoModel.find({rotacion:"6x1"})
      if (empleado){
        empleado.forEach((e)=>{
          //recorremos cada empleado
          //inicializamos un acumulador para el total de horas por cada empleado
          let acumulador:number=0
          let acumulador_diurnas:number=0
          let acumulador_nocturnas:number=0
          let acumulador_diurnas_50:number=0
          let acumulador_nocturnas_50:number=0
          let acumulador_diurnas_100:number=0
          let acumulador_nocturnas_100:number=0
          e.jornada.forEach((j)=>{
            //accedemos al Array jornada y a sus objetos
            //convertimos la hora de entrada y salida en datos de tipo moment
            const hora_entrada=moment(j.entrada);
            const hora_salida=moment(j.salida);
            //TURNOS: 6 a 14, 14 a 22, 22 a 6
            if (hora_salida && hora_entrada ){
              //verificamos que esten ambos y hacemos el calculo de diferencia de horas
              const duracion_horas= moment.duration(hora_salida.diff(hora_entrada)).asHours();
              acumulador=acumulador + duracion_horas
              //jornada normal        
              if (hora_entrada.hours()==6 && hora_salida.hours()==14){
                if(j.feriado){
                  acumulador_diurnas_100+=8
                }else{
                  acumulador_diurnas+=8
                }  
              };
              if (hora_entrada.hours()==14 && hora_salida.hours()==22){
                  acumulador_diurnas+=7
                  acumulador_nocturnas+=1
              };
              if (hora_entrada.hours()==22 && hora_salida.hours()==6){
                  if (j.feriado){
                      acumulador_nocturnas+=2
                      acumulador_nocturnas_100+=6
                  }else{
                    acumulador_nocturnas+=8
                  }}; 
             };  
            //jornada extra, pueden ser 1,2,3 o 4 horas 
            const hora_entrada_extra=moment(j.entrada_horas_extra)
            const hora_salida_extra=moment(j.salida_horas_extra)
            //chequeamos si se le asignaron horas extra al empleado y si esas horas existen
            if (j.habilitado_horas_extra && (hora_entrada_extra && hora_salida_extra)){
              const duracion_horas_extra= moment.duration(hora_salida_extra.diff(hora_entrada_extra)).asHours();
              //HORAS EXTRA DE 14 A 18
              
              if (hora_entrada_extra.hours()==14 && hora_salida_extra.hours()==15||16||17||18){
                //si es feriado las horas van a contar al 100
                if (j.feriado){
                  if(hora_salida_extra.hours()==15){
                    acumulador_diurnas_100+=1
                  };
                  if(hora_salida_extra.hours()==16){
                    acumulador_diurnas_100+=2
                  };
                  if(hora_salida_extra.hours()==17){
                    acumulador_diurnas_100+=3
                  };
                  if(hora_salida_extra.hours()==18){
                    acumulador_diurnas_100+=4
                  };
                }else{
                  //si es un dia normal van a ser al 50
                  if(hora_salida_extra.hours()==15){
                    acumulador_diurnas_50+=1
                  };
                  if(hora_salida_extra.hours()==16){
                    acumulador_diurnas_50+=2
                  };
                  if(hora_salida_extra.hours()==17){
                    acumulador_diurnas_50+=3
                  };
                  if(hora_salida_extra.hours()==18){
                    acumulador_diurnas_50+=4
                  };
                }
              }
              //HORAS EXTRA DE 18 A 22
              if (hora_entrada_extra.hours()==18||19||20||21 && hora_salida_extra.hours()==6){
                if(j.feriado){
                  if (hora_entrada_extra.hours()==18){
                    acumulador_diurnas_100+=3
                    acumulador_diurnas_100+=1
                  }
                  if (hora_entrada_extra.hours()==19){
                    acumulador_diurnas_100+=2
                    acumulador_nocturnas_100+=1
                  }
                  if (hora_entrada_extra.hours()==20){
                    acumulador_diurnas_100+=1
                    acumulador_nocturnas_100+=1
                  }
                  if (hora_entrada_extra.hours()==21){
                    acumulador_nocturnas_100+=1
                  }
                }else{
                  if (hora_entrada_extra.hours()==18){
                    acumulador_diurnas_50+=3
                    acumulador_diurnas_50+=1
                  }
                  if (hora_entrada_extra.hours()==19){
                    acumulador_diurnas_50+=2
                    acumulador_nocturnas_50+=1
                  }
                  if (hora_entrada_extra.hours()==20){
                    acumulador_diurnas_50+=1
                    acumulador_nocturnas_50+=1
                  }
                  if (hora_entrada_extra.hours()==21){
                    acumulador_nocturnas_50+=1
                  }
                }
              }
              if (hora_entrada_extra.hours()==10||11||12||13 && hora_salida_extra.hours()==22){
                if(j.feriado){
                  if(hora_entrada_extra.hours()==10){
                    acumulador_diurnas_100+=4
                  }
                  if(hora_entrada_extra.hours()==11){
                    acumulador_diurnas_100+=3
                  }
                  if(hora_entrada_extra.hours()==12){
                    acumulador_diurnas_100+=2
                  }
                  if(hora_entrada_extra.hours()==13){
                    acumulador_diurnas_100+=1
                  }
                }else{
                  if (hora_entrada_extra.hours() == 10) {
                    acumulador_diurnas_50 += 4
                  } 
                  if (hora_entrada_extra.hours() == 10) {
                    acumulador_diurnas_50 += 3
                  } 
                  if (hora_entrada_extra.hours() == 10) {
                    acumulador_diurnas_50 += 2
                  } 
                  if (hora_entrada_extra.hours() == 10) {
                    acumulador_diurnas_50 += 1
                  }
                }
              }
            }
          });
          console.log(`user:${e.nombre}\nDIURNAS:${acumulador_diurnas}\nDIURNAS AL 50:${acumulador_diurnas_50}\nDIURNAS AL 100:${acumulador_diurnas_100}\nNOCTURNAS:${acumulador_nocturnas}\nNOCTURNAS AL 50:${acumulador_nocturnas_50}\nNOCTURNAS AL 100:${acumulador_nocturnas_100}`)})
      }
    }catch(e){


    }

}