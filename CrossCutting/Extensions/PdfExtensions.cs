using CrossCutting.Helpers;

namespace CrossCutting.Extensions
{
	public static class PdfExtensions
	{
		public static byte[] ToPdf(this string htmlContent, string cssContent)
		{
			return null;//new PdfHelper().Generate(htmlContent, cssContent);
		}
	}
}
