import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { CrearClienteComponent } from '../../crear-cliente/crear-cliente.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { CrearMembresiaComponent } from '../../crear-membresia/crear-membresia.component';
import { MiembrosComponent } from '../../miembros/miembros.component';
import { CrearPagoComponent } from '../../crear-pago/crear-pago.component';
import { ListadoPagosComponent } from '../../listado-pagos/listado-pagos.component';
import { DetallePagoComponent } from '../../detalle-pago/detalle-pago.component';
import { CrearProductoComponent } from '../../crear-producto/crear-producto.component';
import { CrearVentaProductoComponent } from '../../crear-venta-producto/crear-venta-producto.component';
import { ChartPesosComponent } from '../../chart-pesos/chart-pesos.component';
import { CrearUsuarioComponent } from '../../crear-usuario/crear-usuario.component';
import { ListaUsuariosComponent } from '../../lista-usuarios/lista-usuarios.component';
import { LoginComponent } from '../../login/login.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxTypeaheadModule } from "ngx-typeahead";
import { ChartsModule } from 'ng2-charts';
@NgModule({
  imports: [
    CommonModule,
    NgxTypeaheadModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgbModule,
    ChartsModule
    
  ],
  declarations: [
    DashboardComponent,
    CrearClienteComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    CrearMembresiaComponent,
    MiembrosComponent,
    CrearPagoComponent,
    ListadoPagosComponent,
    DetallePagoComponent,
    
    CrearProductoComponent,
    CrearVentaProductoComponent,
    ChartPesosComponent,
    CrearUsuarioComponent,
    ListaUsuariosComponent
    
    
  ]
})

export class AdminLayoutModule {}
