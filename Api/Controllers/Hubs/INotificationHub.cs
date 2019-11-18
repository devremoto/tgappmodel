using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.Controllers.Hubs
{
	public interface INotificationHub
	{
		Task Notify(HubAction action, object entity, Type type);
	}
}