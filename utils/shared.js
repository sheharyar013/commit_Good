export const scrollToDiv = (divId) => {
  document.getElementById(divId).scrollIntoView({
    behavior: "smooth",
  });
};
