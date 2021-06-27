import React, { useState, useEffect} from 'react'
import ReactDOM from 'react-dom'

function Converter(){}

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

    const [firstMoney, setFirstMoney] = useState(100)
    const [firstYear, setFirstYear] = useState(2015)
    const [firstMonth, setFirstMonth] = useState(1)
    const [secondYear, setSecondYear] = useState(2015)
    const [secondMonth, setSecondMonth] = useState(1)
    const [secondMoney, setSecondMoney]

    return (
        <div id="calc">
            <span className="fullrow"><span>100.00 zł</span> <span>w styczniu 2003 r.</span></span>
            <span className="fullrow">jest warte</span>
            <span className="fullrow"><span>135.54 zł</span> <span>w styczniu 2003 r.</span></span>
            <span className="fullrow">inflacja wynosi 35.5%</span>
        </div>
    )
}

ReactDOM.render(
    <Hello/>,
    document.getElementById("app")
)