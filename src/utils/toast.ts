import { toast } from "react-toastify";
import type { ToastOptions } from "react-toastify";

const defaultToastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
};

export const showSuccessToast = (
  message: string,
  options?: ToastOptions
): void => {
  toast.success(message, { ...defaultToastOptions, ...options });
};

export const showErrorToast = (
  message: string,
  options?: ToastOptions
): void => {
  toast.error(message, { ...defaultToastOptions, ...options });
};

export const showInfoToast = (
  message: string,
  options?: ToastOptions
): void => {
  toast.info(message, { ...defaultToastOptions, ...options });
};

export const showWarningToast = (
  message: string,
  options?: ToastOptions
): void => {
  toast.warn(message, { ...defaultToastOptions, ...options });
};
