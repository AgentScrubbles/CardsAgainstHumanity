using CardsAgainstHumanity.Server.Data;
using CardsAgainstHumanity.Server.Logic.Game;
using CardsAgainstHumanity.Shared.Models;
using System.Collections.Generic;
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

        [HttpGet]
        public IEnumerable<string> PlayersWhoSubmitted(string gameId)
        {
            var game = _gameService.GetGame(gameId);
            return game.CurrentRound.PlayerSubmittedWhiteCards.Select(k => k.Key);
        }

        [HttpGet]
        public IEnumerable<PlayerSubmissionModel> Submissions(string gameId)
        {
            var game = _gameService.GetGame(gameId);
            var blackCard = _cardService.GetBlackCard(game.CurrentRound.BlackCardId);
            var blackCardModel = new BlackCardModel { BlackCardId = blackCard.BlackCardId, RawValue = blackCard.RawValue };
            var models = game.CurrentRound.PlayerSubmittedWhiteCards.Select(k => new PlayerSubmissionModel
            {
                PlayerId = k.Key,
                SubmittedAnswer = string.Format(blackCardModel.FormattableValue, k.Value.Select(j => _cardService.GetWhiteCard(j).Value).ToArray())
            });
            return models;
        }

        [HttpGet]
        public HostRoundModel GetHostRound(string gameId)
        {
            var game = _gameService.GetGame(gameId);
            var blackCard = _cardService.GetBlackCard(game.CurrentRound.BlackCardId);
            var model = new HostRoundModel
            {
                BlackCard = new BlackCardModel
                {
                    BlackCardId = blackCard.BlackCardId,
                    RawValue = blackCard.RawValue
                },
                Players = game.Players
            };
            return model;
        }

        [HttpGet]
        public void End(string gameId)
        {
            var game = _gameService.GetGame(gameId);
            game.CurrentRound.ForceRoundOver();
        }

        [HttpPost]
        public void Submit([FromBody]SubmitCardModel model)
        {
            var game = _gameService.GetGame(model.GameId);
            game.CurrentRound.SubmitCards(model.PlayerId, model.CardIds);
        }
        
    }
}
