<template>
    <header>
        <div class="container d-flex justify-content-between align-center h-100 m-auto">
            <h1>BOOLFLIX</h1>
            <div>
                <input class="me-3" type="text" v-model="storage.searchInput" @keyup.enter="$emit('searchFilm')">
                <button @click="$emit('searchFilm')">Cerca</button>
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
</style>