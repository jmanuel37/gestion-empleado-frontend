import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';

@Component({
  selector: 'app-empleado-detalle',
  templateUrl: './empleado-detalle.component.html',
  styleUrls: ['./empleado-detalle.component.css']
})
export class EmpleadoDetalleComponent implements OnInit {
  id:number;
  empleado:Empleado;
  constructor(private router:ActivatedRoute,private empleadoServicio:EmpleadoService) { }
 
  ngOnInit(): void {
    this.id=this.router.snapshot.params['id'];
    this.empleado=new Empleado();
    this.empleadoServicio.obtenerEmpleadoPorId(this.id).subscribe((dato: any) =>{
    this.empleado=dato;
  });
  }

}
