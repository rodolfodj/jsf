package br.com.rodolfo.jsf.mb;

import java.util.ArrayList;
import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import javax.faces.model.SelectItem;

import org.primefaces.event.SelectEvent;

import br.com.rodolfo.jsf.ejb.CepLocal;
import br.com.rodolfo.jsf.ejb.DomainLocal;
import br.com.rodolfo.jsf.model.CidadaoVO;
import br.com.rodolfo.jsf.model.EnderecoVO;
import br.com.rodolfo.jsf.model.MunicipioVO;
import lombok.Getter;
import lombok.Setter;

@ManagedBean
@ViewScoped
public class PesquisaEnderecoMB {


    private static final String MUNICIPIO_NAO_ENCONTRADO = "MUNICiPIO NaO ENCONTRADO";

    private static final String RESIDENCIAL = "Residencia";
    
    private CepLocal cepService;
    
    private DomainLocal domainService;
    
    @Getter
    @Setter
    private List<SelectItem> listaDeMunicipios;

    @Getter
    @Setter
    private List<EnderecoVO> enderecos;
    
    private EnderecoVO enderecoPesquisado;

    private CidadaoVO cidadaoSelecionado;
    
    protected void init() {
        listaDeMunicipios = new ArrayList<SelectItem>();
        enderecos = new ArrayList<EnderecoVO>();
        enderecoPesquisado = new EnderecoVO();
    }
    
    public void doPreparePesquisaCepPorFonetica() {
        enderecoPesquisado = new EnderecoVO();
        enderecos = new ArrayList<EnderecoVO>();
    }

    public void doEventListEnderecos() {
        try {
           enderecos =  cepService.listaCepsPorEndereco(enderecoPesquisado);
           
        }catch (Exception e) {
        	System.err.println(e);
        }
    }
    
    public void doBuscarEnderecoPorCep(CidadaoVO cidadaoSelecionado, String tipo) {

        try {
            boolean isRes = (tipo != null && RESIDENCIAL.equals(tipo));
            
            String cep = isRes  ? cidadaoSelecionado.getCepResidencia() : cidadaoSelecionado.getCepTrabalho1();
            if (cep == null) {
            	
            }
            else {
                this.enderecoPesquisado = cepService.buscarEnderecoPorCEP(cep.replace("-", ""));
                
                if (isRes) {
                    cidadaoSelecionado.setCepResidencia(enderecoPesquisado.getCep());
                    cidadaoSelecionado.setEndResidencia(enderecoPesquisado.getLogradouro());
                    cidadaoSelecionado.setBairroResidencia(enderecoPesquisado.getBairro());
                    cidadaoSelecionado.setComplResidencia(enderecoPesquisado.getComplemento());
                    
                    
                    MunicipioVO naturSelecionada = null;
                    
                    try {
                        naturSelecionada = domainService.buscarNaturalidadePorNumIbge(enderecoPesquisado.getNumeroIBGE());
                    }
                    catch (Exception e) {
                        naturSelecionada = new MunicipioVO();
                        naturSelecionada.setNome(MUNICIPIO_NAO_ENCONTRADO);
                        System.err.println(e);
                    }finally {
                        cidadaoSelecionado.setMunicipioResidencia(naturSelecionada);
                    }
                    
                }else {
                    cidadaoSelecionado.setCepTrabalho1(enderecoPesquisado.getCep());
                    cidadaoSelecionado.setEndTrabalho(enderecoPesquisado.getLogradouro());
                    cidadaoSelecionado.setBairroTrabalho(enderecoPesquisado.getBairro());
                    cidadaoSelecionado.setComplTrabalho(enderecoPesquisado.getComplemento());
                    
                    
                    MunicipioVO naturSelecionada = null;
                    
                    try {
                        naturSelecionada = domainService.buscarNaturalidadePorNumIbge(enderecoPesquisado.getNumeroIBGE());
                    }
                    catch (Exception e) {
                        naturSelecionada = new MunicipioVO();
                        naturSelecionada.setNome(MUNICIPIO_NAO_ENCONTRADO);
                        System.err.println(e);
                        
                    } finally { 
                        cidadaoSelecionado.setMunicipioTrabalho(naturSelecionada);
                    }
                }
                
            }
        }
        catch (Exception e) {
            this.enderecoPesquisado = new EnderecoVO();
        }
    }
    
    
    public void onSelectUF() {
        try {
            listaDeMunicipios.clear();
            listaDeMunicipios = getMunicipios(domainService.listaNaturalidadeMunicipioByUf(enderecoPesquisado.getUf()),true);
        }
        catch (Exception e) {
           System.err.println(e);
        }
    }
    
    private List<SelectItem> getMunicipios(List<MunicipioVO> municipios,boolean comId) {
        List<SelectItem> listMunicipios = new ArrayList<SelectItem>();
        if (municipios != null) {
            listMunicipios.add(new SelectItem(null, "-SELECIONE-"));
            for (MunicipioVO en : municipios) {
                listMunicipios.add(
                        (comId) ? new SelectItem(en.getCodigo(), en.getNome())
                                : new SelectItem(en.getNome(), en.getNome()));
            }
        }
        return listMunicipios;
    }
    
    public void onHideDialog() {
        limpar();
        
    }
    
    public void onRowSelectEndereco(SelectEvent poSelectEvent) {
        
        this.enderecoPesquisado = (EnderecoVO) poSelectEvent.getObject();
        this.cidadaoSelecionado.setCepResidencia(enderecoPesquisado.getCep());
        this.cidadaoSelecionado.setEndResidencia(enderecoPesquisado.getLogradouro());
        this.cidadaoSelecionado.setBairroResidencia(enderecoPesquisado.getBairro());
        this.cidadaoSelecionado.setComplResidencia(enderecoPesquisado.getComplemento());

        limpar();

    }

    private void limpar() {
        listaDeMunicipios.clear();
        enderecos.clear();
        this.enderecoPesquisado = new EnderecoVO();
    }

    public EnderecoVO getEnderecoPesquisado() {
        return enderecoPesquisado;
    }

    public void setEnderecoPesquisado(EnderecoVO enderecoPesquisado) {
        this.enderecoPesquisado = enderecoPesquisado;
    }

    public CidadaoVO getCidadaoSelecionado() {
        return cidadaoSelecionado;
    }

    public void setCidadaoSelecionado(CidadaoVO cidadaoSelecionado) {
        this.cidadaoSelecionado = cidadaoSelecionado;
    }
    

}
