import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'app/services/clientes.service';
import Swal from 'sweetalert2'
import { LoginService } from 'app/services/login.service';
import { Router } from '@angular/router';
import { AdminLayoutComponent } from 'app/layouts/admin-layout/admin-layout.component';
import { Subscription } from 'rxjs';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string; 
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Tablero',  icon: 'dashboard', class: '' },
    // { path: '/user-profile', title: 'Perfil',  icon:'person', class: '' },
    // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: '/crear-venta', title: 'Pago Mensualidad',  icon:'payments', class: '' },
    { path: '/crear-venta-producto', title: 'Crear Venta',  icon:'point_of_sale', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/miembros', title: 'Miembros',  icon:'group', class: '' },
    { path: '/crear-cliente', title: 'Crear Miembro',  icon:'person_add', class: '' },
    { path: '/crear-usuario', title: 'Crear Usuario',  icon:'group_add', class: '' },
    { path: '/listado-usuarios', title: 'Lista Usuarios',  icon:'format_list_bulleted', class: '' },
    { path: '/crear-membresia', title: 'Crear Matricula',  icon:'recent_actors', class: '' },
    { path: '/crear-producto', title: 'Crear Producto',  icon:'inventory_2', class: '' },
    { path: '', title: 'Salir',  icon:'logout', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  usuario:any
  pagosAVencer: any[];
isLog:any

  constructor(private router: Router,
    private cs:ClientesService,
    private ls:LoginService,
    private admin: AdminLayoutComponent
    ) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.ls.getEstadoLoginByUsuario( this.usuario[0].Usuario).subscribe((resp:any)=>{
          this.isLog=resp[0].id
        if(resp[0].Rol===2){
    
          this.menuItems = ROUTES.filter(menuItem => menuItem.title!='Tablero'&& menuItem.title!='Crear Usuario' );
        }
        else {
          this.menuItems = ROUTES.filter(menuItem => menuItem);
    
        }
      })

    this.cs.getPagos().subscribe((resp:any)=>{
     
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0')
      var yyyy = today.getFullYear();
      var hoy = yyyy + '-' + mm + '-' + dd;
   
       this.pagosAVencer = resp.filter(pg=>(new Date(pg.FechaFinal).getTime()-new Date(hoy).getTime())/(1000*60*60*24)<=11 && pg.Leido==false)
  
    })
    this.usuario = JSON.parse(localStorage.getItem('usuario'));

   
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  salir(nombreRuta){
  
    let EstadoLogin ={
      Logged:false,
      Nombre:this.usuario[0].Nombre,
      Rol:this.usuario[0].Rol,
      Usuario:this.usuario[0].Usuario,
      id: this.isLog
    }
    console.log('EstadoLogin',EstadoLogin)
    if(nombreRuta==='Salir'){
      this.ls.IfIsLogged(false);
   
      localStorage.removeItem('usuario');
      localStorage.removeItem('ListaProductos');
      localStorage.removeItem('LoginEntro');
      this.ls.actualizarEstadoLogin(EstadoLogin).then(resp=>{

      })
   
    }
}

  marcarLeido(pago){

    Swal.fire({
        title: '¿Marcar como leído?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            pago.Leido=true
            this.cs.setPagoLeido(pago.id, pago).then(resp=>{

                Swal.fire('!Hecho!', '', 'success')
            })
        } else if (result.isDenied) {
         
        }
      })

}
}
