namespace Api.Context;

public interface IRequestContext
{
    public string UserId { get; set; }
}
public class RequestContext : IRequestContext
{
    public string UserId { get; set; }
}