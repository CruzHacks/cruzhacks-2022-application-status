const { validate } = require('../../utils/utils')

describe('validating input data', () => {
  test('given valid data', () => {
    expect(validate({ applicant: 'auth0|aaa111bbb222ccc333ddd444', status: 'accepted' })).toBe(true)
  })
  test('given no data', () => {
    expect(() => validate({})).toThrow(JSON.stringify({
      applicant: undefined,
      message: 'Unable to process applicant, id not provided!'
    }))
  })
  test('given valid id but no status', () => {
    expect(() => validate({ applicant: 'auth0|aaa111bbb222ccc333ddd444' })).toThrow(JSON.stringify({
      applicant: 'auth0|aaa111bbb222ccc333ddd444',
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
      message: 'applicant id is invalid! Valid schema is /^auth0|[a-z0-9]+$/'
    }))
    expect(() => validate({ applicant: 'auth0|', status: 'accepted' })).toThrow(JSON.stringify({
      applicant: 'auth0|',
      message: 'applicant id is invalid! Valid schema is /^auth0|[a-z0-9]+$/'
    }))
    expect(() => validate({ applicant: '%$^&((#)!_@!#*&T^', status: 'accepted' })).toThrow(JSON.stringify({
      applicant: '%$^&((#)!_@!#*&T^',
      message: 'applicant id is invalid! Valid schema is /^auth0|[a-z0-9]+$/'
    }))
  })
  test('given id is too long', () => {
    expect(() => validate({ applicant: 'auth0|aaa111bbb222ccc333ddd444aaa111bbb222ccc333ddd444' })).toThrow(JSON.stringify({
      applicant: 'auth0|aaa111bbb222ccc333ddd444aaa111bbb222ccc333ddd444',
      message: 'applicant id is invalid! The provided id exceeds the maximum allotted char count of 30!'
    }))
  })
  test('given valid id but invalid status', () => {
    expect(() => validate({ applicant: 'auth0|aaa111bbb222ccc333ddd444', status: 'poop' })).toThrow(JSON.stringify({
      applicant: 'auth0|aaa111bbb222ccc333ddd444',
      message: 'application status is invalid!',
      status: 'poop'
    }))
    expect(() => validate({ applicant: 'auth0|aaa111bbb222ccc333ddd444', status: 'Cruzhacks rocks!' })).toThrow(JSON.stringify({
      applicant: 'auth0|aaa111bbb222ccc333ddd444',
      message: 'application status is invalid!',
      status: 'Cruzhacks rocks!'
    }))
    expect(() => validate({ applicant: 'auth0|aaa111bbb222ccc333ddd444', status: 'Accepted' })).toThrow(JSON.stringify({
      applicant: 'auth0|aaa111bbb222ccc333ddd444',
      message: 'application status is invalid!',
      status: 'Accepted'
    }))
  })
})
