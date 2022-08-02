import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from 'app/services/producto.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  public productoForm: FormGroup;
  fotoProducto:any
  Departamentos:any=[]
  Categorias:any=[]
  Depto:any
  constructor(private ps:ProductoService) { }

  ngOnInit() {
    this.getCategorias()
    this.getDepartamentos()
    this.productoForm = new FormGroup({
      NombreProducto: new FormControl('', Validators.required ),
      Codigo: new FormControl('', Validators.required ),
      PrecioCompra: new FormControl('', Validators.required ),
      PrecioVenta: new FormControl('', Validators.required ),
      Categoria: new FormControl('', Validators.required ),
      Departamento: new FormControl('', Validators.required ),
      Comentario: new FormControl(''),
    })
  }
  CargarFotoProducto(event: any): void {
    this.fotoProducto = event.target.files[0];
    this.ps.subirFotoProducto(this.fotoProducto)
  }
  getDepartamentos(){
    this.ps.getDepartamentos().subscribe(resp=>{
      this.Departamentos=resp
    })
  }
  getCategorias(){
    this.ps.getCategorias().subscribe(resp=>{
      this.Categorias=resp
    })
  }

  crearProducto() {


    Swal.fire({
      title: '¿Desea registrar el producto?',
      showDenyButton: true,
      confirmButtonText: 'Registrar',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let producto={
          NombreProducto:this.productoForm.value['NombreProducto'],
          Codigo:this.productoForm.value['Codigo'],
          PrecioCompra:Number(this.productoForm.value['PrecioCompra']),
          PrecioVenta:Number(this.productoForm.value['PrecioVenta']),
          Categoria:this.productoForm.value['Categoria'],
          Departamento:this.productoForm.value['Departamento'],
          Comentario:this.productoForm.value['Comentario'],      
        }
        this.ps.addProducto(producto).then(resp=>{
          this.productoForm.reset();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto registrado',
            showConfirmButton: false,
            timer: 1500
          })
        })
      } else if (result.isDenied) {
       
      }
    })



    

}
crearDepartamento(departamento){
  this.ps.crearDepartamento(departamento).then(resp=>{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Departamento Creado',
      showConfirmButton: false,
      timer: 1500
    })
  })
}

onChange(value) {
  this.Depto=value

}
crearCategoria(categoria){

  if (this.Depto===undefined){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Escoja un departamento',
      showConfirmButton: false,
      timer: 1000
    })
  }

  else {

    this.ps.crearCategoria(categoria,this.Depto).then(resp=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Categoría Creada',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
}
}
