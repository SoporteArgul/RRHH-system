import EmpleadoModel from "../../model/empleado.model"
import moment from "moment";
import buscarFechas from "./buscar.fecha.2";

// { $in: ['calidad', 'deposito','produccion','matriceria','tecnicos'] }

export default async function calculoQuincenal(){
    const hoy = moment().date(15);
    let fechaInicio, fechaFin:any;
    let diurna_enfermedad: number,
    nocturna_enfermedad: number,
    licencia_gremial: number,
    diurna_feriado_ley: number,
    nocturna_feriado_ley: number,
    accidente: number,
    vacaciones: number,
    licencia_maternidad: number,
    licencia_mudanza: number,
    licencia_nacimiento: number,
    ausente_con_aviso: number,
    ausente_sin_aviso: number,
    licencia_examen: number,
    horas_suspendido: number,
    licencia_fallecimiento: number,
    licencia_matrimonio: number,
    licencia_donacion_sangre: number,
    ausencia_enfermadad_injustificada: number,
    diurna_reserva_legal_puesto: number,
    nocturna_reserva_legal_puesto: number,
    licencia_aislamiento: number,
    licencia_vacunacion: number;
    if (hoy <= moment().date(15)) {
      // Hoy es 1-15 del mes
      fechaInicio = moment().date(1).toDate();
      fechaFin = moment().date(15).toDate();
    } else {
      // Hoy es 16-fin de mes
      fechaInicio = moment().date(16).toDate();
      fechaFin = moment().endOf('month').toDate();
    }
    const empleados = await EmpleadoModel.find({legajo:"852"});
    for (const empleado of empleados) {
        let horasNocturnas = 0;
        let horasDiurnas = 0;
        let horasNocturnasExtra50=0;
        let horasDiurnasExtra50=0;
        let horasNocturnasExtra100=0;
        let horasDiurnasExtra100=0;    
        const jornadas=await buscarFechas(empleado.jornada,fechaInicio,fechaFin)
        jornadas.map((obj: any) => {
           horasNocturnas +=obj.horas_nocturnas;
           horasDiurnas += obj.horas_diurnas;
           horasNocturnasExtra50+=obj.horas_nocturnas_50;
           horasDiurnasExtra50+=obj.horas_diurnas_50;
           horasNocturnasExtra100+=obj.horas_nocturnas_100;
           horasDiurnasExtra100+=obj.horas_diurnas_100;
           diurna_enfermedad+=obj.diurna_enfermedad
           nocturna_enfermedad+=obj.nocturna_enfermedad
           licencia_gremial+=obj.licencia_gremial;
           diurna_feriado_ley+=obj.diurna_feriado_ley;
           nocturna_feriado_ley+=obj.nocturna_feriado_ley;
           accidente+=obj.accidente
           vacaciones+=obj.vacaciones
           licencia_maternidad+=obj.licencia_matrimonio
           licencia_mudanza+=obj.licencia.mudanza
           licencia_nacimiento+=obj.licencia.nacimineto
           ausente_con_aviso+=obj.ausente_con_aviso
           ausente_sin_aviso+=obj.ausente_sin_aviso
           licencia_examen+=obj.licencia_examen
           horas_suspendido+=obj.horas_suspension
           licencia_fallecimiento+=obj.licencia_fallecimiento
           licencia_matrimonio+=obj.licencia_matrimonio;
           licencia_donacion_sangre+=obj.licencia_donacion_sangre;
           ausencia_enfermadad_injustificada+=obj.ausencia_enfermadad_injustificada
           diurna_reserva_legal_puesto+=obj.diurna_reserva_legal_puesto
           nocturna_reserva_legal_puesto+=obj.nocturna_reserva_legal_puesto
           licencia_aislamiento+=obj.licencia_aislamiento
           licencia_vacunacion+=obj.licencia_vacunacion});
        empleado.liquidacion.map((liq:any)=>{
          liq.map((obj:any)=>{
            obj.map((i:any)=>{
              if(moment(i.fecha_liquidacion_horas).isSame(fechaFin,'day')){
                i.total_horas_diurnas=horasDiurnas
                i.total_horas_nocturnas=horasNocturnas
                i.total_horas_diurnas_50=horasDiurnasExtra50
                i.total_horas_nocturnas_50=horasNocturnasExtra50
                i.total_horas_diurnas_100=horasDiurnasExtra100
                i.total_horas_nocturnas_100=horasDiurnasExtra100
                i.total_diurna_enfermedad=diurna_enfermedad;
                i.total_nocturna_enfermedad=nocturna_enfermedad;
                i.total_licencia_gremial=licencia_gremial;
                i.total_diurna_feriado_ley=diurna_feriado_ley;
                i.total_nocturna_feriado_ley=nocturna_feriado_ley;
                i.total_accidente=accidente;
                i.total_vacaciones=vacaciones;
                i.total_licencia_maternidad=licencia_maternidad;
                i.total_licencia_mudanza=licencia_mudanza;
                i.total_licencia_nacimiento=licencia_nacimiento;
                i.total_ausente_con_aviso=ausente_con_aviso;
                i.total_ausente_sin_aviso=ausente_sin_aviso;
                i.total_licencia_examen=licencia_examen;
                i.total_suspension=horas_suspendido;
                i.i.total_licencia_fallecimiento=licencia_fallecimiento;
                i.total_licencia_matrimonio=licencia_matrimonio;
                i.total_licencia_donacion_sangre=licencia_donacion_sangre;
                i.total_ausencia_enfermadad_injustificada=ausencia_enfermadad_injustificada;
                i.total_diurna_reserva_legal_puesto=diurna_reserva_legal_puesto;
                i.total_nocturna_reserva_legal_puesto=nocturna_reserva_legal_puesto;
                i.total_licencia_aislamiento=licencia_aislamiento;
                i.total_licencia_vacunacion=licencia_vacunacion;
              }
            })
          })
        })


    empleado.markModified('jornada');
    const resultado= await empleado.save() 
}

}