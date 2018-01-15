<template>
  <div id="app">
    <toolbar/>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Toolbar from "./components/Shared/Toolbar";
export default {
  name: "app",
  components: {
    toolbar: Toolbar
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color(pink, 500),
  accent: md-get-palette-color(blue, 400) 
));

@import "~vue-material/dist/theme/all"; // Apply the theme
.md-input {
  font-size: 16px !important;
}
</style>

