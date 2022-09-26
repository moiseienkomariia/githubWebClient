export const checkResponse = (res) => {
    if(res.ok) return res.json();
    throw new Error(`Error ${res.status}. Request failed.`);
}