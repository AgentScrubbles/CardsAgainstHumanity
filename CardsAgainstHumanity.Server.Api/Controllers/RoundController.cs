using CardsAgainstHumanity.Server.Data;
using CardsAgainstHumanity.Server.Logic.Game;
using CardsAgainstHumanity.Shared.Models;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CardsAgainstHumanity.Server.Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class RoundController : ApiController
    {
        private readonly GameService _gameService;
        private readonly ICardService _cardService;

        public RoundController(GameService gameService, CardService cardService)
        { 
            _gameService = gameService;
            _cardService = cardService;
        }

        [HttpGet]
        public int Create(string gameId)
        {
            var game = _gameService.GetGame(gameId);
            var round = game.CreateRound();
            return round.RoundNumber;
        }

        [HttpGet]
        public PlayerRoundModel GetPlayerRound(string gameId, string playerId)
        {
            var game = _gameService.GetGame(gameId);
            var blackCard = _cardService.GetBlackCard(game.CurrentRound.BlackCardId);
            var model = new PlayerRoundModel
            {
                GameId = gameId,
                PlayerId = playerId,
                RoundId = game.CurrentRound.RoundNumber,
                BlackCard = new BlackCardModel
                {
                    BlackCardId = blackCard.BlackCardId,
                    RawValue = blackCard.RawValue
                },
                WhiteCards = game.Hands[playerId].CardsInHand.Select(k => _cardService.GetWhiteCard(k)).Select(k => new WhiteCardModel
                {
                    WhiteCardId = k.WhiteCardId,
                    Value = k.Value
                })
            };
            return model;
        }
        
    }
}
