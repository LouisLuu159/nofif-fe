import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { fetchToken, onMessageListener } from "./lib/notif";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [show, setShow] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [notification, setNotification] = useState({ title: "", body: "" });

  const [isTokenFound, setTokenFound] = useState(false);

  useEffect(() => {
    fetchToken(setTokenFound);
    navigator.serviceWorker.addEventListener("message", (message) => {
      console.log(message);
    });
  }, []);

  onMessageListener()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((payload: any) => {
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      setShow(true);
      console.log(payload);
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((err: any) => console.log("failed: ", err));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onShowNotificationClicked = () => {
    setNotification({
      title: "Notification",
      body: "This is a test notification",
    });
    setShow(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
        {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
        <img src={reactLogo} className="logo react" alt="React logo" />
      </header>
    </div>
  );
}

export default App;
