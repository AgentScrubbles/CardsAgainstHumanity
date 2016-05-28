using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardsAgainstHumanity.Server.Data;
using CardsAgainstHumanity.Server.Logic.Interfaces;
using CardsAgainstHumanity.Shared.Extensions;
using System.Collections.Concurrent;

namespace CardsAgainstHumanity.Server.Logic.Game
{
    public class Game
    {
        private readonly ICardService _cardService;
        private readonly INotificationFactory _notificationFactory;
        private const int NUM_CARDS_PER_HAND = 8;

        public Game(ICardService cardService, INotificationFactory notificationFactory, string gameId)
        {
            _cardService = cardService;
            _notificationFactory = notificationFactory;
            GameId = gameId;
            Task.Run(Setup).Wait();
        }
        public string GameId { get; }

        public IList<Guid> AvailableWhiteCards { get; private set; } 
        public IList<Guid> AvailableBlackCards { get; private set; }
        public bool IsRunning { get; private set; }


        public List<string> Players { get; private set; }
        public IDictionary<string, Hand> Hands { get; private set; }

        public void Start()
        {
            //All players are here, let's notify the players
            _notificationFactory.GetInstance().GameReady(GameId);
        }

        public List<Round> Rounds { get; private set; } 
        public Round CurrentRound => Rounds[Rounds.Count - 1];

        public async Task Setup()
        {
            AvailableWhiteCards = (await _cardService.GetAllWhiteCards(GameId)).Select(k => k.Key).Shuffle().ToList();
            AvailableBlackCards = (await _cardService.GetAllBlackCards()).Select(k => k.Key).Shuffle().ToList();
            Rounds = new List<Round>();
            Players = new List<string>();
            IsRunning = false;
        }

        public void AddPlayer(string playerId)
        {
            //eh, a player can be added again, won't do anything
            if (Players.All(k => k != playerId))
            {
                Players.Add(playerId);
                _notificationFactory.GetInstance()?.PlayerAdded(playerId, GameId);
            }
        }

        public void RemovePlayer(string playerId)
        {
            if (Players.Contains(playerId))
            {
                Players.Remove(playerId);
            }
        }

        public Round CreateRound()
        {
            var blackCardId = AvailableBlackCards.FirstOrDefault();
            Deal();
            AvailableBlackCards.Remove(blackCardId);
            var round = new Round(_cardService, blackCardId, Players, Rounds.Count, GameId, _notificationFactory.GetInstance());
            Rounds.Add(round);
            if (AvailableBlackCards.Count == 0)
            {
                IsRunning = false;
            }else
            {
                IsRunning = true;
            }
            return round;
        }

        public IDictionary<string, int> GetScores()
        {
            return Rounds.Where(k => k.Winner != null).GroupBy(k => k.Winner).ToDictionary(k => k.Key, v => v.Count());
        } 

        private void Deal()
        {
            //Everyone must have NUM_HAND cards available
            //Doing this in a look to keep 'randomness', rather than dealing to one person, then the next
            var dealt = false;
            if(Hands == null)
            {
                Hands = new ConcurrentDictionary<string, Hand>();
            }
            while (!dealt)
            {
                dealt = true;
                foreach (var player in Players)
                {
                    var playerfull = true;
                    if (!Hands.ContainsKey(player))
                    {
                        Hands[player] = new Hand { CardsInHand = new List<Guid>() };
                    }
                    if (Hands[player].CardsInHand.Count() < NUM_CARDS_PER_HAND)
                    {
                        var card = AvailableWhiteCards.FirstOrDefault();
                        if (card != Guid.Empty)
                        {
                            AvailableWhiteCards.Remove(card);
                            Hands[player].CardsInHand.Add(card);
                        }
                        else
                        {
                            dealt = true; //No cards left
                        }
                        playerfull = false;
                    }
                    dealt = dealt && playerfull;
                }
            }
        }

        public void SubmitCards(string playerId, IEnumerable<Guid> cardIds)
        {
            var cards = cardIds.ToList();
            CurrentRound.SubmitCards(playerId, cards);
            cards.ForEach(k => Hands.Get(playerId).CardsInHand.Remove(k));
        }


        public void End()
        {
            IsRunning = false;
            _notificationFactory.GetInstance().GameEnded(GameId);
        }
    }
}
