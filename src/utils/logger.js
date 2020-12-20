export const LOGGER_DEV = (title, body, body2) => {
  if (__DEV__) {
    if (body2) {
      console.log(title, body, body2);
      return;
    }
    if (body) {
      console.log(title, body);
      return;
    }
    console.log(title);
  }
};
