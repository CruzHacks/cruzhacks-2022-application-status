const inputFile = require('../input/input').data // assumes an array of JSON objects
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
  console.error('Unable to update application status due to empty input')
}
// planning on outputting any errors to an error log file
if (errors.length > 0) errors.forEach((e) => console.error('errors: ', e))
