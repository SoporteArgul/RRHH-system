import {Contratacion,Categorias,Educacion,Domicilio,Dias,LiquidacionMeses, EntradaSalida, Convenio, movimientos} from "./empleado.interface";

export interface EmpleadoEntity{
    nombre:string;
    apellido:string;
    edad:Number;
    cuil:string;
    dni:string;
    sexo:string;
    legajo:Number;
    email:string;
    telefono:string;
    domicilio:Domicilio[];
    nivel_educacion:Educacion[];
    activo:Boolean;
    fecha_ingreso:string;
    fecha_egreso:string;
    convenio:Convenio[];
    contratacion:Contratacion[];
    categoria:Categorias[];
    gerencia:string;
    area:string;
    sector:string;
    puesto:string;
    rol:string;
    jornada:movimientos[];
    almuerzo:Dias[];
    foto:string;
    liquidacion:LiquidacionMeses[];

    observaciones:string;
    uuid:string;
}