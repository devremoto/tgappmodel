using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace CleanUp
{
    class Program
    {
        static bool exists = false;
        static void Main(string[] args)
        {



            var result = new List<string>();
            var entities = Helpers.GetEntities();
            var viewModels = Helpers.GetViewModels();

            if (entities.Count > 0)
            {
                result = viewModels.Except(entities).ToList();
            }
            if (result.Count > 0)
            {
                CleanDirectories(result);
            }
        }

        private static void CleanDirectories(List<string> result)
        {
            exists = false;

            var dirs = new List<string>
            {

            };

            foreach (var file in result)
            {
                DeleteFile("Data\\EF\\Mappings\\_generated", file, "", "Map.cs");
                DeleteFile("Data\\Repositories\\_generated\\", file, "", "Repository.cs");
                DeleteFile("web\\src\\app\\combos\\", file, "combo.", ".ts");
                DeleteFile("web\\src\\app\\models\\", file, "", ".ts");
                DeleteFile("web\\src\\app\\services\\generated\\", file, "", "Service.ts");
                DeleteFile("web\\src\\app\\services\\custom\\", file, "", ".ts");
                DeleteFile("Api\\Controllers\\_generated\\", file, "", "Controller.cs");
                DeleteFile("Api\\Controllers\\", file, "", "Controller.cs");
                DeleteFile("Application\\Interfaces\\_generated\\", file, "I", "AppService.cs");
                DeleteFile("Application\\Services\\_generated\\", file, "", "AppService.cs");
                DeleteFile("Application\\Services\\", file, "", "AppService.cs");
                DeleteFile("Application\\ViewModels\\Custom\\", file, "", "ViewModel.cs");
                DeleteFile("Application\\ViewModels\\", file, "", "ViewModel.cs");
                DeleteFile("Domain\\Interfaces\\_generated\\", file, "I", "Repository.cs");
                DeleteFile("Domain\\Services\\Interfaces\\_generated\\", file, "I", "Service.cs");
                DeleteFile("Tests\\Repositories\\", file, "I", "Repository.cs");
                DeleteDir(Path.Combine(Environment.CurrentDirectory, "../../../../../", "web\\src\\app\\admin\\_generated\\", file));
                if (!exists)
                {
                    DeleteFile("Domain\\Services\\_generated\\", file, "", "Service.cs");
                }
                else
                {
                    CleanDirectories(result);
                }
            }
        }

        private static bool DeleteDir(string path)
        {
            try
            {
                if (Directory.Exists(path))
                {
                    Directory.Delete(path, true);
                    if (!exists)
                        exists = true;
                }

            }
            catch (Exception e)
            {

                throw e;
            }
            return exists;
        }

        private static bool DeleteFile(string dir, string file, string prefix = "", string sufix = "")
        {
            try
            {
                var path = Path.Combine(Environment.CurrentDirectory, "../../../../../", dir, $"{prefix}{file}{sufix}");
                if (File.Exists(path))
                {
                    File.Delete(path);
                    if (!exists)
                        exists = true;
                }

            }
            catch (Exception e)
            {

                throw e;
            }
            return false;
        }
    }
}
