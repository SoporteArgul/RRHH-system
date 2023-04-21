import { EmpleadoController } from './../controllers/empleado.ctrl';
import { Router } from "express";
import { EmpleadoUseCase } from "../../aplication/empleadoUseCase";
import { MongoRepository } from "../repository/empleado.repository";


const route=Router()
const userRepo= new MongoRepository()
const empleadoUseCase=new EmpleadoUseCase(userRepo)
const empleadoCtrl=new EmpleadoController(empleadoUseCase)
const api=`/api/v1/rrhh/`

// route.get(`${api}/get`,empleadoCtrl.getCtrl)
// route.put(`${api}/update/:id`,empleadoCtrl.updateCtrl)
// route.delete(`${api}/delete/:id`,empleadoCtrl.deleteCtrl)

//REGISTRO Y LOGIN
route.post(`/register`,empleadoCtrl.insertCtrl)
route.get(`/listar`,empleadoCtrl.getCrtl)
route.get(`/getdates`,empleadoCtrl.dateToDate)
route.put(`/fichar/normal/:id`,empleadoCtrl.clockingCtrl)
route.put(`/fichar/extra/:id`,empleadoCtrl.clockingExtraCtrl)
route.put(`/horas/extra/:id`,empleadoCtrl.uploadHoursCtrl)
export default route