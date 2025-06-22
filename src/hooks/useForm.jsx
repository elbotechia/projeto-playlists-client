import React, { useState } from 'react'

export default function useForm(initialState={}) {

  const [formState, setFormState]=useState(initialState)

   const handleOnChangeInput = (e)=>{
    const { name, value } = e.target;
    setFormState(
      prevState => ({
        ...prevState,
        [name]: value
      })
    );
  }

  return {
    formState,
    setFormState,
    handleOnChangeInput
  }
}
