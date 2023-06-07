import { EmpleadoRepository } from "../../domain/empleado/empleado.repository";

const ERROR="Disculpe, no se pudo realizar la fichada, hablar con su supervisor o recursos humanos para una carga manual, muchas gracias!"
export class Clock{
    constructor(private readonly empleado:EmpleadoRepository){}
    //chequeamos si es una entrada o una salida
    public async entrada(empleado:any,jornada:any,horaActual:Date):Promise<any>{
        try{

            let entrada=jornada.entrada;
            let salida=jornada.salidas;
            const habilitado=jornada.habilitado_horas_extra;
            if (!habilitado){
                if(entrada==null && salida==null){
                    console.log("entrada")
                    jornada.entrada=horaActual;
                    const msg="Entrada registrada con exito!";
                    const resultado=await this.empleado.saveChangesJornada(empleado,jornada,msg);
                    return resultado;
                    };
            }else if (entrada==null && salida==null){
                console.log("entrada")
                jornada.entrada=horaActual;
                const msg="Entrada registrada con exito!";
                const resultado=await this.empleado.saveChangesJornada(empleado,jornada,msg);
                return resultado;
            };
        }catch(e){
            return ERROR
        }
    }
    public async salida(empleado:any,jornada:any,horaActual:Date):Promise<any>{
        try{
            let entrada=jornada.entrada;
            let salida=jornada.salida;
            let salida_descanso=jornada.salida_descanso;
                if(entrada&&salida_descanso&&salida==null){
                    jornada.salida=horaActual;
                    const msg="Salida registrada con exito!";
                    const resultado=await this.empleado.saveChangesJornada(empleado,jornada,msg);
                    return resultado;
                }
        }catch(e){
            return ERROR;
        }
    }
    //Calculamos las horas de diferencia para ver si califica para el descanso
    public async descanso(empleado:any,jornada:any,horaActual:Date){
        try{
            let entrada=jornada.entrada;
            let salida=jornada.salida;
            let entrada_descanso=jornada.entrada_descanso;
            let salida_descanso=jornada.salida_descanso;
            if (entrada && salida==null && entrada_descanso==null && salida_descanso==null){
                console.log("entrada descanso")
                jornada.entrada_descanso=horaActual;
                const msg="Entrada al descanso registrado con exito!";
                const resultado=await this.empleado.saveChangesJornada(empleado,jornada,msg);
                return resultado;
            }
            if (entrada &&  entrada_descanso && salida==null && salida_descanso==null ){
                console.log("salida descanso")
                jornada.salida_descanso=horaActual;
                const msg="Salida del descanso registrada con exito!";
                const resultado=await this.empleado.saveChangesJornada(empleado,jornada,msg);
                return resultado;
            }

        }catch(e){
            return ERROR
        }
    }
    //Calculamos para ver si califica para realizar horas extra
    public async horasExtra(empleado:any,jornada:any,horaActual:Date){
        try{
            const habilitado=jornada.habilitado_horas_extra;
            let entrada=jornada.entrada;
            let salida=jornada.salida;
            let entrada_horas_extra=jornada.entrada_horas_extra;
            let salida_horas_extra=jornada.salida_horas_extra;
            if (habilitado){
                if(entrada==null && entrada_horas_extra==null){
                    console.log("entrada horas extra")
                    jornada.entrada_horas_extra=horaActual;
                    const msg="Entrada horas extra realizada con exito!";
                    const resultado=await this.empleado.saveChangesJornada(empleado,jornada,msg);
                    return resultado;
                }
                if(entrada==null && entrada_horas_extra && salida_horas_extra==null){
                    console.log("salida horas extra")
                    jornada.salida_horas_extra=horaActual;
                    const msg="Salida horas extra realizada con exito!";
                    const resultado=await this.empleado.saveChangesJornada(empleado,jornada,msg);
                    return resultado;
                }
                if(entrada && salida&&entrada_horas_extra==null){
                    console.log("entrada horas extra 2")
                    jornada.entrada_horas_extra=horaActual;
                    const msg="Entrada horas extra realizada con exito!";
                    const resultado=await this.empleado.saveChangesJornada(empleado,jornada,msg);
                    return resultado;
                }
                if(entrada && salida && entrada_horas_extra){
                    console.log("salida horas extra 2")
                    jornada.salida_horas_extra=horaActual
                    const msg="Salida horas extra realizada con exito!";
                    const resultado=await this.empleado.saveChangesJornada(empleado,jornada,msg);
                    return resultado;
                }
            }        
        }catch(e){
            return ERROR
        }
    }
}







