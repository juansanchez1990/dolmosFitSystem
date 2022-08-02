import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ClientesService } from 'app/services/clientes.service';

@Component({
  selector: 'app-listado-pagos',
  templateUrl: './listado-pagos.component.html',
  styleUrls: ['./listado-pagos.component.css']
})
export class ListadoPagosComponent implements OnInit {
idMiembro:any
pagos:any=[]
  constructor(public rutaActiva: ActivatedRoute, private cs:ClientesService) { }

  ngOnInit() {
    this.idMiembro=this.rutaActiva.snapshot.params.idMiembro
    this.cs.getPagosByMiembro(this.idMiembro).subscribe(resp=>{
      this.pagos=resp

    })
  }

}
