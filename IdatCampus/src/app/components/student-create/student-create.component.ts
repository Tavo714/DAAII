import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { StudentData } from '../../models/student-data';

@Component({
  selector: 'app-student-create',
  standalone: true,
  imports: [FormsModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            RouterModule,
            MatButtonModule,
            MatInputModule
  ],
  templateUrl: './student-create.component.html',
  styleUrl: './student-create.component.scss'
})
export class StudentCreateComponent {

  studentForm: FormGroup;
  title="Registro de Estudiante";

  constructor(private router: Router, private studentService: StudentService){ 
    this.studentForm=new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      nid: new FormControl('', [Validators.required]),
      name: new FormControl('',[Validators.required]),
      lastname: new FormControl('',Validators.required),
      phoneNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required])
    })
  }


  onStudentCreateSubmit(){
    if(!this.studentForm.valid){
      console.log("Error en la validacion de datos");
      return;
    }  
    
    let student= this.studentForm.value as StudentData;
    student.state = '1';  
    this.studentService.create(this.studentForm.value as StudentData)
      .subscribe(
        response=>{
          console.log('El usuario ha sido registrado correctamente', response)
          this.router.navigate(['/students']);
        },
        error=>{
          console.log('Error posting data', error)
        }
      )

    this.router.navigate(['/students']);
  }

}
