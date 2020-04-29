import React, { useRef } from 'react';
import { View } from 'react-native';
import { Transitioning, Transition } from 'react-native-reanimated';

import {
  GameBackground,
  Player,
  CardPile,
  ColorPicker,
} from '../../components';
import useGameState from '../../utils/useGameState';
import styles from './styles';

const OPTIONS = {
  numPlayers: 4,
  aiEnabled: false,
};

const cardHandTransition = (
  <Transition.Sequence>
    <Transition.In type="slide-bottom" />
    <Transition.Change />
    <Transition.Out type="fade" />
  </Transition.Sequence>
);

const GameScreen = () => {
  const containerRef = useRef();
  const cardHandContainerRef = React.useRef();

  const [
    gameState,
    { drawCard, activeCardFilter, onCardClick, onColorPick },
    areTurnsReversed,
  ] = useGameState({ ...OPTIONS, containerRef });

  cardHandContainerRef.current &&
    cardHandContainerRef.current.animateNextTransition();

  const {
    turn,
    pileCards,
    boardColor,
    players,
    colorPickerVisible,
    cardDrawnThisTurn,
  } = gameState;

  return (
    <View ref={containerRef} style={styles.container}>
      <GameBackground
        boardColor={boardColor}
        turnsReversed={areTurnsReversed}
        cardDrawnThisTurn={cardDrawnThisTurn}
        drawCard={drawCard}
      />

      <CardPile pileCards={pileCards} />

      <Transitioning.View
        ref={cardHandContainerRef}
        transition={cardHandTransition}
        style={styles.container}
      >
        <Player
          position="bottom"
          cards={players.p1}
          hasTurn={turn === 'p1'}
          active
          {...{ activeCardFilter, onCardClick }}
        />

        {OPTIONS.numPlayers > 2 && (
          <Player
            position="left"
            cards={players.p2}
            hasTurn={turn === 'p2'}
            active={!OPTIONS.aiEnabled}
            {...{ activeCardFilter, onCardClick }}
          />
        )}

        <Player
          position="top"
          cards={OPTIONS.numPlayers === 2 ? players.p2 : players.p3}
          hasTurn={turn === (OPTIONS.numPlayers === 2 ? 'p2' : 'p3')}
          active={!OPTIONS.aiEnabled}
          {...{ activeCardFilter, onCardClick }}
        />

        {OPTIONS.numPlayers === 4 && (
          <Player
            position="right"
            cards={players.p4}
            hasTurn={turn === 'p4'}
            active={!OPTIONS.aiEnabled}
            {...{ activeCardFilter, onCardClick }}
          />
        )}
      </Transitioning.View>

      <ColorPicker visible={colorPickerVisible} onColorClick={onColorPick} />
    </View>
  );
};

export default GameScreen;
