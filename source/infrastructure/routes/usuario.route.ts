import { Router } from "express";
import { UsuarioMongoRepository } from "../repository/usuario.repository.mongo";
import { usuarioController } from "../controllers/usuario.ctrl";
import { UsuarioRepository } from "../../domain/usuario/usuario.repository";
import { UsuarioUseCase } from "../../aplication/usuarioUseCase";

const route=Router();
const usuarioRepo=new UsuarioMongoRepository();
const usuarioUseCase=new UsuarioUseCase(usuarioRepo);
const usuarioCtrl=new usuarioController(usuarioUseCase);


route.post(`/login`,usuarioCtrl.login);
route.post(`/usuario`,usuarioCtrl.userRegister);
route.put(`/update`,usuarioCtrl.userUpdate);
route.delete(`/delete`,usuarioCtrl.userDelete);
route.get(`/list`,usuarioCtrl.userList);

export default route