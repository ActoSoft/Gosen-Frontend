const deconstructInfo = (data) => {
    return data.map(item=> {
        //console.log(dataWithOutObjects)
        let objectArray = []
        let keyNamesRemove = []

        Object.entries(item).forEach(pair => {
            if (pair[1] && typeof pair[1] === 'object') {
                keyNamesRemove.push(pair[0])
                objectArray.push(pair)
            }
        })

        if (keyNamesRemove.length > 0) {
            keyNamesRemove.forEach(name => delete item[name])
        } 

        const returnObject = { ...item }

        if (objectArray.length > 0) {
            objectArray.forEach(data => {
                const nameData = data[0]
                const objectData = data[1]
                Object.entries(objectData).forEach(attribute => {
                    const key = attribute[0]
                    const value = attribute[1]
                    const camelCase = key.charAt(0).toUpperCase() + key.slice(1) 
                    returnObject[`${nameData}${camelCase}`] = value
                })
            })
        }
        return returnObject
    })
}

export default deconstructInfo