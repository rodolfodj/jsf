package br.com.rodolfo.jsf.model;

import lombok.Data;


@Data
public class MunicipioVO {

    private Integer codigo;
    private Integer digito;
    private String nome;
    private String uf;
    
    private String ufIBGE;
	private String nomeIBGE;
	private Long numeroIBGE;
    /**
     * @return
     */
    public String getCodigoFormatado() {
        if (codigo == null || digito == null) {
            return "";
        }
        else {
            String codFormatado = codigo.toString();
            
            while (codFormatado.length() < 5) {
            	codFormatado = "0".concat(codFormatado);
            }
            return codFormatado + "-" + digito.toString();
        }
    }

    /**
     * @param codigoFormatado
     */
    public void setCodigoFormatado(String codigoFormatado) {
        try {
            if (codigoFormatado != null && !codigoFormatado.isEmpty()) {
                int len = codigoFormatado.indexOf("-");
                if (len > 0) {
                    this.codigo = new Integer(codigoFormatado.substring(0, len));
                    this.digito = new Integer(codigoFormatado.substring(len + 1));
                }
                else {
                    this.codigo = new Integer(codigoFormatado);
                }
            }else {
            	this.codigo = null;
                this.digito = null;
            }
        }
        catch (NumberFormatException e) {
            this.codigo = 0;
            this.digito = 0;
        }

    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((codigo == null) ? 0 : codigo.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null) return false;
        if (getClass() != obj.getClass()) return false;
        MunicipioVO other = (MunicipioVO) obj;
        if (codigo == null) {
            if (other.codigo != null) return false;
        }
        else if (!codigo.equals(other.codigo)) return false;
        return true;
    }

}
