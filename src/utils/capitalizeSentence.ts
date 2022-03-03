export default function capitalizeSentence(sentence: string) {
  const wordArr = sentence.split(' ');

  return wordArr
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(' ');
}
