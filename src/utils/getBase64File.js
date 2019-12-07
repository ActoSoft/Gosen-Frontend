const getBase64 = file => {
    console.log("llego mushasones")
    if (!file) return undefined
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}

export default getBase64