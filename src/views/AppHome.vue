<template>
  <div class="container mx-auto">
    <div class="flex flex-col">
      <!-- Table header -->
      <div class="overflow-x-auto">
        <table class="table-auto border w-full mt-20">
          <thead>
            <tr class="bg-transparent border">
              <th class="px-4 py-2 text-left">Name</th>
              <th class="px-4 py-2 text-left">Date</th>
              <th class="px-4 py-2 text-left">Time</th>
              <th class="px-4 py-2 text-left">IN/OUT</th>
              <th class="px-4 py-2 text-left">LOG DETAILS</th>
              <th class="px-4 py-2 text-left">LOCATION</th>
              <th class="px-4 py-2 text-left">PROJECT NAME</th>
            </tr>
          </thead>
          <tbody>
            <!-- Table rows -->
            <tr v-for="log in paginatedLogs" :key="log.id" class="border-b hover:bg-gray-100">
              <td class="px-4 py-5 rubik font-semibold">{{ log.name }}</td>
              <td class="px-4 py-2 rubik text-[#00291B] ">{{ log.date }}</td>
              <td class="px-4 py-2 rubik text-[#00291B]">{{ log.time }}</td>
              <td class="px-4 py-2 font-semibold rubik "
                :class="{ 'text-[#0F6EEB]': log.inOut === 'IN', 'text-[#FF7F00]': log.inOut === 'OUT' }">{{ log.inOut }}
              </td>
              <td class="px-4 py-2 rubik text-[#00291B]">{{ log.logDetails }}</td>
              <td class="px-4 py-2 rubik text-[#00291B]">{{ log.location }}</td>
              <td class="px-4 py-2 rubik text-[#00291B]">{{ log.projectName }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Pagination controls -->
      <div class="flex justify-center mt-12 relative">
        <button @click="prevPage" :disabled="currentPage === 2" class="px-4 py-2 mr-2  text-[#17AD49] rounded-md"><i
            class="fa-solid fa-backward"></i></button>
        <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 mr-2  text-[#17AD49] rounded-md"><i
            class="fa-solid fa-caret-left"></i></button>
        <span class="mr-2 items-center flex">Page</span>
        <input type="number" v-model.number="currentPage" min="1" max="pageCount"
          class="px-4 py-2 mr-2 text-center w-16 border rounded-md">
        <span class="mr-2 items-center flex">of {{ pageCount }}</span>
        <button @click="nextPage" :disabled="currentPage === pageCount" class="px-4 py-2  text-[#17AD49] rounded-md"><i
            class="fa-solid fa-caret-right"></i></button>
        <button @click="nextPage" :disabled="currentPage === pageCount" class="px-4 py-2  text-[#17AD49] rounded-md"><i
            class="fa-solid fa-forward"></i></button>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';


// Mocked log data
const logs = ref([
  { id: 1, name: 'John Doe', date: '2022-05-25', time: '09:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 2, name: 'Jane Smith', date: '2022-05-25', time: '09:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 3, name: 'Alice Johnson', date: '2022-05-25', time: '10:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 4, name: 'Bob Brown', date: '2022-05-25', time: '10:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 5, name: 'Eve White', date: '2022-05-25', time: '11:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 6, name: 'Charlie Black', date: '2022-05-25', time: '11:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 7, name: 'Grace Grey', date: '2022-05-25', time: '12:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 8, name: 'David Green', date: '2022-05-25', time: '12:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 9, name: 'Hannah Brown', date: '2022-05-25', time: '13:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 10, name: 'Frank White', date: '2022-05-25', time: '13:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 11, name: 'Ivy Black', date: '2022-05-25', time: '14:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 12, name: 'Jack Grey', date: '2022-05-25', time: '14:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 13, name: 'Kelly Green', date: '2022-05-25', time: '15:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 14, name: 'Liam Brown', date: '2022-05-25', time: '15:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 15, name: 'Mia White', date: '2022-05-25', time: '16:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 16, name: 'Noah Black', date: '2022-05-25', time: '16:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 17, name: 'Olivia Grey', date: '2022-05-25', time: '17:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 18, name: 'Peter Green', date: '2022-05-25', time: '17:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 19, name: 'Quinn Brown', date: '2022-05-25', time: '18:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 20, name: 'Rose White', date: '2022-05-25', time: '18:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 21, name: 'Sam Black', date: '2022-05-25', time: '19:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 22, name: 'Tom Grey', date: '2022-05-25', time: '19:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 23, name: 'Ursula Green', date: '2022-05-25', time: '20:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 24, name: 'Victor Brown', date: '2022-05-25', time: '20:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 25, name: 'Wendy White', date: '2022-05-25', time: '21:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 26, name: 'Xavier Black', date: '2022-05-25', time: '21:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 27, name: 'Yvonne Grey', date: '2022-05-25', time: '22:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 28, name: 'Zack Green', date: '2022-05-25', time: '22:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
  { id: 29, name: 'Adam Brown', date: '2022-05-25', time: '23:00', inOut: 'IN', logDetails: 'APP', location: '-', projectName: 'Project A' },
  { id: 30, name: 'Bella White', date: '2022-05-25', time: '23:30', inOut: 'OUT', logDetails: 'APP', location: '-', projectName: 'Project B' },
]);

// Pagination
const itemsPerPage = 10;
const currentPage = ref(1);

const paginatedLogs = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return logs.value.slice(startIndex, startIndex + itemsPerPage);
});

const pageCount = Math.ceil(logs.value.length / itemsPerPage);

function nextPage() {
  if (currentPage.value < pageCount) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
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
