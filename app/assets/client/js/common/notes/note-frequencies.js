export let NoteLetters = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
export let getFrequency = (i) => (440.0 / 32) * (Math.pow(2, ((i - 9) / 12)));

let NoteFrequencies = { };

for (let i = 0; i < 128; i++) {
  let frequency = getFrequency(i);
  let count = Math.floor(1 + i / NoteLetters.length);
  let letter = NoteLetters[i % NoteLetters.length] + count;
  NoteFrequencies[i] = NoteFrequencies[letter] = frequency;
}

export default NoteFrequencies;
