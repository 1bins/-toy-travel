import {useState} from "react";

export const useToast = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showToast = (msg: string) => {
    setMessage(msg);
    setIsOpen(true);
  };

  const closeToast = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    message,
    showToast,
    closeToast,
  };
};