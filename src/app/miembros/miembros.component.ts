import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClientesService } from 'app/services/clientes.service';
import Swal from 'sweetalert2'
import { ChartDataSets, ChartOptions,ChartType } from 'chart.js';
import { Color, Label,monkeyPatchChartJsLegend,monkeyPatchChartJsTooltip,SingleDataSet  } from 'ng2-charts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-miembros',
  templateUrl: './miembros.component.html',
  styleUrls: ['./miembros.component.css']
})
export class MiembrosComponent implements OnInit {
  miembros:any=[]
  PesosMiembros:any=[]
  Fechas:any=[]
  loading:boolean
  imagen:any
  idMiembro:any
  ShowDataPesos:boolean=true
  DataPesos:Subscription
  public clienteForm: FormGroup;
  constructor(private cs:ClientesService) { }

  ngOnInit(): void {
    this.getMiembros();
  }

  cargarData(miembro){

    this.idMiembro=miembro.id
    this.imagen = miembro.Foto
    this.clienteForm = new FormGroup({
      NombreCompleto: new FormControl(miembro.NombreCompleto, ),
      Correo: new FormControl(miembro.Correo, ),
      Celular: new FormControl(miembro.Celular, ),
      Identidad: new FormControl(miembro.Identidad, ),  
      Edad: new FormControl(miembro.Edad, ),  
      FechaNacimiento: new FormControl(miembro.FechaNacimiento, ),   
      Direccion: new FormControl(miembro.Direccion, ),     
    });
  }
 getMiembros(){
  this.loading=true
    this.cs.getMiembros().subscribe(miembro=>{
      this.miembros=miembro;
      this.loading=false
   
    })
 }

 actualizarMiembro(){
  this.cs.actualizarCliente(this.idMiembro,this.clienteForm.value).then(resp=>{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Miembro actualizado',
      showConfirmButton: false,
      timer: 1500
    })
  })
 }
 inactivarMiembro(miembro){
  miembro.Activo=false
  this.cs.actualizarCliente(miembro.id,miembro).then(resp=>{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Miembro inactivado',
      showConfirmButton: false,
      timer: 1500
    })
  })
 }
}
