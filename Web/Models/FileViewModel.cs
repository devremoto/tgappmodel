namespace Web.ViewModels
{
    public class FileViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string InputFileField { get; set; }
        public long Size { get; set; }
        public string Type { get; set; }
        public string FileName { get; set; }
        public string Controller { get; set; }
        public string FormattedSize { get; set; }
        public bool IsVideo { get; set; }
        public bool IsImage { get; set; }
        public string Extension { get; set; }
        public int Index { get; internal set; }
    }
}
