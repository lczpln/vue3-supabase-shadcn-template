<template>
  <div class="flex w-full h-svh">
    <div
      class="flex-1 bg-[url(https://miro.medium.com/v2/resize:fit:1400/1*SDhg8SQ1JwpRlsIbNmF3kQ.jpeg)] bg-no-repeat bg-cover"
    ></div>
    <div class="flex-1 flex items-center justify-center animate__animated animate__fadeIn">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
