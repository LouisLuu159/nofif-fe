// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig, vapidKey } from "./firebase.config";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound: (status: boolean) => void) => {
    return getToken(messaging, {
        vapidKey
    })
        .then((currentToken) => {
            if (currentToken) {
                console.log("current token for client: ", currentToken);
                setTokenFound(true);
            } else {
                console.log(
                    "No registration token available. Request permission to generate one."
                );
                setTokenFound(false);
            }
        })
        .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
        });
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });


