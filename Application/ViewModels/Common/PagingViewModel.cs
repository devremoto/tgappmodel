using System.Collections.Generic;

namespace Application.ViewModels.Common
{
    public class PagingViewModel<T>
    {
        public int Number { get; set; }
        public int Size { get; set; }
        public int MaxSize { get; set; }
        public int TotalCount { get; set; }
        public List<T> List { get; set; }
        public string OrderBy { get; set; }
        public string OrderDirection { get;  set; }
    }
}
