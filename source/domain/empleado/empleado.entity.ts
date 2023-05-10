import {Categorias,Educacion,Domicilio,Jornadas,Liquidacion} from "./empleado.interface";

export interface EmpleadoEntity{
    nombre: string,
    apellido: string,
    edad: number,
    cuil: string,
    dni: string,
    sexo: string,
    legajo: number,
    email: string,
    telefono: string,
    domicilio: Domicilio[],
    fecha_ingreso:string;
    fecha_egreso:string;
    nivel_educacion: Educacion[],
    activo: boolean,
    convenio: string,
    contratacion: string,
    categoria: Categorias[],
    gerencia: string,
    area: string,
    sector: string,
    puesto: string,
    rol: string,
    tipo_liquidacion:string,
    rotacion:string,
    turno:string,
    grupo:string,
    jornada: Jornadas[],
    liquidacion: Liquidacion[],
    observaciones: string,
    foto: string,



}