<template>
  <div class="container mx-auto">
    <app-sidebar @date-range-filter="filterLogs" />



    <div class="flex flex-col">
      <div class="overflow-x-auto mt-12">
        <table class="table-auto border w-full mt-8">
          <thead>
            <tr class="bg-transparent border ">
              <th class="px-4 py-2 text-left rubik">Name</th>
              <th class="px-4 py-2 text-left rubik">Date</th>
              <th class="px-4 py-2 text-left rubik">Time</th>
              <th class="px-4 py-2 text-left rubik">IN/OUT</th>
              <th class="px-4 py-2 text-left rubik">LOG DETAILS</th>
              <th class="px-4 py-2 text-left rubik">LOCATION</th>
              <th class="px-4 py-2 text-left rubik">PROJECT NAME</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in paginatedLogs" :key="log.id" class="border-b hover:bg-gray-100">
              <td class="px-4 py-5 text-[14px] rubik font-semibold">{{ log.name }}</td>
              <td class="px-4 py-2 text-[14px]  rubik text-[#00291B] ">{{ log.date }}</td>
              <td class="px-4 py-2 text-[14px]  rubik text-[#00291B]">{{ log.time }}</td>
              <td class="px-4 py-2 text-[14px]  font-semibold rubik "
                :class="{ 'text-[#0F6EEB]': log.inOut === 'IN', 'text-[#FF7F00]': log.inOut === 'OUT' }">{{ log.inOut }}
              </td>
              <td class="px-4 py-2 text-[14px]  rubik text-[#00291B]">{{ log.logDetails }}</td>
              <td class="px-4 py-2 text-[14px]  rubik text-[#00291B]">{{ log.location }}</td>
              <td class="px-4 py-2 text-[14px]  rubik text-[#00291B]">{{ log.projectName }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-center mt-16 relative">
        <button @click="goToFirstPage" :disabled="currentPage === 1" class="px-4 py-2 mr-2  text-[#17AD49] rounded-md">
          <i class="fa-solid fa-backward"></i>
        </button>
        <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 mr-2  text-[#17AD49] rounded-md">
          <i class="fa-solid fa-caret-left"></i>
        </button>
        <span class="mr-2 items-center flex">Page</span>
        <input type="number" v-model.number="currentPage" min="1" max="pageCount"
          class="px-4 py-2 mr-2 text-center w-16 border rounded-md">
        <span class="mr-2 items-center flex">of {{ pageCount }}</span>
        <button @click="nextPage" :disabled="currentPage === pageCount" class="px-4 py-2  text-[#17AD49] rounded-md">
          <i class="fa-solid fa-caret-right"></i>
        </button>
        <button @click="goToLastPage" :disabled="currentPage === pageCount"
          class="px-4 py-2  text-[#17AD49] rounded-md">
          <i class="fa-solid fa-forward"></i>
        </button>
      </div>
    </div>

  </div>
</template>


<script setup>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';



const store = useStore();
const logs = computed(() => store.state.logs);

const itemsPerPage = ref(10);
const currentPage = ref(1);

const pageCount = computed(() => Math.ceil(logs.value.length / itemsPerPage.value));

const paginatedLogs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return logs.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < pageCount.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToFirstPage = () => {
  currentPage.value = 1;
};

const goToLastPage = () => {
  currentPage.value = pageCount.value;
};
</script>

<style scoped>
@font-face {
  font-family: "Rubik";
  src: url("~@/assets/fonts/Rubik-VariableFont_wght.ttf") format("truetype");
}

.rubik {
  font-family: "Rubik", sans-serif;
}
</style>
