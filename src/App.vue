<script lang="ts" setup>
import ImgViewer from "./components/ImgViewer.vue";
</script>

<template>
  <main>
    <h1>vue3-img-viewer</h1>
    <p class="introduce">A lightly and smooth imgViewer for Vue/You</p>
    <div id="hr"></div>

    <p class="describe">
      please click these imgs below, when the preview modal open
      <br />
      try click again or scroll to close it.
    </p>

    <toc-creator></toc-creator>
    <!-- toc-creator 介绍 -->
    <span class="toc-creator describe">
      this is my another npm
      <br />
      component:
      <a href="https://www.npmjs.com/package/toc-creator" target="_blank">
        toc-creator
      </a>
    </span>

    <ImgViewer>
      <h2>normal</h2>
      <img class="small" src="./assets/girl.png" alt="" />
      <h2>long and large</h2>
      <img class="large" src="./assets/yuan.jpg" alt="" />
      <h2>404 or unload</h2>
      <img
        class="non"
        src="https://github.com/bullshitking-99/vue3-img-viewer/assets/not-exsit.jpg"
        alt="I'm not ready yet"
      />
      <h2>GIF</h2>
      <p class="tip">
        this feature is optional,use it by prop
        <br />
        All .gif will stop on initialization and can be clicked to play
        <br />
        for easy browsing and energy saving
      </p>
      <img class="gif" src="./assets/vue3-img-viewer.gif" alt="" />
    </ImgViewer>
  </main>
</template>

<style scoped lang="scss">
main {
  width: 60vw;
  min-width: 350px;
  margin: 10vh auto;
  text-align: center;

  background-color: bisque;
  border-radius: 15px;
  box-shadow: 0px 2px 30px rgba(128, 128, 128, 0.455);
  padding: 30px 10px;

  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;

  .toc-creator {
    position: fixed;
    top: 160px;
    left: 20px;
    padding-left: 10px;
    border-left: 3px solid gray;
  }

  h1 {
    font-size: 300%;
  }
  .introduce {
    font-size: 20px;
    font-weight: bold;
    opacity: 0.7;
    margin: 15px auto;
    font-style: italic;
  }
  #hr {
    margin: 30px auto;
    width: 40%;
    border-bottom: 2px solid gray;
  }
  .describe {
    display: inline-block;
    font-size: 18px;
    font-style: italic;
    opacity: 0.7;
    margin-bottom: 20px;
  }
  h2 {
    opacity: 0.7;
    margin: 20px auto;
  }
  .tip {
    margin-bottom: 10px;
    font-style: italic;
    opacity: 0.5;
  }

  img {
    &.gif {
      max-width: 60%;
    }
    &.small {
      width: 300px;
      height: 300px;
    }
    &.large {
      width: 100%;
    }
    &.non {
      border: 1px solid black;
      padding: 100px;
    }
  }
}
</style>
