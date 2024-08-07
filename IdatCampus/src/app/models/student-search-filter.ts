export class StudentSearchFilter{

    //Los copio de "student-data.ts", los cambia como esta en el backend
    //dto -> studentPageable.java

    pageNumber: number;
    pageSize: number;
    column: string;
    direction: string;   
    filter: string; 

    constructor(pageNumber:number, pageSize:number, column: string, direction: string, filter: string){
        this.pageNumber=pageNumber;
        this.pageSize=pageSize;
        this.column=column;
        this.direction=direction;
        this.filter=filter;
        }
}