const inputFile = require('../input/input') // assumes an array of JSON objects
const { updateApplicationStatus, validate } = require('./utils/utils')

const errors = []
const data = []
inputFile.forEach((app) => {
  try {
    if (validate(app)) {
      data.push(app)
    }
  } catch (error) {
    errors.push(error)
  }
})

if (data.length > 0) {
  const job = updateApplicationStatus('applicants', data)
  job
    .then((res) => console.log('done! ', res))
    .catch((err) => console.log(err))
} else {
  console.error('unable to update due to internal error, please verify your input file is correct')
}
// planning on outputting any errors to an error log file
errors.length > 0 ? errors.forEach((e) => console.error('errors: ', e)) : console.log('no errors!')
