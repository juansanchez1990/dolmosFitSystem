import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from 'app/services/clientes.service';
import { ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2'
import { ProductoService } from 'app/services/producto.service';

@Component({
  selector: 'app-crear-venta-producto',
  templateUrl: './crear-venta-producto.component.html',
  styleUrls: ['./crear-venta-producto.component.css']
})
export class CrearVentaProductoComponent implements OnInit {

  nombreProducto:any
  public search = "";
  Usuario:any
  Total:number=0
  TotalGanancia:number=0
  PrecioCompra:number=0
  Productos:any = []
  ListadoProductos=[] as any
  numeroFactura:any
  idFactura
  public pagoForm: FormGroup;
  constructor(private cs:ClientesService,
    private ps:ProductoService,
    public rutaActiva: ActivatedRoute) { }
  mesesNombres = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];

  ngOnInit() {
    this.Usuario = JSON.parse(localStorage.getItem('usuario'));

    let ProductoStorage= JSON.parse(localStorage.getItem('ListaProductos'));
    if(ProductoStorage===null){

      this.ListadoProductos=[]
    }
    else {
      

      this.ListadoProductos=JSON.parse(localStorage.getItem('ListaProductos'))
      this.Total=0
      this.ListadoProductos.forEach(producto => {
        this.Total = this.Total+(producto.Precio*producto.Cantidad)
        
      });
    }
    this.getProductos()
    this.cs.getNumeroFacturaActual().subscribe(num=>{
      let PedidosCollection: any = []
      PedidosCollection= num
      this.numeroFactura =PedidosCollection[0]?.NumeroFacturas
      this.idFactura=PedidosCollection[0]?.id
     
   
    
    })

    this.pagoForm = new FormGroup({
      NombreProducto: new FormControl('', Validators.required ),
      Codigo: new FormControl('', Validators.required ),
      Precio: new FormControl('', Validators.required ),
      Cantidad: new FormControl('', Validators.required )

    })
  }

  getProductos(){
    this.ps.getProductos().subscribe((resp:any)=>{
      this.nombreProducto = resp.map(a=>a.NombreProducto)
 
    })
   }

  handleResultSelected(result) {
    this.search = result;
    this.ps.getProductos().subscribe((resp:any)=>{
      this.Productos = resp.filter(p=>p.NombreProducto===this.search)
   
      this.pagoForm.get('NombreProducto').setValue(this.Productos[0].NombreProducto)
      this.pagoForm.get('Codigo').setValue(this.Productos[0].Codigo)
      this.pagoForm.get('Precio').setValue(this.Productos[0].PrecioVenta)
      this.PrecioCompra  = this.Productos[0].PrecioCompra
      this.search= ' '
    })
  
  }
  buscarPorCodigo(codigo) {
    this.ps.getProductos().subscribe((resp:any)=>{
      this.Productos = resp.filter(p=>p.Codigo===codigo)
      if (this.Productos.length===0){

        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Producto no encontrado',
          showConfirmButton: false,
          timer: 1000
        })
      }
      else {

        this.pagoForm.get('NombreProducto').setValue(this.Productos[0].NombreProducto)
        this.pagoForm.get('Codigo').setValue(this.Productos[0].Codigo)
        this.pagoForm.get('Precio').setValue(this.Productos[0].PrecioVenta)
        this.PrecioCompra  = this.Productos[0].PrecioCompra
      }
     
      const inputField = document.getElementById("name") as HTMLInputElement | null;
      inputField.value=" "
     
    })
  
  }

  enviarProductoCart(){
    let ProductoStorage= JSON.parse(localStorage.getItem('ListaProductos'));
    if (ProductoStorage===null){
      let productoEnviar={
        NombreProducto: this.pagoForm.get('NombreProducto').value,
        Codigo: Number(this.pagoForm.get('Codigo').value),
        Cantidad: Number(this.pagoForm.get('Cantidad').value),
        Precio: this.pagoForm.get('Precio').value,
        PrecioCompra:this.PrecioCompra
      }
   
      this.ListadoProductos.push(productoEnviar);
      localStorage.setItem("ListaProductos", JSON.stringify(this.ListadoProductos));
      this.PrecioCompra =0

    }

    else {
      this.ListadoProductos=ProductoStorage
      let productoEnviar={
        NombreProducto: this.pagoForm.get('NombreProducto').value,
        Codigo: this.pagoForm.get('Codigo').value,
        Cantidad: Number(this.pagoForm.get('Cantidad').value),
        Precio: Number(this.pagoForm.get('Precio').value),
        PrecioCompra:this.PrecioCompra
      }
      this.ListadoProductos.push(productoEnviar);
      localStorage.setItem("ListaProductos", JSON.stringify(this.ListadoProductos));

    }

    this.ListadoProductos=JSON.parse(localStorage.getItem('ListaProductos'))
    this.Total=0

    this.ListadoProductos.forEach(producto => {
      this.Total = this.Total+(producto.Precio*producto.Cantidad)
     
      
    });
    this.pagoForm.reset()

  }
deleteProducto(i){
  this.ListadoProductos.splice(i,1);
  this.Total=0
  this.ListadoProductos.forEach(producto => {
    this.Total = this.Total+(producto.Precio*producto.Cantidad)
    
  });
  localStorage.setItem("ListaProductos", JSON.stringify(this.ListadoProductos));

}

registraCompra(){

  Swal.fire({
    title: '¿Desea efectuar la compra?',
    showDenyButton: true,
    confirmButtonText: 'Si',
    denyButtonText: `No`,
  }).then((result) => {
    if (result.isConfirmed) {
      this.TotalGanancia=0
      this.ListadoProductos.forEach(producto => {
        this.TotalGanancia = this.TotalGanancia+((producto.Precio*producto.Cantidad)-(producto.PrecioCompra*producto.Cantidad))
       
        
      });
      let compra ={
        Usuario:this.Usuario[0].Nombre,
        Mes:this.mesesNombres[new Date().getMonth()],
        FechaPago:new Date().getFullYear()+'-'+0+(new Date().getMonth()+1)+'-'+new Date().getDate(),
        AnioPago:new Date().getFullYear(),
        NumeroFactura:('00'+this.numeroFactura).toString(),
        Productos:this.ListadoProductos,
        Total:this.Total,
        Ganancia:this.TotalGanancia
    
      }
      this.ps.crearVenta(compra,this.idFactura,this.numeroFactura).then(resp=>{
        
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro Exitoso',
          showConfirmButton: false,
          timer: 1000
        })
        localStorage.removeItem('ListaProductos');
        this.ListadoProductos=[]
        this.Total=0
    
      })
    } else if (result.isDenied) {

    }
  })

}

}
