package br.mp.mpf.ssin.migri.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.mp.mpf.ssin.migri.web.rest.TestUtil;

public class LotacaoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Lotacao.class);
        Lotacao lotacao1 = new Lotacao();
        lotacao1.setId(1L);
        Lotacao lotacao2 = new Lotacao();
        lotacao2.setId(lotacao1.getId());
        assertThat(lotacao1).isEqualTo(lotacao2);
        lotacao2.setId(2L);
        assertThat(lotacao1).isNotEqualTo(lotacao2);
        lotacao1.setId(null);
        assertThat(lotacao1).isNotEqualTo(lotacao2);
    }
}
