package br.com.rodolfo.jsf.model;

import java.io.Serializable;
import java.math.BigInteger;

import lombok.Data;

@Data
public class EnderecoVO implements Serializable {

    private static final long serialVersionUID = -3450217965602945083L;

    private String cep;
    private String bairro;
    private String tipoLogradouro;
    private String logradouro;
    private String numero;
    private String complemento;
    private String localidade;
    private String tipo;
    private String uf;
    
    private BigInteger numeroIBGE;
    
    
    public EnderecoVO() {
    }
    
    public EnderecoVO(String cep) {
        this.cep = cep;
    }
    
    
    
}
