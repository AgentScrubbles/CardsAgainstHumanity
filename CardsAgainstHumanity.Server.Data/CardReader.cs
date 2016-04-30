using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using CardsAgainstHumanity.Server.Data.Cards;

namespace CardsAgainstHumanity.Server.Data
{
    public interface ICardReader
    {
        Task<IEnumerable<WhiteCard>> GetWhiteCardsAsync();
        Task<IEnumerable<BlackCard>> GetBlackCardsAsync();
    }

    public class CardReader : ICardReader
    {
        private const string WhiteCardFileLocation = @"C:\WhiteCards.txt";
        private const string BlackCardFileLocation = @"C:\BlackCards.txt";

        public async Task<IEnumerable<WhiteCard>> GetWhiteCardsAsync()
        {
            var whiteCards = new ConcurrentBag<WhiteCard>();
            using (var sr = new StreamReader(WhiteCardFileLocation))
            {
                while (!sr.EndOfStream)
                {
                    var line = await sr.ReadLineAsync();
                    var card = new WhiteCard { Value = line, WhiteCardId = Guid.NewGuid() };
                    whiteCards.Add(card);
                }
            }
            return whiteCards;
        }

        public async Task<IEnumerable<BlackCard>> GetBlackCardsAsync()
        {
            var blackCards = new ConcurrentBag<BlackCard>();
            using (var sr = new StreamReader(BlackCardFileLocation))
            {
                while (!sr.EndOfStream)
                {
                    var line = await sr.ReadLineAsync();
                    var card = new BlackCard { RawValue = line, BlackCardId = Guid.NewGuid() };
                    blackCards.Add(card);
                }
            }
            return blackCards;
        }
    }
}
