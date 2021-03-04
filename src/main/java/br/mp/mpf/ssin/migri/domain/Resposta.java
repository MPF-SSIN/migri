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
 * Resposta entity.\n@author Leandro Iglezias.
 */
@ApiModel(description = "Resposta entity.\n@author Leandro Iglezias.")
@Entity
@Table(name = "resposta")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Resposta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "texto")
    private String texto;

    @Column(name = "score")
    private Integer score;

    @Column(name = "selecionado")
    private Boolean selecionado;

    @OneToMany(mappedBy = "respostaPai")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Resposta> detalhes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "respostas", allowSetters = true)
    private Questao questao;

    @ManyToOne
    @JsonIgnoreProperties(value = "detalhes", allowSetters = true)
    private Resposta respostaPai;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTexto() {
        return texto;
    }

    public Resposta texto(String texto) {
        this.texto = texto;
        return this;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public Integer getScore() {
        return score;
    }

    public Resposta score(Integer score) {
        this.score = score;
        return this;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Boolean isSelecionado() {
        return selecionado;
    }

    public Resposta selecionado(Boolean selecionado) {
        this.selecionado = selecionado;
        return this;
    }

    public void setSelecionado(Boolean selecionado) {
        this.selecionado = selecionado;
    }

    public Set<Resposta> getDetalhes() {
        return detalhes;
    }

    public Resposta detalhes(Set<Resposta> respostas) {
        this.detalhes = respostas;
        return this;
    }

    public Resposta addDetalhes(Resposta resposta) {
        this.detalhes.add(resposta);
        resposta.setRespostaPai(this);
        return this;
    }

    public Resposta removeDetalhes(Resposta resposta) {
        this.detalhes.remove(resposta);
        resposta.setRespostaPai(null);
        return this;
    }

    public void setDetalhes(Set<Resposta> respostas) {
        this.detalhes = respostas;
    }

    public Questao getQuestao() {
        return questao;
    }

    public Resposta questao(Questao questao) {
        this.questao = questao;
        return this;
    }

    public void setQuestao(Questao questao) {
        this.questao = questao;
    }

    public Resposta getRespostaPai() {
        return respostaPai;
    }

    public Resposta respostaPai(Resposta resposta) {
        this.respostaPai = resposta;
        return this;
    }

    public void setRespostaPai(Resposta resposta) {
        this.respostaPai = resposta;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Resposta)) {
            return false;
        }
        return id != null && id.equals(((Resposta) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Resposta{" +
            "id=" + getId() +
            ", texto='" + getTexto() + "'" +
            ", score=" + getScore() +
            ", selecionado='" + isSelecionado() + "'" +
            "}";
    }
}
