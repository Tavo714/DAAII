import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { StudentData } from '../../models/student-data';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteItemDialogComponent } from '../delete-item-dialog/delete-item-dialog.component';
import { Item, StudentPage } from '../../models/student-page';
import { StudentService } from '../../services/student.service';
import { StudentSearchFilter } from '../../models/student-search-filter';
import { catchError, fromEvent, merge, of, startWith, switchMap } from 'rxjs';




@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
            RouterModule,
            MatFormFieldModule,
            MatInputModule,   
            MatTableModule, 
            MatSortModule, 
            MatPaginatorModule,
            MatIconModule,
            MatButtonModule],

  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit, AfterViewInit{

  title= "Estudiantes"
  displayedColumns=['id','username','name','lastname','nid','email','actions'];
  dataSource: Item[];
  filter: StudentSearchFilter;
  isLoadingResults= false;
  totalItems;


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild('input', {static: true}) filterInput: ElementRef | undefined;


  
constructor(public dialog: MatDialog, private router: Router, private studentService: StudentService){
  this.filter= new StudentSearchFilter(0,10,"id","asc","");
  this.dataSource = [] as Item[];
  this.totalItems= 0;
}
  ngOnInit(): void {
    this.studentService.getAllPageable(this.filter)
      .subscribe(
        response=>{
          console.log(response.items);
          this.totalItems= response.totalItems;
          this.dataSource= response.items;
        },
        error =>{
          console.log("Ocurrio un error al recuperar los estudiantes =>",error);

        }
      )
  }

ngAfterViewInit() {  

  merge(
    this.sort!!.sortChange, 
    this.paginator!!.page,
    fromEvent(this.filterInput?.nativeElement, 'keyup')
  )
  .pipe(
    startWith({}),
    switchMap(()=>{
      this.isLoadingResults=true;

      this.filter.pageNumber= this.paginator!!.pageIndex;
      this.filter.pageSize= this.paginator!!.pageSize;
      this.filter.column= this.sort!!.active;
      this.filter.direction= this.sort!!.direction;
      this.filter.filter= this.filterInput?.nativeElement.value.trim().toLowerCase();

      return this.studentService.getAllPageable(this.filter).pipe(catchError(()=>of({items:[] as Item[]} as StudentPage)))

    })
  )
  .subscribe(data=> {
    this.totalItems=data.totalItems; 
    this.dataSource=data.items;
  });

}

editStudent(student: StudentData){
  this.router.navigate(['students/'+student.id]);
}

deleteStudent(student: StudentData){  
    let deleteDialogRef = this.dialog.open(DeleteItemDialogComponent, {
      width: '300px',
      data: {
        title: 'Eliminar Estudiante',
        message: `Esta seguro que desea eliminar el registro del estudiante ${student.name} ${student.lastname}?`
      }
    });

    deleteDialogRef.afterClosed().subscribe(result =>{
     
      if(result.action === 'cancel'){
        return;
      }
      this.studentService.delete(student.id)
      .subscribe(
        response=>{
          console.log('El usuario ha sido eliminado correctamente', response)
          window.location.reload();          
        },
        error=>{
          console.log('Error eliminando al usuario', error);
        }
      )
    });

    
  }



}
