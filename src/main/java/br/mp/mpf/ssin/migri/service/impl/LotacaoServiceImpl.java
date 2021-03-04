package br.mp.mpf.ssin.migri.service.impl;

import br.mp.mpf.ssin.migri.service.LotacaoService;
import br.mp.mpf.ssin.migri.domain.Lotacao;
import br.mp.mpf.ssin.migri.repository.LotacaoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Lotacao}.
 */
@Service
@Transactional
public class LotacaoServiceImpl implements LotacaoService {

    private final Logger log = LoggerFactory.getLogger(LotacaoServiceImpl.class);

    private final LotacaoRepository lotacaoRepository;

    public LotacaoServiceImpl(LotacaoRepository lotacaoRepository) {
        this.lotacaoRepository = lotacaoRepository;
    }

    @Override
    public Lotacao save(Lotacao lotacao) {
        log.debug("Request to save Lotacao : {}", lotacao);
        return lotacaoRepository.save(lotacao);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Lotacao> findAll() {
        log.debug("Request to get all Lotacaos");
        return lotacaoRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Lotacao> findOne(Long id) {
        log.debug("Request to get Lotacao : {}", id);
        return lotacaoRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Lotacao : {}", id);
        lotacaoRepository.deleteById(id);
    }
}
