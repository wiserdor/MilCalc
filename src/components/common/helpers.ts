export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const chooseRandom = (arr: string[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
