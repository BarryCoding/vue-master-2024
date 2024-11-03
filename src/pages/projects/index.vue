<script setup lang="ts">
import { supabase } from '@/lib/supabase'
import { ref } from 'vue'

const projects = ref()

;(async () => {
  const { data, error } = await supabase.from('vue_projects').select()
  if (error) return console.error('vue_projects', error)
  projects.value = data
})()
</script>

<template>
  <div>
    <h1>Projects Page</h1>
    <RouterLink to="/">To home</RouterLink>
    <pre>{{ projects }}</pre>
  </div>
</template>
