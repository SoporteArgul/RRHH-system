import { EmpleadoEntity } from "./empleado.entity";
import {Jornadas,Liquidacion} from "./empleado.interface";

export class EmpleadoValue implements EmpleadoEntity{
    legajo: string;
    apellido: string
    nombre: string
    cuil: string
    contratacion: string
    fecha_ingreso:Date
    gerencia: string
    area: string
    sector: string
    centro_de_costo:string
    convenio: string
    categoria: string
    dni: string
    fecha_nacimiento:string
    sexo: string
    email: string
    telefono: string
    telefono_urgencias:string
    pais:string
    provincia:string
    localidad:string
    calle:string
    numero:string
    dpto:string
    piso:string
    codigo_postal:string
    nivel_de_educacion:string
    activo: boolean
    fecha_egreso:Date;
    estado_ambiental:string;
    examen_preocupacional:string;
    tipo_liquidacion:string;
    rotacion:string
    turno:string
    grupo:string
    jornada: Jornadas[]
    liquidacion: Liquidacion[]
    observaciones: string
    foto: string

    constructor({    
        legajo, apellido, nombre, cuil, contratacion, fecha_ingreso, gerencia, area, sector, centro_de_costo, convenio, categoria, dni, fecha_nacimiento, sexo, email, telefono, telefono_urgencias, pais, provincia, localidad, calle, numero, dpto, piso, codigo_postal, nivel_de_educacion, activo, fecha_egreso, estado_ambiental, examen_preocupacional, tipo_liquidacion, rotacion, turno, grupo, jornada, liquidacion, observaciones, foto
        }:{    
    legajo: string;
    apellido: string;
    nombre: string;
    cuil: string;
    contratacion: string;
    fecha_ingreso:Date
    gerencia: string;
    area: string;
    sector: string;
    centro_de_costo:string;
    convenio: string;
    categoria: string;
    dni: string;
    fecha_nacimiento:string;
    sexo: string;
    email: string;
    telefono: string;
    telefono_urgencias:string;
    pais:string;
    provincia:string;
    localidad:string;
    calle:string;
    numero:string;
    dpto:string;
    piso:string;
    codigo_postal:string;
    nivel_de_educacion:string;
    activo: boolean;
    fecha_egreso:Date;
    estado_ambiental:string;
    examen_preocupacional:string;
    tipo_liquidacion:string;
    rotacion:string;
    turno:string;
    grupo:string;
    jornada: Jornadas[];
    liquidacion: Liquidacion[];
    observaciones: string;
    foto: string;
        }){
            this.legajo=legajo
            this.apellido=apellido
            this.nombre=nombre
            this.cuil=cuil
            this.contratacion=contratacion
            this.fecha_ingreso=fecha_ingreso
            this.gerencia=gerencia
            this.area=area
            this.sector=sector
            this.centro_de_costo=centro_de_costo
            this.convenio=convenio
            this.categoria=categoria
            this.dni=dni
            this.fecha_nacimiento=fecha_nacimiento
            this.sexo=sexo
            this.email=email
            this.telefono=telefono
            this.telefono_urgencias=telefono_urgencias
            this.pais=pais
            this.provincia=provincia
            this.localidad=localidad
            this.calle=calle
            this.numero=numero
            this.dpto=dpto
            this.piso=piso
            this.codigo_postal=codigo_postal
            this.nivel_de_educacion=nivel_de_educacion
            this.activo=activo
            this.fecha_egreso=fecha_egreso
            this.estado_ambiental=estado_ambiental
            this.examen_preocupacional=examen_preocupacional
            this.tipo_liquidacion=tipo_liquidacion
            this.rotacion=rotacion
            this.grupo=grupo
            this.turno=turno
            this.jornada=jornada
            this.foto=foto
            this.liquidacion=liquidacion
            this.observaciones=observaciones
        }
}