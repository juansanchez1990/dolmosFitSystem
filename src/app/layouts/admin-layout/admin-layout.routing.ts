import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { CrearClienteComponent } from 'app/crear-cliente/crear-cliente.component';
import { CrearMembresiaComponent } from 'app/crear-membresia/crear-membresia.component';
import { MiembrosComponent } from 'app/miembros/miembros.component';
import { CrearPagoComponent } from 'app/crear-pago/crear-pago.component';
import { ListadoPagosComponent } from 'app/listado-pagos/listado-pagos.component';
import { DetallePagoComponent } from 'app/detalle-pago/detalle-pago.component';
import { AccesosGuard } from 'app/accesos.guard';
import { CrearProductoComponent } from 'app/crear-producto/crear-producto.component';
import { CrearVentaProductoComponent } from 'app/crear-venta-producto/crear-venta-producto.component';
import { ChartPesosComponent } from 'app/chart-pesos/chart-pesos.component';
import { CrearUsuarioComponent } from 'app/crear-usuario/crear-usuario.component';
import { ListaUsuariosComponent } from 'app/lista-usuarios/lista-usuarios.component';
import { AccesosActivoGuard } from 'app/accesosActivo.guard';
import { LoginComponent } from 'app/login/login.component';


export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
   
    { path: 'dashboard',      component: DashboardComponent, canActivate:[AccesosGuard,AccesosActivoGuard]},
    { path: 'user-profile',   component: UserProfileComponent, canActivate:[AccesosGuard,AccesosActivoGuard] },
    { path: 'table-list',     component: TableListComponent,canActivate:[AccesosGuard,AccesosActivoGuard] },
    { path: 'typography',     component: TypographyComponent,canActivate:[AccesosGuard,AccesosActivoGuard] },
    { path: 'icons',          component: IconsComponent,canActivate:[AccesosGuard,AccesosActivoGuard] },
    { path: 'maps',           component: MapsComponent,canActivate:[AccesosGuard,AccesosActivoGuard] },
    { path: 'notifications',  component: NotificationsComponent,canActivate:[AccesosGuard,AccesosActivoGuard] },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'login',        component: LoginComponent },
    { path: 'crear-cliente',        component: CrearClienteComponent,canActivate:[AccesosActivoGuard] },
    { path: 'crear-membresia',        component: CrearMembresiaComponent,canActivate:[AccesosActivoGuard] },
    { path: 'miembros',        component: MiembrosComponent,canActivate:[AccesosGuard,AccesosActivoGuard] },
    { path: 'crear-producto',       component: CrearProductoComponent, canActivate:[AccesosGuard] },
    { path: 'crear-venta',        component: CrearPagoComponent,canActivate:[AccesosActivoGuard] },
    { path: 'listado-usuarios',        component: ListaUsuariosComponent,canActivate:[AccesosGuard,AccesosActivoGuard] },
    { path: 'crear-usuario',        component: CrearUsuarioComponent,canActivate:[AccesosGuard] },
    { path: 'crear-venta-producto',        component: CrearVentaProductoComponent,canActivate:[AccesosActivoGuard] },
    { path: 'crear-venta/:idMiembro',        component: CrearPagoComponent,canActivate:[AccesosActivoGuard] },
    { path: 'listado-pagos/:idMiembro',        component: ListadoPagosComponent,canActivate:[AccesosActivoGuard] },
    { path: 'detalle-pago/:idPago',        component: DetallePagoComponent,canActivate:[AccesosActivoGuard] },
    { path: 'pesos-estadistica/:idMiembro',        component: ChartPesosComponent,canActivate:[AccesosActivoGuard] },
];
