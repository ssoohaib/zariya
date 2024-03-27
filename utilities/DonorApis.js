import MyIP from '../ip';

export const updateInfo = async (token, user) => {
    try {
        const url = `http://${MyIP}:5000/update-info/${user._id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                email: user.email,
                contactNumber: user.contactNumber,
                city: user.city,
                // image: user.image
            })
        });

        if (!response.ok) {
            throw new Error('Could not update user info');
        }

        const data = await response.json();
        return data;
    }
    catch (err) {
        console.log(err)
        return { error: 'Update error' };
    }
}

export const getPendingDonations = async (token, userId) =>{
    try {
        const url = `http://${MyIP}:5000/`
        
        const result = await fetch(url + 'get-donations/donor/'+userId, {
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

export const toggleFav = async (token, userId, ngoId) => {
    try {
        const url = `http://${MyIP}:5000/fav-ngo/${userId}/${ngoId}`

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                
            },
            body: JSON.stringify({
                userId: userId,
                ngoId: ngoId
            })
        });

        if (!response.ok) {
            throw new Error('Could not toggle favourite');
        }

        const data = await response.json();
        console.log(data)
        return data;
    }
    catch (err) {
        console.log(err)
        return { error: 'Favourite toggle error' };
    }
}

export const unsubscribe = async (token, userId, ngoId) => {
    try {
        const url = `http://${MyIP}:5000/deactivate-subscription/${userId}/${ngoId}`

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                
            },
            body: JSON.stringify({
                userId: userId,
                ngoId: ngoId
            })
        });

        if (!response.ok) {
            throw new Error('Could not unsubscribe');
        }

        const data = await response.json();
        console.log(data)
        return data;
    }
    catch (err) {
        console.log(err)
        return { error: 'Unsubscribe error' };
    }
}