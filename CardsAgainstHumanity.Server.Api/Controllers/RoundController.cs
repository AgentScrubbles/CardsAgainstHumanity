using CardsAgainstHumanity.Server.Logic.Game;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CardsAgainstHumanity.Server.Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class RoundController : ApiController
    {
        private readonly GameService _gameService;

        public RoundController(GameService gameService)
        { 
            _gameService = gameService;
        }

        [HttpGet]
        public int Create(string gameId)
        {
            var game = _gameService.GetGame(gameId);
            var round = game.CreateRound();
            return round.RoundNumber;
        }
    }
}
