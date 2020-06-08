import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const PlayerCard = ({ player, isOwner }) => (
  <View style={[styles.playerCard, isOwner && styles.ownerCard]}>
    {player ? (
      <Text style={styles.playerName}>{player.name}</Text>
    ) : (
      <Text style={styles.noPlayer}>X</Text>
    )}
  </View>
);

const Lobby = ({ room, username, startGame, leaveLobby }) => {
  const { players, roomId, owner } = room;

  const isPlayerOwner = owner === username;

  return (
    <View style={styles.container}>
      <View style={styles.playersRow}>
        {new Array(4).fill(0).map((el, i) => (
          <PlayerCard
            key={i}
            player={players[i]}
            isOwner={players[i] && players[i].name === owner}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <View style={styles.codeView}>
          <Text style={styles.codeText}>{`Code: ${roomId}`}</Text>
        </View>

        {isPlayerOwner && (
          <TouchableOpacity style={styles.startButton} onPress={startGame}>
            <Text style={styles.cancelButtonText}>Start</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.cancelButton} onPress={leaveLobby}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Lobby;
