<template>
      <section>
        <h2 class="mt-3 text-white">{{sectionTitle}} {{ sectionSubTitle }}:</h2>
    <!-- SE LA CHIAMATA GET DEVE ANCORA RICEVERE RISPOSTA SIMULA CARICAMENTO-->
        <loadingComp v-if="loadingContent" />
    <!-- ALTRIMENTI MOSTRA IL CONTENUTO -->
        <div v-else>
        <!-- SE LA LA LISTA CONTIENE QUALCOSA AL SUO INTERNO MOSTRA LA LISTA -->
          <ul v-if="contentList.length > 0" class="card-container bottom-line list-style-none d-flex overflow-x-auto overflow-y-hidden m-auto p-3">
            <CardFilmSerie v-for="film in contentList"
            :filmOrTv="film"
            :load="loadingContent"
            />
          </ul>
        <!-- ALTRIMENTI MOSTRA MESSAGGIO UTENTE -->
          <h3 v-else class="bottom-line pb-3">Non è stato possibile trovare {{ sectionTitle.toLowerCase() }} che contengono "{{ storage.lastSearch }}" nel proprio titolo</h3>
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
        sectionSubTitle: String,
        loadingContent: Boolean,
        contentList: Array,
    }
}
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;
.bottom-line{
    border-bottom: 2px solid lighten($bg-body, 20);
}

.card-container{
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
} 

.card-container::-webkit-scrollbar{
  display: none;
} 


</style>