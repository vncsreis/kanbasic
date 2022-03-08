export default function splitProjectTitle(title: string) {
  const dividerIndex = title.indexOf('-') + 1;
  return title.slice(dividerIndex, title.length);
}
