import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NotesState, getNewScaleState } from "./notesState";

function NoteButton(props: any) {
  function handlePress() {
    props.handleNotePress(props.note);
  }
  return (
    <TouchableOpacity
      style={
        props.notesState.wrongAnswers.includes(props.note)
          ? styles.notePressedButton
          : styles.noteButton
      }
    >
      <Text
        style={
          props.notesState.wrongAnswers.includes(props.note)
            ? styles.notePressedText
            : styles.noteText
        }
        onPress={() => handlePress()}
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
      return true;
    } else {
      setNotesState({
        key: notesState.key,
        mode: notesState.mode,
        interval: notesState.interval,
        correctNote: notesState.correctNote,
        scaleNotes: notesState.scaleNotes,
        wrongAnswers: notesState.wrongAnswers.concat([note]),
        correctAnswerReached: false,
      });
      return false;
    }
  }
  const [notesState, setNotesState] = useState(getNewScaleState());
  return (
    <View style={styles.noteGrid}>
      <Text>
        {notesState.interval}th note of {notesState.key} {notesState.mode}
      </Text>
      <View>
        <NoteButton
          note="C"
          notesState={notesState}
          handleNotePress={handleNotePress}
        />
        <NoteButton
          note="Db"
          notesState={notesState}
          handleNotePress={handleNotePress}
        />
        <NoteButton
          note="D"
          notesState={notesState}
          handleNotePress={handleNotePress}
        />
        <NoteButton
          note="Eb"
          notesState={notesState}
          handleNotePress={handleNotePress}
        />
        <NoteButton
          note="E"
          notesState={notesState}
          handleNotePress={handleNotePress}
        />
        <NoteButton
          note="F"
          notesState={notesState}
          handleNotePress={handleNotePress}
        />
      </View>
      <View>
        <NoteButton
          note="Gb"
          notesState={notesState}
          handleNotePress={handleNotePress}
        />
        <NoteButton
          note="G"
          notesState={notesState}
          handleNotePress={handleNotePress}
        />
        <NoteButton
          note="Ab"
          notesState={notesState}
          handleNotePress={handleNotePress}
        />
        <NoteButton
          note="A"
          notesState={notesState}
          handleNotePress={handleNotePress}
        />
        <NoteButton
          note="Bb"
          notesState={notesState}
          handleNotePress={handleNotePress}
        />
        <NoteButton
          note="B"
          notesState={notesState}
          handleNotePress={handleNotePress}
        />
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
  notePressedButton: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
  },
  notePressedCorrectButton: {
    backgroundColor: "green",
    borderRadius: 5,
    padding: 10,
  },
  noteText: {
    color: "white",
    fontWeight: "bold",
  },
  notePressedText: {
    color: "red",
    fontWeight: "bold",
  },
});
