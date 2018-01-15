<template>
    <div>
        <div class="md-layout md-alignment-top-center lista-titulo">
            <div class="md-layout-item md-size-55 md-small-size-95">
                <span class="md-headline">Últimas rasgadas</span>
            </div>
        </div>
        <div v-show="lista.length < 1"
             class="md-layout md-alignment-top-center">
            <md-progress-spinner class="md-accent"
                                 md-mode="indeterminate"></md-progress-spinner>
        </div>
        <div v-show="lista"
             class="md-layout md-alignment-top-center">
            <rasgada-item v-for="rasgada of lista"
                          :key="rasgada.id"
                          :rasgada="rasgada"
                          @atualizaLista="atualizarLista()" />
        </div>

        <div class="md-layout md-alignment-top-center lista-titulo">
            <div v-show="!carregando"
                 class="md-layout-item md-size-55 md-small-size-95">
                <md-button v-show="!fimDaLista"
                           class="md-accent ver-mais-button"
                           @click="carregaAntigas()">Ver mais antigas</md-button>
            </div>
            <div v-show="carregando"
                 class="md-layout-item md-size-55 md-small-size-95">
                <md-progress-bar class="md-accent"
                                 md-mode="indeterminate"></md-progress-bar>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import ItemRasgada from "./ItemRasgada";
export default {
  components: {
    "rasgada-item": ItemRasgada
  },
  data() {
    return {
      lista: [],
      fimDaLista: false,
      carregando: false
    };
  },
  mounted() {
    let vm = this;
    vm.listar().then(() => {
      vm.atualizarLista();
    });

    setInterval(() => {
      vm.atualizarLista();
    }, 10000);
  },
  computed: {
    ...mapState({
      listaRasgadas: state => state.listaRasgadas
    }),
    ...mapGetters(["getLista", "getFimDaLista"])
  },
  methods: {
    ...mapActions(["listar", "listarAntigas"]),
    atualizarLista() {
      let vm = this;
      vm.lista = [];
      vm.lista = vm.getLista;
      vm.fimDaLista = vm.getFimDaLista;
    },
    carregaAntigas() {
      let vm = this;
      vm.carregando = true;
      vm.listarAntigas().then(fimDaLista => {
        if (fimDaLista) {
          vm.fimDaLista = vm.getFimDaLista;
        } else {
          vm.atualizarLista();
        }
        vm.carregando = false;
      });
    }
  }
};
</script>

<style>
.lista-titulo {
  margin-top: 16px;
}
.ver-mais-button {
  flex: 1 !important;
}
</style>
