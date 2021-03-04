package br.mp.mpf.ssin.migri.web.rest;

import br.mp.mpf.ssin.migri.domain.Questionario;
import br.mp.mpf.ssin.migri.service.QuestionarioService;
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
 * REST controller for managing {@link br.mp.mpf.ssin.migri.domain.Questionario}.
 */
@RestController
@RequestMapping("/api")
public class QuestionarioResource {

    private final Logger log = LoggerFactory.getLogger(QuestionarioResource.class);

    private static final String ENTITY_NAME = "questionario";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final QuestionarioService questionarioService;

    public QuestionarioResource(QuestionarioService questionarioService) {
        this.questionarioService = questionarioService;
    }

    /**
     * {@code POST  /questionarios} : Create a new questionario.
     *
     * @param questionario the questionario to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new questionario, or with status {@code 400 (Bad Request)} if the questionario has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/questionarios")
    public ResponseEntity<Questionario> createQuestionario(@RequestBody Questionario questionario) throws URISyntaxException {
        log.debug("REST request to save Questionario : {}", questionario);
        if (questionario.getId() != null) {
            throw new BadRequestAlertException("A new questionario cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Questionario result = questionarioService.save(questionario);
        return ResponseEntity.created(new URI("/api/questionarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /questionarios} : Updates an existing questionario.
     *
     * @param questionario the questionario to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated questionario,
     * or with status {@code 400 (Bad Request)} if the questionario is not valid,
     * or with status {@code 500 (Internal Server Error)} if the questionario couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/questionarios")
    public ResponseEntity<Questionario> updateQuestionario(@RequestBody Questionario questionario) throws URISyntaxException {
        log.debug("REST request to update Questionario : {}", questionario);
        if (questionario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Questionario result = questionarioService.save(questionario);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, questionario.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /questionarios} : get all the questionarios.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of questionarios in body.
     */
    @GetMapping("/questionarios")
    public ResponseEntity<List<Questionario>> getAllQuestionarios(Pageable pageable) {
        log.debug("REST request to get a page of Questionarios");
        Page<Questionario> page = questionarioService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /questionarios/:id} : get the "id" questionario.
     *
     * @param id the id of the questionario to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the questionario, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/questionarios/{id}")
    public ResponseEntity<Questionario> getQuestionario(@PathVariable Long id) {
        log.debug("REST request to get Questionario : {}", id);
        Optional<Questionario> questionario = questionarioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(questionario);
    }

    /**
     * {@code DELETE  /questionarios/:id} : delete the "id" questionario.
     *
     * @param id the id of the questionario to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/questionarios/{id}")
    public ResponseEntity<Void> deleteQuestionario(@PathVariable Long id) {
        log.debug("REST request to delete Questionario : {}", id);
        questionarioService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
