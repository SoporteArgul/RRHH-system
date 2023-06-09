import { EmpleadoController } from './../controllers/empleado.ctrl';
import { Router } from "express";
import { EmpleadoUseCase } from "../../aplication/empleadoUseCase";
import { MongoRepository } from "../repository/empleado.repository.mongo";
import upload from "../storage/multer"
import checkAuth from '../middlewares/verify.token';
import { Clock } from '../helpers/clocking';
import { check } from 'express-validator';



const route=Router()
const userRepo= new MongoRepository()
const clock=new Clock(userRepo)
const empleadoUseCase=new EmpleadoUseCase(userRepo,clock)
const empleadoCtrl=new EmpleadoController(empleadoUseCase)
const api=`/api/v1/rrhh/empleados`


//POST
route.post(`${api}/registrar`,checkAuth,upload.single("image"),empleadoCtrl.insertCtrl);
route.post(`${api}/dias-area/:area`,empleadoCtrl.ListarDesdeHastaCtrl);

//GET
route.get(`${api}/listar`,checkAuth,empleadoCtrl.getCrtl);
route.get(`${api}/dias/:name`,checkAuth,empleadoCtrl.dateToDate);
route.get(`${api}/grupo/:name`,checkAuth,empleadoCtrl.getGroup);
route.get(`${api}/buscar`,checkAuth,empleadoCtrl.searchCtrl)
route.get(`${api}/activar/:name`,checkAuth,empleadoCtrl.activeCtrl);
route.get(`${api}/listar/legajo/:name`,checkAuth,empleadoCtrl.legajoCtrl);
route.get(`${api}/vivo`,checkAuth,empleadoCtrl.FichadasEnVivoCtrl);
route.get(`${api}/turno/:turno`,checkAuth,empleadoCtrl.ListarTurnoCtrl);
route.get(`${api}/area/:area`,checkAuth,empleadoCtrl.ListarPorAreaCrtl);
route.get(`${api}/area`,checkAuth,empleadoCtrl.ListarPorAreayGrupoCrtl)
//PUT
route.put(`${api}/fichar/:name`,empleadoCtrl.clockingCtrl);
route.put(`${api}/cargar/:name`,checkAuth,empleadoCtrl.uploadHoursCtrl);
route.put(`${api}/actualizar/:name`,checkAuth,upload.single("image"),empleadoCtrl.update);
route.put(`${api}/habilitar/:name`,checkAuth,empleadoCtrl.searchDayAndUpdate);
route.put(`${api}/turno-legajo/:name`,checkAuth,empleadoCtrl.CargarTurnoLegajo);
route.put(`${api}/turno-grupo/:name`,checkAuth,empleadoCtrl.CargarTurnoGrupo);
//DELETE
route.delete(`${api}/eliminar/:id`,checkAuth,empleadoCtrl.EliminarCtrl)
export default route