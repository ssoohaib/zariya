export const signUpDonor = ({email, password, firstName, lastName, userType, title, description, causes, verificationImages, causesImages}) => {
    const url = Platform.OS=='android'? 'http://10.0.2.2:5000/':'http://192.168.56.1:5000/' 
    fetch(url+'signup',{
        method:'POST',
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
                email:email,
                password:password,
                title:title,
                description:description,
                causes:causes,
                verificationImages:verificationImages,
                causesImages:causesImages,
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

export const signIn = (email, password) => {
    let user={}
    const url = Platform.OS=='android'? 'http://10.0.2.2:5000/':'http://192.168.56.1:5000/' 
    fetch(url+'signin',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email:email,
            password:password,
        })
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        return data
    })
    .catch(err=>{
        console.log(err)
    })

}