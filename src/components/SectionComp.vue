<template>
      <section>
        <h2 class="my-3">{{sectionTitle}}:</h2>
        <loadingComp v-if="loadingContent" />
        <div v-else>
          <ul v-if="contentList.length > 0" :class="classShadow" class="list-style-none d-flex overflow-x-auto overflow-y-hidden m-auto p-3">
            <CardFilmSerie class="card-container" v-for="film in contentList"
            :filmOrTv="film"
            :load="loadingContent"
            />
          </ul>
          <h3 v-else>Non è stato possibile trovare {{ sectionTitle.toLowerCase() }} che contengono "{{ storage.lastSearch }}" nel proprio titolo</h3>
        </div>
      </section>
</template>

<script>
import { storage } from '../storage.js';
import CardFilmSerie from './CardFilmSerie.vue';
import LoadingComp from './LoadingComp.vue';
export default {
    name: 'SectionComp',
    data() {
        return {
            storage
        }
    },
    components: {
        LoadingComp,
        CardFilmSerie
    },
    props: {
        sectionTitle: String,
        loadingContent: Boolean,
        contentList: Object
    }
}
</script>

<style scoped lang="scss">

</style>