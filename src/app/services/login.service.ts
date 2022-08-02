import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Cliente } from 'app/models/cliente';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  Entro= new BehaviorSubject<boolean>(false);
  Usuario= new BehaviorSubject<any>('');
  constructor(private angularF:AngularFirestore,private storage: AngularFireStorage) { }

  getUsuario(usuario,password){

    return this.angularF
    .collection("Usuarios", ref=>ref.where('Password','==',password).where('Usuario','==',usuario))
    .valueChanges();
  }

  actualizarEstadoLogin(estado) {
    let EstadoLogin ={
      Logged:estado.Logged,
      id:estado.id,
      Nombre:estado.Nombre,
      Rol:estado.Rol,
      Usuario:estado.Usuario
    }
    return this.angularF.collection("LoginRealTime").doc(estado.id).ref.update(EstadoLogin);
   }


   getEstadoLogin(){
    return this.angularF.collection('LoginRealTime').valueChanges();
  }
   getEstadoLoginByUsuario(usuario){
    return this.angularF.collection('LoginRealTime',ref=>ref.where('Usuario','==',usuario)).valueChanges();
  }

  IfIsLogged(IsLogged){
    if (IsLogged===true){

      localStorage.setItem('LoginEntro', 'True');
    }
    else {
      localStorage.setItem('LoginEntro', 'False');
    }
    this.Entro.next(IsLogged);

  }

  sendUsuario(usuario){
    this.Usuario.next(usuario)
  }

  crearEstado(Estado){
    var id = this.angularF.createId();
    return this.angularF.collection("LoginRealTime").doc(id).ref.set(Object.assign(Estado, { id: id }));
  }


}
