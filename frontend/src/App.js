import React, { useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import { DateChooser } from './DateChooser'
import { CurrInput } from './CurrInput'
import axios from 'axios'

const getLowerYearBound = data => {
    return Object.keys(data).sort((x, y)=>Number.parseInt(x)-Number.parseInt(y))[0]
}

const getUpperYearBound = data => {
    return Object.keys(data).sort((x, y)=>Number.parseInt(y)-Number.parseInt(x))[0]
}

const getLowerYearfirstMonth = data => {
    const lowerYear = getLowerYearBound(data)
    return Object.keys(data[lowerYear]).sort((x, y)=>Number.parseInt(x)-Number.parseInt(y))[0]
}

const getUpperYearLastMonth = data => {
    const upperYear = getUpperYearBound(data)
    return Object.keys(data[upperYear]).filter(x=>data[upperYear][x]!==null).sort((x, y)=>Number.parseInt(y)-Number.parseInt(x))[0]
}

function Calculator(){

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

    useEffect(async () => {
        const result = await axios('http://127.0.0.1:5000/time')
        const resultJSON = JSON.parse(result.data)
        setInfo(resultJSON)
        setLowerBoundDate({
            year: getLowerYearBound(resultJSON),
            month: getLowerYearfirstMonth(resultJSON)
        })
        setUpperBoundDate({
            year: getUpperYearBound(resultJSON),
            month: getUpperYearLastMonth(resultJSON)
        })
    }, [])

    const [firstMoney, setFirstMoney] = useState(1000)
    const [lowerBoundDate, setLowerBoundDate] = useState({year: 2000, month: 1})
    const [upperBoundDate, setUpperBoundDate] = useState({year: 2010, month: 1})
    const [firstDate, setFirstDate] = useState({year: 2000, month: 1})
    const [secondDate, setSecondDate] = useState({year: 2010, month: 1})
    const [secondMoney, setSecondMoney] = useState(123)
    const [inflation, setInflation] = useState(0)


    return (
        <div id="calc">
            <span className="fullrow"><span><CurrInput value={firstMoney} setValue={setFirstMoney}/> zł</span> <span>{firstDate.month === 1 ? "ze" : "z"}  <DateChooser
                lowerBound={lowerBoundDate}
                upperBound={upperBoundDate}
                date={firstDate}
                setDate={setFirstDate}
                mode={"genitive"}
            /> r.</span></span>
            <span className="fullrow">jest warte</span>
            <span className="fullrow"><span>{secondMoney} zł</span> <span> w&nbsp;
            <DateChooser
                lowerBound={lowerBoundDate}
                upperBound={upperBoundDate}
                date={secondDate}
                setDate={setSecondDate}
                mode={"locative"}
            /> r.</span></span>
            <span className="fullrow">inflacja wynosi <strong>{inflation}%</strong></span>
        </div>
    )
}

ReactDOM.render(
    <Calculator/>,
    document.getElementById("app")
)