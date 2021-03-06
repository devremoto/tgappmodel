﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace CleanUp
{
    public class Helpers
    {
        public static List<string> GetEntities()
        {
			return ClassList("../../../../../Domain/Entities", ".cs");
        }

        public static List<string> GetViewModels()
        {
			return ClassList("../../../../../Domain/Services/_generated", "Service.cs");
        }

        private static List<string> ClassList(string path, string sufix)
        {
			var platform = Environment.OSVersion.Platform;
			path = platform == PlatformID.Win32NT ? path.Replace("/", "\\") : path;
			return Directory.GetFiles(path, "*.cs")
                .Select(x =>
                {
                    var info = new FileInfo(x);
                    return info.Name.Replace(sufix, "");
                })
                .ToList();
        }


    }
}
