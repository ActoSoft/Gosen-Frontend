const deconstructInfo = (data) => {
    let returnObject = {}
    let objectArray = []
    let keyNamesRemove = []
    if (Array.isArray(data)) {
        returnObject = data.map(item=> {
            Object.entries(item).forEach(pair => {
                if (pair[1] && typeof pair[1] === 'object') {
                    keyNamesRemove.push(pair[0])
                    objectArray.push(pair)
                }
            })

            if (keyNamesRemove.length > 0) {
                keyNamesRemove.forEach(name => delete item[name])
            }

            const dataItem = { ...item }

            if (objectArray.length > 0) {
                objectArray.forEach(data => {
                    const nameData = data[0]
                    const objectData = data[1]
                    Object.entries(objectData).forEach(attribute => {
                        const key = attribute[0]
                        const value = attribute[1]
                        const camelCase = key.charAt(0).toUpperCase() + key.slice(1)
                        dataItem[`${nameData}${camelCase}`] = value
                    })
                })
            }
            return dataItem
        })
    } else {
        Object.entries(data).forEach(pair => {
            if (pair[1] && typeof pair[1] === 'object') {
                keyNamesRemove.push(pair[0])
                objectArray.push(pair)
            }
        })

        console.log('oA', objectArray)
        console.log('kNR', keyNamesRemove)

        if (keyNamesRemove.length > 0) {
            keyNamesRemove.forEach(name => delete data[name])
        }

        returnObject = { ...data }

        console.log(returnObject)

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
    }
    console.log(returnObject)
    return returnObject
}


export default deconstructInfo