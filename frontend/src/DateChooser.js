import React, { useState, useEffect} from 'react'

const months = {
    locative: [
            "styczniu", 
            "lutym", 
            "marcu", 
            "kwietniu", 
            "maju", 
            "czerwcu", 
            "lipcu", 
            "sierpniu",
            "wrześniu",
            "październiku",
            "listopadzie",
            "grudniu"
    ],
    genitive: [
            "stycznia", 
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
            "grudnia"
    ]
}

function getRange(lbound, rbound){
    let rv = []
    for(let i=lbound; i<=rbound; i++){
        rv.push(i)
    }
    return rv
}

export function DateChooser({lowerBound, upperBound, date, setDate, mode="locative"}){
    
    const handleMonthChange = e => {
        setDate({year: date.year, month: e.target.value})
    }

    const handleYearChange = e => {
        let newYear = e.target.value
        let newMonth = date.month
        if(Number.parseInt(newYear) === Number.parseInt(lowerBound.year) 
            && Number.parseInt(newMonth)<Number.parseInt(lowerBound.month)){
            newMonth = lowerBound.month
        } else if(Number.parseInt(newYear) === Number.parseInt(upperBound.year) 
            && Number.parseInt(newMonth)>Number.parseInt(upperBound.month)){
            newMonth = upperBound.month
        }
        setDate({year: newYear, month: newMonth})
    }

    let monthList
    if(date.year === upperBound.year){
        monthList = getRange(1, upperBound.month).map(x=><option key={x} value={x}>{months[mode][x-1]}</option>)
    } else if(date.year === lowerBound.year){
        monthList = getRange(lowerBound.month, 12).map(x=><option key={x} value={x}>{months[mode][x-1]}</option>)
    } else {
        monthList = getRange(1, 12).map(x=><option key={x} value={x}>{months[mode][x-1]}</option>)
    }

    return (
        <>
            <select value={date.month} onChange={handleMonthChange}>
                {monthList}
            </select>
            <select value={date.year} onChange={handleYearChange}>
                {getRange(lowerBound.year, upperBound.year).map(x => <option key={x} value={x}>{x}</option>)}
            </select>
        </>
    )
}
