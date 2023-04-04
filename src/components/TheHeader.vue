<template>
    <header>
        <div class="container d-flex justify-content-between align-center h-100 m-auto">
            <h1>BOOLFLIX</h1>
            <div>
                <input class="input-search me-3" type="text" v-model="storage.searchInput" @keyup.enter="$emit('searchFilm')">
                <button class="search px-2" @click="$emit('searchFilm')">Cerca</button>
            </div>
        </div>
    </header>
</template>

<script>
import { storage } from '../storage.js';
export default{
    name: 'TheHeader',
    data() {
        return {
            storage,
        }
    }
}
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;

header { 
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
    background-color: $bg-primary;
    height: 5rem;

    & h1 {
        color: $text-color-header;
    }
}

.search{
    border: none;
    border-radius: 0.5rem;
    background-color: $bg-search;
    color: lighten($bg-search, 80);

    &:hover{
        cursor: pointer;
        transition: all 0.25s;
        transform: scale(1.05);
        background-color: lighten($bg-search, 20);
    }

    &:active{
        transform: scale(0.995);
        background-color: darken($bg-search, 10);

    }
}

.input-search{
    padding-left: 0.25rem;
    border: none;
    background-color: lighten($bg-search, 50);
}

.input-search,
.search {
    height: 1.5rem;
}
</style>