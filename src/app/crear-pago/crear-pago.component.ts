import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from 'app/services/clientes.service';
import { ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-pago',
  templateUrl: './crear-pago.component.html',
  styleUrls: ['./crear-pago.component.css']
})
export class CrearPagoComponent implements OnInit {
  nombrePaciente:any
  public search = "";
  idMiembro:any
  Miembros:any = []
  numeroFactura:any
  idFactura
  public pagoForm: FormGroup;
  constructor(private cs:ClientesService,public rutaActiva: ActivatedRoute,private router:Router) { }
  mesesNombres = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
  ngOnInit() {
    this.cs.getNumeroFacturaActual().subscribe(num=>{
      let PedidosCollection: any = []
      PedidosCollection= num
      this.numeroFactura =PedidosCollection[0]?.NumeroFacturas
      this.idFactura=PedidosCollection[0]?.id

   
    
    })
    this.getMiembros()

     
      if(this.rutaActiva.snapshot.params.idMiembro===undefined){

        this.pagoForm = new FormGroup({
          NombreCompleto: new FormControl('', Validators.required ),
          Identidad: new FormControl('', Validators.required ),
          FechaInicio: new FormControl('', Validators.required ),
          FechaFinal: new FormControl('', Validators.required ),
          PesoActual: new FormControl('', Validators.required ),
          Pago: new FormControl('', Validators.required ),
          Comentario: new FormControl(''),
    
        })
      }
      else {


        this.cs.getMiembros().subscribe((resp:any)=>{
          let Miembro = resp.filter(m=>m.id===this.rutaActiva.snapshot.params.idMiembro)

          this.pagoForm = new FormGroup({
            NombreCompleto: new FormControl(Miembro[0].NombreCompleto, Validators.required ),
            Identidad: new FormControl(Miembro[0].Identidad, Validators.required ),
            FechaInicio: new FormControl('', Validators.required ),
            FechaFinal: new FormControl('', Validators.required ),
            PesoActual: new FormControl('', Validators.required ),
            Pago: new FormControl('', Validators.required ),
            Comentario: new FormControl(''),
      
          })
        })
      }
      
  }
  getMiembros(){
    this.cs.getMiembros().subscribe((resp:any)=>{
      this.nombrePaciente = resp.map(a=>a.NombreCompleto)
 
    })
   }

   handleResultSelected(result) {
    this.search = result;
    this.cs.getMiembros().subscribe((resp:any)=>{
      this.Miembros = resp.filter(m=>m.NombreCompleto===this.search)
      let MatriculaSuscription:Subscription
      MatriculaSuscription= this.cs.MatriculaById(resp[0].Identidad).subscribe(resp=>{
        
        if(resp.length>0){

          this.idMiembro= this.Miembros[0].id
          this.pagoForm.get('NombreCompleto').setValue(this.Miembros[0].NombreCompleto)
          this.pagoForm.get('Identidad').setValue(this.Miembros[0].Identidad)
          this.search= ' '
          MatriculaSuscription.unsubscribe()
        }

        else {

          Swal.fire({
            title: 'Este miembro no está matriculado. ¿Desea matricularlo?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.router.navigate(['/crear-membresia']);
            } else if (result.isDenied) {
       
            }
          })
          MatriculaSuscription.unsubscribe()
        }

      })
 
    })
  
  }

  hacerPago(){
   
    let pago ={
      NombreCompleto:this.pagoForm.value['NombreCompleto'],
      Identidad:this.pagoForm.value['Identidad'],
      FechaInicio:this.pagoForm.value['FechaInicio'],
      FechaFinal:this.pagoForm.value['FechaFinal'],
      Pago:Number(this.pagoForm.value['Pago']),
      idMiembro: this.idMiembro,
      NumeroFactura:('00'+this.numeroFactura).toString(),
      PesoActual:Number(this.pagoForm.value['PesoActual']),
      Pesos:[
        {
          Peso:Number(this.pagoForm.value['PesoActual']),
          Fecha:this.pagoForm.value['FechaInicio']
        }
      ],
      Comentario:this.pagoForm.value['Comentario'],
      AnioPago:new Date().getFullYear(),
      MesPago:this.mesesNombres[new Date().getMonth()],
      FechaPago:new Date().getFullYear()+'-'+0+(new Date().getMonth()+1)+'-'+new Date().getDate(),
    }

    this.cs.crearPago(pago).then(resp=>{
      this.numeroFactura=this.numeroFactura+1
      this.cs.actualizarNumeroFactura(this.idFactura,this.numeroFactura)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Pago Registrado',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
}
