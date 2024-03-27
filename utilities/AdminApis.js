import MyIP from '../ip';

export const toggleFreeze = async (userId) => {
    console.log(userId)
    try {
        const url = `http://${MyIP}:5000/toggle-freeze/${userId}`
        console.log(url)
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Could not change recipient approval');
        }

        const data = await response.json();
        console.log(data)
        return data;
    }
    catch (err) {
        console.log(err)
        return { error: 'Recipient Approval Error' };
    }
}

    export const toggleActivation = async (userId) => {
        console.log(userId)
        try {
            const url = `http://${MyIP}:5000/toggle-activation/${userId}`
            console.log(url)
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Could not change recipient activation');
            }

            const data = await response.json();
            console.log(data)
            return data;
        }
        catch (err) {
            console.log(err)
            return { error: 'Recipient Activation Error' };
        }
    }