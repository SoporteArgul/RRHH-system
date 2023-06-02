import {Jornadas,Liquidacion} from "./empleado.interface";

export interface EmpleadoEntity{
    legajo: string,
    apellido: string,
    nombre: string,
    cuil: string,
    contratacion: string,
    fecha_ingreso:Date;
    gerencia: string,
    area: string,
    sector: string,
    centro_de_costo:string,
    convenio: string,
    categoria: string,
    dni: string,
    fecha_nacimiento:string,
    sexo: string,
    email: string,
    telefono: string,
    telefono_urgencias:string,
    pais:string,
    provincia:string,
    localidad:string,
    calle:string,
    numero:string
    dpto:string,
    piso:string;
    codigo_postal:string,
    nivel_de_educacion:string,
    activo: boolean,
    fecha_egreso:Date;
    estado_ambiental:string;
    examen_preocupacional:string;
    tipo_liquidacion:string;
    rotacion:string,
    turno:string,
    grupo:string,
    jornada: Jornadas[],
    liquidacion: Liquidacion[],
    observaciones: string,
    foto: string,



}