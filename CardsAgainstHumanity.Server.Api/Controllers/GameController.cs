using CardsAgainstHumanity.Server.Logic.Game;
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
    }
}
