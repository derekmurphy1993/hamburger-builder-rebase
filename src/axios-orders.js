import axios from 'axios'

const inst = axios.create({
  baseURL: 'https://reacttutorial-f9977-default-rtdb.firebaseio.com/'
})

export default inst
