export default () => {
  return useState("modal", () => {
    return { currentModal: "", show: false };
  });
};
