const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

morgan.token('body',  function (req, res) {
  if (res.method === 'POST')
    return JSON.stringify(res.body) 
})

app.use(morgan('body'))

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
    },
    { 
      "id": 5,
      "name": "Mary Clapped", 
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
    response.json(data)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = data.find(person => person.id === id)
    if (person)
        response.json(person)
    else
        response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    data = data.filter(person => person.id !== id)
    console.log(data)
    response.status(204).end()
    console.log('deleted person')
})

const genID = () => Math.floor(Math.random() * (100 - 0 + 1)) + 0

app.post('/api/persons/', (request, response) => {
   const body = request.body
   if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })}
    else if (!body.number)
    {
        return response.status(400).json({ 
          error: 'number missing' 
        })}
    else if (data.find(person => person.name === body.name))
        return response.status(400).json({error: 'name duplicated'})

  const person = {
    name: body.name,
    number: body.number,
    id: genID()
  }

  data = data.concat(person)
  response.json(data)

})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
