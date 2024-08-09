const fs = require('fs')
const csv = require('csv-parser')
const PouchDB = require('pouchdb')

// Path to the CSV file
const PATH = 'campTasks.csv'

// Create or open the PouchDB database
const db = new PouchDB(`${__dirname}/db/${PATH.split('.csv')[0]}`)

// Function to convert comma-separated string to an array
function parseArrayCell(professionString) {
  if (!professionString || professionString.trim() === '') {
    return []
  }
  return professionString.split(',').map((item) => item.trim())
}

// Function to read CSV file and insert data into PouchDB
function importCSVToPouchDB(csvFilePath) {
  const docs = []
  let idx = 0
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      docs.push({
        ...row,
        serviceTypes: parseArrayCell(row.serviceTypes),
        professions: parseArrayCell(row.professions),
        idx
      })
      idx += 1
    })
    .on('end', async () => {
      try {
        const result = await db.bulkDocs(docs)
        console.log('Documents inserted:', result)
      } catch (error) {
        console.error('Error inserting documents:', error)
      }
    })
}

// Call the function to import the CSV data
importCSVToPouchDB(PATH)
