import React, { useContext } from 'react'
import { useApi } from '../shared/useApi'
import { AuthContext } from '../state/AuthContext'

const AddProductPage = () => {
  const api = useApi()
  const {setProducts} = useContext(AuthContext)
  return (
    <div>AddProductPage</div>
  )
}

export default AddProductPage