const express = require('express')
const cors = require('cors')
const { uuid, isUuid } = require('uuidv4')

const app = express()

app.use(cors())
app.use(express.json())

const budgetItems = []
let totalBudget = 0

app.get('/totalBudget', (request, response) => {
    console.log('here:' + totalBudget)
    return response.json(totalBudget)
})

app.get('/budgetItems', (request, response) => {

    const { category } = request.query

    const results = category
        ? budgetItems.filter(budgetItem => budgetItem.category.includes(category))
        : budgetItems

    return response.json(results)
})

app.post('/budgetItems', (request, response) => {
    const { category, value } = request.body

    const budgetItem = { id: uuid(), category, value }

    budgetItems.push(budgetItem)

    totalBudget = 0
    for (let count = 0; count < budgetItems.length; count++) {
        totalBudget += budgetItems[count].value
    }

    console.log(totalBudget)

    return response.json(budgetItem)
})

app.put('/budgetItems/:id', (request, response) => {
    const { id } = request.params
    const { category, value } = request.body

    const budgetItemIndex = budgetItems.findIndex(budgetItem => budgetItem.id === id)

    if(budgetItemIndex < 0) return response.status(400).json({ error: 'Budget item not found!' })

    const budgetItem = { id, category, value }
    budgetItems[budgetItemIndex] = budgetItem

    totalBudget = 0
    for (let count = 0; count < budgetItems.length; count++) {
        totalBudget += budgetItems[count].value
    }

    console.log(totalBudget)

    return response.json(budgetItem)

})

app.delete('/budgetItems/:id', (request, response) => {
    const { id } = request.params

    const budgetItemIndex = budgetItems.findIndex(budgetItem => budgetItem.id === id)

    if(budgetItemIndex < 0) return response.status(400).json({ error: 'Budget item not found!' })

    budgetItems.splice(budgetItemIndex, 1)

    totalBudget = 0
    for (let count = 0; count < budgetItems.length; count++) {
        totalBudget += budgetItems[count].value
    }

    console.log(totalBudget)

    return response.status(204).send()
})

app.listen(3333, () => {
    console.log('🚀️ Back-end started!')
})