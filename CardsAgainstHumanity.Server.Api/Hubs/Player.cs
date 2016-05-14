using System;
using System.Threading.Tasks;
using CardsAgainstHumanity.Server.Logic.Interfaces;
using Microsoft.AspNet.SignalR;

namespace CardsAgainstHumanity.Server.Api.Hubs
{
    public class NotificationFactory : INotificationFactory
    {

        internal static Player Instance;

        public INotificationService GetInstance()
        {
            return Instance;
        }
    }

    public class Player : Hub, INotificationService
    {
        public Player()
        {
            NotificationFactory.Instance = this;
        }

        public void Subscribe(string gameId)
        {
            Groups.Add(Context.ConnectionId, gameId);
        }

        public void PlayerAdded(string playerid, string gameid)
        {
            var group = Clients.Group(gameid);
            group?.playerAdded(playerid);
        }

        public void GameReady(string gameId)
        {
            var group = Clients.Group(gameId);
            group?.gameReady("Ready");
        }

        public void PlayerSubmitted(string playerId, string gameId)
        {
            var group = Clients.Group(gameId);
            group?.playerSubmitted(playerId);
        }

        public void RoundOver(string gameId)
        {
            var group = Clients.Group(gameId);
            group?.roundOver();
        }

        public void GameEnded(string gameId)
        {
            var group = Clients.Group(gameId);
            group?.gameEnded();
        }
    }
}
