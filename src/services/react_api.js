import axios from 'axios';

const url= "http://localhost:3000/"
export const createPropertyDetail=(data)=>{
    const apiUrl =url+"createProperty"
    console.log(data);
    const requestData = {
        method: 'POST',
        headers: {
            desc: data.desc,
            address: data.address,
            image: data.image ? data.image : "",
            title: data.title
        },
        body: data.imageData
    };
    axios.post(apiUrl,data.imageData, {
        headers: requestData.headers
    })
    .then(response=> response)
    .then(data=>console.log(data))

}