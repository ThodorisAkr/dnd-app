<script setup></script>

<template>
  <div class="page__container py-10">
    <div class="container mx-auto">
      <div class="flex justify-start items-center mb-10">
        <slot name="title"></slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
