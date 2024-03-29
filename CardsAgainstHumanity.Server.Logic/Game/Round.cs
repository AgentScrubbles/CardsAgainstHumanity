﻿using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using CardsAgainstHumanity.Server.Data;
using CardsAgainstHumanity.Shared.Extensions;
using CardsAgainstHumanity.Server.Logic.Interfaces;

namespace CardsAgainstHumanity.Server.Logic.Game
{
    public class Round
    {
        private ICardService _cardService;
        private INotificationService _notificationService;
        private bool _roundOpen;
        public string GameId { get; private set; }
        public int RoundNumber { get; private set; }

        public Round(ICardService cardService, Guid blackCardId, IEnumerable<string> playerIds, int roundNum, string gameId, INotificationService notificationService)
        {
            _cardService = cardService;
            PlayerIds = playerIds;
            BlackCardId = blackCardId;
            _roundOpen = true;
            RoundNumber = roundNum;
            _notificationService = notificationService;
            GameId = gameId;
            PlayerSubmittedWhiteCards = new ConcurrentDictionary<string, IEnumerable<Guid>>();
        }

        public IDictionary<string, IEnumerable<Guid>> PlayerSubmittedWhiteCards { get; set; } 
        public IEnumerable<Guid> WinningWhiteCards { get; set; } 
        public string Winner { get; set; }
        public IEnumerable<string> PlayerIds { get; }  
        public Guid BlackCardId { get;  }

        public bool SubmitCards(string playerId, IEnumerable<Guid> whiteCards)
        {
            PlayerSubmittedWhiteCards[playerId] = whiteCards;
            _notificationService.PlayerSubmitted(playerId, GameId);
            return AllPlayersSubmitted();
        }

        public bool AllPlayersSubmitted()
        {
            if (!_roundOpen)
            {
                _roundOpen = !PlayerSubmittedWhiteCards.Keys.SequenceEqual(PlayerIds);
            }
            return _roundOpen;
        }

        public void ForceRoundOver()
        {
            _roundOpen = false;
            _notificationService.RoundOver(GameId);
        }

        public void SubmitWinner(string playerId)
        {
            if(_roundOpen) throw new InvalidOperationException("Cannot submit a winner while the round is over!");
            WinningWhiteCards = PlayerSubmittedWhiteCards.Get(playerId);
            Winner = playerId;
            _notificationService.GameReady(GameId);
        }
    }
}
