import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { StudentData } from '../../models/student-data';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [MatFormFieldModule,
            RouterModule,
            FormsModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule
  ],
  templateUrl: './student-edit.component.html',
  styleUrl: './student-edit.component.scss'
})
export class StudentEditComponent implements OnInit, AfterViewInit{
  studentForm: FormGroup;
  title="Modificacion de Datos - Estudiante";
  id: string = "0";
  student: StudentData;

  constructor(private studentService: StudentService, private activatedRoute: ActivatedRoute, private router: Router){ 
    this.student= {id:0} as StudentData;
    this.studentForm=new FormGroup({
      username: new FormControl({value:'', disabled:true}, [Validators.required]),
      password: new FormControl('', [Validators.required]),
      nid: new FormControl({value:'', disabled:true}, [Validators.required]),
      name: new FormControl('',[Validators.required]),
      lastname: new FormControl('',[Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required])
    })
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      this.id= params.get('id')!;
      console.log(this.id);
    });
  }

  ngAfterViewInit(): void {
      this.studentService.getById(this.id)
      .subscribe(
        response =>{
          this.student=response;
          this.studentForm.get('name')?.setValue(response.name);
          this.studentForm.get('lastname')?.setValue(response.lastname);
          this.studentForm.get('phoneNumber')?.setValue(response.phoneNumber);
          this.studentForm.get('email')?.setValue(response.email);
          this.studentForm.get('username')?.setValue(response.username);
          this.studentForm.get('password')?.setValue(response.password);
          this.studentForm.get('nid')?.setValue(response.nid);
        },
        error =>{
          console.log('Error posting data', error);
        }
      )
  }

  onStudentEditSubmit(){
    if(!this.studentForm.valid){
      console.log("Error en la validacion de datos");
      return;
    }

    let updateStudent= this.studentForm.value as StudentData;
    updateStudent.id= Number(this.id);
    updateStudent.nid= this.student.nid;
    updateStudent.username= this.student.username;
    updateStudent.state = '1'; 

    this.studentService.update(updateStudent)
      .subscribe(
        response=>{
          console.log('El usuario ha sido modificado correctamente', response)
          this.router.navigate(['/students']);
        },
        error=>{
          console.log('Error posting data', error);
        }
      )

      console.log(this.studentForm.getRawValue());
      this.router.navigate(['/students'])
  }
}
