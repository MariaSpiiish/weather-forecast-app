<script setup lang="ts">
    const f = () => {
        console.log('click')
    }

</script>

<template>
    <form class="form">
        <input placeholder="Location name" type="text" class="input" autofocus/>
        <button type="button" class="button" @click="f">Enter</button>  
    </form>
  
</template>

<style scoped>
    .form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .input {
        background-color: aliceblue;
        height: 60px;
        width: 200px;
        border: 2px solid #2e3c5a;
        font-size: 20px;
        color: #000;
        border-radius: 3px;
        box-sizing: border-box;
    }
    .button {
        height: 30px;
        width: 200px;
        background-color: #2e3c5a;
        border: none;
        border-radius: 3px;
    }
</style>