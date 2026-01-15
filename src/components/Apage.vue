<template>
  <BContainer>
    <div class="overflow-auto">
      <BTable
        id="my-table"
        :items="items"
        :per-page="perPage"
        :current-page="currentPage"
      />

      <p class="mt-3">Current Page: {{ currentPage }}</p>
      <BPagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      />
    </div>
  </BContainer>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

// 一页多少个
const perPage = ref(4);
// 当前页码
const currentPage = ref(1);
// 表格数据
const items = ref([
  { id: 1, first_name: "Fred", last_name: "Flintstone" },
  { id: 2, first_name: "Wilma", last_name: "Flintstone" },
  { id: 3, first_name: "Barney", last_name: "Rubble" },
  { id: 4, first_name: "Betty", last_name: "Rubble" },
  { id: 5, first_name: "Pebbles", last_name: "Flintstone" },
  { id: 6, first_name: "Bamm Bamm", last_name: "Rubble" },
  { id: 7, first_name: "The Great", last_name: "Gazzoo" },
  { id: 8, first_name: "Rockhead", last_name: "Slate" },
  { id: 9, first_name: "Pearl", last_name: "Slaghoople" },
  { id: 10, first_name: "Dino", last_name: "Dinosaur" },
  { id: 11, first_name: "Hoppy", last_name: "Hoppy" },
  { id: 12, first_name: "Captain", last_name: "Caveman" },
  { id: 13, first_name: "Joe", last_name: "Rockhead" },
  { id: 14, first_name: "Cindy", last_name: "Miller" },
  { id: 15, first_name: "Stanley", last_name: "Spaceman" },
  { id: 16, first_name: "Ferdinand", last_name: "Fossil" },
]);
// 总行数
const rows = computed(() => items.value.length);
</script>
