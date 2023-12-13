export const signUp = ({email, password, firstName, lastName, userType, title, description, causes, verificationImages, causesImages}) => {
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

export const signIn = async (email, password) => {
    
    try {
        const url = Platform.OS === 'android' ? 'http://10.0.2.2:5000/' : 'http://192.168.56.1:5000/';
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

export const signOut = (bearerTokenToBlacklist) => {
    console.log("signing out - token", bearerTokenToBlacklist)
    try{
        const url = Platform.OS === 'android' ? 'http://10.0.2.2:5000/' : 'http://192.168.56.1:5000/';
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