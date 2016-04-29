using System.Collections.Generic;

namespace CardsAgainstHumanity.Shared.Models
{
    public class PlayerRoundModel
    {
        public IEnumerable<WhiteCardModel> WhiteCards { get; set; }
        public BlackCardModel BlackCard { get; set; }
        public int RoundId { get; set; }
        public string PlayerId { get; set; }
        public string GameId { get; set; }
    }
}
