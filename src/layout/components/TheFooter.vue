<template>
  <div class="min-h-[8rem] text-white flex justify-center w-full py-10">
    <div class="w-full grid grid-cols-2 place-items-center container">
      <div class="text-xl">My D&D placeholder</div>
      <div>
        <h2 class="font-semibold text-xl">Quick Links</h2>
        <div class="flex flex-col text-lg">
          <router-link class="underline" :to="{ name: 'ClassesView' }">
            Classes
          </router-link>
          <router-link class="underline" :to="{ name: 'MonstersView' }">
            Monsters
          </router-link>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-end"></div>
  </div>
</template>
