<template>
  <header class="app-header">
    <div class="logo">
      <img class="logo" src="../assets/images/SproutLogo.png" alt="Logo" />
    </div>
    <div class="menu">
      <div class="menu-item text-[#DDDDDD] ">
        My Requests
        <i class="fa-solid fa-sort-down"></i>
      </div>
      <div class="menu-item text-[#DDDDDD]">
        My Team
        <i class="fa-solid fa-sort-down"></i>
      </div>
      <div class="menu-item text-[#DDDDDD]">
        Company
        <i class="fa-solid fa-sort-down"></i>
      </div>
      <div class="menu-item text-[#DDDDDD]">
        Administration Tools
        <i class="fa-solid fa-sort-down"></i>
      </div>
      <div class="menu-item text-[#DDDDDD]">
        Maintenance
        <i class="fa-solid fa-sort-down"></i>
      </div>
      <div class="search-bar">
        <input type="text" v-model="searchTerm" placeholder="Search Employe.." @keyup.enter="search" />
        <i class="fas fa-search" @click="search"></i>
      </div>
      <div class="w-[40px] h-[40px] rounded-full bg-slate-300 "></div>
      <div class="menu-item text-[#DDDDDD]">
        Admin
        <i class="fa-solid fa-sort-down"></i>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const searchTerm = ref('');

const search = () => {
  store.commit('setSearchTerm', searchTerm.value);
};

</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333333;
  height: 76px;
}

.logo img {
  width: 171px;
  height: 38.14px;
}

.menu {
  display: flex;
  gap: 10px;
  align-items: center;
}

.menu-item {
  margin-right: 20px;
  position: relative;
}

.menu-item img {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.search-bar {
  display: flex;
  align-items: center;
  position: relative;
  color: #ffffff;
}

.search-bar input {
  width: 200px;
  padding: 8px 30px 8px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  background-color: transparent;
}

.search-bar i {
  position: absolute;
  right: 20px;
}
</style>
