const { db, writeBatch } = require('./admin')

const updateApplicationStatus = (collection, applicants) => {
  applicants.forEach((app) => {
    writeBatch.update(db.doc(`${collection}/${app.applicant}`), { status: app.status })
  })
  return writeBatch.commit()
}

const validate = (applicant) => {
// keys are subject to change, as of now they are templates
  if (Object.keys(applicant).includes('applicant')) {
    const docId = applicant.applicant

    // test applicant id for valid schema
    if (!/^auth0\|[a-z0-9]+$/.test(docId)) {
      throw JSON.stringify({
        applicant: docId,
        message: 'applicant id is invalid! Valid schema is /^auth0|[a-z0-9]+$/'
      })
    }
    if (docId.length > 30) {
      throw JSON.stringify({
        applicant: docId,
        message: 'applicant id is invalid! The provided id exceeds the maximum allotted char count of 30!'
      })
    }
    if (Object.keys(applicant).includes('status')) {
      const { status } = applicant
      if (['pending', 'accepted', 'rejected'].includes(status)) {
        return true
      }
      throw JSON.stringify({
        applicant: docId,
        message: 'application status is invalid!',
        status
      })
    } else {
      throw JSON.stringify({
        applicant: docId,
        message: 'application status is not provided!'
      })
    }
  } else {
    throw JSON.stringify({
      applicant: undefined,
      message: 'Unable to process applicant, id not provided!'
    })
  }
}

module.exports = { updateApplicationStatus, validate }
