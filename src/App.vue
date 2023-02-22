<script lang="ts" setup>
import ImgViewer from "./components/ImgViewer.vue";
</script>

<template>
  <main>
    <h1>vue3-img-viewer</h1>
    <h2>A lightly and smooth imgViewer for Vue/You</h2>
    <div id="hr"></div>
    <ImgViewer>
      <h3>this is a beautiful html img element, try click it</h3>
      <img src="./assets/girl.png" alt="" />
      <h3 v-for="itme in 10">scroll when preview</h3>
    </ImgViewer>
  </main>
</template>

<style scoped lang="scss">
main {
  width: 60vw;
  margin: 10vh auto;
  text-align: center;

  background-color: bisque;
  border-radius: 4%;
  box-shadow: 0px 2px 30px rgba(128, 128, 128, 0.455);
  padding: 30px 0;

  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;

  h1 {
    font-size: 300%;
  }
  h2 {
    opacity: 0.7;
  }
  #hr {
    margin: 30px auto;
    width: 40%;
    border-bottom: 2px solid gray;
  }

  h3 {
    opacity: 0.4;
  }
  img {
    width: 300px;
    height: 300px;
  }
}
</style>
