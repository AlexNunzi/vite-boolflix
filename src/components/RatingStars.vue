<template>
    <div>
        <div v-for="star in stars" class="stella">
            <div class="star-solid-wrap" :style="star">
                <font-awesome-icon icon="fa-solid fa-star" class="solid" />
            </div>
            <font-awesome-icon icon="fa-regular fa-star" class="regular" />
        </div>
    </div>
</template>

<script>
import { storage } from '../storage';
export default {
    name: 'RatingStar',
    data(){
        return {
            storage,
            stars: []
        }
    },
    props:{
        voteStars: Number,
    },
    methods: {
        //  FUNZIONE CHE ESEGUE IL PUSH DELLA STRINGA "width: n%" PER 5 VOLTE. IL VALORE DI n
        //  RISULTA PARI A 100 FINTANTO CHE voto >= 0 E A OGNI CONTROLLO VIENE SOTTRATTO 1 A voto,
        //  APPENA LA CONDIZIONE SMETTE DI ESSERE VERA n PRENDE IL VALORE DI voto * 100 SIMULANDO 
        //  UNA PERCENTUALE ED IL VALORE DI VOTO VIENE AZZERATO PER FARE IN MODO CHE LE WIDTH SUCCESSIVE
        //  RISULTINO "width: 0%". QUESTI VALORI SERVIRANNO A RENDERIZZARE LA LARGHEZZA DELLE STELLE
        //  CHE GESTISCONO GRAFICAMENTE IL RATING DI FILM/SERIE TV
        ratingStars(){
            this.stars = [];
            let vote= this.voteStars;
            for(let i = 0; i < 5; i++){
                if(vote >= 1){
                    vote -= 1;
                    this.stars.push('width: 100%');
                } else {
                    // width del 100% / 1.28 come da commento alla regola css applicata a
                    // '.stella .solid'
                    this.stars.push(`width: ${vote * 100 / 1.28}%`);
                    vote = 0;
                } 
            }
        }
    },
    //  ESEGUI LA FUNZIONE ratingStars() APPENA IL COMPONENT VIENE CREATO
    created() {
        this.ratingStars();
    }
}
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;
.stella{
    position: relative;
    display: inline-block;
    font-size: $star-fs;
    height: $star-fs;
    width: calc($star-fs * 1.125);
    z-index: 1;    
}

.stella .solid {
    // dimensione del font .stella / 1.28 perchè abbia una dimensione leggermente inferiore
    // al font-awesome della stella vuota per simularne lo riempimento conservando il bordo
    // della stella vuota anche in caso di completo riempimento
    font-size: calc($star-fs / 1.28); 
    color: $bg-star-rating;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
  }

.star-solid-wrap{
    height: 100%;
    position: absolute;
    // calc di top e left che serve a centrare i due font sovrapposti
    top: calc(($star-fs - ($star-fs/1.325)) / 2);
    left: calc(($star-fs - ($star-fs/1.325)) /2);
    overflow: hidden;
    z-index: 4;
}

.stella .regular{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
}
</style>