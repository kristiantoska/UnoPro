import React from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Transition, Transitioning } from 'react-native-reanimated';
import Dialog from 'react-native-dialog';

import styles from './styles';

const transition = (
  <Transition.Sequence>
    <Transition.Change interpolation="easeInOut" />
  </Transition.Sequence>
);

const StartScreen = ({ username, setUsername, createLobby, joinLobby }) => {
  const viewRef = React.useRef();
  const [roomCode, setRoomCode] = React.useState();
  const [codeDialogVisible, setCodeDialogVisible] = React.useState(false);
  const [usernameEditable, setUsernameEditable] = React.useState(true);
  const [loading, setLoading] = React.useState(true);

  viewRef.current && viewRef.current.animateNextTransition();

  React.useEffect(() => {
    AsyncStorage.getItem('username').then(res => {
      if (res !== null) {
        setUsernameEditable(false);
        setUsername(res);
      }
      setLoading(false);
    });
  }, [setUsername]);

  const submitUsername = () => {
    if (username.length > 2) {
      Keyboard.dismiss();
      setUsernameEditable(false);
      AsyncStorage.setItem('username', username);
    }
  };

  const createGame = () => {
    createLobby();
  };

  const joinGame = () => {
    setCodeDialogVisible(true);
  };

  const handleDialogCancel = () => {
    setRoomCode('');
    setCodeDialogVisible(false);
  };

  const handleDialogSubmit = () => {
    setCodeDialogVisible(false);
    joinLobby(roomCode);
  };

  const handleRoomCodeChange = newRoomCode => {
    setRoomCode(newRoomCode);
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="white" style={styles.loading} />
    );
  }

  return (
    <Transitioning.View
      style={styles.container}
      ref={viewRef}
      transition={transition}
    >
      <View style={styles.gameButtonContainer}>
        <TouchableOpacity
          style={[
            styles.gameButton,
            usernameEditable && styles.gameButtonDisabled,
          ]}
          disabled={usernameEditable}
          onPress={createGame}
        >
          <Text style={styles.gameButtonText}>Create Game</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.gameButton,
            usernameEditable && styles.gameButtonDisabled,
          ]}
          disabled={usernameEditable}
          onPress={joinGame}
        >
          <Text style={styles.gameButtonText}>Join Game</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.nameInputContainer}>
        {usernameEditable && <Text style={styles.nameInputLabel}>Name:</Text>}

        <TouchableOpacity
          style={styles.inputRow}
          onPress={() => setUsernameEditable(true)}
          disabled={usernameEditable}
        >
          <TextInput
            value={username}
            onChangeText={newVal => setUsername(newVal)}
            style={[
              styles.nameInput,
              !usernameEditable && styles.nameInputDisabled,
            ]}
            editable={usernameEditable}
            pointerEvents={usernameEditable ? 'auto' : 'none'}
          />

          {usernameEditable && (
            <TouchableOpacity
              style={styles.submitButton}
              onPress={submitUsername}
            >
              <Text style={styles.submitButtonText}>OK</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>

      <Dialog.Container visible={codeDialogVisible}>
        <Dialog.Title>Room Code</Dialog.Title>
        <Dialog.Input
          value={roomCode}
          onChangeText={handleRoomCodeChange}
          returnKeyType="done"
          keyboardType="decimal-pad"
        />
        <Dialog.Button label="Cancel" onPress={handleDialogCancel} />
        <Dialog.Button label="OK" onPress={handleDialogSubmit} />
      </Dialog.Container>
    </Transitioning.View>
  );
};

export default StartScreen;
