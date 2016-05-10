namespace CardsAgainstHumanity.Server.Logic.Interfaces
{
    public interface INotificationService
    {
        void PlayerAdded(string playerId, string gameId);
        void GameReady(string gameId);
        void PlayerSubmitted(string playerId, string gameId);
        void RoundOver(string gameId);
    }
}
