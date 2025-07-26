using System;
using System.IO;

namespace FilterException
{
    internal class FlilesEx
    {
        static void Main(string[] args)
        {
            // Ensure the directory exists
            Directory.CreateDirectory(@"c:\Files");

            // Create and write to the file
            FileStream fs = new FileStream(@"c:\Files\Demo1.txt", FileMode.Create, FileAccess.Write);
            StreamWriter sw = new StreamWriter(fs);

            sw.WriteLine("This is My First Program in Files...");
            sw.WriteLine("Thank you All...");

            sw.Flush();
            sw.Close();
            fs.Close();

            Console.WriteLine("File Created Successfully...");
        }
    }
}

