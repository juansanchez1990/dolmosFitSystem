import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ClientesService } from 'app/services/clientes.service';
import { Subscription } from 'rxjs';
import { ChartDataSets,ChartType } from 'chart.js';
import { Color, Label  } from 'ng2-charts';
@Component({
  selector: 'app-chart-pesos',
  templateUrl: './chart-pesos.component.html',
  styleUrls: ['./chart-pesos.component.css']
})
export class ChartPesosComponent implements OnInit {
  idMiembro:any
  Nombre:any
  miembros:any=[]
  PesosMiembros:any=[]
  Fechas:any=[]
  DataPesos:Subscription
  // Barchart Ganancias
  barChartData: ChartDataSets[] = [
    { data: [], label: 'Pesos' },
  ];
  barChartType: ChartType = 'line';
  barChartLabels: Label[] = [];
  barChartPlugins = [];

  barChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: Math.round,
        font: {
          weight: 'bold',
          size: 16
        }
      }
    },
  //   scales: {
  //     xAxes: [{
  //             display: true,
  //             scaleLabel: {
  //                 display: true,
  //                 labelString: 'Pesos'
  //             }
  //         }],
  //     yAxes: [{
  //             display: true,
  //             ticks: {
  //                 beginAtZero: true,
                 
             
                
  //             }
  //         }]
  // },

    maintainAspectRatio: false,


  };
 barChartColors: Color[] = [
    {
      borderColor: '#F8F8F8',
      backgroundColor: '#00DCFF',
    },
  ];
  barChartLegend  = true;
  constructor(public rutaActiva: ActivatedRoute, private cs:ClientesService) { }

  ngOnInit() {
    let Miembro=[]
    this.idMiembro=this.rutaActiva.snapshot.params.idMiembro
    this.DataPesos =this.cs.getPagosByMiembroChart(this.idMiembro).subscribe((resp:any)=>{
      console.log('resp',resp)
      this.Nombre= resp[0].NombreCompleto
      Miembro = resp
      
      Miembro.forEach((x: { PesoActual: number; FechaPago: any;   })=>{
      this.PesosMiembros.push(x.PesoActual);
      this.Fechas.push(x.FechaPago);
      this.barChartLabels = this.Fechas
      this.barChartData= [
        { data: this.PesosMiembros, label: 'Pesos' },
      ];
      
    })
    this.DataPesos.unsubscribe()
    console.log('barChartDataPesos',this.barChartData)
    console.log('barChartLabelsPesos',this.barChartLabels)
 })
  }

}
