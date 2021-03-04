package br.mp.mpf.ssin.migri.service.impl;

import br.mp.mpf.ssin.migri.service.FatorService;
import br.mp.mpf.ssin.migri.domain.Fator;
import br.mp.mpf.ssin.migri.repository.FatorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Fator}.
 */
@Service
@Transactional
public class FatorServiceImpl implements FatorService {

    private final Logger log = LoggerFactory.getLogger(FatorServiceImpl.class);

    private final FatorRepository fatorRepository;

    public FatorServiceImpl(FatorRepository fatorRepository) {
        this.fatorRepository = fatorRepository;
    }

    @Override
    public Fator save(Fator fator) {
        log.debug("Request to save Fator : {}", fator);
        return fatorRepository.save(fator);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Fator> findAll(Pageable pageable) {
        log.debug("Request to get all Fators");
        return fatorRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Fator> findOne(Long id) {
        log.debug("Request to get Fator : {}", id);
        return fatorRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Fator : {}", id);
        fatorRepository.deleteById(id);
    }
}
