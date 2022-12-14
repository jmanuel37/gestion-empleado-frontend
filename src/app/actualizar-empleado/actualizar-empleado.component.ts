import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import  swal  from 'sweetalert2';
import { EmpleadoService } from './../empleado.service';
import { Empleado } from './../empleado';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-actualizar-empleado',
  templateUrl: './actualizar-empleado.component.html',
  styleUrls: ['./actualizar-empleado.component.css']
})
export class ActualizarEmpleadoComponent implements OnInit {

  id:number;
  empleado:Empleado = new Empleado();
  constructor(private empleadoService:EmpleadoService,private router:Router,private route:ActivatedRoute) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.empleadoService.obtenerEmpleadoPorId(this.id).subscribe((dato: any) =>{
      this.empleado = dato;
    },(error: any) => console.log(error));
  }

  irAlaListaDeEmpleados(){
    this.router.navigate(['/empleados']);
    Swal.fire('Empleado actualizado',`El empleado ${this.empleado.nombre} ha sido actualizado con exito`,`success`);

  }

  onSubmit(){
    this.empleadoService.actualizarEmpleado(this.id,this.empleado).subscribe(dato => { 
      this.irAlaListaDeEmpleados();
    },error => console.log(error));
  }


  confirmBox(){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  alertConfirmation() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Removed!', 'Product removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
  }

  tinyAlert() {
    Swal.fire('Hey there!');
  }
  successNotification() {
    Swal.fire('Hi', 'We have been informed!', 'success');
  }

}
