export default function Licencias(licencia:string,jornada:any){
    if (licencia=="enfermedad diurna")jornada.diurna_enfermedad=8;
    if (licencia=="enfermedad nocturna")jornada.nocturna_enfermedad=8;
    if (licencia=="enfermedad diurna/nocturna")jornada.nocturna_enfermedad=1,jornada.diurna_enfermedad=7;
    if (licencia=="licencia gremial")jornada.licencia_gremial=8
    if (licencia=="diurna feriado ley")jornada.diurna_feriado_ley=8
    if (licencia=="nocturna feriado ley")jornada.nocturna_feriado_ley=8
    if (licencia=="diurna/nocturna feriado ley")jornada.diurna_feriado_ley=7,jornada.nocturna_feriado_ley=1;
    if (licencia=="accidente")jornada.accidente=8;
    if (licencia=="vacaciones")jornada.vacaciones=8;
    if (licencia=="maternidad")jornada.licencia_maternidad=8;
    if (licencia=="mudanza")jornada.licencia_mudanza=8;
    if (licencia=="nacimiento")jornada.licencia_nacimiento=8;
    if (licencia=="ausente con aviso")jornada.ausente_con_aviso=8;
    if (licencia=="ausente sin aviso")jornada.ausente_sin_aviso=8;
    if (licencia=="examen")jornada.licencia_examen=8;
    if (licencia=="suspension")jornada.horas_suspension=8;
    if (licencia=="fallecimiento")jornada.licencia_fallecimiento=8;
    if (licencia=="matrimonio")jornada.licencia_matrimonio=8;
    if (licencia=="donacion de sangre")jornada.licencia_donacion_sangre=8;
    if (licencia=="ausencia enfermedad injustificada")jornada.ausencia_enfermedad_injustificada=8;
    if (licencia=="diurna reserva legal de puesto")jornada.diurna_reserva_legal_puesto=8;
    if (licencia=="nocturna reserva legal puesto")jornada.nocturna_reserva_legal_puesto=8;
    if (licencia=="diurna/nocturna reserva legal puesto")jornada.diurna_reserva_legal_puesto=7,jornada.nocturna_reserva_legal_puesto=1;
    if (licencia=="aislamiento COVID")jornada.licencia_aislamiento=8;
    if (licencia=="licencia vacunacion")jornada.licencia_vacunacion=8;
}