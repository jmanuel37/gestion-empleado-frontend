import  swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {

  // empleados:Empleado[];
  empleados:Empleado[];
  // constructor(private empleadoServicio:EmpleadoService) { }
  constructor(private empleadoServicio:EmpleadoService,private router:Router) { }
  ngOnInit(): void { 
   this.obtenerEmpleados();
  }
  
  actualizarEmpleado(id:number){
    this.router.navigate(['actualizar-empleado',id]);

  }
  
  eliminarEmpleado1(id:number){
    this.empleadoServicio.eliminarEmpleado(id).subscribe((dato: any) =>{
      console.log(dato);
      this.obtenerEmpleados();

    });
 
  }
  private obtenerEmpleados(){
   // this.empleadoServicio.obtenerListaDeEmpleados().subscribe(dato =>{
     // this.empleados=dato;

    //});obtenerListaDeEmpleados
    this.empleadoServicio.obtenerListaDeEmpleados().subscribe((dato: any) =>{
      this.empleados=dato;
    });
  }

  verDetallesDelEmpleado(id:number){
    this.router.navigate(['empleado-detalles',id]);

  }

  eliminarEmpleado(id:number){
    swal({
      title: '¿Estas seguro?',
      text: "Confirma si deseas eliminar al empleado",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si , elimínalo',
      cancelButtonText: 'No, cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        this.empleadoServicio.eliminarEmpleado(id).subscribe(dato => {
          console.log(dato);
          this.obtenerEmpleados();
          swal(
            'Empleado eliminado',
            'El empleado ha sido eliminado con exito',
            'success'
          )
        })
      }
    })
  }

}
