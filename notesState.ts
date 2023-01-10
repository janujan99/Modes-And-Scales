function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export interface NotesState {
  key: string;
  mode: string;
  interval: number;
  correctNote: string;
  scaleNotes: string[];
  wrongAnswers: string[];
  correctAnswerReached: boolean;
}
let notesArr: string[] = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];
let modeNames: string[] = [
  "Ionian",
  "Dorian",
  "Phrygian",
  "Lydian",
  "Mixolydian",
  "Aeolian",
  "Locrian",
];
let modes = new Map<string, number[]>([
  ["Ionian", [0, 2, 4, 5, 7, 9, 11]],
  ["Dorian", [0, 2, 3, 5, 7, 9, 10]],
  ["Phrygian", [0, 1, 3, 5, 7, 8, 10]],
  ["Lydian", [0, 2, 4, 6, 7, 9, 11]],
  ["Mixolydian", [0, 2, 4, 5, 7, 9, 10]],
  ["Aeolian", [0, 2, 3, 5, 7, 8, 10]],
  ["Locrian", [0, 1, 3, 5, 6, 8, 10]],
]);

let notesToNums: Map<string, number> = new Map<string, number>();
let numsToNotes: Map<number, string> = new Map<number, string>();

for (let i = 0; i < 12; i++) {
  notesToNums.set(notesArr[i], i);
  numsToNotes.set(i, notesArr[i]);
}
function getMode(note: string, mode: string) {
  let scales: number[] = modes.get(mode)!;
  let scaleNums: number[] = [];
  scales.forEach((element) => {
    scaleNums.push(notesToNums.get(note)! + element);
  });
  //console.log(scaleNums);
  let scaleNotes: string[] = [];
  scaleNums.forEach((element) => {
    //console.log(numsToNotes.get(element % 12)!);
    scaleNotes.push(numsToNotes.get(element % 12)!);
  });
  return scaleNotes;
}
export function getNewScaleState(): NotesState {
  let randomNumber: number = Math.random();
  let scaleString = "Ionian";
  if (randomNumber > 0.5) scaleString = "Aeolian";

  let key = notesArr[getRandomInt(12)];
  let scaleNotes = getMode(key, scaleString);
  let scaleInterval = getRandomInt(6) + 1;
  return {
    key: key,
    mode: scaleString == "Ionian" ? "Major" : "Minor",
    interval: scaleInterval + 1,
    correctNote: scaleNotes[scaleInterval],
    scaleNotes: scaleNotes,
    wrongAnswers: [],
    correctAnswerReached: false,
  };
}
export function getNewModeState(): NotesState {
  let scaleString = modeNames[getRandomInt(7)];

  let key = notesArr[getRandomInt(12)];
  let scaleNotes = getMode(key, scaleString);
  let scaleInterval = getRandomInt(6) + 1;
  return {
    key: key,
    mode: scaleString,
    interval: scaleInterval + 1,
    correctNote: scaleNotes[scaleInterval],
    scaleNotes: scaleNotes,
    wrongAnswers: [],
    correctAnswerReached: false,
  };
}

//console.log(getMode("G", "Ionian"));
