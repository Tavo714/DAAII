package pe.edu.idat.dsi.daa2.idatcampusbackend.controllers;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import pe.edu.idat.dsi.daa2.idatcampusbackend.models.Student;
import pe.edu.idat.dsi.daa2.idatcampusbackend.services.StudentService;



@Controller
@RequestMapping("/students")
public class StudentController {
    public boolean hasCreated;
    public boolean hasUpdated;
    public boolean hasDeleted;
    public Student studentUpdated;
    public Student studentCreated;
    
    @Autowired
    private StudentService studentService;

    public StudentController(StudentService studentService){
        restartVariables();
        this.studentService = studentService;
    }

    private void restartVariables(){
        studentCreated = new Student();
        studentUpdated = new Student();
        hasCreated = false;
        hasUpdated = false;
        hasDeleted = false;
    }

    @GetMapping()
    public String goToStudentIndexView(Model model){
        var students = studentService.getAll();
        model.addAttribute("pageTitle", "Estudiantes");
        model.addAttribute("hasCreated", hasCreated);
        model.addAttribute("hasUpdated", hasUpdated);
        model.addAttribute("hasDeleted", hasDeleted);
        model.addAttribute("studentCreated", studentCreated);
        model.addAttribute("studentUpdated", studentUpdated);
        model.addAttribute("headers", populateTableStudentHeaders());
        model.addAttribute("students", students);
        restartVariables();
        return "students";
    }

    @GetMapping("/new")
    public String goToCreateView(Model model){
        Student toCreate = new Student();
        model.addAttribute("pageTitle", "Registro de Estudiante");
        model.addAttribute("currentStudent", toCreate);
        return "student-create";
    }

    @GetMapping("/edit/{id}")
    public String goToEditView(@PathVariable Long id, Model model){
        Student toUpdate = studentService.getById(id);
        model.addAttribute("pageTitle", "Estudiante - "+ toUpdate.getName() + " "+ toUpdate.getLastname());
        model.addAttribute("currentStudent", toUpdate);
        return "student-edit";
    }

    @PostMapping("/edit")
    public String edit(@ModelAttribute Student data, Model model){
        hasUpdated = true;
        studentUpdated = studentService.update(data);
        return "redirect:/students";
    }

    @PostMapping("/save")
    public String save(@ModelAttribute Student data, Model model){
        hasCreated = true;
        studentCreated = studentService.insert(data);
        return "redirect:/students";
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        boolean deleted = studentService.delete(id);
        if(!deleted) return ResponseEntity.badRequest().build();
        hasDeleted = true;
        return ResponseEntity.ok("El usuario con id "+ id + " ha sido eliminado correctamente") ;
    }
    

    public List<String> populateTableStudentHeaders(){
        List<String> headers = new ArrayList<>();
        headers.add("Id");
        headers.add("Nombres");
        headers.add("Apellidos");
        headers.add("DNI");
        headers.add("Nro Telefono");
        headers.add("Correo");
        headers.add("Acciones");
        return headers;
    }

}
