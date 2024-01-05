package br.edu.ufape.lmts.sementes.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import br.edu.ufape.lmts.sementes.enums.TipoUsuario;
import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString
public abstract class Usuario implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@EqualsAndHashCode.Include
	private Long id;
	private String nome;
	@Column(unique = true)
	private String email;
	private String senha;
	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@ToString.Exclude
	private Endereco endereco;
	private String rg;
	private String cpf;
	private LocalDate dataNascimento;
	private String contato;
	private String imagem;
	private String nomePai;
	private String nomeMae;
	private String nis;
	private String tituloEleitor;
	private String sexo;
	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@ToString.Exclude
	private Conjuge conjuge;
	@OneToMany
	@JoinColumn(name = "usuario_id")
	@ToString.Exclude
	private List<Postavel> postavel;
	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "roles")
	@Enumerated(EnumType.STRING)
	private Set<TipoUsuario> roles;

	public Usuario(Long id, String nome, String email, String senha, Endereco endereco, String rg, String cpf,
			LocalDate dataNascimento, String contato, String imagem, String nomePai, String nomeMae, String nis,
			String tituloEleitor, String sexo, Conjuge conjuge, List<Postavel> postavel) {
		this.id = id;
		this.nome = nome;
		this.email = email;
		this.senha = senha;
		this.endereco = endereco;
		this.rg = rg;
		this.cpf = cpf;
		this.dataNascimento = dataNascimento;
		this.contato = contato;
		this.imagem = imagem;
		this.nomePai = nomePai;
		this.nomeMae = nomeMae;
		this.nis = nis;
		this.tituloEleitor = tituloEleitor;
		this.sexo = sexo;
		this.conjuge = conjuge;
		this.postavel = postavel;
		this.roles = new HashSet<>();
		this.roles.add(TipoUsuario.ROLE_USUARIO);
	}

	public Usuario() {
	}

	public void addTipo(TipoUsuario role) {
		roles = new HashSet<>();
		roles.add(role);
	}

	public void addPostavel(Postavel post) {
		postavel.add(post);
	}

	public List<String> getAuthoritiesForUser(Usuario usuario) {
		return roles.stream().map(x -> x.getRole()).toList();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public Endereco getEndereco() {
		return endereco;
	}

	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public LocalDate getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public String getContato() {
		return contato;
	}

	public void setContato(String contato) {
		this.contato = contato;
	}

	public String getImagem() {
		return imagem;
	}

	public void setImagem(String imagem) {
		this.imagem = imagem;
	}

	public String getNomePai() {
		return nomePai;
	}

	public void setNomePai(String nomePai) {
		this.nomePai = nomePai;
	}

	public String getNomeMae() {
		return nomeMae;
	}

	public void setNomeMae(String nomeMae) {
		this.nomeMae = nomeMae;
	}

	public String getNis() {
		return nis;
	}

	public void setNis(String nis) {
		this.nis = nis;
	}

	public String getTituloEleitor() {
		return tituloEleitor;
	}

	public void setTituloEleitor(String tituloEleitor) {
		this.tituloEleitor = tituloEleitor;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public Conjuge getConjuge() {
		return conjuge;
	}

	public void setConjuge(Conjuge conjuge) {
		this.conjuge = conjuge;
	}

	public List<Postavel> getPostavel() {
		return postavel;
	}

	public void setPostavel(List<Postavel> postavel) {
		this.postavel = postavel;
	}

	public Set<TipoUsuario> getRoles() {
		return roles;
	}

	public void setRoles(Set<TipoUsuario> roles) {
		this.roles = roles;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public int hashCode() {
		return super.hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		return super.equals(obj);
	}

	@Override
	protected Object clone() throws CloneNotSupportedException {
		return super.clone();
	}

	@Override
	public String toString() {
		return super.toString();
	}
}