import { EmpleadoController } from './../controllers/empleado.ctrl';
import { Router } from "express";
import { EmpleadoUseCase } from "../../aplication/empleadoUseCase";
import { MongoRepository } from "../repository/empleado.repository.mongo";
import upload from "../storage/multer"
import checkAuth from '../middlewares/verify.token';
import multer from 'multer';



const route=Router()
const userRepo= new MongoRepository()
const empleadoUseCase=new EmpleadoUseCase(userRepo)
const empleadoCtrl=new EmpleadoController(empleadoUseCase)
const api=`/api/v1/rrhh/empleados`




//POST
route.post(`${api}/registrar`,upload.single("image"),checkAuth,empleadoCtrl.insertCtrl);
//GET
route.get(`${api}/listar`,checkAuth,empleadoCtrl.getCrtl);
route.get(`${api}/dias/:name`,checkAuth,empleadoCtrl.dateToDate);
route.get(`${api}/grupo/:name`,checkAuth,empleadoCtrl.getGroup);
route.get(`${api}/buscar`,checkAuth,empleadoCtrl.searchCtrl)
route.get(`${api}/activar/:name`,checkAuth,empleadoCtrl.activeCtrl);
route.get(`${api}/listar/legajo/:name`,checkAuth,empleadoCtrl.legajoCtrl);
//PUT
route.put(`${api}/fichar/:name`,empleadoCtrl.clockingCtrl);
route.put(`${api}/cargar/:id`,checkAuth,empleadoCtrl.uploadHoursCtrl);
route.put(`${api}/actualizar/:name`,upload.single("image"),checkAuth,empleadoCtrl.update);
route.put(`${api}/habilitar/:name`,checkAuth,empleadoCtrl.searchDayAndUpdate);
//DELETE
route.delete(`${api}/eliminar/:id`,checkAuth,empleadoCtrl.EliminarCtrl)
export default route