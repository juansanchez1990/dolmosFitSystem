import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from 'app/services/clientes.service';
import Swal from 'sweetalert2'
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class CrearClienteComponent implements OnInit {

  constructor(public cs:ClientesService,config: NgbModalConfig, private modalService: NgbModal) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }
  public clienteForm: FormGroup;
  public fotoCliente: any;
  mesesNombres = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
  ngOnInit() { 
    this.clienteForm = new FormGroup({
      NombreCompleto: new FormControl('', Validators.required),
      Correo: new FormControl('', Validators.required),
      Celular: new FormControl('', Validators.required),
      Identidad: new FormControl('', Validators.required),  
      Edad: new FormControl('', Validators.required),  
      Genero: new FormControl('', Validators.required),  
      FechaNacimiento: new FormControl('', Validators.required),   
      Direccion: new FormControl('', Validators.required),     
    });
  }
  open(content) {
    this.modalService.open(content);
  }
  CargarFotoCliente(event: any): void {
    this.fotoCliente = event.target.files[0];
    this.cs.subirFotoCliente(this.fotoCliente )
  }
  crearCliente() {


    Swal.fire({
      title: '¿Desea registrar al cliente?',
      showDenyButton: true,
      confirmButtonText: 'Registrar',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let cliente={
          NombreCompleto:this.clienteForm.value['NombreCompleto'],
          Correo:this.clienteForm.value['Correo'],
          Celular:this.clienteForm.value['Celular'],
          Identidad:this.clienteForm.value['Identidad'],
          Edad:this.clienteForm.value['Edad'],
          Genero:this.clienteForm.value['Genero'],
          FechaNacimiento:this.clienteForm.value['FechaNacimiento'],
          Direccion:this.clienteForm.value['Direccion'],
          AnioIngreso:new Date().getFullYear(),
          MesIngreso:this.mesesNombres[new Date().getMonth()],
          Foto:'',
          Activo:true,
          FechaRegistro:new Date().getFullYear()+'-'+0+(new Date().getMonth()+1)+'-'+new Date().getDate(),
      
        }
        this.cs.addCliente(cliente).then(resp=>{
          this.clienteForm.reset();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cliente registrado',
            showConfirmButton: false,
            timer: 1500
          })
        })
      } else if (result.isDenied) {
       
      }
    })



    

}

}
