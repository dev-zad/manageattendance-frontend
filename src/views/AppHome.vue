<template>
  <div class="container mx-auto">
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
      <!-- Pagination controls -->
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
import { ref, computed } from 'vue';

const logs = ref([
  { id: 1, name: 'John Doe', date: '2023-01-02', time: '09:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 2, name: 'Jane Smith', date: '2023-01-02', time: '09:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 3, name: 'Alice Johnson', date: '2023-02-02', time: '10:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 4, name: 'Bob Brown', date: '2023-02-02', time: '10:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 5, name: 'Eve White', date: '2023-03-02', time: '11:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 6, name: 'Charlie Black', date: '2023-03-02', time: '11:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 7, name: 'Grace Grey', date: '2023-04-02', time: '12:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 8, name: 'David Green', date: '2023-04-02', time: '12:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 9, name: 'Hannah Brown', date: '2023-05-02', time: '13:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 10, name: 'Frank White', date: '2023-05-02', time: '13:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 11, name: 'Ivy Black', date: '2023-06-02', time: '14:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 12, name: 'Jack Grey', date: '2023-06-02', time: '14:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 13, name: 'Kelly Green', date: '2023-07-02', time: '15:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 14, name: 'Liam Brown', date: '2023-07-02', time: '15:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 15, name: 'Mia White', date: '2023-08-02', time: '16:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 16, name: 'Noah Black', date: '2023-08-02', time: '16:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 17, name: 'Olivia Grey', date: '2023-09-02', time: '17:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 18, name: 'Peter Green', date: '2023-09-02', time: '17:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 19, name: 'Quinn Brown', date: '2023-10-02', time: '18:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 20, name: 'Rose White', date: '2023-10-02', time: '18:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 21, name: 'Sam Black', date: '2023-11-02', time: '19:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 22, name: 'Tom Grey', date: '2023-11-02', time: '19:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 23, name: 'Ursula Green', date: '2023-12-02', time: '20:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 24, name: 'Victor Brown', date: '2023-12-02', time: '20:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 25, name: 'Wendy White', date: '2024-01-02', time: '21:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 26, name: 'Xavier Black', date: '2024-01-02', time: '21:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 27, name: 'Yvonne Grey', date: '2024-02-02', time: '22:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 28, name: 'Zack Green', date: '2024-02-02', time: '22:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 29, name: 'Adam Brown', date: '2024-03-02', time: '23:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 30, name: 'Bella White', date: '2024-03-02', time: '23:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 31, name: 'John Doe', date: '2024-04-02', time: '09:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 32, name: 'Jane Smith', date: '2024-04-02', time: '09:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 33, name: 'Alice Johnson', date: '2024-05-02', time: '10:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 34, name: 'Bob Brown', date: '2024-05-02', time: '10:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 35, name: 'Eve White', date: '2024-06-02', time: '11:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 36, name: 'Charlie Black', date: '2024-06-02', time: '11:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 37, name: 'Grace Grey', date: '2024-07-02', time: '12:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 38, name: 'David Green', date: '2024-07-02', time: '12:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 39, name: 'Hannah Brown', date: '2024-08-02', time: '13:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 40, name: 'Frank White', date: '2024-08-02', time: '13:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 41, name: 'Ivy Black', date: '2024-09-02', time: '14:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 42, name: 'Jack Grey', date: '2024-09-02', time: '14:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 43, name: 'Kelly Green', date: '2024-10-02', time: '15:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 44, name: 'Liam Brown', date: '2024-10-02', time: '15:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 45, name: 'Mia White', date: '2024-11-02', time: '16:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 46, name: 'Noah Black', date: '2024-11-02', time: '16:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 47, name: 'Olivia Grey', date: '2024-12-02', time: '17:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 48, name: 'Peter Green', date: '2024-12-02', time: '17:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 49, name: 'Quinn Brown', date: '2025-01-02', time: '18:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 50, name: 'Rose White', date: '2025-01-02', time: '18:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 51, name: 'Sam Black', date: '2025-02-02', time: '19:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 52, name: 'Tom Grey', date: '2025-02-02', time: '19:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 53, name: 'Ursula Green', date: '2025-03-02', time: '20:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 54, name: 'Victor Brown', date: '2025-03-02', time: '20:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 55, name: 'Wendy White', date: '2025-04-02', time: '21:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 56, name: 'Xavier Black', date: '2025-04-02', time: '21:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 57, name: 'Yvonne Grey', date: '2025-05-02', time: '22:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 58, name: 'Zack Green', date: '2025-05-02', time: '22:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 59, name: 'Adam Brown', date: '2025-06-02', time: '23:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 60, name: 'Bella White', date: '2025-06-02', time: '23:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 61, name: 'John Doe', date: '2025-07-02', time: '09:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 62, name: 'Jane Smith', date: '2025-07-02', time: '09:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 63, name: 'Alice Johnson', date: '2025-08-02', time: '10:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 64, name: 'Bob Brown', date: '2025-08-02', time: '10:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 65, name: 'Eve White', date: '2025-09-02', time: '11:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 66, name: 'Charlie Black', date: '2025-09-02', time: '11:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 67, name: 'Grace Grey', date: '2025-10-02', time: '12:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 68, name: 'David Green', date: '2025-10-02', time: '12:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 69, name: 'Hannah Brown', date: '2025-11-02', time: '13:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 70, name: 'Frank White', date: '2025-11-02', time: '13:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 71, name: 'Ivy Black', date: '2025-12-02', time: '14:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 72, name: 'Jack Grey', date: '2025-12-02', time: '14:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 73, name: 'Kelly Green', date: '2026-01-02', time: '15:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 74, name: 'Liam Brown', date: '2026-01-02', time: '15:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 75, name: 'Mia White', date: '2026-02-02', time: '16:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 76, name: 'Noah Black', date: '2026-02-02', time: '16:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 77, name: 'Olivia Grey', date: '2026-03-02', time: '17:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
]);


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
