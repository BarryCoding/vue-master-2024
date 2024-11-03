<script setup lang="ts"></script>

<template>
  <nav class="flex h-16 items-center justify-between border-b bg-muted/40 px-6">
    <form class="w-full max-w-96">
      <input
        class="w-full bg-background pl-8"
        type="text"
        placeholder="Search"
      />
    </form>
    <div class="h-8 w-8 rounded-full bg-white"></div>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
