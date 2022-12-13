export const ExtractErrorMessage = (err) => {
  if (err) {
    const message = err.message.toString();
    return message.slice(
      message.indexOf("reverted:") + 10,
      message.indexOf("method=") - 3
    );
  }
};
