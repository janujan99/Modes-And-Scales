import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { getNewModeState, getNewScaleState } from "./notesState";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function NoteButton(props: any) {
  function handlePress() {
    props.handleNotePress(props.note);
  }
  var buttonStyle = styles.noteButton;
  if (props.notesState.wrongAnswers.includes(props.note))
    buttonStyle = styles.notePressedButton;
  else if (
    props.note == props.notesState.correctNote &&
    props.notesState.correctAnswerReached
  )
    buttonStyle = styles.notePressedCorrectButton;
  return (
    <TouchableOpacity style={buttonStyle} onPress={() => handlePress()}>
      <Text
        style={
          props.notesState.wrongAnswers.includes(props.note)
            ? styles.notePressedText
            : styles.noteText
        }
      >
        {props.note}
      </Text>
    </TouchableOpacity>
  );
}
function ScalesScreen() {
  return (
    <View style={styles.container}>
      <ScalesQuiz />
      <StatusBar style="auto" />
    </View>
  );
}
function ModesScreen() {
  return (
    <View style={styles.container}>
      <ModesQuiz />
      <StatusBar style="auto" />
    </View>
  );
}
function ScalesQuiz(props: any) {
  function handleNotePress(note: string) {
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
    if (!notesState.correctAnswerReached) {
      let wrongAnswers: string[] = [];
      notesArr.forEach((el) => {
        if (el != notesState.correctNote) wrongAnswers.push(el);
      });
      if (note == notesState.correctNote) {
        setNotesState({
          key: notesState.key,
          mode: notesState.mode,
          interval: notesState.interval,
          correctNote: notesState.correctNote,
          scaleNotes: notesState.scaleNotes,
          wrongAnswers: wrongAnswers,
          correctAnswerReached: true,
        });
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
      }
    }
  }
  const [notesState, setNotesState] = useState(getNewScaleState());
  let numSuffix: string = "th";
  if (notesState.interval % 10 == 1) numSuffix = "st";
  else if (notesState.interval % 10 == 2) numSuffix = "nd";
  else if (notesState.interval % 10 == 2) numSuffix = "rd";
  return (
    <View style={styles.noteGrid}>
      <Text>
        {notesState.interval}
        {numSuffix} note of the {notesState.key} {notesState.mode} scale
      </Text>
      <View style={styles.notePane}>
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
      </View>
      <Button
        title="Next"
        disabled={!notesState.correctAnswerReached}
        onPress={() => setNotesState(getNewScaleState())}
      />
    </View>
  );
}
function ModesQuiz(props: any) {
  function handleNotePress(note: string) {
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
    if (!notesState.correctAnswerReached) {
      let wrongAnswers: string[] = [];
      notesArr.forEach((el) => {
        if (el != notesState.correctNote) wrongAnswers.push(el);
      });
      if (note == notesState.correctNote) {
        setNotesState({
          key: notesState.key,
          mode: notesState.mode,
          interval: notesState.interval,
          correctNote: notesState.correctNote,
          scaleNotes: notesState.scaleNotes,
          wrongAnswers: wrongAnswers,
          correctAnswerReached: true,
        });
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
      }
    }
  }
  const [notesState, setNotesState] = useState(getNewModeState());
  let numSuffix: string = "th";
  if (notesState.interval % 10 == 1) numSuffix = "st";
  else if (notesState.interval % 10 == 2) numSuffix = "nd";
  else if (notesState.interval % 10 == 2) numSuffix = "rd";
  return (
    <View style={styles.noteGrid}>
      <Text>
        {notesState.interval}
        {numSuffix} note of {notesState.key} {notesState.mode}
      </Text>
      <View style={styles.notePane}>
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
      </View>
      <Button
        title="Next"
        disabled={!notesState.correctAnswerReached}
        onPress={() => setNotesState(getNewModeState())}
      />
    </View>
  );
}
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Major and Minor"
        onPress={() => navigation.push("Scales")}
      />
      <Button title="Modes" onPress={() => navigation.push("Modes")} />
      <StatusBar style="auto" />
    </View>
  );
};
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Modes and Scales" }}
        />
        <Stack.Screen name="Scales" component={ScalesScreen} />
        <Stack.Screen name="Modes" component={ModesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  noteGrid: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    width: 100,
    height: 50,
  },
  notePane: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    margin: 0,
  },
  noteButton: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  notePressedButton: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  notePressedCorrectButton: {
    backgroundColor: "green",
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  noteText: {
    color: "white",
    fontWeight: "bold",
  },
  notePressedText: {
    color: "grey",
    fontWeight: "bold",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
