import axios from 'axios'
import env from '../../environment'

export const READ_USER = 'READ_USER'
export const ERROR_USER = 'ERROR_USER'

export const readUser = user => ({ type: READ_USER, user })
export const errorUser = error => ({ type: ERROR_USER, error })

export const getUser = customerID =>
  async (dispatch) => {
    try {
      const user = await axios.get(`${env.API_URL}customers/${customerID}`)
      dispatch(readUser(user))
    } catch (error) {
      dispatch(errorUser(error))
    }
  }

const defaultState = [
  { label: 'First Name', data: 'Charles' },
  { label: 'Customer ID', data: '009' },
  { label: 'Account Status', data: 'Unlocked' },
]

const camelorm = (word1) => {
  if (!word1) {
    return ''
  }
  const word = word1.split('')
  let counter = 1
  let len = word.length
  const upper = let1 => word[let1] !== ' ' && word[let1] === word[let1].toUpperCase()
  const split1 = (let1, let2) => !upper(let1) && upper(let2)
  const split2 = (let1, let2, let3) => upper(let1) && upper(let2) && !upper(let3)
  while (counter < len - 1) {
    if (split1(counter, counter + 1) || split2(counter - 1, counter, counter + 1)) {
      word[counter + 1] = word[counter + 1].toUpperCase()
      word.splice(counter + 1, 0, ' ')
      len += 1
      counter += 2
    } else {
      counter += 1
    }
  }
  word[0] = word[0].toUpperCase()
  return word.join('')
}

const convertToCustomer = (information) => {
  const locked = information.accountLocked.value
  return Object.values(information)
    .map((obj) => {
      obj.name = camelorm(obj.name)
      if (obj.name === 'accountLocked') {
        obj.value = (locked === true || locked === 'true' || locked === 'True') ?
          'Locked' :
          'Active'
      }
      return obj
    })
    .filter(exist => exist.name !== 'Input Customer Id' && exist.value)
    .map(obj => ({ label: obj.name, data: obj.value }))
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case READ_USER:
      return convertToCustomer(action.user)
    case ERROR_USER:
      return Object.assign(state, {
        error: action.error,
      })
    default:
      return state
  }
}
