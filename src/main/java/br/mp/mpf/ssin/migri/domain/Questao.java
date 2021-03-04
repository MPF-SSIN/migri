package br.mp.mpf.ssin.migri.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * Questao entity.\n@author Leandro Iglezias.
 */
@ApiModel(description = "Questao entity.\n@author Leandro Iglezias.")
@Entity
@Table(name = "questao")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Questao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "recomendacao")
    private String recomendacao;

    @Column(name = "pergunta")
    private String pergunta;

    @Column(name = "multiplo")
    private Boolean multiplo;

    @OneToMany(mappedBy = "questao")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Resposta> respostas = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "questoes", allowSetters = true)
    private Fator fator;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipo() {
        return tipo;
    }

    public Questao tipo(String tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getRecomendacao() {
        return recomendacao;
    }

    public Questao recomendacao(String recomendacao) {
        this.recomendacao = recomendacao;
        return this;
    }

    public void setRecomendacao(String recomendacao) {
        this.recomendacao = recomendacao;
    }

    public String getPergunta() {
        return pergunta;
    }

    public Questao pergunta(String pergunta) {
        this.pergunta = pergunta;
        return this;
    }

    public void setPergunta(String pergunta) {
        this.pergunta = pergunta;
    }

    public Boolean isMultiplo() {
        return multiplo;
    }

    public Questao multiplo(Boolean multiplo) {
        this.multiplo = multiplo;
        return this;
    }

    public void setMultiplo(Boolean multiplo) {
        this.multiplo = multiplo;
    }

    public Set<Resposta> getRespostas() {
        return respostas;
    }

    public Questao respostas(Set<Resposta> respostas) {
        this.respostas = respostas;
        return this;
    }

    public Questao addRespostas(Resposta resposta) {
        this.respostas.add(resposta);
        resposta.setQuestao(this);
        return this;
    }

    public Questao removeRespostas(Resposta resposta) {
        this.respostas.remove(resposta);
        resposta.setQuestao(null);
        return this;
    }

    public void setRespostas(Set<Resposta> respostas) {
        this.respostas = respostas;
    }

    public Fator getFator() {
        return fator;
    }

    public Questao fator(Fator fator) {
        this.fator = fator;
        return this;
    }

    public void setFator(Fator fator) {
        this.fator = fator;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Questao)) {
            return false;
        }
        return id != null && id.equals(((Questao) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Questao{" +
            "id=" + getId() +
            ", tipo='" + getTipo() + "'" +
            ", recomendacao='" + getRecomendacao() + "'" +
            ", pergunta='" + getPergunta() + "'" +
            ", multiplo='" + isMultiplo() + "'" +
            "}";
    }
}
