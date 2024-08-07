package pe.edu.idat.dsi.daa2.idatcampusbackend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


//Aqui me quede a las 19:30 (Ver toda la clase)
@Configuration
public class WebConfig implements WebMvcConfigurer{
    
    //Click derecho -> Source Action... -> Override/Implement Methods -> addCoreMappings
    @Override
    public void addCorsMappings(CorsRegistry registry) {
       registry.addMapping("/**") // para que lo aplique a todas las rutas
       .allowedOrigins("http://localhost:4200") // origen de mi aplicacion Angular (puede ser *)
       .allowedMethods("GET", "POST", "PUT", "DELETE","OPTIONS") //"PATCH" es para actualizacion parcial del objeto. "OPTIONS" es para certificados
       .allowedHeaders("*")
       .allowCredentials(false); // "false" porque aun no estamos usando credenciales
    }
    
}
