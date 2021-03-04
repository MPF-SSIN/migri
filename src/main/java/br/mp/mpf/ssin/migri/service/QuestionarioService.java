package br.mp.mpf.ssin.migri.service;

import br.mp.mpf.ssin.migri.domain.Questionario;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Questionario}.
 */
public interface QuestionarioService {

    /**
     * Save a questionario.
     *
     * @param questionario the entity to save.
     * @return the persisted entity.
     */
    Questionario save(Questionario questionario);

    /**
     * Get all the questionarios.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Questionario> findAll(Pageable pageable);


    /**
     * Get the "id" questionario.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Questionario> findOne(Long id);

    /**
     * Delete the "id" questionario.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
