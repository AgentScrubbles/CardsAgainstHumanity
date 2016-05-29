using System.Threading.Tasks;

namespace CardsAgainstHumanity.Plug
{
    public class Connection
    {

        private const string UrlGetGame = "Match/CreateGame";
        private const string UrlJoinGame = "Match/JoinGame";
        private const string UrlLeaveGame = "Match/LeaveGame";
        

        public Task<string> CreateGame()
        {
            return Portal.Instance.Get<string>(UrlGetGame);
        }

        public Task<bool> JoinGame(string gameId, string playerId)
        {
            return Portal.Instance.Post<bool>(UrlJoinGame, new {GameId = gameId, PlayerId = playerId});
        }

        public Task<bool> LeaveGame(string gameId, string playerId)
        {
            return Portal.Instance.Get<bool>(UrlLeaveGame, new {GameId = gameId, PlayerId = playerId});
        }
    }
}
