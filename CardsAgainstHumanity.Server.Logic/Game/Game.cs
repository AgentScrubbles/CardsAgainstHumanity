using System;
using System.Collections.Generic;

namespace CardsAgainstHumanity.Server.Logic.Game
{
    public class Game
    {

        public IEnumerable<Guid> AvailableWhiteCards { get; set; } 
        public IEnumerable<Guid> AvailableBlackCards { get; set; }
    }
}
