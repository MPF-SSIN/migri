package br.mp.mpf.ssin.migri.web.rest;

import br.mp.mpf.ssin.migri.MigriApp;
import br.mp.mpf.ssin.migri.domain.Resposta;
import br.mp.mpf.ssin.migri.repository.RespostaRepository;
import br.mp.mpf.ssin.migri.service.RespostaService;

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
 * Integration tests for the {@link RespostaResource} REST controller.
 */
@SpringBootTest(classes = MigriApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RespostaResourceIT {

    private static final String DEFAULT_TEXTO = "AAAAAAAAAA";
    private static final String UPDATED_TEXTO = "BBBBBBBBBB";

    private static final Integer DEFAULT_SCORE = 1;
    private static final Integer UPDATED_SCORE = 2;

    private static final Boolean DEFAULT_SELECIONADO = false;
    private static final Boolean UPDATED_SELECIONADO = true;

    @Autowired
    private RespostaRepository respostaRepository;

    @Autowired
    private RespostaService respostaService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRespostaMockMvc;

    private Resposta resposta;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Resposta createEntity(EntityManager em) {
        Resposta resposta = new Resposta()
            .texto(DEFAULT_TEXTO)
            .score(DEFAULT_SCORE)
            .selecionado(DEFAULT_SELECIONADO);
        return resposta;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Resposta createUpdatedEntity(EntityManager em) {
        Resposta resposta = new Resposta()
            .texto(UPDATED_TEXTO)
            .score(UPDATED_SCORE)
            .selecionado(UPDATED_SELECIONADO);
        return resposta;
    }

    @BeforeEach
    public void initTest() {
        resposta = createEntity(em);
    }

    @Test
    @Transactional
    public void createResposta() throws Exception {
        int databaseSizeBeforeCreate = respostaRepository.findAll().size();
        // Create the Resposta
        restRespostaMockMvc.perform(post("/api/respostas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(resposta)))
            .andExpect(status().isCreated());

        // Validate the Resposta in the database
        List<Resposta> respostaList = respostaRepository.findAll();
        assertThat(respostaList).hasSize(databaseSizeBeforeCreate + 1);
        Resposta testResposta = respostaList.get(respostaList.size() - 1);
        assertThat(testResposta.getTexto()).isEqualTo(DEFAULT_TEXTO);
        assertThat(testResposta.getScore()).isEqualTo(DEFAULT_SCORE);
        assertThat(testResposta.isSelecionado()).isEqualTo(DEFAULT_SELECIONADO);
    }

    @Test
    @Transactional
    public void createRespostaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = respostaRepository.findAll().size();

        // Create the Resposta with an existing ID
        resposta.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRespostaMockMvc.perform(post("/api/respostas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(resposta)))
            .andExpect(status().isBadRequest());

        // Validate the Resposta in the database
        List<Resposta> respostaList = respostaRepository.findAll();
        assertThat(respostaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRespostas() throws Exception {
        // Initialize the database
        respostaRepository.saveAndFlush(resposta);

        // Get all the respostaList
        restRespostaMockMvc.perform(get("/api/respostas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(resposta.getId().intValue())))
            .andExpect(jsonPath("$.[*].texto").value(hasItem(DEFAULT_TEXTO)))
            .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE)))
            .andExpect(jsonPath("$.[*].selecionado").value(hasItem(DEFAULT_SELECIONADO.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getResposta() throws Exception {
        // Initialize the database
        respostaRepository.saveAndFlush(resposta);

        // Get the resposta
        restRespostaMockMvc.perform(get("/api/respostas/{id}", resposta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(resposta.getId().intValue()))
            .andExpect(jsonPath("$.texto").value(DEFAULT_TEXTO))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE))
            .andExpect(jsonPath("$.selecionado").value(DEFAULT_SELECIONADO.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingResposta() throws Exception {
        // Get the resposta
        restRespostaMockMvc.perform(get("/api/respostas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateResposta() throws Exception {
        // Initialize the database
        respostaService.save(resposta);

        int databaseSizeBeforeUpdate = respostaRepository.findAll().size();

        // Update the resposta
        Resposta updatedResposta = respostaRepository.findById(resposta.getId()).get();
        // Disconnect from session so that the updates on updatedResposta are not directly saved in db
        em.detach(updatedResposta);
        updatedResposta
            .texto(UPDATED_TEXTO)
            .score(UPDATED_SCORE)
            .selecionado(UPDATED_SELECIONADO);

        restRespostaMockMvc.perform(put("/api/respostas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedResposta)))
            .andExpect(status().isOk());

        // Validate the Resposta in the database
        List<Resposta> respostaList = respostaRepository.findAll();
        assertThat(respostaList).hasSize(databaseSizeBeforeUpdate);
        Resposta testResposta = respostaList.get(respostaList.size() - 1);
        assertThat(testResposta.getTexto()).isEqualTo(UPDATED_TEXTO);
        assertThat(testResposta.getScore()).isEqualTo(UPDATED_SCORE);
        assertThat(testResposta.isSelecionado()).isEqualTo(UPDATED_SELECIONADO);
    }

    @Test
    @Transactional
    public void updateNonExistingResposta() throws Exception {
        int databaseSizeBeforeUpdate = respostaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRespostaMockMvc.perform(put("/api/respostas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(resposta)))
            .andExpect(status().isBadRequest());

        // Validate the Resposta in the database
        List<Resposta> respostaList = respostaRepository.findAll();
        assertThat(respostaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteResposta() throws Exception {
        // Initialize the database
        respostaService.save(resposta);

        int databaseSizeBeforeDelete = respostaRepository.findAll().size();

        // Delete the resposta
        restRespostaMockMvc.perform(delete("/api/respostas/{id}", resposta.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Resposta> respostaList = respostaRepository.findAll();
        assertThat(respostaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
