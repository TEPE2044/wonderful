<template>
    <div class="footer w-100">
        <BButton @click="esb.show()">yes</BButton>

    </div>
</template>

<script setup lang="ts">
import { useToggle } from "bootstrap-vue-next";
const esb = useToggle("easy-set-box");
</script>

<style scoped>

</style>