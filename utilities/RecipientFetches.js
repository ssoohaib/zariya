import MyIP from '../ip';


export const setDataForUpdate = ({email, password, firstName, lastName, userType, title, description, causes, verificationImages, causesImages, id, contactNumber, city}) => {
    const url = `http://${MyIP}:5000/`
    
    fetch(url+`update/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(
            userType=='donor'?
            {
                userType:userType,
                email:email,
                password:password,
                firstName:firstName,
                lastName:lastName,
            }
            :
            {
                userType:userType,
                email: email,
                description: description,
                contactNumber: contactNumber,
                city: city,
                causes: causes,
                causesImages: causesImages,
            }
        )
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
    })
    .catch(err=>{
        console.log(err)
    })
}