import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'app/services/clientes.service';
import { ChartDataSets, ChartOptions,ChartType } from 'chart.js';
import { Color, Label,monkeyPatchChartJsLegend,monkeyPatchChartJsTooltip,SingleDataSet  } from 'ng2-charts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

// Barchart Mensualidades
  barChartData: ChartDataSets[] = [
    { data: [], label: 'Ventas' },
  ];
  barChartType: ChartType = 'bar';
  barChartLabels: Label[] = [];
  barChartPlugins = [];

  barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,

        plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 20,
        }
      }
    }
  };
 barChartColors: Color[] = [
    {
      borderColor: '#F8F8F8',
      backgroundColor: '#00DCFF',
    },
  ];
  barChartLegend  = true;

// Barchart Ventas
  barChartDataVentas: ChartDataSets[] = [
    { data: [], label: 'Ventas' },
  ];
  barChartTypeVentas: ChartType = 'bar';
  barChartLabelsVentas: Label[] = [];
  barChartPluginsVentas = [];

  barChartOptionsVentas = {
    responsive: true,
    maintainAspectRatio: false,

        plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 20,
        }
      }
    }
  };
 barChartColorsVentas: Color[] = [
    {
      borderColor: '#F8F8F8',
      backgroundColor: '#00DCFF',
    },
  ];
  barChartLegendVentas  = true;
// Barchart Ganancias
  barChartDataGanancias: ChartDataSets[] = [
    { data: [], label: 'Ventas' },
  ];
  barChartTypeGanancias: ChartType = 'bar';
  barChartLabelsGanancias: Label[] = [];
  barChartPluginsGanancias = [];

  barChartOptionsGanancias = {
    responsive: true,
    maintainAspectRatio: false,

        plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 20,
        }
      }
    }
  };
 barChartColorsGanancias: Color[] = [
    {
      borderColor: '#F8F8F8',
      backgroundColor: '#00DCFF',
    },
  ];
  barChartLegendGanancias  = true;

// Pie Chart
public pieChartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,

};

public pieColors=[
  {
    backgroundColor: [
        '#00DBFE',
        '#FBB4B4',
 
  ]
  }
];
public barColors=[
  {
    backgroundColor: [
        '#00DBFE',
        '#D7D7D7',
        '#F3C28A',
        '#00FF17',
        '#248A2E',
        '#0091D9',
        '#DC506D',
        '#D4F074',
        '#C68DF7',
        '#FBB4B4',
        '#6ECEB4',
        '#E3E581',
 
  ]
  }
];

public pieChartLabels: Label[] = ['Hombre','Mujer'];
public pieChartData: SingleDataSet = [];
public pieChartType: ChartType = 'pie';
public pieChartLegend = true;
public pieChartPlugins = [];

EstadisticasGenero:any=[]


