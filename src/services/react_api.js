const url= "http://localhost:3000/"
export const createPropertyDetail=(data)=>{
    const apiUrl =url+"createProperty"
    const requestData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({desc:data.desc,address:data.address,image:data.image?data.image:"",title:data.title})
    };
    fetch(apiUrl,requestData)
    .then(response=> response.json())
    .then(data=>console.log(data))

}