// try{
//     const MOMENTO=["Mañana","Tarde","Noche"];
//     const fechaActual=moment().format("YYYY-MM-DD").toString();
//     // const horaActual = new Date().toLocaleTimeString('es-AR', { hour12: false });
//     const horaActual="14:01:00"
//     const horaActualDate = moment(horaActual, 'LTS').toDate();
//     let jornadas=null
//     const empleado=await this.empleadoRepository.findByLegajo(empleadoId) //buscamos el empleado que queremos modificar
//     if (empleado) {



//         //verificamos que este el empleado
//         jornadas=buscarFecha(empleado.jornada,fechaActual)
//         if (jornadas && jornadas.suspendido==false && empleado.activo==true ){
//         //ENTRADA
//         if (jornadas.entrada==null && !jornadas.habilitado_horas_extra){
//             if (empleado.turno ==MOMENTO[0] && (horaActual>="05:00:00" && horaActual<="06:45:00")){  
//                 jornadas.entrada=horaActualDate
//                 const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
//                 return resultado;
//             }
//             if (empleado.turno ==MOMENTO[1]&& (horaActual>="13:00:00" && horaActual<="14:45:00")){
//                 jornadas.entrada=horaActualDate
//                 const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
//                 return resultado;
//             }
//             if (empleado.turno==MOMENTO[2]&& (horaActual>="21:00:00"&& horaActual<="22:45:00")){
//                 jornadas.entrada=horaActualDate
//                 const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
//                 return resultado;
//             }
//         }else{
//             if(jornadas.entrada==null && jornadas.habilitado_horas_extra && jornadas.salida_horas_extra){
//                 if (empleado.turno ==MOMENTO[0] && (horaActual>="05:00:00" && horaActual<="06:45:00")){ 
//                     jornadas.entrada=horaActualDate
//                     const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
//                     return resultado;
//                 }
//                 if (empleado.turno ==MOMENTO[1]&& (horaActual>="13:00:00" && horaActual<="14:45:00")){
//                     jornadas.entrada=horaActualDate;
//                     const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
//                     return resultado;
//                 }
//                 if (empleado.turno ==MOMENTO[2]&& (horaActual>="21:00:00"&& horaActual<="22:45:00")){
//                     jornadas.entrada=horaActualDate;
//                     const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
//                     return resultado;
//                 }
//             }
//         };
//         //SALIDA
//         if (jornadas.entrada != null && jornadas.salida==null){
//             if (empleado.turno==MOMENTO[0] && (horaActual>="14:00:00" && horaActual<="14:45:00")){
//                 jornadas.salida=horaActualDate
//                 const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
//                 return resultado;
//             }
//             if (empleado.turno==MOMENTO[1] && (horaActual>="22:00:00" && horaActual<="22:45:00")){
//                 jornadas.salida=horaActualDate
//                 const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
//                 return resultado;
//             }
//             if (empleado.turno==MOMENTO[2] && (horaActual>="06:00:00" && horaActual<="06:45:00")){
//                 jornadas.salida=horaActualDate;
//                 const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
//                 return resultado;
//             }
//         }
//         //ENTRADA DESCANSO
//         if(jornadas.entrada && jornadas.entrada_descanso==null){
//             if(empleado.turno==MOMENTO[0]&& (horaActual>="07:00:00"&&horaActual<="13:45:00")){
//                 jornadas.entrada_descanso=horaActualDate;
//                 const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
//                 return resultado;
//             }
//             if(empleado.turno==MOMENTO[1]&&horaActual>="15:00:00"&&horaActual<="21:45:00"){
//                 jornadas.entrada_descanso=horaActualDate;
//                 const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
//                 return resultado;
//             }
//             if(empleado.turno==MOMENTO[2]&&((horaActual>="23:00:00"&&horaActual<="23:59:59")||(horaActual>="00:00:00"&&horaActual<="05:45:00"))){
//                 jornadas.entrada_descanso=horaActualDate;
//                 const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
//                 return resultado;
//             }
//         }
//         //SALIDA DESCANSO
//         if(jornadas.entrada && jornadas.entrada_descanso && jornadas.salida_descanso==null){
//             const diffMins = Math.round((moment(horaActual,"HH:mm:ss").toDate().getTime()-jornadas.entrada_descanso.getTime()) / 60000);
//             if( diffMins >= 10){
//                 if(empleado.turno==MOMENTO[0]&&horaActual>="07:25:00"&&horaActual<="13:55:00"){
//                     const diffMinsRounded = Math.round((moment(horaActual, "HH:mm:ss").toDate().getTime() - jornadas.entrada_descanso.getTime()) / (1000 * 60 * 30));
//                     if(diffMinsRounded>=31)jornadas.observaciones="descanso excedido!"
//                     jornadas.salida_descanso=horaActualDate;
//                     const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
//                     return resultado;
//                 }
//                 if(empleado.turno==MOMENTO[1]&&(horaActual>="15:25:00"&&horaActual<="21:55:00")){
//                     const diffMinsRounded = Math.round((moment(horaActual, "HH:mm:ss").toDate().getTime() - jornadas.entrada_descanso.getTime()) / (1000 * 60 * 30));
//                     if(diffMinsRounded>=31)jornadas.observaciones="descanso excedido!"

