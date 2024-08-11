package pe.edu.idat.dsi.daa2.idatcampusbackend.controllers;


import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import pe.edu.idat.dsi.daa2.idatcampusbackend.dto.LoginRequest;
import pe.edu.idat.dsi.daa2.idatcampusbackend.dto.LoginResponse;


@Controller
public class HomeController {
    private final AuthenticationManager authenticationManager;

    public HomeController(AuthenticationManager authenticationManager){
        this.authenticationManager = authenticationManager;
    }

    @GetMapping("/")
    public String redirectToStudentView() {
        return "redirect:/students";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest login) {
        
        try{

            Date LoginDate= new Date();
            Instant instant = LoginDate.toInstant();
            DateTimeFormatter formatter = DateTimeFormatter.ISO_INSTANT;        
    
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword())
                );
    
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return ResponseEntity.ok(new LoginResponse(login.getUsername(),"", formatter.format(instant)));

        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario y/o clave invalidos");
        }
        

    }
    
    
}
