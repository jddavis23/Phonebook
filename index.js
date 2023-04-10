const express = require('express')
const app = express()

app.use(express.json())

let data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    console.log('testing')
    response.send('<div>HELP</div>')
})

app.get('/info', (request, response) => {
    console.log(`Phonebook has ${data.length} entrys.`)
    console.log(Date())
    response.send(
        `<div>
            <h1>Phonebook has ${data.length} entrys.</h1>
            ${Date()}
        </div>`
    )
})

app.get('/api/persons', (request, response) => {
    console.log('getting persons data')
    response.json(data)
})

app.get('/api/persons/:id', (request, response) => {
    console.log("here")
    const id = Number(request.params.id)
    console.log(id)
    const person = data.find(person => person.id === id)
    if (person)
        response.json(person)
    else
        response.status(404).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
