import { NOTIFIER } from "../constants";

const { ERROR_MESSAGE, SUCCESS_MESSAGE } = NOTIFIER;

export const showErrorMessage = (message) => ({ type: ERROR_MESSAGE, message });

export const showSuccessMessage = (message) => ({
  type: SUCCESS_MESSAGE,
  message,
});