miembros:any=[]
VentasTotales:any=[]
VentasTotalesProductos:any=[]
VentasSumarizadas:any=0
VentasProductosSumarizadas:any=0
GananciasSumarizadas:any=0
Ventas:any=[]
Meses:any=[]
//VentasProductos
VentasProductos:any=[]
MesesProductos:any=[]
Ganancias:any=[]
  constructor(private cs:ClientesService) { 

    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }


  ngOnInit() {
    this.cs.getMiembros().subscribe((resp:any)=>{
      this.miembros=resp


      let Hombre = this.miembros.filter((m:any)=>m.Genero==='Hombre')
      let Mujer = this.miembros.filter((m:any)=>m.Genero==='Mujer')
      this.pieChartData=[Hombre.length,Mujer.length]


    })

    this.cs.getVentasProductos().subscribe((resp:any)=>{
      this.VentasProductos=[]
      this.MesesProductos=[]
      this.VentasTotalesProductos=[]

      // Enero
      let Enero = resp.filter((p:any)=>p.Mes==="Enero"&& p.AnioPago===new Date().getFullYear())
      let TotalVentasEnero=0
      let TotalGananciasEnero=0
      if (Enero.length===0){
        TotalVentasEnero=0
      }

      else {
        Enero.forEach(element => {
         TotalVentasEnero=TotalVentasEnero+ element.Total
         TotalGananciasEnero=TotalGananciasEnero+ element.Ganancia
       });

      }
      let MesEnero={
        "Mes":"Enero",
        "Año":new Date().getFullYear(),
        "TotalVentas":TotalVentasEnero,
        "Ganancias":TotalGananciasEnero
        
      }

      this.VentasTotalesProductos.push(MesEnero)

      // Febrero
      let Febrero = resp.filter((p:any)=>p.Mes==="Febrero"&& p.AnioPago===new Date().getFullYear())
      let TotalVentasFebrero=0
      let TotalGananciasFebrero=0
      if (Febrero.length===0){
        TotalVentasFebrero=0
        TotalGananciasFebrero=0
      }
      else {

        Febrero.forEach(element => {
          TotalVentasFebrero=TotalVentasFebrero+ element.Total
          TotalGananciasFebrero=TotalGananciasFebrero+ element.Ganancia
        });
      }
      let MesFebrero={
        "Mes":"Febrero",
        "Año":new Date().getFullYear(),
        "TotalVentas":TotalVentasFebrero,
        "Ganancias":TotalGananciasFebrero
        
      }

      this.VentasTotalesProductos.push(MesFebrero)

      // Marzo
      let Marzo = resp.filter((p:any)=>p.Mes==="Marzo"&& p.AnioPago===new Date().getFullYear())
      let TotalVentasMarzo=0
      let TotalGananciasMarzo=0
      if (Marzo.length===0){
        TotalVentasMarzo=0
        TotalGananciasMarzo=0
      }

      else {

        Marzo.forEach(element => {
          TotalVentasMarzo=TotalVentasMarzo+ element.Total
          TotalGananciasMarzo=TotalGananciasMarzo+ element.Ganancia
        });
      }
      let MesMarzo={
        "Mes":"Marzo",
        "Año":new Date().getFullYear(),
        "TotalVentas":TotalVentasMarzo,
        "Ganancias":TotalGananciasMarzo
        
        
      }
      this.VentasTotalesProductos.push(MesMarzo)

      // Abril
      let Abril = resp.filter((p:any)=>p.Mes==="Abril"&& p.AnioPago===new Date().getFullYear())
      let TotalVentasAbril=0
      let TotalGananciasAbril=0
      if (Abril.length===0){
        TotalVentasAbril=0
        TotalGananciasAbril=0
      }

      else {

        Abril.forEach(element => {
          TotalVentasAbril=TotalVentasAbril+ element.Total
          TotalGananciasAbril=TotalGananciasAbril+ element.Ganancia
        });
      }
      let MesAbril={
        "Mes":"Abril",
        "Año":new Date().getFullYear(),
        "TotalVentas":TotalVentasAbril,
        "Ganancias":TotalGananciasAbril
        
      }
      this.VentasTotalesProductos.push(MesAbril)


      // Mayo
      let Mayo = resp.filter((p:any)=>p.Mes==="Mayo"&& p.AnioPago===new Date().getFullYear())
      let TotalVentasMayo=0
      let TotalGananciasMayo=0
      if (Mayo.length===0){
        TotalVentasMayo=0
        TotalGananciasMayo=0
      }

      else {

        Mayo.forEach(element => {
          TotalVentasMayo=TotalVentasMayo+ element.Total
          TotalGananciasMayo=TotalGananciasMayo+ element.Ganancia
        });
      }
      let MesMayo={
        "Mes":"Mayo",
        "Año":new Date().getFullYear(),
        "TotalVentas":TotalVentasMayo,
        "Ganancias":TotalGananciasMayo
        
      }
      this.VentasTotalesProductos.push(MesMayo)


      // Junio
      let Junio = resp.filter((p:any)=>p.Mes==="Junio"&& p.AnioPago===new Date().getFullYear())
      let TotalVentasJunio=0
      let TotalGananciasJunio=0
      if (Mayo.length===0){
        TotalVentasJunio=0
        TotalGananciasJunio=0
      }

      else {

        Junio.forEach(element => {
          TotalVentasJunio= TotalVentasJunio+ element.Total
          TotalGananciasJunio=TotalGananciasJunio+ element.Ganancia
        });
      }
      let MesJunio={
        "Mes":"Junio",
        "Año":new Date().getFullYear(),
        "TotalVentas":TotalVentasJunio,
        "Ganancias":TotalGananciasJunio
        
      }
      this.VentasTotalesProductos.push(MesJunio)

      // Julio

      let Julio = resp.filter((p:any)=>p.Mes==="Julio"&& p.AnioPago===new Date().getFullYear())
    
      let TotalVentasJulio=0
      let TotalGananciasJulio=0
      if (Julio.length===0){
        TotalVentasJulio=0
        TotalGananciasJulio=0
      }
      else {
        Julio.forEach(element => {
         TotalVentasJulio=TotalVentasJulio+ element.Total
         TotalGananciasJulio=TotalGananciasJulio+ element.Ganancia
       });

      }
      let MesJulio={
        "Mes":"Julio",
        "Año":new Date().getFullYear(),
        "TotalVentas":TotalVentasJulio,
        "Ganancias":TotalGananciasJulio
        
      }
      this.VentasTotalesProductos.push(MesJulio)

      // Agosto
      let Agosto = resp.filter((p:any)=>p.Mes==="Agosto"&& p.AnioPago===new Date().getFullYear())
      let TotalVentasAgosto=0
      let TotalGananciasAgosto=0
      if (Agosto.length===0){
        TotalVentasAgosto=0
        TotalGananciasAgosto=0
      }

      else {

        Agosto.forEach(element => {
          TotalVentasAgosto= TotalVentasAgosto+ element.Total
          TotalGananciasAgosto=TotalGananciasAgosto+ element.Ganancia
        });
      }
      let MesAgosto={
        "Mes":"Agosto",
        "Año":new Date().getFullYear(),
        "TotalVentas":TotalVentasAgosto,
        "Ganancias":TotalGananciasAgosto
        
      }
      this.VentasTotalesProductos.push(MesAgosto)

      // Septiembre

      let Septiembre = resp.filter((p:any)=>p.Mes==="Septiembre"&& p.AnioPago===new Date().getFullYear())
      let TotalVentasSeptiembre=0
      let TotalGananciasSeptiembre=0
      if (Septiembre.length===0){
        TotalVentasSeptiembre=0
        TotalGananciasSeptiembre=0
      }
      else {

        Septiembre.forEach(element => {
          TotalVentasSeptiembre=+ element.Total
          TotalGananciasSeptiembre=TotalGananciasSeptiembre+ element.Ganancia
        });
      }
      let MesSeptiembre={
        "Mes":"Septiembre",
        "Año":new Date().getFullYear(),
        "TotalVentas":TotalVentasSeptiembre,
        "Ganancias":TotalGananciasSeptiembre     
      }
      this.VentasTotalesProductos.push(MesSeptiembre)


       // Octubre

       let Octubre = resp.filter((p:any)=>p.Mes==="Octubre"&& p.AnioPago===new Date().getFullYear())
       let TotalVentasOctubre=0
       let TotalGananciasOctubre=0
       if (Octubre.length===0){
        TotalVentasOctubre=0
        TotalGananciasOctubre=0
       }
       else {
 
        Octubre.forEach(element => {
          TotalVentasOctubre=+ element.Total
          TotalGananciasOctubre=TotalGananciasOctubre+ element.Ganancia
         });
       }
       let MesOctubre={
         "Mes":"Octubre",
         "Año":new Date().getFullYear(),
         "TotalVentas":TotalVentasOctubre,
         "Ganancias":TotalGananciasOctubre        
       }
       this.VentasTotalesProductos.push(MesOctubre)

       // Noviembre

       let Noviembre = resp.filter((p:any)=>p.Mes==="Noviembre"&& p.AnioPago===new Date().getFullYear())
       let TotalGananciasNoviembre=0
       let TotalVentasNoviembre=0
       if (Noviembre.length===0){
        TotalVentasNoviembre=0
        TotalGananciasNoviembre=0
       }
       else {
 
        Noviembre.forEach(element => {
          TotalVentasNoviembre=+ element.Total
          TotalGananciasNoviembre=TotalGananciasNoviembre+ element.Ganancia
         });
       }
       let MesNoviembre={
         "Mes":"Noviembre",
         "Año":new Date().getFullYear(),
         "TotalVentas":TotalVentasNoviembre,
         "Ganancias":TotalGananciasNoviembre      
       }
       this.VentasTotalesProductos.push(MesNoviembre)

       // Diciembre

       let Diciembre = resp.filter((p:any)=>p.Mes==="Diciembre"&& p.AnioPago===new Date().getFullYear())
       let TotalVentasDiciembre=0
       let TotalGananciasDiciembre=0
       if (Diciembre.length===0){
        TotalVentasDiciembre=0
        TotalGananciasDiciembre=0
       }
       else {
 
        Diciembre.forEach(element => {
          TotalVentasDiciembre=+ element.Total
          TotalGananciasDiciembre=TotalGananciasDiciembre+ element.Ganancia
         });
       }
       let MesDiciembre={
         "Mes":"Diciembre",
         "Año":new Date().getFullYear(),
         "TotalVentas":TotalVentasDiciembre,
         "Ganancias":TotalGananciasDiciembre     
       }
       this.VentasTotalesProductos.push(MesDiciembre)

       this.VentasTotalesProductos.forEach((x: { TotalVentas: number; Ganancias: number;   Mes: any;   })=>{

        
        this.VentasProductosSumarizadas= this.VentasProductosSumarizadas+x.TotalVentas
        this.GananciasSumarizadas= this.GananciasSumarizadas+x.Ganancias
    
   

      this.VentasProductos.push(x.TotalVentas);
      this.MesesProductos.push(x.Mes);
      this.Ganancias.push(x.Ganancias);
      
      this.barChartLabelsVentas = this.MesesProductos
      this.barChartDataVentas= [
        { data: this.VentasProductos, label: 'Ventas Productos' },
      ];

      

      this.barChartLabelsGanancias = this.MesesProductos
      this.barChartDataGanancias= [
        { data: this.Ganancias, label: 'Ganancias' },
      ];


     
      

    });







    })
   
    this.cs.getPagos().subscribe((resp:any)=>{
      this.Ventas=[]
      this.Meses=[]
      this.VentasTotales=[]

      // Enero
      let Enero = resp.filter((p:any)=>p.MesPago==="Enero"&& p.AnioPago===new Date().getFullYear())
      let TotalPagosEnero=0
      if (Enero.length===0){
        TotalPagosEnero=0
      }

      else {
        Enero.forEach(element => {
         TotalPagosEnero=TotalPagosEnero+ element.Pago
       });

      }
      let MesEnero={
        "Mes":"Enero",
        "Año":new Date().getFullYear(),
        "TotalPagos":TotalPagosEnero
        
      }

      this.VentasTotales.push(MesEnero)

      // Febrero
      let Febrero = resp.filter((p:any)=>p.MesPago==="Febrero"&& p.AnioPago===new Date().getFullYear())
      let TotalPagosFebrero=0
      if (Febrero.length===0){
        TotalPagosFebrero=0
      }
      else {

        Febrero.forEach(element => {
          TotalPagosFebrero=TotalPagosFebrero+ element.Pago
        });
      }
      let MesFebrero={
        "Mes":"Febrero",
        "Año":new Date().getFullYear(),
        "TotalPagos":TotalPagosFebrero
        
      }

      this.VentasTotales.push(MesFebrero)

      // Marzo
      let Marzo = resp.filter((p:any)=>p.MesPago==="Marzo"&& p.AnioPago===new Date().getFullYear())
      let TotalPagosMarzo=0
      if (Marzo.length===0){
        TotalPagosMarzo=0
      }

      else {

        Marzo.forEach(element => {
          TotalPagosMarzo=TotalPagosMarzo+ element.Pago
        });
      }
      let MesMarzo={
        "Mes":"Marzo",
        "Año":new Date().getFullYear(),
        "TotalPagos":TotalPagosMarzo
        
      }
      this.VentasTotales.push(MesMarzo)

      // Abril
      let Abril = resp.filter((p:any)=>p.MesPago==="Abril"&& p.AnioPago===new Date().getFullYear())
      let TotalPagosAbril=0
      if (Abril.length===0){
        TotalPagosAbril=0
      }

      else {

        Abril.forEach(element => {
          TotalPagosAbril=TotalPagosAbril+ element.Pago
        });
      }
      let MesAbril={
        "Mes":"Abril",
        "Año":new Date().getFullYear(),
        "TotalPagos":TotalPagosAbril
        
      }
      this.VentasTotales.push(MesAbril)


      // Mayo
      let Mayo = resp.filter((p:any)=>p.MesPago==="Mayo"&& p.AnioPago===new Date().getFullYear())
      let TotalPagosMayo=0
      if (Mayo.length===0){
        TotalPagosMayo=0
      }

      else {

        Mayo.forEach(element => {
          TotalPagosMayo=TotalPagosMayo+ element.Pago
        });
      }
      let MesMayo={
        "Mes":"Mayo",
        "Año":new Date().getFullYear(),
        "TotalPagos":TotalPagosMayo
        
      }
      this.VentasTotales.push(MesMayo)


      // Junio
      let Junio = resp.filter((p:any)=>p.MesPago==="Junio"&& p.AnioPago===new Date().getFullYear())
      let TotalPagosJunio=0
      if (Mayo.length===0){
        TotalPagosJunio=0
      }

      else {

        Junio.forEach(element => {
          TotalPagosJunio= TotalPagosJunio+ element.Pago
        });
      }
      let MesJunio={
        "Mes":"Junio",
        "Año":new Date().getFullYear(),
        "TotalPagos":TotalPagosJunio
        
      }
      this.VentasTotales.push(MesJunio)

      // Julio

      let Julio = resp.filter((p:any)=>p.MesPago==="Julio"&& p.AnioPago===new Date().getFullYear())
    
      let TotalPagosJulio=0
      if (Julio.length===0){
        TotalPagosJulio=0
      }
      else {
        Julio.forEach(element => {
         TotalPagosJulio=TotalPagosJulio+ element.Pago
       });

      }
      let MesJulio={
        "Mes":"Julio",
        "Año":new Date().getFullYear(),
        "TotalPagos":TotalPagosJulio
        
      }
      this.VentasTotales.push(MesJulio)

      // Agosto
      let Agosto = resp.filter((p:any)=>p.MesPago==="Agosto"&& p.AnioPago===new Date().getFullYear())
      let TotalPagosAgosto=0
      if (Agosto.length===0){
        TotalPagosAgosto=0
      }

      else {

        Agosto.forEach(element => {
          TotalPagosAgosto= TotalPagosAgosto+ element.Pago
        });
      }
      let MesAgosto={
        "Mes":"Agosto",
        "Año":new Date().getFullYear(),
        "TotalPagos":TotalPagosAgosto
        
      }
      this.VentasTotales.push(MesAgosto)

      // Septiembre

      let Septiembre = resp.filter((p:any)=>p.MesPago==="Septiembre"&& p.AnioPago===new Date().getFullYear())
      let TotalPagosSeptiembre=0
      if (Septiembre.length===0){
        TotalPagosSeptiembre=0
      }
      else {

        Septiembre.forEach(element => {
          TotalPagosSeptiembre=+ element.Pago
        });
      }
      let MesSeptiembre={
        "Mes":"Septiembre",
        "Año":new Date().getFullYear(),
        "TotalPagos":TotalPagosSeptiembre     
      }
      this.VentasTotales.push(MesSeptiembre)


       // Octubre

       let Octubre = resp.filter((p:any)=>p.MesPago==="Octubre"&& p.AnioPago===new Date().getFullYear())
       let TotalPagosOctubre=0
       if (Octubre.length===0){
        TotalPagosOctubre=0
       }
       else {
 
        Octubre.forEach(element => {
          TotalPagosOctubre=+ element.Pago
         });
       }
       let MesOctubre={
         "Mes":"Octubre",
         "Año":new Date().getFullYear(),
         "TotalPagos":TotalPagosOctubre     
       }
       this.VentasTotales.push(MesOctubre)

       // Noviembre

       let Noviembre = resp.filter((p:any)=>p.MesPago==="Noviembre"&& p.AnioPago===new Date().getFullYear())
       let TotalPagosNoviembre=0
       if (Noviembre.length===0){
        TotalPagosNoviembre=0
       }
       else {
 
        Noviembre.forEach(element => {
          TotalPagosNoviembre=+ element.Pago
         });
       }
       let MesNoviembre={
         "Mes":"Noviembre",
         "Año":new Date().getFullYear(),
         "TotalPagos":TotalPagosNoviembre     
       }
       this.VentasTotales.push(MesNoviembre)

       // Diciembre

       let Diciembre = resp.filter((p:any)=>p.MesPago==="Diciembre"&& p.AnioPago===new Date().getFullYear())
       let TotalPagosDiciembre=0
       if (Diciembre.length===0){
        TotalPagosDiciembre=0
       }
       else {
 
        Diciembre.forEach(element => {
          TotalPagosDiciembre=+ element.Pago
         });
       }
       let MesDiciembre={
         "Mes":"Diciembre",
         "Año":new Date().getFullYear(),
         "TotalPagos":TotalPagosDiciembre     
       }
       this.VentasTotales.push(MesDiciembre)
 

      



      this.VentasTotales.forEach((x: { TotalPagos: number;  Mes: any;   })=>{

        
          this.VentasSumarizadas= this.VentasSumarizadas+x.TotalPagos
      
       

        this.Ventas.push(x.TotalPagos);
        this.Meses.push(x.Mes);
        
        this.barChartLabels = this.Meses
        this.barChartData= [
          { data: this.Ventas, label: 'Ventas' },
        ];


       
        
 
      });
    })




     

  }

}
