<template>
  <div>
    <div class="md-layout md-alignment-top-center lista-titulo hide-desktop">
      <div class="md-layout-item md-size-50 md-small-size-90 lista-titulo-text">
        <div class="md-headline">Últimas rasgadas</div>
        <div class="md-caption">Rasga Ninja é um site para exposição de opiniões anônimas</div>
      </div>
      <div class="md-layout-item md-size-5">
        <md-button @click="carregarNovas()"
                   class="md-icon-button">
          <md-icon>refresh</md-icon>
        </md-button>
      </div>
    </div>
    <div class="md-layout md-alignment-top-left lista-titulo hide-mobile">
      <div class="md-layout-item md-small-size-85 lista-titulo-text">
        <div class="md-headline">Últimas rasgadas</div>
        <div class="md-caption">Rasga Ninja é um site para exposição de opiniões anônimas</div>
      </div>
      <div class="md-layout-item md-size-5">
        <md-button @click="carregarNovas()"
                   class="md-icon-button">
          <md-icon>refresh</md-icon>
        </md-button>
      </div>
    </div>
    <div class="md-layout md-alignment-top-center">
      <!-- Begin BidVertiser code -->
      <SCRIPT data-cfasync="false"
              SRC="//bdv.bidvertiser.com/BidVertiser.dbm?pid=794755&bid=1921680"
              TYPE="text/javascript"></SCRIPT>
      <!-- End BidVertiser code -->
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
    carregarNovas() {
      let vm = this;
      vm.listar().then(() => {
        vm.atualizarLista();
      });
    },
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

@media (max-width: 900px) {
  .lista-titulo-text {
    padding-left: 16px;
  }
  .hide-desktop {
    display: none;
  }
}
@media (min-width: 900px) {
  .hide-mobile {
    display: none;
  }
}
.ver-mais-button {
  flex: 1 !important;
}
</style>
