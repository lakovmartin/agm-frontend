
const baseUrl= 'http://localhost:3000'
const signinUrl = baseUrl + '/signin'
const createAccountUrl = baseUrl + '/newAccount'
const validateUrl = baseUrl + '/validate'
const getUserDataUrl = baseUrl + '/getUserData'
const createNewGoalUrl = baseUrl + '/createNewGoal'

const get = url => fetch(url, {
    headers: {
        Authorization: localStorage.getItem('token')
    }
}).then(resp => resp.json())


const post = (url, data) => 
{ 
return fetch(url, {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
    },
    body: JSON.stringify(data)
}).then(resp => {
    return resp.json()})
}

const createAccount = user => post(createAccountUrl, user)
const signIn = user => post(signinUrl, user)

const validate = () => get(validateUrl)

const getUserData = () => get(getUserDataUrl)

const createNewGoal = goal => post(createNewGoalUrl, goal)

export default { signIn, createAccount, validate, getUserData, createNewGoal}