package pe.edu.idat.dsi.daa2.idatcampusbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class StudentPageable {
    private int pageNumber;
    private int pageSize;
    private String column;
    private String direction;
    private String filter;
}
