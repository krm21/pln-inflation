import React, { useState, useEffect} from 'react'

const monthLocative = ["styczniu", 
                       "lutym", 
                       "marcu", 
                       "kwietniu", 
                       "maju", 
                       "czerwcu", 
                       "lipcu", 
                       "sierpniu",
                       "wrześniu",
                       "październiu",
                       "listopadzie",
                       "grudniu"]

const monthGenitive = ["stycznia", 
                       "lutego", 
                       "marca", 
                       "kwietnia", 
                       "maja", 
                       "czerwca", 
                       "lipca", 
                       "sierpnia",
                       "września",
                       "października",
                       "listopada",
                       "grudnia"]

function getRange(lbound, rbound){
    let rv = []
    for(let i=lbound; i<=rbound; i++){
        rv.push(i)
    }
    return rv
}

export function DateChooser(y, m, setY, setM, mode="dative"){
    return (
        <>
        <select>
            {monthLocative.map((x, i) => <option key={i+1} value={i+1}>{x}</option>)}
        </select>
        <select>
            {getRange(2000, 2020).map(x => <option key={x} value={x}>{x}</option>)}
        </select>
        </>
    )
}
