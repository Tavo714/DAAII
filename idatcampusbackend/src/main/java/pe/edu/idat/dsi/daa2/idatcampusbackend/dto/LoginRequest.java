package pe.edu.idat.dsi.daa2.idatcampusbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class LoginRequest {
    String username;
    String password;
}
