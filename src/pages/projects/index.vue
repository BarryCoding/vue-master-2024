<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import type { Tables } from '../../../database/types'

const projects = ref<Tables<'vue_projects'>[]>()

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
    <ul>
      <li :key="project.id" v-for="project in projects">
        {{ project.name }} {{ project.slug }} {{ project.status }}
      </li>
    </ul>
  </div>
</template>
