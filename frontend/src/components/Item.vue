<template>
    <div class="card-text">
        <p>{{ publication }}</p>
        <p>{{ comment }}</p>
        <button @click="deletePublication" class="item">X</button>
    </div>
</template>


<script>

export default {
    name: 'Item',
    props: ['publication', 'comment', 'deletePublication'],
}

</script>


<style scoped>

.card-text {
    display: flex;
    flex-direction: column;
}

.item {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
    background-color: #dc3545;
    cursor: pointer;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
}

.item:hover {
  background: red;
}

button {
    cursor: pointer;
}

</style>