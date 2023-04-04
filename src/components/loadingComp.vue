<template>
    <div>
        <font-awesome-icon class="d-block m-auto load p-4 rounded-circle" icon="fa-solid fa-spinner" spin size="2xl" />
    </div>
</template>

<script>
export default {
    name: 'LoadingComp',
    }
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;

.load{
    border: 2px solid $border-load;
    box-shadow: 0px 0px 20px 0px #000000;
}
</style>