export const scrollTo = (ref: any) => {
  if (ref && ref.current /* + other conditions */) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