//                     jornadas.salida_descanso=horaActualDate;
//                     const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
//                     return resultado;
//                 }
//                 if(empleado.turno==MOMENTO[2]&&(horaActual>="23:25:00"&&horaActual<="23:59:00")||(horaActual>="00:00:00"&&horaActual<="05:35:00")){
//                     const diffMinsRounded = Math.round((moment(horaActual, "HH:mm:ss").toDate().getTime() - jornadas.entrada_descanso.getTime()) / (1000 * 60 * 30));
//                     if(diffMinsRounded>=31)jornadas.observaciones="descanso excedido!"
//                     jornadas.salida_descanso=horaActualDate;
//                     const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
//                     return resultado;
//                 }
//             }else return "Debe esperar al menos 10 minutos para fichar nuevamente!"


//         }
//         //HORAS EXTRA ENTRADA
//         if((jornadas.entrada && jornadas.salida) && jornadas.habilitado_horas_extra && jornadas.entrada_horas_extra==null && empleado.turno==MOMENTO[0] ){
//             if (horaActual>="14:00:00" && horaActual<="14:25:00" ){
//                 jornadas.entrada_horas_extra=horaActualDate
//                 const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
//                 return resultado;
//             }}
//         if((!jornadas.entrada&&!jornadas.salida) && jornadas.habilitado_horas_extra && (empleado.turno==MOMENTO[2]||empleado.turno==MOMENTO[1])){
//             if (empleado.turno==MOMENTO[1] && ( horaActual>="09:45:00" && horaActual<= "13:25:00")){
//                 jornadas.entrada_horas_extra=horaActualDate                       
//                 const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
//                 return resultado;
//             }
//             if(empleado.turno==MOMENTO[2] && (horaActual>="17:45:00" && horaActual <= "21:25:00" )){
//                 jornadas.entrada_horas_extra=horaActualDate;
//                 const resultado=await this.empleadoRepository.saveChangesJornada(empleado);
//                 return resultado; 
//             }}
//         //HORAS EXTRA SALIDA
//         if (jornadas.habilitado_horas_extra && jornadas.entrada_horas_extra &&  jornadas.salida_horas_extra==null){
//             if(empleado.turno==MOMENTO[1] && (horaActual>="11:00:00" && horaActual<="14:20:00") ){
//                 jornadas.salida_horas_extra=horaActualDate;
//                 const resultado=await this.empleadoRepository.saveChangesJornada(empleado);
//                 return resultado;
//             }
//             if(empleado.turno==MOMENTO[0]&& (horaActual>="13:00:00" && horaActual<="18:45:00")){
//                 jornadas.salida_horas_extra=horaActualDate
//                 const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
//                 return resultado;
//             }
//             if(empleado.turno==MOMENTO[2]&& horaActual<="22:45:00"){
//                 jornadas.salida_horas_extra=horaActualDate
//                 const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
//                 return resultado;
//             } 
//         }
//         }else{
//             if(empleado.rotacion=="fijo" && jornadas){
//                 if(jornadas.entrada==null && horaActual>="05:00:00" && horaActual<="20:00:00"){
//                     jornadas.entrada=horaActualDate;
//                     const resultado=await this.empleadoRepository.saveChangesJornada(empleado);
//                     return resultado;
//                 }
//                 if(jornadas.entrada && horaActual>="14:00:00" && horaActual<="20:00:00"){
//                     jornadas.salida=horaActualDate;
//                     const resultado=await this.empleadoRepository.saveChangesJornada(empleado);
//                     return resultado;
//                 }
//             }
//         }}
// }catch(e){
//     return ERROR
// }