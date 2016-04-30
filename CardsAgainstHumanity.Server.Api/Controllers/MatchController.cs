using System.Web.Http;
using System.Web.Http.Cors;
using CardsAgainstHumanity.Server.Logic.Game;
using Newtonsoft.Json;

namespace CardsAgainstHumanity.Server.Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
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

        [HttpPost]
        public bool JoinGame([FromBody]JoinGameModel model)
        {
            var game = _gameService.GetGame(model.GameId);
            game.AddPlayer(model.PlayerId);
            return game.IsRunning;
        }

        public class JoinGameModel
        {
            public string GameId { get; set; }
            public string PlayerId { get; set; }
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
