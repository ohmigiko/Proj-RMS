export const clearStorageExceptToken = () => {
  const token = localStorage.getItem('token')
  localStorage.clear()
  localStorage.setItem('token',token)
}