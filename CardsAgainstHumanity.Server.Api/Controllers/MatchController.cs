using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CardsAgainstHumanity.Server.Logic.Game;

namespace CardsAgainstHumanity.Server.Api.Controllers
{
    public class MatchController : ApiController
    {
        private readonly GameService _gameService;

        public MatchController(GameService gameService)
        {
            _gameService = gameService;
        }

        [HttpGet]
        public string CreateGame()
        {
            return _gameService.CreateGame();
        }

        [HttpGet]
        public bool JoinGame(string playerId, string gameId)
        {
            var game = _gameService.GetGame(gameId);
            game.AddPlayer(playerId);
            return true;
        }

        [HttpGet]
        public bool LeaveGame(string playerId, string gameId)
        {
            var game = _gameService.GetGame(gameId);
            game.RemovePlayer(playerId);
            return true;
        }

        //// GET: api/Match
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET: api/Match/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST: api/Match
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT: api/Match/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE: api/Match/5
        //public void Delete(int id)
        //{
        //}
    }
}
