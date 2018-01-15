<template>
    <div class="md-layout-item md-size-55 md-small-size-90  md-elevation-1 rasgada">
        <div class="md-layout">
            <div class="md-layout-item md-size-5 md-small-size-10">
                <md-avatar class="md-avatar-icon">{{rasgada.nome[0]}}</md-avatar>
            </div>
            <div class="md-layout-item md-size-65"
                 style="margin-left: 16px;">
                <div class="rasgada-nome">{{rasgada.nome}}</div>
                <div class="rasgada-cidade">{{rasgada.referencia}}</div>
            </div>
            <div class="md-layout-item">
            </div>
        </div>
        <div class="md-layout md-alignment-center-center ">
            <div class="md-layout-item">
                <div class="rasgada-comentario">"{{rasgada.comentario}}"</div>
            </div>
        </div>
        <div class="md-layout md-alignment-bottom-left">
            <div class="md-layout-item md-size-80 md-small-size-60  ">
                <div class="md-layout md-alignment-bottom-left ">
                    <div class="md-layout-item ">
                        <div class="md-caption">{{rasgada.cidade}}</div>
                        <div class="md-caption"> 12 Jan 2017 </div>
                    </div>
                </div>
            </div>
            <div class="md-layout-item md-size-20 md-small-size-40">
                <div class="md-layout md-alignment-bottom-right ">
                    <div class="md-layout-item md-size-50 md-">
                        <md-button @click="addVoto(rasgada.id, true)"
                                   class="md-icon-button voto-positivo">
                            <span>
                                {{ rasgada.votosPositivos }}
                            </span>
                            <md-icon>thumb_up</md-icon>
                        </md-button>
                    </div>
                    <div class="md-layout-item md-size-50">
                        <md-button @click="addVoto(rasgada.id, false)"
                                   class="md-icon-button voto-negativo">
                            <span>
                                {{ rasgada.votosNegativos }}
                            </span>
                            <md-icon>thumb_down</md-icon>
                        </md-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  props: ["rasgada"],
  methods: {
    ...mapActions(["votarPositivo", "votarNegativo"]),
    addVoto(id, positivo) {
      let vm = this;
      if (positivo) vm.votarPositivo(id);
      else vm.votarNegativo(id);
      vm.$emit("atualizaLista");
    }
  }
};
</script>

<style>
.rasgada {
  padding: 16px;
  margin-top: 16px;
}
.rasgada-comentario {
  margin-top: 16px;
  margin-bottom: 16px;
  text-align: center;
  font-size: 24px;
  line-height: 25px;
}
.voto-positivo {
  color: #99cc00 !important;
}
.voto-positivo .md-icon {
  color: #99cc00 !important;
}
.voto-negativo {
  color: #ff4444 !important;
}
.voto-negativo .md-icon {
  color: #ff4444 !important;
}
</style>
