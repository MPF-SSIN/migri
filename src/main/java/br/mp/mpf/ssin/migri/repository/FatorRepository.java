package br.mp.mpf.ssin.migri.repository;

import br.mp.mpf.ssin.migri.domain.Fator;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Fator entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FatorRepository extends JpaRepository<Fator, Long> {
}
