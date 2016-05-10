using System.Collections.Generic;

namespace CardsAgainstHumanity.Shared.Models
{
    public class SubmissionModel
    {
        public IEnumerable<PlayerSubmissionModel> Submissions { get; set; }
        public BlackCardModel BlackCard { get; set; }
    }

    public class PlayerSubmissionModel
    {
        public string PlayerId { get; set; }
        public string SubmittedAnswer { get; set; }
        public IEnumerable<WhiteCardModel> Cards { get; set; }
    }
}
