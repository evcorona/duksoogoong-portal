export interface IAddress {
  address: string
  state: string
  city: string
  zipCode: string
}

export interface IState {
  [state: string]: {
    city: string
  }[]
}
