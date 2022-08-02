import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
LoginSuscription:Subscription
  constructor(private ls:LoginService,private router: Router) { }

  ngOnInit(): void {

  let usuario = JSON.parse(localStorage.getItem('usuario'));
 this.ls.getEstadoLoginByUsuario(usuario[0].Usuario).subscribe((resp:any)=>{

      if ( resp[0].Logged===false){
          this.router.navigate(['/login']);
         
      }
      else if ( resp[0].Logged===true) {
        console.log('true')
        
        this.router.navigate(['/dashboard']);
      }
     
  })

  }

  getUsuario(usuario, password){
    console.log('usuario',usuario)
    let LoggedId:any
    this.LoginSuscription= this.ls.getUsuario(usuario,password).subscribe((resp:any)=>{
     console.log('usuario',usuario)

      if (resp.length>0){


        if (resp[0].Activo===false){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Este usuario esta desactivado',
            showConfirmButton: false,
            timer: 1500
          })
          this.LoginSuscription.unsubscribe()
      
        }

        else {
          console.log('usuario', resp)

          localStorage.setItem('usuario', JSON.stringify(resp));
          this.ls.IfIsLogged(true);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            showConfirmButton: false,
            timer: 1500
          })
          this.ls.IfIsLogged(true);

          let estadoSuscription:Subscription
      
          estadoSuscription=  this.ls.getEstadoLoginByUsuario(resp[0].Usuario).subscribe((data:any)=>{
            if(data.length===0){
              console.log('respHola',resp[0].Nombre)
              let EstadoLogin ={
                Logged:true,
                Nombre:resp[0].Nombre,
                Rol:resp[0].Rol,
                Usuario:resp[0].Usuario
              }
              this.ls.crearEstado(EstadoLogin).then(resp=>{
                this.router.navigate(['/dashboard']);
                this.LoginSuscription.unsubscribe()
              })
              estadoSuscription.unsubscribe()
            }

            else {
              console.log('respHola',resp[0].Nombre)
             
              LoggedId=resp[0].id
              let UpdateEstado = {
                Logged:true,
                Nombre:data[0].Nombre,
                Rol:data[0].Rol,
                Usuario:data[0].Usuario,
                id:data[0].id
              }
              this.ls.actualizarEstadoLogin(UpdateEstado).then(resp=>{
                
                         this.router.navigate(['/dashboard']);
                         this.LoginSuscription.unsubscribe()
                         estadoSuscription.unsubscribe()

              })
            
            }

          })
        }
      }
      else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Credenciales Incorrectas',
          showConfirmButton: false,
          timer: 1500
        })
        this.LoginSuscription.unsubscribe()


      }
      
    })
 
  }


}
