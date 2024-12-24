export const fixImageLinks = (images: string[]): string[] => {
  let combinedString = images.join("");

  combinedString = combinedString
    .replace(/^\[|]$/g, "")
    .replace(/"([^"]+)"/g, "$1");

  combinedString = combinedString
    .replace(/(https?:\/\/)/g, ",$1")
    .replace(/^,/, "");

  const parsedArray = combinedString
    .split(",")
    .map((url) => url.trim())
    .filter((url) => url.startsWith("http"));

  return parsedArray;
};
