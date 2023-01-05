import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NotesState, getNewScaleState } from "./notesState";

function NoteButton(props: any) {
  return (
    <TouchableOpacity style={styles.noteButton}>
      <Text
        style={styles.noteText}
        onPress={() => props.handleNotePress(props.note)}
      >
        {props.note}
      </Text>
    </TouchableOpacity>
  );
}

function NoteGrid(props: any) {
  function handleNotePress(note: string) {
    if (note == notesState.correctNote) {
      setNotesState({
        key: notesState.key,
        mode: notesState.mode,
        interval: notesState.interval,
        correctNote: notesState.correctNote,
        scaleNotes: notesState.scaleNotes,
        wrongAnswers: notesState.wrongAnswers,
        correctAnswerReached: true,
      });
    }
  }
  const [notesState, setNotesState] = useState(getNewScaleState());
  return (
    <View style={styles.noteGrid}>
      <Text>
        {notesState.interval}th note of {notesState.key} {notesState.mode}
      </Text>
      <View>
        <NoteButton note="C" handleNotePress={handleNotePress} />
        <NoteButton note="Db" handleNotePress={handleNotePress} />
        <NoteButton note="D" handleNotePress={handleNotePress} />
        <NoteButton note="Eb" handleNotePress={handleNotePress} />
        <NoteButton note="E" handleNotePress={handleNotePress} />
        <NoteButton note="F" handleNotePress={handleNotePress} />
      </View>
      <View>
        <NoteButton note="Gb" handleNotePress={handleNotePress} />
        <NoteButton note="G" handleNotePress={handleNotePress} />
        <NoteButton note="Ab" handleNotePress={handleNotePress} />
        <NoteButton note="A" handleNotePress={handleNotePress} />
        <NoteButton note="Bb" handleNotePress={handleNotePress} />
        <NoteButton note="B" handleNotePress={handleNotePress} />
      </View>
      <Button
        title="Next"
        disabled={!notesState.correctAnswerReached}
        onPress={() => setNotesState(getNewScaleState())}
      />
    </View>
  );
}
export default function App() {
  return (
    <View style={styles.container}>
      <NoteGrid />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  noteGrid: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
  },
  noteButton: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 10,
  },
  noteText: {
    color: "white",
    fontWeight: "bold",
  },
});
