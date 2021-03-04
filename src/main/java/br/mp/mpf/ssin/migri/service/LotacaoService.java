package br.mp.mpf.ssin.migri.service;

import br.mp.mpf.ssin.migri.domain.Lotacao;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Lotacao}.
 */
public interface LotacaoService {

    /**
     * Save a lotacao.
     *
     * @param lotacao the entity to save.
     * @return the persisted entity.
     */
    Lotacao save(Lotacao lotacao);

    /**
     * Get all the lotacaos.
     *
     * @return the list of entities.
     */
    List<Lotacao> findAll();


    /**
     * Get the "id" lotacao.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Lotacao> findOne(Long id);

    /**
     * Delete the "id" lotacao.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
