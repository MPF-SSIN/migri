package br.mp.mpf.ssin.migri.service.impl;

import br.mp.mpf.ssin.migri.service.QuestaoService;
import br.mp.mpf.ssin.migri.domain.Questao;
import br.mp.mpf.ssin.migri.repository.QuestaoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Questao}.
 */
@Service
@Transactional
public class QuestaoServiceImpl implements QuestaoService {

    private final Logger log = LoggerFactory.getLogger(QuestaoServiceImpl.class);

    private final QuestaoRepository questaoRepository;

    public QuestaoServiceImpl(QuestaoRepository questaoRepository) {
        this.questaoRepository = questaoRepository;
    }

    @Override
    public Questao save(Questao questao) {
        log.debug("Request to save Questao : {}", questao);
        return questaoRepository.save(questao);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Questao> findAll(Pageable pageable) {
        log.debug("Request to get all Questaos");
        return questaoRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Questao> findOne(Long id) {
        log.debug("Request to get Questao : {}", id);
        return questaoRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Questao : {}", id);
        questaoRepository.deleteById(id);
    }
}
