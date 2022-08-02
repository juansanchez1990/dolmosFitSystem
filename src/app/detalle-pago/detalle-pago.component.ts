import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ClientesService } from 'app/services/clientes.service';

@Component({
  selector: 'app-detalle-pago',
  templateUrl: './detalle-pago.component.html',
  styleUrls: ['./detalle-pago.component.css']
})
export class DetallePagoComponent implements OnInit {
idPago:any
  constructor(public rutaActiva: ActivatedRoute, private cs:ClientesService) { }
  detallePago:any
  ngOnInit() {
    this.idPago=this.rutaActiva.snapshot.params.idPago;
    this.cs.getPagoById(this.idPago).subscribe(resp=>{
      this.detallePago=resp;


    })
  }

  onPrint(){
    window.print();
}

}
