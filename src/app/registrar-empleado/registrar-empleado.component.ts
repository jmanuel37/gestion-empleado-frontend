import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import swal from 'sweetalert2';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-registrar-empleado',
  templateUrl: './registrar-empleado.component.html',
  styleUrls: ['./registrar-empleado.component.css']
})


export class RegistrarEmpleadoComponent implements OnInit {

  empleado :Empleado = new Empleado();
  constructor(private empleadoServicio:EmpleadoService,private router:Router) { }

  ngOnInit(): void {
    //  console.log(this.empleado);
  }
    guardarEmpleado(){
      this.empleadoServicio.registrarEmpleado(this.empleado).subscribe((dato: any) =>{
        console.log(dato);
        this.irAlaListaDeEmpleados();
      },(error: any) => console.log(error));
      
    }
    irAlaListaDeEmpleados(){
      this.router.navigate(['/empleados']);
      swal('Empleado registrado',`El empleado ${this.empleado.nombre} ha sido registrado con exito`,`success`);
    }

  onSubmit(){
    //  console.log(this.empleado);
    this.guardarEmpleado();
  }


}
