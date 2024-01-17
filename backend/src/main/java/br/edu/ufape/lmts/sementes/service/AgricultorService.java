package br.edu.ufape.lmts.sementes.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.ufape.lmts.sementes.model.Agricultor;
import br.edu.ufape.lmts.sementes.repository.AgricultorRepository;

import br.edu.ufape.lmts.sementes.service.exception.ObjectNotFoundException;
import br.edu.ufape.lmts.sementes.service.exception.EmailExistsException;


@Service
public class AgricultorService implements AgricultorServiceInterface {
	@Autowired
	private AgricultorRepository repository;
	@Autowired
	private UsuarioService usuario;
	
	public Agricultor saveAgricultor(Agricultor agricultor) throws EmailExistsException {
		
		usuario.saveUsuario(agricultor);
		return repository.save(agricultor);
	}

	public Agricultor updateAgricultor(Agricultor transientObject) {
		return repository.save(transientObject);
	}

	public Agricultor findAgricultorById(long id) {
		return repository.findById(id).orElseThrow( () -> new ObjectNotFoundException("It doesn't exist Agricultor with id = " + id));
	}

	public List<Agricultor> getAllAgricultor(){
		return repository.findAll();
	}

	@Transactional
	public void deleteAgricultor(Agricultor persistentObject){
		this.deleteAgricultor(persistentObject.getId());
		
	}
	
	@Transactional
	public void deleteAgricultor(long id){
		Agricultor obj = repository.findById(id).orElseThrow( () -> new ObjectNotFoundException("It doesn't exist Agricultor with id = " + id));
		repository.delete(obj);
	}

	public void validateAgricultor(long id) {
		findAgricultorById(id);
	}			
}