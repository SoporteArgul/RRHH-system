import EmpleadoModel from "../model/empleado.model";
import moment from "moment";
import jornadaComun from "../helpers/acumulador50"


//{jornada:{$elemMatch: { $elemMatch: { $elemMatch: { fecha: { $eq: fechaActual } } } } } }
export default async()=>{
  const fechaActual= moment().format('l').toString();
  const horaActual = moment().format('LTS')
  const horaActualDate = moment(horaActual, 'LTS').toDate();
  let jornadas=null
  
  const fechaInicio=new Date("2023-01-01");
  const fechaFin=new Date("2023-01-14");
  const resultado=await EmpleadoModel.aggregate([
    { $match: { "rotacion": "6x1" } },
    { $unwind: "$jornada" },
    { $unwind: "$jornada" },
    { $unwind: "$jornada" },
    { $match: { "jornada.fecha": { $gte: fechaInicio, $lte: fechaFin } } },
    {
      $group: {
        _id: "$_id",
        nombre: { $first: "$nombre" },
        apellido: { $first: "$apellido" },
        edad: { $first: "$edad" },
        legajo: { $first: "$legajo" },
        email: { $first: "$email" },
        liquidacion_mensual: { $first: "$liquidacion_mensual" },
        liquidacion_jornal: { $first: "$liquidacion_jornal" },
        rotacion: { $first: "$rotacion" },
        grupo: { $first: "$grupo" },
        jornada: { $push: "$jornada" }
      }
    },
    {
      $project: {
        _id: 1,
        nombre: 1,
        apellido: 1,
        edad: 1,
        legajo: 1,
        email: 1,
        liquidacion_mensual: 1,
        liquidacion_jornal: 1,
        jornada:1,
        rotacion: 1,
        grupo: 1,
        total_horas_trabajadas: 1
      }
    }
  ]).exec()
 const res=resultado.forEach((e)=>{
  //acumuladores de horas
  let acumulador_diurnas:number=0
  let acumulador_nocturnas:number=0
  let acumulador_diurnas_50:number=0
  let acumulador_nocturnas_50:number=0
  let acumulador_diurnas_100:number=0
  let acumulador_nocturnas_100:number=0
  e.jornada.forEach((n:any)=>{
    //entramos en cada casilla de la jornada
    const hora_entrada=moment(n.entrada).hours();
    const hora_salida=moment(n.salida).hours();
    const hora_entrada_extra=moment(n.entrada_horas_extra).hours();
    const hora_salida_extra=moment(n.salida_horas_extra).hours();
    const feriado=n.feriado;
    const habilitacion=n.habilitado_horas_extra;
    if (hora_salida && hora_entrada ){
      //verificamos que esten ambos y hacemos el calculo de diferencia de horas
      //jornada normal    
      if (hora_entrada==6 && hora_salida==14){
        if(feriado){
          acumulador_diurnas_100+=8
        }else{
          acumulador_diurnas+=8
        }  
      };
      if (hora_entrada==14 && hora_salida==22){
          acumulador_diurnas+=7
          acumulador_nocturnas+=1
      };
      if (hora_entrada==22 && hora_salida==6){
          if (feriado){
              acumulador_nocturnas+=2
              acumulador_nocturnas_100+=6
          }else{
            acumulador_nocturnas+=8
          }}; 
     };  
    
    //jornada extra, pueden ser 1,2,3 o 4 horas 
    //chequeamos si se le asignaron horas extra al empleado y si esas horas existen
    if (habilitacion && (hora_entrada_extra && hora_salida_extra)){
      //HORAS EXTRA DE 14 A 18
      if (hora_entrada_extra==14 && hora_salida_extra==15||16||17||18){
        //si es feriado las horas van a contar al 100
        if (feriado){
          if(hora_salida_extra==15){
            acumulador_diurnas_100+=1
          };
          if(hora_salida_extra==16){
            acumulador_diurnas_100+=2
          };
          if(hora_salida_extra==17){
            acumulador_diurnas_100+=3
          };
          if(hora_salida_extra==18){
            acumulador_diurnas_100+=4
          };
        }else{
          //si es un dia normal van a ser al 50
          if(hora_salida_extra==15){
            acumulador_diurnas_50+=1
          };
          if(hora_salida_extra==16){
            acumulador_diurnas_50+=2
          };
          if(hora_salida_extra==17){
            acumulador_diurnas_50+=3
          };
          if(hora_salida_extra==18){
            acumulador_diurnas_50+=4
          };
        }
      }
      //HORAS EXTRA DE 18 A 22
      if (hora_entrada_extra==18||19||20||21 && hora_salida_extra==6){
        if(feriado){
          if (hora_entrada_extra==18){
            acumulador_diurnas_100+=3
            acumulador_diurnas_100+=1
          }
          if (hora_entrada_extra==19){
            acumulador_diurnas_100+=2
            acumulador_nocturnas_100+=1
          }
          if (hora_entrada_extra==20){
            acumulador_diurnas_100+=1
            acumulador_nocturnas_100+=1
          }
          if (hora_entrada_extra==21){
            acumulador_nocturnas_100+=1
          }
        }else{
          if (hora_entrada_extra==18){
            acumulador_diurnas_50+=3
            acumulador_diurnas_50+=1
          }
          if (hora_entrada_extra==19){
            acumulador_diurnas_50+=2
            acumulador_nocturnas_50+=1
          }
          if (hora_entrada_extra==20){
            acumulador_diurnas_50+=1
            acumulador_nocturnas_50+=1
          }
          if (hora_entrada_extra==21){
            acumulador_nocturnas_50+=1
          }
        }
      }
      if (hora_entrada_extra==10||11||12||13 && hora_salida_extra==22){
        if(feriado){
          if(hora_entrada_extra==10){
            acumulador_diurnas_100+=4
          }
          if(hora_entrada_extra==11){
            acumulador_diurnas_100+=3
          }
          if(hora_entrada_extra==12){
            acumulador_diurnas_100+=2
          }
          if(hora_entrada_extra==13){
            acumulador_diurnas_100+=1
          }
        }else{
          if (hora_entrada_extra == 10) {
            acumulador_diurnas_50 += 4
          } 
          if (hora_entrada_extra == 10) {
            acumulador_diurnas_50 += 3
          } 
          if (hora_entrada_extra == 10) {
            acumulador_diurnas_50 += 2
          } 
          if (hora_entrada_extra == 10) {
            acumulador_diurnas_50 += 1
          }
        }
      }
    }

  
  
  })
  console.log(`user:${e.nombre}\nDIURNAS:${acumulador_diurnas}\nDIURNAS AL 50:${acumulador_diurnas_50}\nDIURNAS AL 100:${acumulador_diurnas_100}\nNOCTURNAS:${acumulador_nocturnas}\nNOCTURNAS AL 50:${acumulador_nocturnas_50}\nNOCTURNAS AL 100:${acumulador_nocturnas_100}`) 
 })









  // const empleado=await EmpleadoModel.find({_id:"6447bbce66ba51f0b7009d53"})
  // for (const emp of empleado) {
  //   for (const jornada of emp.jornada) {
  //     jornadas = jornada.flat().find((j) => moment(j.fecha).format('l') === fechaActual);
  //     if (jornadas) {
  //       console.log(jornadas)
  //       return jornadas; // retornar la jornada encontrada
  //     }
  //   }
  // }
  
  // return null; // si no se encuentra ninguna jornada, retornar null
}

   

