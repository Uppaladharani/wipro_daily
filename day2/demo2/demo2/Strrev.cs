using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo2
{
    internal class Strrev
    {
        static void Main()
        {
            string input = "welcome to dotnet programming";
            string[] words = input.Split(' ');

            for (int i = 0; i < words.Length; i++)
            {
                if (i % 2 != 0)
                {
                    char[] chars = words[i].ToCharArray();
                    Array.Reverse(chars);
                    words[i] = new string(chars);
                }
            }

            string result = string.Join(" ", words);
            Console.WriteLine(result);
        }
    }
}
