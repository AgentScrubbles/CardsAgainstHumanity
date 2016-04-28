using CardsAgainstHumanity.Server.Data;
using CardsAgainstHumanity.Server.Data.Cards;
using CardsAgainstHumanity.Server.Logic.Game;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CardsAgainstHumanity.Server.Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CardController : ApiController
    {
        private readonly GameService _gameService;
        private readonly CardService _cardService;

        public CardController(GameService gameService, CardService cardService)
        {
            _gameService = gameService;
            _cardService = cardService;
        }

        [HttpGet]
        public BlackCard BlackCard(string gameId, int roundNumber)
        {
            var game = _gameService.GetGame(gameId);
            var blackCardId = game.Rounds[roundNumber].BlackCardId;
            return _cardService.GetBlackCard(blackCardId);
        }

        [HttpGet]
        public IEnumerable<WhiteCard> GetHand(string gameId, int roundNumber, string playerId)
        {
            var game = _gameService.GetGame(gameId);
            var hand = game.Hands[playerId];
            var cards = new List<WhiteCard>();
            hand.CardsInHand.AsParallel().ForAll(k =>
            {
                cards.Add(_cardService.GetWhiteCard(k));
            });
            return cards;
        }
    }
}
