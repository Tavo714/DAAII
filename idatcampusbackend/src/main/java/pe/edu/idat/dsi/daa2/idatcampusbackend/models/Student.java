package pe.edu.idat.dsi.daa2.idatcampusbackend.models;


import com.fasterxml.jackson.annotation.JsonIgnore;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "student")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "lastname")
    private String lastname;
    @Column(name = "nid")
    private String nid;
    @Column(name = "phone_number")
    private String phoneNumber;
    @Column(name = "email")
    private String email;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "state")
    private String state;
    @OneToOne()
    @JoinColumn(name = "person_id")
    private Person person;

    
    //Source Actions... -> Generate Constructors -> Seleccionamos todos menos "Person"
    public Student(Long id, String name, String lastname, String nid, String phoneNumber, String email, String username,
            String password, String state) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.nid = nid;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.username = username;
        this.password = password;
        this.state = state;
    }



    public Student updateProperties(Student model) {
        name = model.name;
        lastname = model.lastname;
        nid = model.nid;
        phoneNumber = model.phoneNumber;
        password = model.password;
        email = model.email;
        return this;
    }

}
