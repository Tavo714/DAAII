package pe.edu.idat.dsi.daa2.idatcampusbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import pe.edu.idat.dsi.daa2.idatcampusbackend.models.Student;

@AllArgsConstructor
@Data
public class StudentUpdateResponse {

    private Long id;
    private String name;
    private String lastname;
    private String nid;
    private String phoneNumber;
    private String email;
    private String username;
    private String password;
    private String state;

    public static StudentUpdateResponse toStudentUpdateResponse(Student student){
        return new StudentUpdateResponse(
            student.getId(),
            student.getName(),
            student.getLastname(),
            student.getNid(),
            student.getPhoneNumber(),
            student.getEmail(),
            student.getUsername(),
            student.getPassword(),
            student.getState());
    }
    
}
