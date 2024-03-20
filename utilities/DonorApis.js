import MyIP from '../ip';

export const toggleFav = async (userId, ngoId) => {
    console.log('Toggling favourite: ',ngoId)
    try {
        const url = `http://${MyIP}:5000/fav-ngo/${userId}/${ngoId}`

        const result = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!result.ok) {
            throw new Error('Could not toggle favourite');
        }

        console.log('Favourite toggled')
        const data = await result.json();
        return data;
    }
    catch (err) {
        console.log(err)
    }
}