package br.edu.ufape.lmts.sementes.controller.dto.response;

import java.time.LocalDate;

import org.modelmapper.ModelMapper;

import br.edu.ufape.lmts.sementes.config.SpringApplicationContext;
import br.edu.ufape.lmts.sementes.model.Postavel;
import br.edu.ufape.lmts.sementes.model.Usuario;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Getter @Setter @NoArgsConstructor
public class PostResponse  {
	private Long id;
	private String texto;
	private Usuario autor;
	private boolean visibilidade;
	private String categoria;
	private String titulo;
	private List<String> imagens;
	private LocalDate data;



	public PostavelResponse(Postavel obj) {
		ModelMapper modelMapper = (ModelMapper) SpringApplicationContext.getBean("modelMapper");
		modelMapper.map(obj, this);
	}

}