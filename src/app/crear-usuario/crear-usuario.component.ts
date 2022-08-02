import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from 'app/services/clientes.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  public usuarioForm: FormGroup;
  constructor(private cs:ClientesService) { }

  ngOnInit(): void {
    this.usuarioForm = new FormGroup({
      NombreCompleto: new FormControl('', Validators.required),
      Correo: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required),
      Usuario: new FormControl('', Validators.required),
      Celular: new FormControl('', Validators.required),
      Identidad: new FormControl('', Validators.required),  
      Rol: new FormControl('', Validators.required),     
    });
  }
  crearUsuario() {


    Swal.fire({
      title: '¿Desea registrar al usuario?',
      showDenyButton: true,
      confirmButtonText: 'Registrar',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let usuario={
          Nombre:this.usuarioForm.value['NombreCompleto'],
          Correo:this.usuarioForm.value['Correo'],
          Password:this.usuarioForm.value['Password'],
          Celular:this.usuarioForm.value['Celular'],
          Usuario:this.usuarioForm.value['Usuario'],
          Identidad:this.usuarioForm.value['Identidad'],
          Rol:Number(this.usuarioForm.value['Rol']),
          Activo:true,
          FechaRegistro:new Date().getFullYear()+'-'+0+(new Date().getMonth()+1)+'-'+new Date().getDate(),
      
        }
        this.cs.addUsuario(usuario).then(resp=>{
          this.usuarioForm.reset();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario registrado',
            showConfirmButton: false,
            timer: 1500
          })
        })
      } else if (result.isDenied) {
       
      }
    })



    

}
}
