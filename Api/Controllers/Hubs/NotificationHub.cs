using System.Diagnostics;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.Controllers.Hubs
{
	public class NotificationHub : Hub, INotificationHub
	{
		private IHubContext<NotificationHub> _hub;

		public NotificationHub(IHubContext<NotificationHub> hub)
		{
			_hub = hub;
		}
		public async Task Notify(HubAction action, object entity, Type type)
		{
			switch (action)
			{
				case HubAction.GetAll:
					await Send(action.ToString(), entity, type);
					break;
				case HubAction.GetAllPage:
					await Send(action.ToString(), entity, type);
					break;
				case HubAction.GetOne:
					await Send(action.ToString(), entity, type);
					break;
				case HubAction.GetJson:
					await Send(action.ToString(), entity, type);
					break;
				case HubAction.Remove:
					await Send(action.ToString(), entity, type);
					break;
				case HubAction.Update:
					await Send(action.ToString(), entity, type);
					break;
				case HubAction.Create:
					await Send(action.ToString(), entity, type);
					break;
			}
		}

		private async Task Send(string action, object entity, Type type)
		{
			try
			{
				var key = $"{type.Name}{action}";
				Console.WriteLine("-------------------------------------------------------");
				Console.WriteLine(key);
				Debug.WriteLine(key);
				if (_hub.Clients != null)
				{
					await _hub.Clients.All.SendAsync(key, entity);
					//await _hub.Clients.All.SendCoreAsync(key, new[] { entity });
				}
			}
			catch (Exception e)
			{
				Console.WriteLine(e.Message);
				throw e;
			}
		}
	}
}

