<template>
  <div class="md-layout md-alignment-center-center">
    <div class="md-layout-item md-size-30 md-small-size-95 md-elevation-1 form-container">
      <span class="md-headline">Cadastrar nova rasgada</span>
      <md-field>
        <label>Nome</label>
        <md-input v-model="rasgada.nome"></md-input>
      </md-field>
      <md-field>
        <label>Cidade</label>
        <md-input v-model="rasgada.cidade"></md-input>
      </md-field>
      <md-field>
        <label>Referência</label>
        <md-input v-model="rasgada.referencia"></md-input>
      </md-field>
      <md-field>
        <label>Comentário</label>
        <md-textarea v-model="rasgada.comentario"></md-textarea>
      </md-field>
      <md-button @click="cadastrar()"
                 class="md-raised md-accent button">cadastrar</md-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      rasgada: {
        nome: "",
        cidade: "",
        referencia: "",
        comentario: ""
      }
    };
  },
  methods: {
    cadastrar() {
      this.$store.dispatch("salvar", this.rasgada).then(() => {
        this.rasgada = {};
        this.$router.push("/");
      });
    }
  }
};
</script>

<style scoped>
.form-container {
  padding: 16px;
  margin-top: 40px;
}
.button {
  flex: 1 !important;
  color: #fff !important;
}
</style>
