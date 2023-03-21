import { useEffect, useState } from "react";
import {
  notificationCss as css,
  notificationSuccess,
  notificationError,
} from "./index";

const Notification = ({
  message,
  color,
}: {
  message: string;
  color: "red" | "green";
}) => {
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 6000);
  });

  return (
    <>
      {display && (
        <div
          className={`${css["notification__container"]} ${
            display && css["notification__animation"]
          }`}
        >
          <div
            className={`${css["notification__back-blur"]} ${
              color === "green"
                ? css["notification__back-blur--green"]
                : css["notification__back-blur--red"]
            }`}
          ></div>
          <div className={css["notification__content"]}>
            <img
              src={color === "green" ? notificationSuccess : notificationError}
              alt="notification icon"
            />
            <h2
              className={`${css["notification__message"]} ${
                color === "green"
                  ? css["notification__message--green"]
                  : css["notification__message--red"]
              }`}
            >
              {message}
            </h2>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
