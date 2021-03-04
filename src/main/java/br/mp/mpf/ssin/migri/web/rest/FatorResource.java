package br.mp.mpf.ssin.migri.web.rest;

import br.mp.mpf.ssin.migri.domain.Fator;
import br.mp.mpf.ssin.migri.service.FatorService;
import br.mp.mpf.ssin.migri.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link br.mp.mpf.ssin.migri.domain.Fator}.
 */
@RestController
@RequestMapping("/api")
public class FatorResource {

    private final Logger log = LoggerFactory.getLogger(FatorResource.class);

    private static final String ENTITY_NAME = "fator";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FatorService fatorService;

    public FatorResource(FatorService fatorService) {
        this.fatorService = fatorService;
    }

    /**
     * {@code POST  /fators} : Create a new fator.
     *
     * @param fator the fator to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fator, or with status {@code 400 (Bad Request)} if the fator has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/fators")
    public ResponseEntity<Fator> createFator(@RequestBody Fator fator) throws URISyntaxException {
        log.debug("REST request to save Fator : {}", fator);
        if (fator.getId() != null) {
            throw new BadRequestAlertException("A new fator cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Fator result = fatorService.save(fator);
        return ResponseEntity.created(new URI("/api/fators/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /fators} : Updates an existing fator.
     *
     * @param fator the fator to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fator,
     * or with status {@code 400 (Bad Request)} if the fator is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fator couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/fators")
    public ResponseEntity<Fator> updateFator(@RequestBody Fator fator) throws URISyntaxException {
        log.debug("REST request to update Fator : {}", fator);
        if (fator.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Fator result = fatorService.save(fator);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fator.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /fators} : get all the fators.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fators in body.
     */
    @GetMapping("/fators")
    public ResponseEntity<List<Fator>> getAllFators(Pageable pageable) {
        log.debug("REST request to get a page of Fators");
        Page<Fator> page = fatorService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /fators/:id} : get the "id" fator.
     *
     * @param id the id of the fator to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fator, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/fators/{id}")
    public ResponseEntity<Fator> getFator(@PathVariable Long id) {
        log.debug("REST request to get Fator : {}", id);
        Optional<Fator> fator = fatorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(fator);
    }

    /**
     * {@code DELETE  /fators/:id} : delete the "id" fator.
     *
     * @param id the id of the fator to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/fators/{id}")
    public ResponseEntity<Void> deleteFator(@PathVariable Long id) {
        log.debug("REST request to delete Fator : {}", id);
        fatorService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
