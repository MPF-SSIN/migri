package br.mp.mpf.ssin.migri.service.impl;

import br.mp.mpf.ssin.migri.service.RespostaService;
import br.mp.mpf.ssin.migri.domain.Resposta;
import br.mp.mpf.ssin.migri.repository.RespostaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Resposta}.
 */
@Service
@Transactional
public class RespostaServiceImpl implements RespostaService {

    private final Logger log = LoggerFactory.getLogger(RespostaServiceImpl.class);

    private final RespostaRepository respostaRepository;

    public RespostaServiceImpl(RespostaRepository respostaRepository) {
        this.respostaRepository = respostaRepository;
    }

    @Override
    public Resposta save(Resposta resposta) {
        log.debug("Request to save Resposta : {}", resposta);
        return respostaRepository.save(resposta);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Resposta> findAll() {
        log.debug("Request to get all Respostas");
        return respostaRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Resposta> findOne(Long id) {
        log.debug("Request to get Resposta : {}", id);
        return respostaRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Resposta : {}", id);
        respostaRepository.deleteById(id);
    }
}
