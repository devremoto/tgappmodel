using System.IO;
using System.Text;
using System.Xml;
using System.Xml.Serialization;

namespace CrossCutting.Extensions
{
    public static class XmlExtensions
    {

        #region XML
        public static string ToXml(this object obj)
        {
            if (obj != null)
            {
                var xs = new XmlSerializer(obj.GetType());
                var sb = new StringBuilder();
                using (var sw = new StringWriter(sb))
                {
                    xs.Serialize(sw, obj);
                    return sb.ToString();
                }
            }

            return null;
        }

        public static string AsString(this XmlDocument xmlDoc)
        {
            using (StringWriter sw = new StringWriter())
            {

                using (XmlTextWriter tx = new XmlTextWriter(sw))
                {
                    tx.Formatting = Formatting.Indented;
                    tx.Indentation = 5;
                    xmlDoc.WriteContentTo(tx);
                    string strXmlText = sw.ToString();
                    return strXmlText;
                }
            }
        }
        #endregion
    }
}
