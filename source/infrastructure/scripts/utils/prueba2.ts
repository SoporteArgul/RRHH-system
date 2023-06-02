import EmpleadoModel from "../../model/empleado.model";

export default async function prueba2() {
    let diaAnterior ="2023-05-31"
    const data = await EmpleadoModel.aggregate([
        {
            $match: {
                legajo: "1263"
            }
        },
        { $unwind: "$jornada" },
        { $unwind: "$jornada" },
        { $unwind: "$jornada" },
        { $match: { "jornada.fecha": { $gte: new Date(diaAnterior), $lte: new Date("2023-06-01") } } },
        {
            $group: {
                _id: "$_id",
                nombre: { $first: "$nombre" },
                apellido: { $first: "$apellido" },
                legajo: { $first: "$legajo" },
                jornada: { $push: "$jornada" },
            }
        },
        {
            $project: {
                _id: 1,
                nombre: 1,
                apellido: 1,
                legajo: 1,
                jornada: 1,
            }
        },
        { $sort: { apellido: 1 } }
    ])


}
