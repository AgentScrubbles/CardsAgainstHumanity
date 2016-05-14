using CardsAgainstHumanity.Server.Logic.Game;
using CardsAgainstHumanity.Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CardsAgainstHumanity.Server.Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class GameController : ApiController
    {
        private readonly GameService _gameService;

        public GameController(GameService gameService)
        {
            _gameService = gameService;
        }

        [HttpGet]
        public void Start(string gameId)
        {
            var game = _gameService.GetGame(gameId);
            game.Start();
        }

        [HttpGet]
        public IEnumerable<string> Players(string gameId)
        {
            var game = _gameService.GetGame(gameId);
            return game.Players;
        }

        [HttpGet]
        public void EndGame(string gameId)
        {
            var game = _gameService.GetGame(gameId);
            game.End();
        }

        [HttpGet]
        public GameScoreModel Scores(string gameId)
        {
            var game = _gameService.GetGame(gameId);
            return new GameScoreModel
            {
                Scores = game.GetScores().Select(k => new ScoreModel
                {
                    PlayerId = k.Key,
                    Score = k.Value
                }).ToList()
            };
        }
    }
}
