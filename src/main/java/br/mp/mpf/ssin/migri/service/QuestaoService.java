package br.mp.mpf.ssin.migri.service;

import br.mp.mpf.ssin.migri.domain.Questao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Questao}.
 */
public interface QuestaoService {

    /**
     * Save a questao.
     *
     * @param questao the entity to save.
     * @return the persisted entity.
     */
    Questao save(Questao questao);

    /**
     * Get all the questaos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Questao> findAll(Pageable pageable);


    /**
     * Get the "id" questao.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Questao> findOne(Long id);

    /**
     * Delete the "id" questao.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
