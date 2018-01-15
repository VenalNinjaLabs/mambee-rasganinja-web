<template>
    <md-toolbar class="md-primary"
                md-elevation="1">
        <router-link to="/"
                     style="flex: 1">
            <h3 class="md-title">Rasgar Ninja</h3>
        </router-link>
        <md-button :to="{name:'lista'}"
                   class="md-primary button">Ver lista</md-button>
        <md-button :to="{name:'cadastrar'}"
                   class="md-raised md-accent button">Rasgar</md-button>
    </md-toolbar>
</template>

<script>
export default {
  name: "Toolbar"
};
</script>

<style scoped>
.button {
  color: #fff !important;
}
</style>
