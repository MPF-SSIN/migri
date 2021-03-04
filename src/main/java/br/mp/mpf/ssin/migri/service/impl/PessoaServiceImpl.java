package br.mp.mpf.ssin.migri.service.impl;

import br.mp.mpf.ssin.migri.service.PessoaService;
import br.mp.mpf.ssin.migri.domain.Pessoa;
import br.mp.mpf.ssin.migri.repository.PessoaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Pessoa}.
 */
@Service
@Transactional
public class PessoaServiceImpl implements PessoaService {

    private final Logger log = LoggerFactory.getLogger(PessoaServiceImpl.class);

    private final PessoaRepository pessoaRepository;

    public PessoaServiceImpl(PessoaRepository pessoaRepository) {
        this.pessoaRepository = pessoaRepository;
    }

    @Override
    public Pessoa save(Pessoa pessoa) {
        log.debug("Request to save Pessoa : {}", pessoa);
        return pessoaRepository.save(pessoa);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Pessoa> findAll() {
        log.debug("Request to get all Pessoas");
        return pessoaRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Pessoa> findOne(Long id) {
        log.debug("Request to get Pessoa : {}", id);
        return pessoaRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Pessoa : {}", id);
        pessoaRepository.deleteById(id);
    }
}
