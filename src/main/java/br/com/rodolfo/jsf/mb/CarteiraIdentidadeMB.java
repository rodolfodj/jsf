package br.com.rodolfo.jsf.mb;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

import br.com.rodolfo.jsf.model.CidadaoVO;
import lombok.Getter;
import lombok.Setter;

@ManagedBean
@SessionScoped
public class CarteiraIdentidadeMB {
	
	@Getter @Setter
	private CidadaoVO cidadaoSelecionado;

}
