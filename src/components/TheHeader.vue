<template>
    <header>
        <div class="container d-flex justify-content-between align-center h-100 m-auto">
            <h1>BOOLFLIX</h1>
            <div>
                <input class="me-3" type="text">
                <button>Cerca</button>
            </div>
        </div>
    </header>
</template>

<script>
export default{
    name: 'TheHeader',
}
</script>

<style lang="scss">
@use '../styles/variables' as *;

header { 
    background-color: $bg-header;
    height: 5rem;

    & h1 {
        color: $text-color-header;
    }
}
</style>