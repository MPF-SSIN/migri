package br.mp.mpf.ssin.migri.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.mp.mpf.ssin.migri.web.rest.TestUtil;

public class FatorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fator.class);
        Fator fator1 = new Fator();
        fator1.setId(1L);
        Fator fator2 = new Fator();
        fator2.setId(fator1.getId());
        assertThat(fator1).isEqualTo(fator2);
        fator2.setId(2L);
        assertThat(fator1).isNotEqualTo(fator2);
        fator1.setId(null);
        assertThat(fator1).isNotEqualTo(fator2);
    }
}
