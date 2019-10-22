namespace Domain.Entities
{
    public class UploadFile
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string InputFileField { get; set; }
        public long Size { get; set; }
        public string Type { get; set; }
        public string FileName { get; set; }
        public string Controller { get; set; }
        public string Extension { get; set; }
    }
}
