package br.mp.mpf.ssin.migri.repository;

import br.mp.mpf.ssin.migri.domain.Questionario;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Questionario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuestionarioRepository extends JpaRepository<Questionario, Long> {
}
