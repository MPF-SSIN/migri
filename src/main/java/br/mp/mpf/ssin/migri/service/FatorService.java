package br.mp.mpf.ssin.migri.service;

import br.mp.mpf.ssin.migri.domain.Fator;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Fator}.
 */
public interface FatorService {

    /**
     * Save a fator.
     *
     * @param fator the entity to save.
     * @return the persisted entity.
     */
    Fator save(Fator fator);

    /**
     * Get all the fators.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Fator> findAll(Pageable pageable);


    /**
     * Get the "id" fator.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Fator> findOne(Long id);

    /**
     * Delete the "id" fator.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
