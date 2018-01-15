import Vue from 'vue'
import Router from 'vue-router'
import ListaRasgadas from '@/components/ListaRasgadas'
import VerRasgada from '@/components/VerRasgada'
import CadastrarRasgada from '@/components/CadastrarRasgada'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'lista',
      component: ListaRasgadas
    },
    {
      path: '/ver',
      name: 'ver',
      component: VerRasgada
    },
    {
      path: '/cadastrar',
      name: 'cadastrar',
      component: CadastrarRasgada
    }
  ]
})
