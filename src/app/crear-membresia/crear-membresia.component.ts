import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'app/services/clientes.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crear-membresia',
  templateUrl: './crear-membresia.component.html',
  styleUrls: ['./crear-membresia.component.css']
})
export class CrearMembresiaComponent implements OnInit {

  constructor(private cs:ClientesService) { }
  nombrePaciente:any
  idMiembro:any
  NombreCompleto=''
  Identidad=''
  Miembros:any = []
  numeroFactura:any
  idFactura
  public search = "";
  mesesNombres = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
  ngOnInit() {
this.getMiembros()

this.cs.getNumeroFacturaActual().subscribe(num=>{
  let PedidosCollection: any = []
  PedidosCollection= num
  this.numeroFactura =PedidosCollection[0]?.NumeroFacturas
  this.idFactura=PedidosCollection[0]?.id
  console.log('numeroFactura',this.numeroFactura)

})
  }
 getMiembros(){
  this.cs.getMiembros().subscribe((resp:any)=>{
    this.nombrePaciente = resp.map(a=>a.NombreCompleto)
    console.log('Miembros',this.nombrePaciente)
  })
 }

 handleResultSelected(result) {
  this.search = result;
  this.cs.getMiembros().subscribe((resp:any)=>{
    this.Miembros = resp.filter(m=>m.NombreCompleto===this.search)

   this.NombreCompleto= this.Miembros[0].NombreCompleto
   this.Identidad= this.Miembros[0].Identidad
    this.idMiembro=this.Miembros[0].id
    console.log('NombreCompleto',this.NombreCompleto)
  })

}

guardarMatricula(FechaInicio, FechaFinal, Pago, PesoInicial, Comentario){

  if (!FechaInicio){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ingrese la fecha de inicio',
      showConfirmButton: false,
      timer: 1500
    })
  }
 else if (!FechaFinal){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ingrese la fecha final',
      showConfirmButton: false,
      timer: 1500
    })
  }
 else if (!Pago){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ingrese el monto a pagar',
      showConfirmButton: false,
      timer: 1500
    })
  }
 else if (!PesoInicial){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ingrese el peso inicial del miembro',
      showConfirmButton: false,
      timer: 1500
    })
  }
  else {

    let pesoMiembro=Number(PesoInicial)
      let Matricula ={
        NombreCompleto:this.NombreCompleto,
        Identidad:this.Identidad,
        FechaInicio:FechaInicio,
        FechaFinal:FechaFinal,
        PesoActual:Number(PesoInicial),
        Pago:Number(Pago),
        PesoInicial:[
          {
            Peso:Number(PesoInicial),
            Fecha:FechaInicio
          }
        ],
        Comentario:Comentario
    
      }
    
      
    
    
      this.cs.crearMatricula(Matricula,
        pesoMiembro,this.idMiembro,this.numeroFactura,this.idFactura).then(resp=>{
        console.log('infoMiembro', resp)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Matricula Registrada',
          showConfirmButton: false,
          timer: 1500
        })
    
        this.search=' '
        this.NombreCompleto=' '
        this.Identidad=' '
      })
  }


}
}
