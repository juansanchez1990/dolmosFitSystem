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
export class ProductoService {
  urlFoto:any
  uploadProgress: Observable<number>;
  constructor(private angularF:AngularFirestore,private storage: AngularFireStorage) { }

  subirFotoProducto (fotoProducto){
    const randomId = Math.random().toString(36).substring(2);
  
    const filepath = `FotosProductos/${randomId}`;
    const fileRef = this.storage.ref(filepath);
    const task = this.storage.upload(filepath, fotoProducto);
    this.uploadProgress = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() =>  fileRef.getDownloadURL().subscribe(resp=>{
        this.urlFoto= resp
          console.log('urlFoto',this.urlFoto)
      }))
    
    ).subscribe(resp=>{
     
    });

  }

  getProductos(){
    return this.angularF.collection('Productos').valueChanges();
  }
  actualizarNumeroFactura(idfactura:any, NumeroFactura:any) {
    let FacturaNumber ={
      NumeroFacturas:NumeroFactura,
      id:idfactura
    }
    return this.angularF.collection("ContadorFacturas").doc(idfactura).ref.update(FacturaNumber);
   }
  crearVenta(Venta,idFactura,NumFactura){
    var id = this.angularF.createId();
    NumFactura=NumFactura+1
    this.actualizarNumeroFactura(idFactura,NumFactura)
    return this.angularF.collection("VentaProductos").doc(id).ref.set(Object.assign(Venta, { id: id }));
  }

  addProducto(Producto: any) {
    if (this.urlFoto===undefined){
      this.urlFoto='https://firebasestorage.googleapis.com/v0/b/sy-gym.appspot.com/o/cubes.png?alt=media&token=d30d4389-089f-4a75-815c-b1e6e87d1227'
    }

    var id = this.angularF.createId();
    let ProductoNuevo={
      NombreProducto:Producto.NombreProducto,
      Codigo:Producto.Codigo,
      PrecioVenta:Producto.PrecioVenta,
      Categoria:Producto.Categoria,
      Departamento:Producto.Departamento,
      Comentario:Producto.Comentario,
      Foto:this.urlFoto

    };
    return this.angularF.collection("Productos").doc(id).ref.set(Object.assign(ProductoNuevo, { id: id }));

  }
  crearDepartamento(Departamento: any) {
    var id = this.angularF.createId();
    let DepartamentoNuevo={
      Departamento:Departamento,
    };
    return this.angularF.collection("Departamentos").doc(id).ref.set(Object.assign(DepartamentoNuevo, { id: id }));

  }
  crearCategoria(Categoria: any,Departamento:any) {
    var id = this.angularF.createId();
    let CategoriaNueva={
      Categoria:Categoria,
      Departamento:Departamento,
    };
    return this.angularF.collection("Categorias").doc(id).ref.set(Object.assign(CategoriaNueva, { id: id }));

  }

  getDepartamentos(){
    return this.angularF.collection('Departamentos').valueChanges();
  }
  getCategorias(){
    return this.angularF.collection('Categorias').valueChanges();
  }

}
