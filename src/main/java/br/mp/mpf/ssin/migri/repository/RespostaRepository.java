package br.mp.mpf.ssin.migri.repository;

import br.mp.mpf.ssin.migri.domain.Resposta;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Resposta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RespostaRepository extends JpaRepository<Resposta, Long> {
}
