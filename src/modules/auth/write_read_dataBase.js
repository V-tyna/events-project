import { getDatabase, ref, set } from "firebase/database";

export function writeUserData(userId, name, email) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
        username: name,
        email: email,
    });
}

export async function getUserDataFromFirebase(userId) {
    try {
        const response = await fetch(`https://events-modals-default-rtdb.firebaseio.com/users/${userId}.json`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });
        const userCredentials = await response.json();

        const getNameFromDB = userCredentials.username;
        const getEmailFromDB = userCredentials.email;

        localStorage.setItem('userName', getNameFromDB);
        localStorage.setItem('email', getEmailFromDB);

        return userCredentials;
    } catch (e) {
        throw new Error(e.message);
    }
}