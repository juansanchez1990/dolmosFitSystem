import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClientesService } from 'app/services/clientes.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
Usuarios:any=[]
public UsuariosForm: FormGroup;
idUsuario:any
  constructor(private cs:ClientesService) { }

  ngOnInit() {
    this.getUsuarios()
  }
  getUsuarios(){
    this.cs.getUsuarios().subscribe(resp=>{
        this.Usuarios=resp
       
    })
  }

  cargarData(usuario){
 
    this.idUsuario=usuario.id
    this.UsuariosForm = new FormGroup({
      Nombre: new FormControl(usuario.Nombre, ),
      Correo: new FormControl(usuario.Correo, ),
      Celular: new FormControl(usuario.Celular, ),
      Identidad: new FormControl(usuario.Identidad, ),  
      Rol: new FormControl(usuario.Rol, ),  
      Password: new FormControl(usuario.Password, ),   
      Usuario: new FormControl(usuario.Usuario, ),     
    });
  }

  actualizarUsuario(){
    this.cs.actualizarUsuario(this.idUsuario,this.UsuariosForm.value).then(resp=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario actualizado',
        showConfirmButton: false,
        timer: 1500
      })
    })
   }

   inactivarUsuario(usuario,estado){
    Swal.fire({
      title: '¿Desea actualizar el estado a este usuario?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        usuario.Activo=estado
        this.cs.actualizarUsuario(usuario.id,usuario).then(resp=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario inactivado',
            showConfirmButton: false,
            timer: 1500
          })
        })
      } else if (result.isDenied) {
 
      }
    })

   }
}
