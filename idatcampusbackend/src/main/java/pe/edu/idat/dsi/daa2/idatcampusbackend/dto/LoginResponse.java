package pe.edu.idat.dsi.daa2.idatcampusbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class LoginResponse {
    String username;
    String token;
    String loginDate;
    
}
