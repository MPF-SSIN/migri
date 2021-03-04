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
 * Fator entity.\n@author Leandro Iglezias.
 */
@ApiModel(description = "Fator entity.\n@author Leandro Iglezias.")
@Entity
@Table(name = "fator")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Fator implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "pontuacao")
    private Float pontuacao;

    @OneToMany(mappedBy = "fator")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Questao> questoes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "fatores", allowSetters = true)
    private Questionario questionario;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Fator nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Float getPontuacao() {
        return pontuacao;
    }

    public Fator pontuacao(Float pontuacao) {
        this.pontuacao = pontuacao;
        return this;
    }

    public void setPontuacao(Float pontuacao) {
        this.pontuacao = pontuacao;
    }

    public Set<Questao> getQuestoes() {
        return questoes;
    }

    public Fator questoes(Set<Questao> questaos) {
        this.questoes = questaos;
        return this;
    }

    public Fator addQuestoes(Questao questao) {
        this.questoes.add(questao);
        questao.setFator(this);
        return this;
    }

    public Fator removeQuestoes(Questao questao) {
        this.questoes.remove(questao);
        questao.setFator(null);
        return this;
    }

    public void setQuestoes(Set<Questao> questaos) {
        this.questoes = questaos;
    }

    public Questionario getQuestionario() {
        return questionario;
    }

    public Fator questionario(Questionario questionario) {
        this.questionario = questionario;
        return this;
    }

    public void setQuestionario(Questionario questionario) {
        this.questionario = questionario;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Fator)) {
            return false;
        }
        return id != null && id.equals(((Fator) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Fator{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", pontuacao=" + getPontuacao() +
            "}";
    }
}
