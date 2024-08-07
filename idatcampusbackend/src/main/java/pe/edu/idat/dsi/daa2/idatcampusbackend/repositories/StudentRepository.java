package pe.edu.idat.dsi.daa2.idatcampusbackend.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import pe.edu.idat.dsi.daa2.idatcampusbackend.models.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query(value = "SELECT s FROM Student s WHERE state = '1'")
    List<Student> findAllActiveStudents(Sort sorting);

    @Query(value = "SELECT s FROM Student s WHERE state = '1' and (s.name LIKE %:filter% OR s.lastname LIKE %:filter% OR s.nid LIKE %:filter% OR s.username LIKE %:filter%)")
    Page<Student> findAllPageableActiveStudents(Pageable paging, @Param("filter") String filter);

    @Query(value = "SELECT * FROM student s WHERE s.state = '0'", nativeQuery = true)
    List<Student> findAllNativeActiveStudents();
}
