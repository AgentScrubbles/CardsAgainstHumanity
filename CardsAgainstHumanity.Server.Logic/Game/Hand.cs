using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardsAgainstHumanity.Server.Logic.Game
{
    public class Hand
    {
        public ICollection<Guid> CardsInHand { get; set; }
    }
}
