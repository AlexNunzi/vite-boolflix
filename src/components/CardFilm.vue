<template>
    <div class="card p-3">
        <ul class="list-style-none">
            <li>
                <h3>{{ filmName }}</h3>
            </li>
        </ul>
    </div>
</template>

<script>
export default{
    name: 'CardFilm',
    props: {
        filmName: String,

    }
}
</script>

<style scoped lang="scss">
.card{
    border: 2px solid red;
}
</style>