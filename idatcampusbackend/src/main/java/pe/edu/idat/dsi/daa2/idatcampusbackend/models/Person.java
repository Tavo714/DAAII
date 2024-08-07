package pe.edu.idat.dsi.daa2.idatcampusbackend.models;

import java.util.Date;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "person")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "lastname")
    private String lastname;
    @Column(name = "nid")
    private String nid;
    @Column(name = "birthday")
    private Date birthday;
    @Column(name = "state")
    private String state;

    @JsonBackReference
    @OneToOne(mappedBy = "person")
    //@RestResource(path = "personStudent", rel="student")
    private Student student;

    @JsonManagedReference
    @OneToMany(mappedBy = "person")
    private List<Address> addresses;

    @JsonManagedReference
    @ManyToMany(mappedBy = "people")
    private List<Course> courses;
}
