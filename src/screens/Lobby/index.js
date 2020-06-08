import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const PlayerCard = ({ player }) => (
  <View style={styles.playerCard}>
    {player ? (
      <Text style={styles.playerName}>{player.name}</Text>
    ) : (
      <Text style={styles.noPlayer}>X</Text>
    )}
  </View>
);

const Lobby = ({
  players = [{ name: 'Aaron' }],
  roomCode,
  startGame,
  leaveLobby,
}) => (
  <View style={styles.container}>
    <View style={styles.playersRow}>
      {new Array(4).fill(0).map((el, i) => (
        <PlayerCard key={i} player={players[i]} />
      ))}
    </View>

    <View style={styles.footer}>
      <View style={styles.codeView}>
        <Text style={styles.codeText}>{`Code: ${roomCode.split('-')[1]}`}</Text>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={startGame}>
        <Text style={styles.cancelButtonText}>Start</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={leaveLobby}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default Lobby;
