import MyIP from '../ip';

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