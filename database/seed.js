import { createClient } from '@supabase/supabase-js'
import { fakerEN_US as faker } from '@faker-js/faker'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.SERVICE_ROLE

const supabase = createClient(supabaseUrl, supabaseKey)
// REFACTOR: a separate script in Typescript format

const seedProjects = async (numOfEntries = 10) => {
  const fakeProjects = Array(numOfEntries)
    .fill(0)
    .map(() => {
      const name = faker.lorem.words(3)
      const slug = name.replace(/\s/g, '-')
      const status = faker.helpers.arrayElement(['in-progress', 'completed'])
      const collaborators = faker.helpers.arrayElements(['1', '2', '3'])

      return { name, slug, status, collaborators }
    })

  await supabase.from('vue_projects').insert(fakeProjects)
}

seedProjects()
