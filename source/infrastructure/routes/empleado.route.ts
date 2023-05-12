import { EmpleadoController } from './../controllers/empleado.ctrl';
import { Router } from "express";
import { EmpleadoUseCase } from "../../aplication/empleadoUseCase";
import { MongoRepository } from "../repository/empleado.repository.mongo";
import upload from "../storage/multer"

const route=Router()
const userRepo= new MongoRepository()
const empleadoUseCase=new EmpleadoUseCase(userRepo)
const empleadoCtrl=new EmpleadoController(empleadoUseCase)
const api=`/api/v1/rrhh/`



// route.get(`${api}/get`,empleadoCtrl.getCtrl)
// route.put(`${api}/update/:id`,empleadoCtrl.updateCtrl)
// route.delete(`${api}/delete/:id`,empleadoCtrl.deleteCtrl)


//POST
route.post(`/register`,upload.single("image"),empleadoCtrl.insertCtrl);
//GET
route.get(`/listar`,empleadoCtrl.getCrtl);
route.get(`/dias`,empleadoCtrl.dateToDate);
route.get(`/grupo/:name`,empleadoCtrl.getGroup);
route.get(`/buscar`,empleadoCtrl.searchCtrl)
route.get(`/activar/:name`,empleadoCtrl.activeCtrl);
route.get(`/listar/legajo/:name`,empleadoCtrl.legajoCtrl);
//PUT
route.put(`/fichar/:name`,empleadoCtrl.clockingCtrl);
route.put(`/cargar/:id`,empleadoCtrl.uploadHoursCtrl);
route.put(`/actualizar/:name`,empleadoCtrl.update);
route.put(`/habilitar/:name`,empleadoCtrl.searchDayAndUpdate);

export default route