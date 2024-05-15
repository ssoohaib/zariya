import MyIP from '../ip';

export const getPendingDonationsCity = async (token, city) =>{
    try {
        const url = `http://${MyIP}:5000/`
        
        const result = await fetch(url + 'get-donations/ngo/'+city, {
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

        if (!result.ok) {
            throw new Error('Could not fetch all users');
        }

        const data = await result.json();
        return data;
    }catch(err){
        console.log(err)
    }
}

export const acceptDonation = async (id, payLoad) =>{
    try {
        const url = `http://${MyIP}:5000/`
        
        const result = await fetch(url + `accept-donation/${id}`, {
            method: 'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(payLoad)
        });

        if (!result.ok) {
            throw new Error('Could not fetch all users');
        }

        const data = await result.json();
        return data;
    }catch(err){
        console.log(err)
    }
}

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

export const updatePassword = ({email, password, firstName, lastName, userType, title, description, causes, verificationImages, causesImages, id, contactNumber, city}) => {
    const url = `http://${MyIP}:5000/`
    
    fetch(url+`update-password/${id}`,{
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
                password:password,
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

