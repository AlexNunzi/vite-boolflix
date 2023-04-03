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
        ratingStars(){
            this.stars = [];
            let vote= this.voteStars;
            for(let i = 0; i < 5; i++){
                if(vote >= 1){
                    vote -= 1;
                    this.stars.push('width: 100%');
                } else {
                    // width del 100% / 1.28 come da commento alla regola css applicata a
                    // '.stella .solid' nel file general.css
                    this.stars.push(`width: ${vote * 100 / 1.28}%`);
                    vote = 0;
                } 
            }
        }
    },
    created() {
        this.ratingStars();
    }
}
</script>

<style>

</style>