using System;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Drawing;

namespace Web.Helpers.Image
{
    public class ImageHelper
    {
        public static System.Drawing.Image ScaleImage(System.Drawing.Image image, double maxWidth = 0, double maxHeight = 0)
        {
            if (maxHeight == 0 && maxWidth == 0)
                return image;

            if (maxWidth == 0)
                maxWidth = image.Width;

            if (maxHeight == 0)
                maxHeight = image.Height;

            var ratioX = (double)maxWidth / image.Width;
            var ratioY = (double)maxHeight / image.Height;
            var ratio = Math.Min(ratioX, ratioY);

            var newWidth = (int)(image.Width * ratio);
            var newHeight = (int)(image.Height * ratio);

            var newImage = new Bitmap(newWidth, newHeight);

            using (var graphics = Graphics.FromImage(newImage))
            {
                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphics.DrawImage(image, 0, 0, newWidth, newHeight);
            }
            return newImage;
        }

        public static MemoryStream ScaleImage(string path, double maxWidth = 0, double maxHeight = 0)
        {
            var img = System.IO.File.OpenRead(path);
            var r = ScaleImage(System.Drawing.Image.FromStream(img), maxWidth, maxHeight);
            //var bytes = System.IO.File.ReadAllBytes(path);
            var imgStream = new MemoryStream();
            r.Save(imgStream, GetFormat(path));
            imgStream.Position = 0;
            return imgStream;
        }

        public static void CorrectRotation(string path)
        {
            var rotate = false;
            var image = System.Drawing.Image.FromFile(path);
            if (image.PropertyIdList.Contains(0x0112))
            {
                int rotationValue = image.GetPropertyItem(0x0112).Value[0];
                switch (rotationValue)
                {
                    case 1: // landscape, do nothing
                        break;

                    case 8: // rotated 90 right
                        rotate = true;
                        image.RotateFlip(rotateFlipType: RotateFlipType.Rotate270FlipNone);
                        break;

                    case 3: // bottoms up
                        rotate = true;
                        image.RotateFlip(rotateFlipType: RotateFlipType.Rotate180FlipNone);
                        break;

                    case 6: // rotated 90 left
                        rotate = true;
                        image.RotateFlip(rotateFlipType: RotateFlipType.Rotate90FlipNone);
                        break;
                }
                if (rotate)
                    image.Save(path);
            }
        }

        private static ImageFormat GetFormat(string path)
        {
            ImageFormat format = ImageFormat.MemoryBmp;
            var fileInfo = new FileInfo(path);

            switch (fileInfo.Extension.ToLower())
            {
                case ".jpg":
                case ".jpeg":
                    format = ImageFormat.Jpeg;
                    break;
                case ".bmp":
                    format = ImageFormat.Bmp;
                    break;
                case ".emf":
                    format = ImageFormat.Emf;
                    break;
                case ".wmf":
                    format = ImageFormat.Wmf;
                    break;
                case ".gif":
                    format = ImageFormat.Gif;
                    break;
                case ".png":
                    format = ImageFormat.Png;
                    break;
                case ".tiff":
                    format = ImageFormat.Tiff;
                    break;
                case ".exif":
                    format = ImageFormat.Exif;
                    break;
                case ".icon":
                    format = ImageFormat.Icon;
                    break;
                default:
                    format = ImageFormat.MemoryBmp;
                    break;
            }
            return format;
        }
    }
}
