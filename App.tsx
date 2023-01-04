import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NotesState, getNewScaleState } from "./notesState";

function NoteButton(props: any) {
  return (
    <TouchableOpacity style={styles.noteButton}>
      <Text style={styles.noteText} onPress={() => props.setText(props.note)}>
        {props.note}
      </Text>
    </TouchableOpacity>
  );
}

function NoteGrid(props: any) {
  const [notesState, setNotesState] = useState(getNewScaleState());
  return (
    <View style={styles.noteGrid}>
      <Text>
        {notesState.interval}th note of {notesState.key} {notesState.mode}
      </Text>
      <View>
        <NoteButton note="C" />
        <NoteButton note="Db" />
        <NoteButton note="D" />
        <NoteButton note="Eb" />
        <NoteButton note="E" />
        <NoteButton note="F" />
      </View>
      <View>
        <NoteButton note="Gb" />
        <NoteButton note="G" />
        <NoteButton note="Ab" />
        <NoteButton note="A" />
        <NoteButton note="Bb" />
        <NoteButton note="B" />
      </View>
      <Button title="Next" disabled={true} />
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
