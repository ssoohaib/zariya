import MyIP from '../ip';

export const signIn = async (email, password) => {

    console.log("signing in", email, password)
    
    try {
        const url = `http://${MyIP}:5000/`

        const response = await fetch(url + 'signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });

        if (!response.ok) {
            throw new Error('Authentication failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return { error: 'Authentication error' };
    }
}

export const signUp = async ({email, password, firstName, lastName, userType, title, description, city, causes, verificationImages, causesImages}) => {
    const url = `http://${MyIP}:5000/`
    
    await fetch(url+'signupd',{
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
                city:city,
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

export const signOut = (bearerTokenToBlacklist) => {
    console.log("signing out - token", bearerTokenToBlacklist)
    try{
        const url = `http://${MyIP}:5000/`

        fetch(url+'signout',{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${bearerTokenToBlacklist}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
        })
        .catch(err=>{
            console.log(err)
        })
    }catch(err){
        console.log(err)
    }
}


export const getAllUsers = async (token) => {
    try {
        const url = `http://${MyIP}:5000/`
        
        const result = await fetch(url + 'all-users', {
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

export const getAllNgos = async (token, id) => {
    try {
        const url = `http://${MyIP}:5000/all-ngos/${id}`

        const result = await fetch(url, {
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

        if (!result.ok) {
            throw new Error('Could not fetch all ngos');
        }

        const data = await result.json();
        return data;
    }
    catch(err){
        console.log(err)
    }
}
