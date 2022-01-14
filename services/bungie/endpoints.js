import { BUNGIE_API_URL, BUNGIE_METHOD, BUNGIE_URL } from "./constants";


const bungieProvider = async (method, endPoint, token = null) => {

    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': process.env.BUNGIE_API_KEY,
    };

    if (method === BUNGIE_METHOD.OUATH) {
        headers.authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${BUNGIE_API_URL}${endPoint}`, {
        method: method,
        headers
    });

    return await response.json();
}


export const getManifest = async () => {
    return await bungieProvider(BUNGIE_METHOD.GET, '/Destiny2/Manifest/');
}

export const getDbManifest = async (manifestPath) => {
    const response = await fetch(`${BUNGIE_URL}${manifestPath}`, {
        'Content-Type': 'application/json',
        'x-api-key': process.env.BUNGIE_API_KEY,
    });
    const resBlob = await response.blob();
    return await resBlob.arrayBuffer();
}


