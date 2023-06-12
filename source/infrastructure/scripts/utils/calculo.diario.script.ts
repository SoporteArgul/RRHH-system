import EmpleadoModel from "../../model/empleado.model"
import moment from "moment"


// { $in: ['calidad', 'deposito','produccion','matriceria','tecnicos'] }


export default async()=>{
    const empleados=await EmpleadoModel.aggregate([
        { $match:{
            area:"sistemas"
        }},
        { $unwind: "$jornada" },
        { $unwind: "$jornada" },
        { $unwind: "$jornada" },
        { $match: { "jornada.fecha": { $gte: new Date("2023-05-01"), $lte: new Date("2023-05-10") } } },
        {
            $group: {
                _id: "$_id",
                nombre: { $first: "$nombre" },
                apellido: { $first: "$apellido" },
                legajo: { $first: "$legajo" },
                area:{$first:"$area"},
                jornada: { $push: "$jornada" }
            }
        },
        {
            $project: {
                _id: 1,
                nombre: 1,
                apellido: 1,
                legajo: 1,
                area:1,
                jornada: 1,
            }
        },
    ])
    empleados.forEach((obj)=>{
        let horasNoche = 0;
        let horasDia = 0;
        obj.jornada.map((obj:any)=>{
            const hora1=moment(obj.entrada);
            const hora2=moment(obj.salida);
            const diferenciaHoras = Math.abs(hora2.diff(hora1, 'hours'));
            console.log(diferenciaHoras)
            const horaInicioNocturna = 21;
            const horaFinNocturna = 6;

                if (
                (hora1.hours() >= horaInicioNocturna && hora1.hours() <= 23) ||
                (hora1.hours() >= 0 && hora1.hours() <= horaFinNocturna)
                ) {
                if (
                    (hora2.hours() >= horaInicioNocturna && hora2.hours() <= 23) ||
                    (hora2.hours() >= 0 && hora2.hours() <= horaFinNocturna)
                ) {
                    if (hora2.hours() >= horaInicioNocturna || hora1.hours() <= horaFinNocturna) {
                    horasNoche = Math.abs(hora2.hours() - hora1.hours());
                    } else {
                    horasNoche = Math.abs(hora2.hours() - hora1.hours() + 24);
                    }
                } else {
                    horasNoche = Math.abs(horaInicioNocturna - hora1.hours());
                    horasDia = Math.abs(hora2.hours() - horaFinNocturna);
                }
                } else if (
                (hora2.hours() >= horaInicioNocturna && hora2.hours() <= 23) ||
                (hora2.hours() >= 0 && hora2.hours() <= horaFinNocturna)
                ) {
                horasNoche = Math.abs(hora2.hours() - horaFinNocturna);
                horasDia = Math.abs(horaInicioNocturna - hora1.hours());
                } else {
                horasDia = Math.abs(hora2.hours() - hora1.hours());
                }
            })
            console.log(horasDia, horasNoche)
        })
    }