export interface User {
  name: string
  email: string
  password: string
}

export interface CurrentUser {
  id: number
  token: string
  name: string
  email: string
}
