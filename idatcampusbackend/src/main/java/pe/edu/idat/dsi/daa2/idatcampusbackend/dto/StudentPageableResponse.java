package pe.edu.idat.dsi.daa2.idatcampusbackend.dto;

import java.util.List;

import org.springframework.data.domain.Page;

import lombok.AllArgsConstructor;
import lombok.Data;
import pe.edu.idat.dsi.daa2.idatcampusbackend.models.Student;

@AllArgsConstructor
@Data
public class StudentPageableResponse {

    private int totalItems;
    private int totalPages;
    private List<StudentPageableItemResponse> items;

    public static StudentPageableResponse toStudentPageableResponse(Page<Student> students){
        return new StudentPageableResponse(
            (int)students.getTotalElements(),
            students.getTotalPages(),
            students.getContent()
            .stream()
            .map(StudentPageableItemResponse::toStudentPageableItemResponse)
            .toList()
            );
    }
    
}
