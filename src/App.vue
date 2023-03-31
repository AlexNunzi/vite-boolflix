<template>
  <TheHeader />
</template>

<script>
import axios from 'axios';
import { storage } from './storage.js';

import TheHeader from './components/TheHeader.vue';
export default{
  data() {
    return {
      storage
    }
  },
  components: {
    TheHeader,
  }
}
</script>

<style lang="scss">
@use "./styles/general.scss";
</style>
