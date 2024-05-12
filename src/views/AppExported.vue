<template>
  <div class="container py-10 p-10 mx-auto">
    <div class="flex flex-col">
      <div class="overflow-x-auto">
        <h1 class="rubik text-2xl font-bold mt-2 text-[#00291B] ">Exported Items</h1>
        <p class="rubik">No file to download</p>
        <table class="bg-[#FFFFFF] table-auto border w-full">
          <tbody>
            <tr class="w-full flex flex-col items-center justify-center h-[40px] mt-10">
              <td colspan="2" class="px-4 py-2 w text-center">
                <img src="@/assets/noData.svg" alt="No Data" class="mt-[500px]" />
              </td>
            </tr>
            <tr class="w-full flex flex-col items-center justify-center h-[600px] mt-10">
              <td class="px-4 py-2 w text-center text-[24px] text-[#00291B] font-semibold rubik">There are no exported
                Items to show on
                your end</td>
              <td class="px-4 py-2 w text-center text-[#00291B]  rubik">Search for the logs and click Export to generate
                the file here.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup>


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