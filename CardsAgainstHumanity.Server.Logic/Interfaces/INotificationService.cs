namespace CardsAgainstHumanity.Server.Logic.Interfaces
{
    public interface INotificationService
    {
        void PlayerAdded(string playerId, string gameId);
    }
}
