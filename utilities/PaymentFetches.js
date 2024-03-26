import MyIP from '../ip';

export const onDonate = async (amount)=>{
    return fetch(`http://${MyIP}:5000/payments/intent`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount: amount
        })
    })
    .then(response => response.json())
    .then(data => {
        return data
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}