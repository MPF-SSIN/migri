package br.mp.mpf.ssin.migri.web.rest;

import br.mp.mpf.ssin.migri.MigriApp;
import br.mp.mpf.ssin.migri.domain.Fator;
import br.mp.mpf.ssin.migri.repository.FatorRepository;
import br.mp.mpf.ssin.migri.service.FatorService;

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
 * Integration tests for the {@link FatorResource} REST controller.
 */
@SpringBootTest(classes = MigriApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class FatorResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final Float DEFAULT_PONTUACAO = 1F;
    private static final Float UPDATED_PONTUACAO = 2F;

    @Autowired
    private FatorRepository fatorRepository;

    @Autowired
    private FatorService fatorService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFatorMockMvc;

    private Fator fator;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Fator createEntity(EntityManager em) {
        Fator fator = new Fator()
            .nome(DEFAULT_NOME)
            .pontuacao(DEFAULT_PONTUACAO);
        return fator;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Fator createUpdatedEntity(EntityManager em) {
        Fator fator = new Fator()
            .nome(UPDATED_NOME)
            .pontuacao(UPDATED_PONTUACAO);
        return fator;
    }

    @BeforeEach
    public void initTest() {
        fator = createEntity(em);
    }

    @Test
    @Transactional
    public void createFator() throws Exception {
        int databaseSizeBeforeCreate = fatorRepository.findAll().size();
        // Create the Fator
        restFatorMockMvc.perform(post("/api/fators")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fator)))
            .andExpect(status().isCreated());

        // Validate the Fator in the database
        List<Fator> fatorList = fatorRepository.findAll();
        assertThat(fatorList).hasSize(databaseSizeBeforeCreate + 1);
        Fator testFator = fatorList.get(fatorList.size() - 1);
        assertThat(testFator.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testFator.getPontuacao()).isEqualTo(DEFAULT_PONTUACAO);
    }

    @Test
    @Transactional
    public void createFatorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fatorRepository.findAll().size();

        // Create the Fator with an existing ID
        fator.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFatorMockMvc.perform(post("/api/fators")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fator)))
            .andExpect(status().isBadRequest());

        // Validate the Fator in the database
        List<Fator> fatorList = fatorRepository.findAll();
        assertThat(fatorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFators() throws Exception {
        // Initialize the database
        fatorRepository.saveAndFlush(fator);

        // Get all the fatorList
        restFatorMockMvc.perform(get("/api/fators?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fator.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].pontuacao").value(hasItem(DEFAULT_PONTUACAO.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getFator() throws Exception {
        // Initialize the database
        fatorRepository.saveAndFlush(fator);

        // Get the fator
        restFatorMockMvc.perform(get("/api/fators/{id}", fator.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(fator.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.pontuacao").value(DEFAULT_PONTUACAO.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingFator() throws Exception {
        // Get the fator
        restFatorMockMvc.perform(get("/api/fators/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFator() throws Exception {
        // Initialize the database
        fatorService.save(fator);

        int databaseSizeBeforeUpdate = fatorRepository.findAll().size();

        // Update the fator
        Fator updatedFator = fatorRepository.findById(fator.getId()).get();
        // Disconnect from session so that the updates on updatedFator are not directly saved in db
        em.detach(updatedFator);
        updatedFator
            .nome(UPDATED_NOME)
            .pontuacao(UPDATED_PONTUACAO);

        restFatorMockMvc.perform(put("/api/fators")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFator)))
            .andExpect(status().isOk());

        // Validate the Fator in the database
        List<Fator> fatorList = fatorRepository.findAll();
        assertThat(fatorList).hasSize(databaseSizeBeforeUpdate);
        Fator testFator = fatorList.get(fatorList.size() - 1);
        assertThat(testFator.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testFator.getPontuacao()).isEqualTo(UPDATED_PONTUACAO);
    }

    @Test
    @Transactional
    public void updateNonExistingFator() throws Exception {
        int databaseSizeBeforeUpdate = fatorRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFatorMockMvc.perform(put("/api/fators")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fator)))
            .andExpect(status().isBadRequest());

        // Validate the Fator in the database
        List<Fator> fatorList = fatorRepository.findAll();
        assertThat(fatorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFator() throws Exception {
        // Initialize the database
        fatorService.save(fator);

        int databaseSizeBeforeDelete = fatorRepository.findAll().size();

        // Delete the fator
        restFatorMockMvc.perform(delete("/api/fators/{id}", fator.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Fator> fatorList = fatorRepository.findAll();
        assertThat(fatorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
