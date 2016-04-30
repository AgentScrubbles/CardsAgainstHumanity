using System.Collections.Generic;

namespace CardsAgainstHumanity.Shared.Models
{
    public class HostRoundModel
    {
        public BlackCardModel BlackCard { get; set; }
        public IEnumerable<string> Players { get; set; }
    }
}
