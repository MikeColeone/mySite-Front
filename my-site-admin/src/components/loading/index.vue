<template>
  <div class="loading">
    <div class="dot">1</div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
</script>

<style scoped lang="less">
@ballSize: 10px;
@ballColor: #fff;
@ballSpeed: 1s;
.loading {
  margin: 5px auto;
  position: relative;
  border-radius: 100%;
  outline: 1px solid;
  .dot {
    position: absolute;
    top: 50%;
    width: 0ballSize;
    margin-top: -@ballSize / 2;
    margin-left: -@ballSize / 2;
    background-color: black;
  }
}

.dot:nth-child(1) {
  transform: translate(0, 0);
}
</style>
