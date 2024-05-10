<template>
  <aside class="bg-slate-900" :class="`${is_expanded ? 'is-expanded' : ''} `">
    <div class="menu-toggle-wrap mt-10">
      <button @click="toggleExpanded" class="menu-toggle">
        <i class="material-icons">{{ is_expanded ? 'chevron_right' : 'chevron_left' }}</i>
      </button>
    </div>
    <div class="px-2">
      <h3 class="rubik font-bold text-[24px] text-[#00291B] ">
        Manage Attendance
      </h3>
      <p class="mt-1 text-[14px] text-[#3c5b51] font-semibold rubik">
        Attendance management is where you can generate, add, edit, and export
        the logs of the employees.
      </p>
    </div>
    <div class="px-4">
      <router-link to="/">

        <button @click="navigateToGenerate"
          class="w-full rounded-sm flex items-center hover:bg-[#e6ffee] hover:h-[30px] mt-10">
          <img :src="startImage" alt="Start Icon" class="mr-2" />
          <span class="rubik font-bold text-[#3c5b51]">Attendance Logs</span>
        </button>
      </router-link>
      <router-link to="/about">
        <button @click="navigateToGenerate" class="w-full rounded-sm flex items-center mt-2 hover:bg-[#e6ffee]">
          <img :src="downloadImage" alt="donwload" class="mr-2" />
          <span class="rubik font-bold text-[#3c5b51]">Exported Files</span>
        </button>
      </router-link>
    </div>

    <div class="divider-1"></div>

    <div></div>
    <h3 class="rubik font-bold text-[#3c5b51]">DATE RANGE</h3>
    <div class="section">
      <input type="date" id="date-from" class="rubik w-[260px] text-black p-[0.5rem] mb-[0.5rem] border-2 rounded-md"
        v-model="dateFrom" />
      <input type="date" id="date-to" class="rubik w-[260px] text-black p-[0.5rem] mb-[0.5rem] border-2 rounded-md"
        v-model="dateTo" />
    </div>
    <div class="section mt-10">
      <div class="flex justify-between items-center">
        <span class="text-filter font-bold rubik text-[#3c5b51]">FILTERS</span>
        <button
          class="filter-button-text text-[14px] bg-transparent border-none cursor-pointer rubik text-blue-500 hover:underline focus:outline-none"
          @click="toggleShowAll">
          {{ showAll ? 'Hide All' : 'Show All' }}
        </button>
      </div>
      <div class="flex flex-col mt-2  gap-2">
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-building-user text-[14px] text-[#969696]"></i>
          <p class="ml-2 text-[#3C5B51] rubik text-[14px]">SPROUT SOLUTIONS</p>
        </div>
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-users text-[14px] text-[#969696]"></i>
          <p class="ml-2 text-[#3C5B51] rubik text-[14px]">ALL</p>
        </div>
        <div class="flex items-center gap-4">
          <i class="fa-solid fa-location-dot text-[14px] text-[#969696]"></i>
          <p class="ml-2 text-[#3C5B51] rubik text-[14px]">ALL</p>
        </div>
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-user text-[14px] text-[#969696]"></i>
          <p class="ml-2 text-[#3C5B51] rubik text-[14px]">ALL</p>
        </div>
      </div>
    </div>
    <div class="divider-2"></div>
    <div class="flex flex-col items-center mt-[2px]">
      <button class="h-[50px] w-[260px] rounded-sm flex items-center mt-2 bg-[#17AD49] hover:bg-lime-600">
        <span class="rubik mx-auto text-white">Search</span>
      </button>
      <button
        class="h-[50px] w-[260px] border-[2px] bg-slate-100 rounded-sm flex flex-row items-center justify-center gap-2 mt-2 ">
        <img :src="downloadImage" alt="donwload" class="" />
        <span class="rubik text-[#838383]">Export</span>
      </button>
    </div>
  </aside>
</template>


<script setup>
import startImage from "../assets/start.png";
import downloadImage from "../assets/download.png";

let showAll = false;

const toggleShowAll = () => {
  showAll = !showAll;
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "Rubik";
  src: url("~@/assets/fonts/Rubik-VariableFont_wght.ttf") format("truetype");
}

.rubik {
  font-family: "Rubik", sans-serif;
}

.divider-1 {
  border-top: 1px solid #ccc;
  margin: 1rem 0;
  margin-top: 50px;
}

.divider-2 {
  border-top: 1px solid #ccc;
  margin: 1rem 0;
  margin-top: 60px;
}

aside {
  display: flex;
  flex-direction: column;
  background-color: white;
  color: white;
  width: 300px;
  overflow: hidden;
  height: 868px;
  padding: 1rem;


  @media (max-width: 1024px) {
    position: absolute;
    z-index: 99;
  }
}
</style>