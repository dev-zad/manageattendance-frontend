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
          class="w-full rounded-sm flex items-center hover:bg-[#e6ffee] hover:h-[30px] mt-4">
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

    <div class="divider"></div>

    <div></div>
    <h3 class="rubik font-bold text-[#3c5b51]">DATE RANGE</h3>
    <div class="section">
      <input type="date" id="date-from" class="rubik w-[206px] text-black p-[0.5rem] mb-[0.5rem] border-2 rounded-md"
        v-model="dateFrom" />
      <input type="date" id="date-to" class="rubik w-[206px] text-black p-[0.5rem] mb-[0.5rem] border-2 rounded-md"
        v-model="dateTo" />
    </div>
    <div class="flex">
      <button class="w-[250px] h-[48px] rounded-md flex items-center mt-2 bg-[#17AD49] hover:bg-lime-600">
        <span class="rubik flex items-center justify-center text-white">Search</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import startImage from "../assets/start.png";
import downloadImage from "../assets/download.png";

const is_expanded = ref(localStorage.getItem("is_expanded") === "true");

const toggleExpanded = () => {
  is_expanded.value = !is_expanded.value;
  localStorage.setItem("is_expanded", is_expanded.value);
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

.divider {
  border-top: 1px solid #ccc;
  margin: 1rem 0;
}

aside {
  display: flex;
  flex-direction: column;
  background-color: white;
  color: white;
  width: calc(2rem + 32px);
  overflow: hidden;
  height: 868px;
  padding: 1rem;
  transition: 0.2s ease-in-out;


  .flex {
    flex: 1 1 0%;
  }

  .logo {
    margin-bottom: 1rem;

    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;

    .menu-toggle {
      transition: 0.2s ease-in-out;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;

      transition: 0.2s ease-in-out;
      padding: 0.5rem 1rem;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-in-out;
      }

      .text {
        color: var(--light);
        transition: 0.2s ease-in-out;
      }

      &:hover {
        background-color: var(--dark-alt);

        .material-icons,
        .text {
          color: var(--primary);
        }
      }

      &.router-link-exact-active {
        background-color: var(--dark-alt);
        border-right: 5px solid var(--primary);

        .material-icons,
        .text {
          color: var(--primary);
        }
      }
    }
  }

  .footer {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    p {
      font-size: 0.875rem;
      color: var(--grey);
    }
  }

  &.is-expanded {
    width: var(--sidebar-width);

    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h3,
    .button .text {
      opacity: 1;
    }

    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }

    .footer {
      opacity: 0;
    }
  }

  @media (max-width: 1024px) {
    position: absolute;
    z-index: 99;
  }
}
</style>