<script lang="ts" setup></script>

<template>
  <ImgViewer>
    <img src="./assets/girl.png" alt="" />
    <h1 v-for="itme in 10">{{ itme }}</h1>
  </ImgViewer>
</template>

<style scoped lang="scss">
img {
  width: 300px;
  height: 300px;
}
</style>
