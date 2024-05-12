<template>
  <aside>
    <div class="py-6">
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
          class="w-full rounded-sm flex items-center hover:bg-[#e6ffee] hover:h-[30px] mt-2">
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
    <h3 class="rubik font-bold text-[#3c5b51]">DATE RANGE</h3>
    <div class="section">
      <FormKit type="date" placeholder="From" class="w-[260px] h-[50px]" v-model="startDate" @change="filterLogs" />
      <FormKit type="date" placeholder="To" class="w-[260px] h-[50px]  mt-2" v-model="endDate" @change="filterLogs" />

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
      <div class="flex flex-col mt-2 gap-2">
        <div v-for="(dropdown, index) in dropdowns" :key="index" class="relative">
          <FormKit :type="dropdown.type" :label="dropdown.label" :data="dropdown.data" @click="toggleDropdown(index)"
            v-model="dropdown.selectedOption" />
          <div v-if="dropdown.showDropdown"
            class="absolute top-full left-0 bg-white shadow-lg rounded-md mt-1 dropdown-menu rubik">
            <!-- Dropdown items -->
            <ul class="py-1">
              <li v-for="(option, optionIndex) in dropdown.data" :key="optionIndex"
                class="px-3 py-1 cursor-pointer hover:bg-gray-100 rubik" @click="selectOption(index, option)">{{ option
                }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="divider-2"></div>
    <div class="flex flex-col items-center mt-[2px]">
      <button @click="search" class="w-full h-[50px] rounded-sm flex items-center mt-2 bg-[#17AD49] hover:bg-lime-600">
        <span class="rubik mx-auto text-white">Search</span>
      </button>
      <button class="w-full h-[50px] rounded-sm flex items-center mt-2 border border-[#17AD49] bg-gray-100 "><span
          class="rubik text-black mx-auto">Export</span></button>
    </div>
  </aside>
</template>

<script>
export const filteredDateRange = ref('');

</script>


<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import startImage from "../assets/start.png";
import downloadImage from "../assets/download.png";

// const filteredDateRange = ref('');

const dropdowns = ref([
  {
    type: 'text',
    label: 'Company',
    data: ['Sprout Solutions', 'Tesla', 'Google', 'Microsoft', 'Apple'],
    selectedOption: null,
    showDropdown: false
  },
  {
    type: 'text',
    label: 'Department',
    data: ['IT', 'Accounting', 'HR', 'Marketing', 'Sales', 'Operations', 'Finance', 'Admin', 'Legal', 'Others'],
    selectedOption: null,
    showDropdown: false
  },
  {
    type: 'text',
    label: 'Location',
    data: ['Antipolo', 'Pasig', 'Makati', 'Quezon City', 'Manila', 'Taguig', 'Others'],
    selectedOption: null,
    showDropdown: false
  },
  {
    type: 'text',
    label: 'Select Employee',
    data: ['1', '2', '3'],
    selectedOption: null,
    showDropdown: false
  }
  // Add more dropdown objects as needed
]);

const toggleDropdown = (index) => {
  dropdowns.value[index].showDropdown = !dropdowns.value[index].showDropdown;
};

const selectOption = (index, option) => {
  dropdowns.value[index].selectedOption = option;
  dropdowns.value[index].showDropdown = false;
};

const store = useStore();
const startDate = ref(null);
const endDate = ref(null);

const filterLogs = () => {
  store.commit('setDateRange', { start: startDate.value, end: endDate.value });
  store.commit('filterLogs');
  filteredDateRange.value = formatDateRange(startDate.value, endDate.value);

};

const search = () => {
  const locationDropdown = dropdowns.value.find(dropdown => dropdown.label === 'Location');
  const employeeDropdown = dropdowns.value.find(dropdown => dropdown.label === 'Select Employee');

  if (!locationDropdown.selectedOption) {
    locationDropdown.selectedOption = 'No Location';
    locationDropdown.data = ['No Location'];

  }

  if (!employeeDropdown.selectedOption) {
    employeeDropdown.selectedOption = 'No Employee';
    employeeDropdown.data = ['No Employee'];
  }
};

const formatDateRange = (startDate, endDate) => {
  // Check if both start and end dates are provided
  if (startDate && endDate) {
    // Format the dates (assuming startDate and endDate are in 'YYYY-MM-DD' format)
    const formattedStartDate = new Date(startDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    const formattedEndDate = new Date(endDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    // Return the formatted date range string
    return `${formattedStartDate} - ${formattedEndDate}`;
  } else {
    // If either start or end date is missing, return an empty string
    return '';
  }
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
  margin-top: 15px;
}

.divider-2 {
  border-top: 1px solid #ccc;
  margin: 1rem 0;
  margin-top: 5px;
}


.dropdown-menu {
  z-index: 1000;
  background-color: #ececec;
  width: 100%;

}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;

}

.dropdown-menu li {
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: rgb(63, 63, 63);
  font-family: 'Rubik', sans-serif;
}

.dropdown-menu li:hover {
  background-color: #f3f4f6;
}

aside {
  width: 365px;
  height: 100vh;
  background-color: #FFFFFF;
  padding: 2rem;


  @media (max-width: 1024px) {
    position: absolute;
    z-index: 99;
  }
}
</style>