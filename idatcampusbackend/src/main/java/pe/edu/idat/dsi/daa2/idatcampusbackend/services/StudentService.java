
package pe.edu.idat.dsi.daa2.idatcampusbackend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import pe.edu.idat.dsi.daa2.idatcampusbackend.dto.StudentPageable;
import pe.edu.idat.dsi.daa2.idatcampusbackend.dto.StudentSorting;
import pe.edu.idat.dsi.daa2.idatcampusbackend.models.Student;
import pe.edu.idat.dsi.daa2.idatcampusbackend.repositories.StudentRepository;

@Service
public class StudentService {

     @Autowired
    private StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository){
        this.studentRepository = studentRepository;
    }

    public Student getById(Long id){
        Optional<Student> response = studentRepository.findById(id);
        if(!response.isPresent()){
            return null;
        }
        return response.get();
    }

    public List<Student> getAll(){
        return studentRepository.findAll();
    }

    public List<Student> getAll(StudentSorting sorting){
        Sort studentSorting = Sort.by(sorting.getDirection().equals("asc")? Direction.ASC:Direction.DESC,sorting.getColumn());
        return studentRepository.findAllActiveStudents(studentSorting);
    }

    public Page<Student> getAllPageable(StudentPageable pageable){
        Sort studentSorting = Sort.by(pageable.getDirection().equals("asc")? Direction.ASC:Direction.DESC,pageable.getColumn());
        Pageable studentPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), studentSorting);
        return studentRepository.findAllPageableActiveStudents(studentPageable, pageable.getFilter());
    }

    public Student insert(Student model){
        Student response = studentRepository.saveAndFlush(model);
        if(response.getId() == 0) {
            return null;
        }
        return response;
    }

    public Student update(Student model){
        Optional<Student> response = studentRepository.findById(model.getId());
        if(!response.isPresent()) {
            return null;
        }
        Student entityToUpdate = response.get();
        entityToUpdate = entityToUpdate.updateProperties(model);
        entityToUpdate = studentRepository.saveAndFlush(entityToUpdate);
        return entityToUpdate;
    }

    public boolean delete(Long id){
        studentRepository.deleteById(id);
        return true;
    }

}
