using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardsAgainstHumanity.Server.Data.Cards;
using CardsAgainstHumanity.Shared.Extensions;

namespace CardsAgainstHumanity.Server.Data
{
    public interface ICardService
    {
        Task<IDictionary<Guid, WhiteCard>> GetAllWhiteCards(string groupingId);
        Task<IDictionary<Guid, BlackCard>> GetAllBlackCards();
        void CreateCustomWhiteCard(string groupingId, Guid whiteCardId, string value);
        WhiteCard GetWhiteCard(string groupingId, Guid whiteCardId);
        BlackCard GetBlackCard(Guid blackCardId);
    }


    public class CardService : ICardService
    {
        private readonly ICardReader _cardReader;
        private static IDictionary<Guid, WhiteCard> _whiteCards;
        private static IDictionary<Guid, BlackCard> _blackCards;

        private static IDictionary<string, IDictionary<Guid, WhiteCard>> _customWhiteCards; 

        private static bool _isInitialized = false;


        public CardService(ICardReader cardReader)
        {
            _cardReader = cardReader;
        }

        private async Task Initialize()
        {
            var whiteCardTask = _cardReader.GetWhiteCardsAsync();
            var blackCardTask = _cardReader.GetBlackCardsAsync();
            _customWhiteCards = new ConcurrentDictionary<string, IDictionary<Guid, WhiteCard>>();
            var whiteCardParseTask = (await whiteCardTask).ToConcurrentDictionaryAsync(k => k.WhiteCardId, v => v);
            var blackCardParseTask = (await blackCardTask).ToConcurrentDictionaryAsync(k => k.BlackCardId, v => v);
            _whiteCards = await whiteCardParseTask;
            _blackCards = await blackCardParseTask;
            _isInitialized = true;
        }

        
        public void CreateCustomWhiteCard(string groupingId, Guid whiteCardId, string value)
        {
            var grouping = _customWhiteCards.Get(groupingId);
            if (grouping == null)
            {
                _customWhiteCards[groupingId] = new ConcurrentDictionary<Guid, WhiteCard>();
                grouping = _customWhiteCards[groupingId];
            }
            grouping[whiteCardId] = new WhiteCard {Value = value, WhiteCardId = whiteCardId};
        }


        public async Task<IDictionary<Guid, WhiteCard>> GetAllWhiteCards(string groupingId)
        {
            if (!_isInitialized) await Initialize();
            if (groupingId == null) return _whiteCards;
            return await
                _whiteCards.Union(_customWhiteCards.Get(groupingId)?.ToList() ?? new List<KeyValuePair<Guid, WhiteCard>>())
                    .ToConcurrentDictionaryAsync(k => k.Key, v => v.Value);
        }

        public async Task<IDictionary<Guid, BlackCard>> GetAllBlackCards()
        {
            if (!_isInitialized) await Initialize();
            return _blackCards;
        }

        public WhiteCard GetWhiteCard(string groupingId, Guid whiteCardId)
        {
            if (!_isInitialized) Task.Run(Initialize).Wait();
            var card = _whiteCards.Get(whiteCardId);
            if (card == null)
            {
                //This is a custom card, check there.
                card = _customWhiteCards.Get(groupingId)?.Get(whiteCardId);
            }
            return card;
        }

        public BlackCard GetBlackCard(Guid blackCardId)
        {
            if (!_isInitialized) Task.Run(Initialize).Wait();
            return _blackCards.Get(blackCardId);
        }
    }
}
