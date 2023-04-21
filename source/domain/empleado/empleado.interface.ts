interface EntradaSalida{
    entrada:Date;
    salida:Date;
}


interface Dias{
  _1:EntradaSalida[];
  _2:EntradaSalida[];
  _3:EntradaSalida[];
  _4:EntradaSalida[];
  _5:EntradaSalida[];
  _6:EntradaSalida[];
  _7:EntradaSalida[];
  _8:EntradaSalida[];
  _9:EntradaSalida[];
  _10:EntradaSalida[];
  _11:EntradaSalida[];
  _12:EntradaSalida[];
  _13:EntradaSalida[];
  _14:EntradaSalida[];
  _15:EntradaSalida[];
  _16:EntradaSalida[];
  _17:EntradaSalida[];
  _18:EntradaSalida[];
  _19:EntradaSalida[];
  _20:EntradaSalida[];
  _21:EntradaSalida[];
  _22:EntradaSalida[];
  _23:EntradaSalida[];
  _24:EntradaSalida[];
  _25:EntradaSalida[];
  _26:EntradaSalida[];
  _27:EntradaSalida[];
  _28:EntradaSalida[];
  _29:EntradaSalida[];
  _30:EntradaSalida[];
  _31:EntradaSalida[];
}
interface Convenio{
    plastico:string
    fuera_convenio:string
}

interface movimientos{
   fecha: Date;
   entradasSalidas:EntradaSalida[]
}

interface Contratacion{
    eventual:string
    agencia:string
    efectivo:string
    externo:string
}


interface LiquidacionMeses{
    enero:Number;
    febrero:Number;
    marzo:Number;
    abril:Number;
    mayo:Number;
    junio:Number;
    julio:Number;
    agosto:Number;
    septiembre:Number;
    octubre:Number;
    noviembre:Number;
    diciembre:Number;
}

interface Domicilio{
    provincia:string;
    localidad:string;
    calle:string;
    numero:Number;
    codigo_postal:string;
}

interface Educacion{
    primario:Boolean;
    secundario:Boolean;
    terciario:Boolean;
    universitario:Boolean;
    titulo:string;
}

 interface Produccion{
    operario:Boolean;
    auxiliar:Boolean;
    operador:Boolean;
    operador_calificado:Boolean;
    operador_especializado:Boolean;
    ofifical_especializado:Boolean;
 }
interface Mantenimiento{
    medio_oficial_mantenimiento:Boolean;
    oficial_de_mantenimiento:Boolean;
}

interface Administracion{
    nivel_1:Boolean;
    nivel_2:Boolean;
    nivel_3:Boolean;
    nivel_4:Boolean;
    nivel_5:Boolean;
    capataz:Boolean;
    ayudante_de_chofer:Boolean;
    conductor_de_autoevaluador:Boolean;
}

interface Categorias{
    produccion:Produccion[]
    matenimineto:Mantenimiento[]
    administracion:Administracion[]
    fuera_convenio:Boolean;
}

export {movimientos,Convenio,EntradaSalida,Contratacion,Categorias,Educacion,Domicilio,Dias,LiquidacionMeses}