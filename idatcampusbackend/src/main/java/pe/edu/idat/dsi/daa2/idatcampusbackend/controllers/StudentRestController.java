package pe.edu.idat.dsi.daa2.idatcampusbackend.controllers;

import org.springframework.web.bind.annotation.RestController;

import pe.edu.idat.dsi.daa2.idatcampusbackend.dto.StudentGetByIdResponse;
import pe.edu.idat.dsi.daa2.idatcampusbackend.dto.StudentInsertRequest;
import pe.edu.idat.dsi.daa2.idatcampusbackend.dto.StudentInsertResponse;
import pe.edu.idat.dsi.daa2.idatcampusbackend.dto.StudentPageable;
import pe.edu.idat.dsi.daa2.idatcampusbackend.dto.StudentPageableResponse;
import pe.edu.idat.dsi.daa2.idatcampusbackend.dto.StudentSorting;
import pe.edu.idat.dsi.daa2.idatcampusbackend.dto.StudentUpdateRequest;
import pe.edu.idat.dsi.daa2.idatcampusbackend.dto.StudentUpdateResponse;
import pe.edu.idat.dsi.daa2.idatcampusbackend.models.Student;
import pe.edu.idat.dsi.daa2.idatcampusbackend.services.StudentService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;



@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/v1/students")
public class StudentRestController {

    @Autowired
    private StudentService studentService;

    public StudentRestController(StudentService service){
        this.studentService = service;
    }

    @GetMapping()
    public List<Student> getAll(@RequestParam( required = false, defaultValue = "asc") String direction, @RequestParam(required = false, defaultValue = "id") String columnOrder) {
        StudentSorting sorting = new StudentSorting(columnOrder, direction);
        return studentService.getAll(sorting);
    }

    @GetMapping("/page")
    public ResponseEntity<StudentPageableResponse> getAllPageable(
        @RequestParam( required = false, defaultValue = "0") int pageNumber, 
        @RequestParam(required = false, defaultValue = "10") int pageSize,
        @RequestParam( required = false, defaultValue = "asc") String direction, 
        @RequestParam(required = false, defaultValue = "id") String columnOrder,
        @RequestParam(required = false, defaultValue = "") String filter) 
        {
        StudentPageable pageable = new StudentPageable(pageNumber, pageSize, columnOrder, direction, filter);
        Page<Student> response = studentService.getAllPageable(pageable);
        
        if(response == null){
            return ResponseEntity.badRequest().build();
        }
        
        return ResponseEntity.ok(StudentPageableResponse.toStudentPageableResponse(response));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<StudentGetByIdResponse> getById(@PathVariable Long id) {
        Student student = studentService.getById(id);
        if(student==null){
            return ResponseEntity.notFound().build();
        }
        if(student.getId()==0){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(StudentGetByIdResponse.toStudentGetByIdResponse(student));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<StudentInsertResponse> insert(@RequestBody StudentInsertRequest entity) {
        Student response = studentService.insert(StudentInsertRequest.toStudent(entity));
        if(response==null){
            return ResponseEntity.badRequest().build();
        }
        if(response.getId()==0){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(StudentInsertResponse.toStudentInsertResponse(response));
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentUpdateResponse> update(@PathVariable Long id, @RequestBody StudentUpdateRequest entity) {
        entity.setId(id);
        Student response=studentService.update(StudentUpdateRequest.toStudent(entity));
        if(response == null){
            return ResponseEntity.badRequest().build();
        }

        if(response.getId()==0){
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(StudentUpdateResponse.toStudentUpdateResponse(response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        boolean isDeleted = studentService.delete(id);
        if(!isDeleted){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok("Estudiante con id" + id + "ha sido eliminado correctamente");
    }
    
    
    
}
