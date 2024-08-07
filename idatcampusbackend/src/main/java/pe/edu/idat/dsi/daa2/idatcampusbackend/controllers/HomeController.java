package pe.edu.idat.dsi.daa2.idatcampusbackend.controllers;

import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;




@Controller
public class HomeController {

    @GetMapping("/")
    public String redirectToStudentView() {
        return "redirect:/students";
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(Authentication authentication) {
        return ResponseEntity.ok("User logged");
    }  
    
    
}
