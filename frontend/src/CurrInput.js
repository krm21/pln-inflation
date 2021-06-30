import React from 'react'

export function CurrInput({ setValue, value }){

    const handleChange = e => {
        let newValue = e.target.value
        newValue = newValue.replace(/[^0-9]&^\./g, "")
        setValue(newValue)
        
    }

    return (
        <input type="text" onChange={handleChange} value={value}/>
    )
}