import { createClient } from '@supabase/supabase-js'
import { fakerEN_US as faker } from '@faker-js/faker'

// REFACTOR: a separate script in Typescript format
const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.SERVICE_ROLE
const supabase = createClient(supabaseUrl, supabaseKey)

const projectsTable = 'vue_projects'
const tasksTable = 'vue_tasks'

const logErrorAndExit = (tableName, error) => {
  console.error(
    `An error occurred in table '${tableName}' with code ${error.code}: ${error.message}`,
  )
  process.exit(1)
}

const logStep = (stepMessage) => {
  console.log(stepMessage)
}

const seedProjects = async (numOfEntries) => {
  logStep('Seeding projects...')

  const fakeProjects = Array(numOfEntries)
    .fill(0)
    .map(() => {
      const name = faker.lorem.words(3)
      const slug = name.replace(/\s/g, '-')
      const status = faker.helpers.arrayElement(['in-progress', 'completed'])
      const collaborators = faker.helpers.arrayElements([1, 2, 3])
      return { name, slug, status, collaborators }
    })

  const { data, error } = await supabase
    .from(projectsTable)
    .insert(fakeProjects)
    .select('id')

  if (error) return logErrorAndExit(projectsTable, error)

  logStep('Projects seeded successfully.')
  return data.map((project) => project.id)
}

const seedTasks = async (numOfEntries, projectsIds) => {
  logStep('Seeding tasks...')

  const fakeTasks = []
  for (let i = 0; i < numOfEntries; i++) {
    fakeTasks.push({
      name: faker.lorem.words(3),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      description: faker.lorem.paragraph(),
      due_date: faker.date.future(),
      project_id: faker.helpers.arrayElement(projectsIds),
      collaborators: faker.helpers.arrayElements([1, 2, 3]),
    })
  }

  const { error } = await supabase
    .from(tasksTable)
    .insert(fakeTasks)
    .select('id')

  if (error) return logErrorAndExit(tasksTable, error)

  logStep('Tasks seeded successfully.')
}

const seedDatabase = async (numEntriesPerTable) => {
  const projectsIds = await seedProjects(numEntriesPerTable)
  await seedTasks(numEntriesPerTable, projectsIds)
}

const numEntriesPerTable = 10
seedDatabase(numEntriesPerTable)
