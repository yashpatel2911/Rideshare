export const todayDate = () => {
    return dateToString(new Date())
}

const padZero = e => {
    const remainder = parseInt(parseInt(e) / 10)
    
    if(remainder !== 0) return e
    else return "0"+e
}

/**
 * Coverting firebaseTimeStamp Date to JavaScript Date
 * @param {*} timeStampData
 * @return Date String
 */

export const firebaseTimeStampToDate = (timeStampData) => {
    const date = timeStampData.toDate()
    return dateToString(date)
}

const dateToString = (date) => {
    var day = date.getDate()
    var month = date.getMonth() + 1
    var year = date.getFullYear()

    var fullDate = year + "-"
                 + padZero(parseInt(month)) + "-"
                 + padZero(day)

    return fullDate
}

export const changedValues = (initialValue, endValue) => {
    let data = {}

    if(initialValue !== endValue){
        var key
        
        for(key in initialValue){
            let value = compare(initialValue[key], endValue[key])
            if(value !== null) data[key] = value
        }

    }
    
    else{
        data = {}
    }

    return data
}

const compare = (item1, item2) => {
    let change = null


    if(typeof item1 === 'object'){
        change = changedValues(item1, item2)
    }
    else if(item1 !== item2){
        change = item2
    }

    return change
}