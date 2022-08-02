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
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  fotoClientePath:any;
  urlFoto:any
  uploadProgress: Observable<number>;

  uploadURL: Observable<string>;
  mesesNombres = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
  constructor(private angularF:AngularFirestore,private storage: AngularFireStorage) { }
  
  subirFotoCliente (fotoCliente){
    const randomId = Math.random().toString(36).substring(2);
  
    const filepath = `FotosClientes/${randomId}`;
    const fileRef = this.storage.ref(filepath);
    const task = this.storage.upload(filepath, fotoCliente);
    this.uploadProgress = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() =>  fileRef.getDownloadURL().subscribe(resp=>{
        this.urlFoto= resp
          console.log('urlFoto',this.urlFoto)
      }))
    
    ).subscribe(resp=>{
     
    });

  }
  addCliente(cliente: Cliente) {
    if (this.urlFoto===undefined){
      this.urlFoto='https://firebasestorage.googleapis.com/v0/b/sy-gym.appspot.com/o/FotosClientes%2Fuser.png?alt=media&token=7ea86ad3-7c6f-4cef-b274-cc3b52f75bfe'
    }

    var id = this.angularF.createId();
    let ClienteNuevo={
      NombreCompleto:cliente.NombreCompleto,
      Correo:cliente.Correo,
      Celular:cliente.Celular,
      Genero:cliente.Genero,
      Identidad:cliente.Identidad,
      Edad:cliente.Edad,
      FechaNacimiento:cliente.FechaNacimiento,
      Direccion:cliente.Direccion,
      id:id,
      Activo:cliente.Activo,
      AnioIngreso:cliente.AnioIngreso,
      MesIngreso:cliente.MesIngreso,
      Foto: this.urlFoto,
      FechaRegistro:cliente.FechaRegistro
    };
    return this.angularF.collection("Clientes").doc(id).ref.set(Object.assign(ClienteNuevo, { id: id }));

  }
  addUsuario(usuario: any) {

    var id = this.angularF.createId();

    return this.angularF.collection("Usuarios").doc(id).ref.set(Object.assign(usuario, { id: id }));

  }

  actualizarCliente(idMiembro, Miembro){
    return this.angularF.collection("Clientes").doc(idMiembro).ref.update(Miembro);
  }
  actualizarUsuario(idUsuario, Usuario){
    return this.angularF.collection("Usuarios").doc(idUsuario).ref.update(Usuario);
  }
  setPagoLeido(idPago, Pago){
    return this.angularF.collection("Pagos").doc(idPago).ref.update(Pago);
  }

  getPagosByMiembro(idMiembro){
    console.log('idMiembro',idMiembro)
    return this.angularF
    .collection("Pagos", ref=>ref.orderBy('FechaPago', 'desc').where('idMiembro','==',idMiembro))
    .valueChanges();
  }
  getPagosByMiembroChart(idMiembro){
    console.log('idMiembro',idMiembro)
    return this.angularF
    .collection("Pagos", ref=>ref.orderBy('FechaPago', 'asc').where('idMiembro','==',idMiembro))
    .valueChanges();
  }
  getPagos(){
    return this.angularF
    .collection("Pagos")
    .valueChanges();
  }

  getVentasProductos(){
    return this.angularF
    .collection("VentaProductos")
    .valueChanges();
  }
  getPagoById(idPago){
    return this.angularF
    .collection("Pagos", ref=>ref.where('id','==',idPago))
    .valueChanges();
  }
  MatriculaById(id){
    return this.angularF
    .collection("Matriculas", ref=>ref.where('Identidad','==',id))
    .valueChanges();
  }

  getNumeroFacturaActual(){
    return this.angularF.collection('ContadorFacturas').valueChanges();
  }

  actualizarNumeroFactura(idfactura:any, NumeroFactura:any) {
    let FacturaNumber ={
      NumeroFacturas:NumeroFactura,
      id:idfactura
    }
    return this.angularF.collection("ContadorFacturas").doc(idfactura).ref.update(FacturaNumber);
   }


  crearMatricula(matricula,pesoMiembro,idMiembro,numFactura,idFactura){
    var id = this.angularF.createId();
    let pago ={
      NombreCompleto:matricula.NombreCompleto,
      Identidad:matricula.Identidad,
      FechaInicio:matricula.FechaInicio,
      FechaFinal:matricula.FechaFinal,
      Pago:Number(matricula.Pago),
      PesoActual:Number(pesoMiembro),
      idMiembro:idMiembro,
      NumeroFactura:('00'+numFactura).toString(),
      Pesos:[
        {
          Peso:Number(pesoMiembro),
          Fecha:matricula.FechaInicio
        }
      ],
      Comentario:'',
      AnioPago:new Date().getFullYear(),
      MesPago:this.mesesNombres[new Date().getMonth()],
      FechaPago:new Date().getFullYear()+'-'+0+(new Date().getMonth()+1)+'-'+new Date().getDate(),
    }
    this.crearPago(pago)
    numFactura=numFactura+1
    this.actualizarNumeroFactura(idFactura,numFactura)
    return this.angularF.collection("Matriculas").doc(id).ref.set(Object.assign(matricula, { id: id }));
  }
  crearPago(Pago){
    var id = this.angularF.createId();
    return this.angularF.collection("Pagos").doc(id).ref.set(Object.assign(Pago, { id: id }));
  }

  getMiembros(){
    return this.angularF.collectionGroup('Clientes').valueChanges();
  }
  getUsuarios(){
    return this.angularF.collectionGroup('Usuarios').valueChanges();
  }
}
