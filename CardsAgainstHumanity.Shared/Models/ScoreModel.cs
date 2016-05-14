using System.Collections.Generic;

namespace CardsAgainstHumanity.Shared.Models
{
    public class GameScoreModel
    {
        public IEnumerable<ScoreModel> Scores { get; set; }
    }

    public class ScoreModel
    {
        public string PlayerId { get; set; }
        public int Score { get; set; }
    }
}
