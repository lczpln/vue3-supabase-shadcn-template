<template>
  <div class="flex w-full h-svh">
    <div
      class="flex-1 bg-[url(https://images.unsplash.com/photo-1585079542156-2755d9c8a094?ixid=M3w0NzA2MTV8MHwxfHNlYXJjaHwxM3x8cHJvZ3JhbW1pbmclMjB8ZW58MHwwfHx8MTcwNjkwMzUyNnww&ixlib=rb-4.0.3)] grayscale bg-no-repeat bg-cover bg-center"
    ></div>
    <div class="flex-1 flex items-center justify-center animate__animated animate__fadeIn">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
