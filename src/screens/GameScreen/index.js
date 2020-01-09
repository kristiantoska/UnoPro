import React, { useReducer, useCallback, useEffect } from 'react';
import { View } from 'react-native';

import { GameBackground, Player, CardPile } from '../../components';
import GameStateReducer, { INITIAL_GAME_STATE } from './reducer';
import styles from './styles';

const GameScreen = ({ numPlayers = 4 }) => {
  const [gameState, dispatch] = useReducer(
    GameStateReducer,
    INITIAL_GAME_STATE,
  );

  const { deck, pileCards, lastCardValue, boardColor, players } = gameState;

  useEffect(() => {
    // GAME START
    dispatch({ type: 'INIT_GAME', payload: { numPlayers } });
  }, [numPlayers]);

  const activeCardFilter = useCallback(
    card =>
      lastCardValue === null ||
      card.value === lastCardValue ||
      card.color === boardColor ||
      card.color === 'black',
    [lastCardValue, boardColor],
  );

  const onCardClick = useCallback(card => {
    dispatch({
      type: 'ADD_CARD_TO_PILE',
      payload: {
        cardData: card,
        newBoardColor: card.color === 'black' ? 'red' : card.color,
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <GameBackground />

      <CardPile pileCards={pileCards} addCardToPile={onCardClick} />

      <Player
        position="bottom"
        active
        hasTurn
        cards={players.p1}
        {...{ activeCardFilter, onCardClick }}
      />

      {numPlayers > 2 && (
        <Player
          position="right"
          cards={players.p2}
          {...{ activeCardFilter, onCardClick }}
        />
      )}

      <Player
        position="top"
        cards={numPlayers === 2 ? players.p2 : players.p3}
        {...{ activeCardFilter, onCardClick }}
      />

      {numPlayers === 4 && (
        <Player
          position="left"
          cards={players.p4}
          {...{ activeCardFilter, onCardClick }}
        />
      )}
    </View>
  );
};

export default GameScreen;
