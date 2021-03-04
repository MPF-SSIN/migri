package br.mp.mpf.ssin.migri.web.rest;

import br.mp.mpf.ssin.migri.MigriApp;
import br.mp.mpf.ssin.migri.domain.Questao;
import br.mp.mpf.ssin.migri.repository.QuestaoRepository;
import br.mp.mpf.ssin.migri.service.QuestaoService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link QuestaoResource} REST controller.
 */
@SpringBootTest(classes = MigriApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class QuestaoResourceIT {

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    private static final String DEFAULT_RECOMENDACAO = "AAAAAAAAAA";
    private static final String UPDATED_RECOMENDACAO = "BBBBBBBBBB";

    private static final String DEFAULT_PERGUNTA = "AAAAAAAAAA";
    private static final String UPDATED_PERGUNTA = "BBBBBBBBBB";

    private static final Boolean DEFAULT_MULTIPLO = false;
    private static final Boolean UPDATED_MULTIPLO = true;

    @Autowired
    private QuestaoRepository questaoRepository;

    @Autowired
    private QuestaoService questaoService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restQuestaoMockMvc;

    private Questao questao;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Questao createEntity(EntityManager em) {
        Questao questao = new Questao()
            .tipo(DEFAULT_TIPO)
            .recomendacao(DEFAULT_RECOMENDACAO)
            .pergunta(DEFAULT_PERGUNTA)
            .multiplo(DEFAULT_MULTIPLO);
        return questao;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Questao createUpdatedEntity(EntityManager em) {
        Questao questao = new Questao()
            .tipo(UPDATED_TIPO)
            .recomendacao(UPDATED_RECOMENDACAO)
            .pergunta(UPDATED_PERGUNTA)
            .multiplo(UPDATED_MULTIPLO);
        return questao;
    }

    @BeforeEach
    public void initTest() {
        questao = createEntity(em);
    }

    @Test
    @Transactional
    public void createQuestao() throws Exception {
        int databaseSizeBeforeCreate = questaoRepository.findAll().size();
        // Create the Questao
        restQuestaoMockMvc.perform(post("/api/questaos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(questao)))
            .andExpect(status().isCreated());

        // Validate the Questao in the database
        List<Questao> questaoList = questaoRepository.findAll();
        assertThat(questaoList).hasSize(databaseSizeBeforeCreate + 1);
        Questao testQuestao = questaoList.get(questaoList.size() - 1);
        assertThat(testQuestao.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testQuestao.getRecomendacao()).isEqualTo(DEFAULT_RECOMENDACAO);
        assertThat(testQuestao.getPergunta()).isEqualTo(DEFAULT_PERGUNTA);
        assertThat(testQuestao.isMultiplo()).isEqualTo(DEFAULT_MULTIPLO);
    }

    @Test
    @Transactional
    public void createQuestaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = questaoRepository.findAll().size();

        // Create the Questao with an existing ID
        questao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuestaoMockMvc.perform(post("/api/questaos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(questao)))
            .andExpect(status().isBadRequest());

        // Validate the Questao in the database
        List<Questao> questaoList = questaoRepository.findAll();
        assertThat(questaoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllQuestaos() throws Exception {
        // Initialize the database
        questaoRepository.saveAndFlush(questao);

        // Get all the questaoList
        restQuestaoMockMvc.perform(get("/api/questaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(questao.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO)))
            .andExpect(jsonPath("$.[*].recomendacao").value(hasItem(DEFAULT_RECOMENDACAO)))
            .andExpect(jsonPath("$.[*].pergunta").value(hasItem(DEFAULT_PERGUNTA)))
            .andExpect(jsonPath("$.[*].multiplo").value(hasItem(DEFAULT_MULTIPLO.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getQuestao() throws Exception {
        // Initialize the database
        questaoRepository.saveAndFlush(questao);

        // Get the questao
        restQuestaoMockMvc.perform(get("/api/questaos/{id}", questao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(questao.getId().intValue()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO))
            .andExpect(jsonPath("$.recomendacao").value(DEFAULT_RECOMENDACAO))
            .andExpect(jsonPath("$.pergunta").value(DEFAULT_PERGUNTA))
            .andExpect(jsonPath("$.multiplo").value(DEFAULT_MULTIPLO.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingQuestao() throws Exception {
        // Get the questao
        restQuestaoMockMvc.perform(get("/api/questaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQuestao() throws Exception {
        // Initialize the database
        questaoService.save(questao);

        int databaseSizeBeforeUpdate = questaoRepository.findAll().size();

        // Update the questao
        Questao updatedQuestao = questaoRepository.findById(questao.getId()).get();
        // Disconnect from session so that the updates on updatedQuestao are not directly saved in db
        em.detach(updatedQuestao);
        updatedQuestao
            .tipo(UPDATED_TIPO)
            .recomendacao(UPDATED_RECOMENDACAO)
            .pergunta(UPDATED_PERGUNTA)
            .multiplo(UPDATED_MULTIPLO);

        restQuestaoMockMvc.perform(put("/api/questaos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedQuestao)))
            .andExpect(status().isOk());

        // Validate the Questao in the database
        List<Questao> questaoList = questaoRepository.findAll();
        assertThat(questaoList).hasSize(databaseSizeBeforeUpdate);
        Questao testQuestao = questaoList.get(questaoList.size() - 1);
        assertThat(testQuestao.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testQuestao.getRecomendacao()).isEqualTo(UPDATED_RECOMENDACAO);
        assertThat(testQuestao.getPergunta()).isEqualTo(UPDATED_PERGUNTA);
        assertThat(testQuestao.isMultiplo()).isEqualTo(UPDATED_MULTIPLO);
    }

    @Test
    @Transactional
    public void updateNonExistingQuestao() throws Exception {
        int databaseSizeBeforeUpdate = questaoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuestaoMockMvc.perform(put("/api/questaos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(questao)))
            .andExpect(status().isBadRequest());

        // Validate the Questao in the database
        List<Questao> questaoList = questaoRepository.findAll();
        assertThat(questaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteQuestao() throws Exception {
        // Initialize the database
        questaoService.save(questao);

        int databaseSizeBeforeDelete = questaoRepository.findAll().size();

        // Delete the questao
        restQuestaoMockMvc.perform(delete("/api/questaos/{id}", questao.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Questao> questaoList = questaoRepository.findAll();
        assertThat(questaoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
