<script setup lang="ts">
import { supabase } from './lib/supabase'
console.log(`🔎 🔍 ~ supabase:`, supabase)
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>
