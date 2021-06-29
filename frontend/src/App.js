import React, { useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import { DateChooser } from './DateChooser'

function Converter(){}

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

function Hello(){

    const getProduct = (year, month) => {
        let product = 1
        let currYear = new Date().getFullYear()
        while(year <= currYear){
            while(month <= 12){
                if(inf[year][month] !== null){
                    product *= d[year][month]
                }
                month++
            }
            year++
            month = 1
        }
        return product
    }
    
    const convertToPast = (todayAmount, year, month) => {
        return (todayAmount / getProduct(year, month)).toFixed(2)
    }
    
    const convertToToday = (pastAmount, year, month) => {
        return (pastAmount * getProduct(year, month)).toFixed(2)
    }

    const [info, setInfo] = useState([]);

    useEffect(() => {
        let url = 'http://127.0.0.1:5000/time';
        fetch(url)
            .then(response => response.json())
            .then(data => setInfo(data));
    }, [])

    const [firstMoney, setFirstMoney] = useState(1000000000)
    const [firstYear, setFirstYear] = useState(2015)
    const [firstMonth, setFirstMonth] = useState(2)
    const [secondYear, setSecondYear] = useState(2020)
    const [secondMonth, setSecondMonth] = useState(3)
    const [secondMoney, setSecondMoney] = useState(123)
    const [inflation, setInflation] = useState(0)

    return (
        <div id="calc">
            <DateChooser/>
            <span className="fullrow"><span><input type="text" value={firstMoney}/> zł</span> <span>{firstMonth==1 ? "ze" : "z"} {monthGenitive[firstMonth-1]} {firstYear} r.</span></span>
            <span className="fullrow">jest warte</span>
            <span className="fullrow"><span>{secondMoney} zł</span> <span>w {monthLocative[secondMonth-1]} {secondYear} r.</span></span>
            <span className="fullrow">inflacja wynosi <strong>{inflation}%</strong></span>
        </div>
    )
}

ReactDOM.render(
    <Hello/>,
    document.getElementById("app")
)