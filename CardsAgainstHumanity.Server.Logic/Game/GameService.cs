using System;
using System.Collections.Concurrent;
using CardsAgainstHumanity.Server.Data;
using CardsAgainstHumanity.Server.Logic.Interfaces;
using CardsAgainstHumanity.Shared.Extensions;

namespace CardsAgainstHumanity.Server.Logic.Game
{

    public interface IGameServiceFactory
    {
        GameService Get();
    }

    public class GameServiceFactory : IGameServiceFactory
    {
        private readonly ICardService _cardService;
        private readonly INotificationFactory _notificationFactory;

        public GameServiceFactory(ICardService cardService, INotificationFactory notificationFactory)
        {
            _cardService = cardService;
            _notificationFactory = notificationFactory;
        }

        public static GameService Instance;


        public GameService Get()
        {
            lock (typeof (IGameServiceFactory))
            {
                return Instance ?? (Instance = new GameService(_cardService, _notificationFactory));
            }
        }
    }

    public class GameService
    {
        private readonly ICardService _cardService;
        private readonly INotificationFactory _notificationFactory;
        private static readonly ConcurrentDictionary<string, Game> ActiveGames = new ConcurrentDictionary<string, Game>();

        public GameService(ICardService cardService, INotificationFactory notificationFactory)
        {
            _cardService = cardService;
            _notificationFactory = notificationFactory;
        }

        public string CreateGame()
        {
            var gameId = StringExtensions.RandomString(6);
            ActiveGames[gameId] = new Game(_cardService, _notificationFactory, gameId);
            return gameId;
        }

        public Game GetGame(string gameId)
        {
            return ActiveGames.Get(gameId);
        }

        public void EndGame(string gameId)
        {
            Game game;
            ActiveGames.TryRemove(gameId, out game);
        }
    }
}
