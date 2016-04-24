using System;
using System.Collections.Concurrent;
using CardsAgainstHumanity.Server.Data;
using CardsAgainstHumanity.Shared.Extensions;

namespace CardsAgainstHumanity.Server.Logic.Game
{

    public interface IGameServiceFactory
    {
        
    }

    public class GameServiceFactory
    {
        private readonly ICardService _cardService;

        public GameServiceFactory(ICardService cardService)
        {
            _cardService = cardService;
        }

        public static GameService Instance;


        public GameService Get()
        {
            lock (typeof (IGameServiceFactory))
            {
                return Instance ?? (Instance = new GameService(_cardService));
            }
        }
    }

    public class GameService
    {
        private readonly ICardService _cardService;
        private static readonly ConcurrentDictionary<Guid, Game> ActiveGames = new ConcurrentDictionary<Guid, Game>();

        public GameService(ICardService cardService)
        {
            _cardService = cardService;
        }

        public Guid CreateGame()
        {
            var gameId = Guid.NewGuid();
            ActiveGames[gameId] = new Game(_cardService);
            return gameId;
        }

        public Game GetGame(Guid gameId)
        {
            return ActiveGames.Get(gameId);
        }

        public void EndGame(Guid gameId)
        {
            Game game;
            ActiveGames.TryRemove(gameId, out game);
        }
    }
}
