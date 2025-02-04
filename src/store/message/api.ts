// import * as whatsAppClient from "@green-api/whatsapp-api-client";
const mockData = {
    apiUrl: "https://1103.api.green-api.com",
}

export async function sendMessage({ idInstance, apiTokenInstance, phone, message }) {
    try {
        // const response = await restAPI.message.sendMessage(`${phone}@c.us`, null, message);
        const response = await fetch(`${mockData.apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "chatId": `${phone}@c.us`,
                "message": message
            })
        });
        return response.json()
    } catch (ex) {
        console.error(ex);
    }
}

export async function receiveNotification({ idInstance, apiTokenInstance }) {
    try {
        const response = await fetch(`${mockData.apiUrl}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`);
        // ?receiveTimeout=5
        return response.json()
    } catch (ex) {
        console.error(ex);
    }
}

export async function deleteNotification({ idInstance, apiTokenInstance, receiptId }) {
    try {
        const response = await fetch(`${mockData.apiUrl}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`, {
            method: "DELETE",
        });

        return response.json()
    } catch (ex) {
        console.error(ex);
    }
}