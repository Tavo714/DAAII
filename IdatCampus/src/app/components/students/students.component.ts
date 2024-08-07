import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
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
import { catchError, merge, of, startWith, switchMap } from 'rxjs';




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
  dataSource: MatTableDataSource<StudentData>;
  filter: StudentSearchFilter;
  isLoadingResults= false;


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;


  
constructor(public dialog: MatDialog, private router: Router, private studentService: StudentService){
  this.filter= new StudentSearchFilter(0,10,"id","asc");
  this.dataSource = new MatTableDataSource([] as Item[]);
}
  ngOnInit(): void {
    this.studentService.getAllPageable(this.filter)
      .subscribe(
        response=>{
          console.log(response.items);
          this.dataSource.data= response.items;
        },
        error =>{
          console.log("Ocurrio un error al recuperar los estudiantes =>",error);

        }
      )
  }

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator!;
  this.dataSource.sort = this.sort!;

  this.dataSource.sort.sortChange.subscribe(()=>(this.dataSource.paginator!!.pageIndex=0));

  merge(this.dataSource.sort.sortChange, this.dataSource.paginator.page)
  .pipe(
    startWith({}),
    switchMap(()=>{
      this.isLoadingResults=true;

      this.filter.pageNumber= this.dataSource.paginator!!.pageIndex;
      this.filter.pageSize= this.dataSource.paginator!!.pageSize;
      this.filter.column= this.sort!!.active;

      return this.studentService.getAllPageable(this.filter).pipe(catchError(()=>of({items:[] as Item[]} as StudentPage)))

    })
  )
  .subscribe(data=> {
    console.log(data.items);    
    this.dataSource.data=data.items;
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
      console.log(result);
      console.log('Eliminar el siguiente estudiante');
      console.log(student);
    });

    
  }

populateStudents(){
  let students: StudentData[] = [
    {id: 6, name:'Karla', lastname: 'Lozada Mejia', nid: '36542768', phoneNumber:'555666777'} as StudentData
    //new StudentData(1,"01","Julio","Leonardo","11122233","av. blablabla", "1"),
    //new StudentData(1,"01","Julio","Leonardo","11122288","av. blablabla", "1"),
    //new StudentData(1,"01","Julio","Leonardo","11122277","av. blablabla", "1"),
    //new StudentData(1,"01","Julio","Leonardo","11122253","av. blablabla", "1"),
    //new StudentData(1,"01","Julio","Leonardo","11122233","av. blablabla", "1"),
    //new StudentData(1,"01","Julio","Leonardo","11122233","av. blablabla", "1"),
    //new StudentData(1,"01","Julio","Leonardo","11122233","av. blablabla", "1")
  ];
  return students;
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
