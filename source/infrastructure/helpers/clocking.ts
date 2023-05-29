import { EmpleadoRepository } from './../../domain/empleado/empleado.repository';


export class HelpersClock{
    constructor( private readonly empleadoRepository:EmpleadoRepository){}
    public verify=async(empleado:any,hora:string,entrada:string,salida:string,turno:string,jornadas:any,horaActual:Date)=>{
                    if (empleado.turno ==turno && (hora>=entrada && hora<=salida)){  
                        jornadas.entrada=horaActual
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }
    }
    }


