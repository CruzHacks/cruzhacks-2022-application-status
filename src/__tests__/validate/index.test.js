const { validate } = require('../../utils/utils')

describe('validating input data', () => {
  test('given valid data', () => {
    expect(validate({ applicant: '001', status: 'accepted' })).toBe(true)
  })
  test('given no data', () => {
    expect(() => validate({})).toThrow(JSON.stringify({
      applicant: undefined,
      message: 'Unable to process applicant, id not provided!'
    }))
  })
  test('given valid id but no status', () => {
    expect(() => validate({ applicant: '001' })).toThrow(JSON.stringify({
      applicant: '001',
      message: 'application status is not provided!'
    }))
  })
  test('given valid status but no id', () => {
    expect(() => validate({ status: 'rejected' })).toThrow(JSON.stringify({
      applicant: undefined,
      message: 'Unable to process applicant, id not provided!'
    }))
  })
  test('given invalid ids', () => {
    expect(() => validate({ applicant: 'ABC', status: 'accepted' })).toThrow(JSON.stringify({
      applicant: 'ABC',
      message: 'applicant id is invalid! Valid schema is /^[0-9]+$/'
    }))
    expect(() => validate({ applicant: '%$^&((#)!_@!#*&T^', status: 'accepted' })).toThrow(JSON.stringify({
      applicant: '%$^&((#)!_@!#*&T^',
      message: 'applicant id is invalid! Valid schema is /^[0-9]+$/'
    }))
  })
  test('given valid id but invalid status', () => {
    expect(() => validate({ applicant: '1234', status: 'poop' })).toThrow(JSON.stringify({
      applicant: '1234',
      message: 'application status is invalid!',
      status: 'poop'
    }))
    expect(() => validate({ applicant: '1234', status: 'Cruzhacks rocks!' })).toThrow(JSON.stringify({
      applicant: '1234',
      message: 'application status is invalid!',
      status: 'Cruzhacks rocks!'
    }))
    expect(() => validate({ applicant: '1234', status: 'Accepted' })).toThrow(JSON.stringify({
      applicant: '1234',
      message: 'application status is invalid!',
      status: 'Accepted'
    }))
  })
})
