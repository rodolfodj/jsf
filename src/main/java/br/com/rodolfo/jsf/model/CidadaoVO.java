package br.com.rodolfo.jsf.model;

import java.awt.image.BufferedImage;
import java.text.ParseException;
import java.util.Date;

import javax.swing.text.MaskFormatter;

import lombok.Data;

@Data
public class CidadaoVO  {
    
    private String numRg;
    private String digRg;
    private String ufRg;
    private String rgFormatado;
    private String serie;
    private String numEspelho;
    private String nome;
    private String nomeRelat;
    private String nomeRelatCont;
    private String nomePai;
    private String nomeMae;
    private String sexo;
    private String tipoDocumento;
    private Date dataNascimento;
    private MunicipioVO naturalidade;
    private String pidt;
    private String digPidt;
    private String dbas;
    private String lote;
    private String cpf;
    private String cpfDig;
    private String pis;
    private String pasep;
    private String digPasep;
    private String comarca;
    private String cartorio;
    private String livro;
    private String folha;
    private String numero;
    private Date dataDocumento;
    private String portMinLei1;
    private String portMinLei2;
    private String portMinLei3;
    private String portMinLei;
    private String portMinLeiCod;
    private String entrega;
    private String entrega2;
    private String estadoCivil;
    private String cutis;
    private String cabelos;
    private String olhos;
    private String altura;
    private String grauInstrucao;
    private String profissao;
    private String endResidenciaFormatado;
    private String endTrabalhoFormatado;
    private String endResidencia;
    private String numResidencia;
    private String complResidencia;
    private String bairroResidencia;
    private MunicipioVO municipioResidencia;
    private String cepResidencia;
    private String endTrabalho;
    private String numTrabalho;
    private String complTrabalho;
    private String bairroTrabalho;
    private String afis;
    private MunicipioVO municipioTrabalho;
    private String ufResidencia;
    private String cepTrabalho1;
    private String cepTrabalho2;
    private String cepTrabalho3;
    private String operadoraCelular;
    private String envioSolicitacao;
    private Date dataRetiradaDoc;
    private Date hrRetiradaDoc;
    private String qtdKitFamilia;
    private BufferedImage assinatura;
    private BufferedImage foto3Por4;
    private BufferedImage polegarDireito;
    private BufferedImage polegarEsquerdo;
    private BufferedImage indicadorDireito;
    private BufferedImage indicadorEsquerdo;
    private BufferedImage medioDireito;
    private BufferedImage medioEsquerdo;
    private BufferedImage anularDireito;
    private BufferedImage anularEsquerdo;
    private BufferedImage minimoDireito;
    private BufferedImage minimoEsquerdo;
    private BufferedImage maoDireito;
    private BufferedImage maoEsquerdo;
    private Date dataHoraIdentificacao;
    private static MaskFormatter rgFormatter;
    private String telefone;
    private String telefoneComercial;
    private String celular;
    private String email;
    private String dataNascimentoStr;
    private String senha;
    private String sedex;
    private String origem;
    private boolean imprimir = false;
    private boolean envioSms = false;
    private boolean envioEmail = false;
    private boolean telefoneReq;
    private boolean telefoneComercialReq;
    private boolean celularReq;
    private Boolean imprimeIdade;
    private Boolean assinarCarteira;
    private String motivoFaltaAssinatura;
    private Date dataValidadeDoc;
    private int idade;
    private String tipoSanguineo;
    // ATESTADO ANTECEDENTES
    private byte[] codigo;
    private Long presencial;
    private String status;
    private String mensagemTaxa;
    private Boolean habilitaReuso;
    private Long orgao;
    
    private String CodigoMunicipioResidencia;
    private String CodigoMunicipioTrabalho;
    private String codigoNaturalidade;
    
    private Boolean restricaoCriminal;
    
    private String inscricaoCpf;
    
    
    static {
        try {
            rgFormatter = new MaskFormatter("AA.AAA.AAA-AA");
            rgFormatter.setValueContainsLiteralCharacters(false);
        }
        catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    public CidadaoVO() {
        naturalidade = new MunicipioVO();
        municipioResidencia = new MunicipioVO();
        municipioTrabalho = new MunicipioVO();
        this.assinarCarteira = false;
    }


    /*
     * (non-Javadoc)
     * @see java.lang.Object#hashCode()
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((cpf == null) ? 0 : cpf.hashCode());
        result = prime * result + ((cpfDig == null) ? 0 : cpfDig.hashCode());
        result = prime * result + ((nome == null) ? 0 : nome.hashCode());
        result = prime * result + ((numRg == null) ? 0 : numRg.hashCode());
        return result;
    }

    /*
     * (non-Javadoc)
     * @see java.lang.Object#equals(java.lang.Object)
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null) return false;
        if (getClass() != obj.getClass()) return false;
        CidadaoVO other = (CidadaoVO) obj;
        if (cpf == null) {
            if (other.cpf != null) return false;
        }
        else if (!cpf.equals(other.cpf)) return false;
        if (cpfDig == null) {
            if (other.cpfDig != null) return false;
        }
        else if (!cpfDig.equals(other.cpfDig)) return false;
        if (nome == null) {
            if (other.nome != null) return false;
        }
        else if (!nome.equals(other.nome)) return false;
        if (numRg == null) {
            if (other.numRg != null) return false;
        }
        else if (!numRg.equals(other.numRg)) return false;
        return true;
    }


}