package br.mp.mpf.ssin.migri.service.impl;

import br.mp.mpf.ssin.migri.service.QuestionarioService;
import br.mp.mpf.ssin.migri.domain.Questionario;
import br.mp.mpf.ssin.migri.repository.QuestionarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Questionario}.
 */
@Service
@Transactional
public class QuestionarioServiceImpl implements QuestionarioService {

    private final Logger log = LoggerFactory.getLogger(QuestionarioServiceImpl.class);

    private final QuestionarioRepository questionarioRepository;

    public QuestionarioServiceImpl(QuestionarioRepository questionarioRepository) {
        this.questionarioRepository = questionarioRepository;
    }

    @Override
    public Questionario save(Questionario questionario) {
        log.debug("Request to save Questionario : {}", questionario);
        return questionarioRepository.save(questionario);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Questionario> findAll(Pageable pageable) {
        log.debug("Request to get all Questionarios");
        return questionarioRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Questionario> findOne(Long id) {
        log.debug("Request to get Questionario : {}", id);
        return questionarioRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Questionario : {}", id);
        questionarioRepository.deleteById(id);
    }
}
