using System.Threading.Tasks;
using CardsAgainstHumanity.Server.Logic.Interfaces;
using Microsoft.AspNet.SignalR;

namespace CardsAgainstHumanity.Server.Api.Hubs
{
    public class Player : Hub, INotificationService
    {
        public void Subscribe(string gameId)
        {
            Groups.Add(Context.ConnectionId, gameId);
        }

        public void PlayerAdded(string gameid, string playerid)
        {
            var group = Clients.Group(gameid);
            group?.playerAdded(playerid);
        }
    }
}
