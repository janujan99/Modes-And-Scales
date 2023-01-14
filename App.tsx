import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import { getNewModeState, getNewScaleState } from "./notesState";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Sound from "react-native-sound";

function NoteButton(props: any) {
  function playNote() {
    Platform.OS = "ios";
    var Sound = require("react-native-sound");
    Sound.setCategory("Playback");
    var whoosh = new Sound(
      "./assets/pianoNotes/piano-mp3_" + props.note + "4.mp3",
      Sound.MAIN_BUNDLE,
      (error: any) => {
        if (error) {
          console.log("failed to load the sound", error);
          return;
        }
        // loaded successfully
        console.log(
          "duration in seconds: " +
            whoosh.getDuration() +
            "number of channels: " +
            whoosh.getNumberOfChannels()
        );

        // Play the sound with an onEnd callback
        whoosh.play((success: any) => {
          if (success) {
            console.log("successfully finished playing");
          } else {
            console.log("playback failed due to audio decoding errors");
          }
        });
      }
    );
  }
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
  else if (notesState.interval % 10 == 3) numSuffix = "rd";
  return (
    <View style={styles.noteGrid}>
      <Text style={styles.promptText}>
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
      <TouchableOpacity
        style={
          notesState.correctAnswerReached
            ? styles.menuButton
            : styles.menuButtonDisabled
        }
        disabled={!notesState.correctAnswerReached}
        onPress={() => setNotesState(getNewScaleState())}
      >
        <Text
          style={
            notesState.correctAnswerReached
              ? styles.menuButtonText
              : styles.menuButtonTextDisabled
          }
        >
          Next
        </Text>
      </TouchableOpacity>
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
  else if (notesState.interval % 10 == 3) numSuffix = "rd";
  return (
    <View style={styles.noteGrid}>
      <Text style={styles.promptText}>
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
      <TouchableOpacity
        style={
          notesState.correctAnswerReached
            ? styles.menuButton
            : styles.menuButtonDisabled
        }
        disabled={!notesState.correctAnswerReached}
        onPress={() => setNotesState(getNewModeState())}
      >
        <Text
          style={
            notesState.correctAnswerReached
              ? styles.menuButtonText
              : styles.menuButtonTextDisabled
          }
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require("./assets/musicwhite.jpeg")}
      />
      <Pressable
        style={styles.menuButton}
        onPress={() => navigation.push("Scales")}
      >
        <Text style={styles.menuButtonText}>Major and Minor</Text>
      </Pressable>
      <Pressable
        style={styles.menuButton}
        onPress={() => navigation.push("Modes")}
      >
        <Text style={styles.menuButtonText}>Modes</Text>
      </Pressable>
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
    paddingTop: 50,
    paddingBottom: 50,
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  noteGrid: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    width: 500,
    height: 1,
  },
  notePane: {
    flex: 1,
    width: 500,
    flexDirection: "row",
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
  },
  noteButton: {
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    padding: 10,
    margin: 8,
    width: 60,
    height: 40,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  notePressedButton: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    padding: 10,
    margin: 8,
    width: 60,
    height: 40,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  notePressedCorrectButton: {
    backgroundColor: "#FF7777",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    padding: 10,
    margin: 8,
    width: 60,
    height: 40,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  noteText: {
    color: "white",
    fontWeight: "bold",
  },
  notePressedText: {
    color: "red",
    fontWeight: "bold",
  },
  tinyLogo: {
    backgroundColor: "transparent",
    width: 380,
    height: 238,
    marginBottom: 60,
  },
  promptText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  menuButton: {
    width: 180,
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  menuButtonDisabled: {
    width: 180,
    height: 40,
    borderColor: "#FF7777",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  menuButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  menuButtonTextDisabled: {
    color: "#FF7777",
    fontWeight: "bold",
  },
});
