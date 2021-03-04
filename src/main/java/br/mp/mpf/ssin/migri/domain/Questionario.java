package br.mp.mpf.ssin.migri.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * Questionario entity.\n@author Leandro Iglezias.
 */
@ApiModel(description = "Questionario entity.\n@author Leandro Iglezias.")
@Entity
@Table(name = "questionario")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Questionario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "identificacao")
    private String identificacao;

    @Column(name = "data_realizacao")
    private LocalDate dataRealizacao;

    @OneToMany(mappedBy = "questionario")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Fator> fatores = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "questionarios", allowSetters = true)
    private Lotacao lotacao;

    @ManyToOne
    @JsonIgnoreProperties(value = "questionarios", allowSetters = true)
    private Pessoa pessoa;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdentificacao() {
        return identificacao;
    }

    public Questionario identificacao(String identificacao) {
        this.identificacao = identificacao;
        return this;
    }

    public void setIdentificacao(String identificacao) {
        this.identificacao = identificacao;
    }

    public LocalDate getDataRealizacao() {
        return dataRealizacao;
    }

    public Questionario dataRealizacao(LocalDate dataRealizacao) {
        this.dataRealizacao = dataRealizacao;
        return this;
    }

    public void setDataRealizacao(LocalDate dataRealizacao) {
        this.dataRealizacao = dataRealizacao;
    }

    public Set<Fator> getFatores() {
        return fatores;
    }

    public Questionario fatores(Set<Fator> fators) {
        this.fatores = fators;
        return this;
    }

    public Questionario addFatores(Fator fator) {
        this.fatores.add(fator);
        fator.setQuestionario(this);
        return this;
    }

    public Questionario removeFatores(Fator fator) {
        this.fatores.remove(fator);
        fator.setQuestionario(null);
        return this;
    }

    public void setFatores(Set<Fator> fators) {
        this.fatores = fators;
    }

    public Lotacao getLotacao() {
        return lotacao;
    }

    public Questionario lotacao(Lotacao lotacao) {
        this.lotacao = lotacao;
        return this;
    }

    public void setLotacao(Lotacao lotacao) {
        this.lotacao = lotacao;
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public Questionario pessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
        return this;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Questionario)) {
            return false;
        }
        return id != null && id.equals(((Questionario) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Questionario{" +
            "id=" + getId() +
            ", identificacao='" + getIdentificacao() + "'" +
            ", dataRealizacao='" + getDataRealizacao() + "'" +
            "}";
    }
}
