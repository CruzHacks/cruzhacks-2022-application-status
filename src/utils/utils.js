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
    if (!/^[0-9]+$/.test(applicant.applicant)) {
      throw JSON.stringify({
        applicant: docId,
        message: 'applicant id is invalid! Valid schema is /^[0-9]+$/'
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
