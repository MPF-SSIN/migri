package br.mp.mpf.ssin.migri.web.rest;

import br.mp.mpf.ssin.migri.domain.Questao;
import br.mp.mpf.ssin.migri.service.QuestaoService;
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
 * REST controller for managing {@link br.mp.mpf.ssin.migri.domain.Questao}.
 */
@RestController
@RequestMapping("/api")
public class QuestaoResource {

    private final Logger log = LoggerFactory.getLogger(QuestaoResource.class);

    private static final String ENTITY_NAME = "questao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final QuestaoService questaoService;

    public QuestaoResource(QuestaoService questaoService) {
        this.questaoService = questaoService;
    }

    /**
     * {@code POST  /questaos} : Create a new questao.
     *
     * @param questao the questao to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new questao, or with status {@code 400 (Bad Request)} if the questao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/questaos")
    public ResponseEntity<Questao> createQuestao(@RequestBody Questao questao) throws URISyntaxException {
        log.debug("REST request to save Questao : {}", questao);
        if (questao.getId() != null) {
            throw new BadRequestAlertException("A new questao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Questao result = questaoService.save(questao);
        return ResponseEntity.created(new URI("/api/questaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /questaos} : Updates an existing questao.
     *
     * @param questao the questao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated questao,
     * or with status {@code 400 (Bad Request)} if the questao is not valid,
     * or with status {@code 500 (Internal Server Error)} if the questao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/questaos")
    public ResponseEntity<Questao> updateQuestao(@RequestBody Questao questao) throws URISyntaxException {
        log.debug("REST request to update Questao : {}", questao);
        if (questao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Questao result = questaoService.save(questao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, questao.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /questaos} : get all the questaos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of questaos in body.
     */
    @GetMapping("/questaos")
    public ResponseEntity<List<Questao>> getAllQuestaos(Pageable pageable) {
        log.debug("REST request to get a page of Questaos");
        Page<Questao> page = questaoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /questaos/:id} : get the "id" questao.
     *
     * @param id the id of the questao to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the questao, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/questaos/{id}")
    public ResponseEntity<Questao> getQuestao(@PathVariable Long id) {
        log.debug("REST request to get Questao : {}", id);
        Optional<Questao> questao = questaoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(questao);
    }

    /**
     * {@code DELETE  /questaos/:id} : delete the "id" questao.
     *
     * @param id the id of the questao to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/questaos/{id}")
    public ResponseEntity<Void> deleteQuestao(@PathVariable Long id) {
        log.debug("REST request to delete Questao : {}", id);
        questaoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
