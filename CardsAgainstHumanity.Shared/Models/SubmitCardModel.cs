using System;
using System.Collections.Generic;

namespace CardsAgainstHumanity.Shared.Models
{
    public class SubmitCardModel
    {
        public string GameId { get; set; }
        public string PlayerId { get; set; }
        public IEnumerable<Guid> CardIds { get; set; }
    }
}
