using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using CardsAgainstHumanity.Server.Data;
using CardsAgainstHumanity.Shared.Extensions;

namespace CardsAgainstHumanity.Server.Logic.Game
{
    public class Round
    {
        private ICardService _cardService;
        private bool _roundOpen;

        public Round(ICardService cardService, Guid blackCardId, IEnumerable<Guid> playerIds )
        {
            _cardService = cardService;
            PlayerIds = playerIds;
            BlackCardId = blackCardId;
            _roundOpen = true;
            PlayerSubmittedWhiteCards = new ConcurrentDictionary<Guid, IEnumerable<Guid>>();
        }

        public IDictionary<Guid, IEnumerable<Guid>> PlayerSubmittedWhiteCards { get; set; } 
        public IEnumerable<Guid> WinningWhiteCards { get; set; } 
        public Guid Winner { get; set; }
        public IEnumerable<Guid> PlayerIds { get; }  
        public Guid BlackCardId { get;  }

        public bool SubmitCards(Guid playerId, IEnumerable<Guid> whiteCards)
        {
            PlayerSubmittedWhiteCards[playerId] = whiteCards;
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
        }

        public void SubmitWinner(Guid playerId)
        {
            if(_roundOpen) throw new InvalidOperationException("Cannot submit a winner while the round is over!");
            WinningWhiteCards = PlayerSubmittedWhiteCards.Get(playerId);
            Winner = playerId;
        }
    }
}
