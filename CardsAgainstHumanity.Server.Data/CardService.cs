using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CardsAgainstHumanity.Server.Data.Cards;
using CardsAgainstHumanity.Shared.Extensions;

namespace CardsAgainstHumanity.Server.Data
{
    public interface ICardService
    {
        Task<IDictionary<Guid, WhiteCard>> GetAllWhiteCards();
        Task<IDictionary<Guid, BlackCard>> GetAllBlackCards();

        WhiteCard GetWhiteCard(Guid whiteCardId);
        BlackCard GetBlackCard(Guid blackCardId);
    }


    public class CardService : ICardService
    {
        private readonly ICardReader _cardReader;
        private static IDictionary<Guid, WhiteCard> _whiteCards;
        private static IDictionary<Guid, BlackCard> _blackCards;
        private static bool _isInitialized = false;


        public CardService(ICardReader cardReader)
        {
            _cardReader = cardReader;
        }

        private async Task Initialize()
        {
            var whiteCardTask = _cardReader.GetWhiteCardsAsync();
            var blackCardTask = _cardReader.GetBlackCardsAsync();
            var whiteCardParseTask = (await whiteCardTask).ToConcurrentDictionaryAsync(k => k.WhiteCardId, v => v);
            var blackCardParseTask = (await blackCardTask).ToConcurrentDictionaryAsync(k => k.BlackCardId, v => v);
            _whiteCards = await whiteCardParseTask;
            _blackCards = await blackCardParseTask;
            _isInitialized = true;
        }


        public async Task<IDictionary<Guid, WhiteCard>> GetAllWhiteCards()
        {
            if (!_isInitialized) await Initialize();
            return _whiteCards;
        }

        public async Task<IDictionary<Guid, BlackCard>> GetAllBlackCards()
        {
            if (!_isInitialized) await Initialize();
            return _blackCards;
        }

        public WhiteCard GetWhiteCard(Guid whiteCardId)
        {
            if (!_isInitialized) Task.Run(Initialize).Wait();
            return _whiteCards.Get(whiteCardId);
        }

        public BlackCard GetBlackCard(Guid blackCardId)
        {
            if (!_isInitialized) Task.Run(Initialize).Wait();
            return _blackCards.Get(blackCardId);
        }
    }
}
