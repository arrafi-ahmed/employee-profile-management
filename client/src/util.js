export const getToken = () => {
  const token = localStorage.getItem('token')
  return token === null ? null : token
}

export const isAuthenticated = () => !!getToken()

export const localDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }
  return (date = new Date(date).toLocaleDateString('en-US', options))
}

export const getDate = (date) => date.slice(0, 10)

export const getISODate = (date) => {
  return new Date(date).toISOString().slice(0, 10)
}

export const formatJobType = (type) => {
  return type == 0
    ? 'Full Time'
    : type == 1
    ? 'Part Time'
    : type == 2
    ? 'Freelance'
    : 'Internship'
}
