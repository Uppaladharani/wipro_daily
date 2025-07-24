using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbstractClass
{
    internal class OopsEx
    {
        static void Main(string[] args)
        {
            Employ[] arrEmploy = new Employ[]
            {
                new Arjun(1, "Arjun", 1234),
                new Krishna(3, "Krishna",5678)
            };

            foreach (Employ employ in arrEmploy)
            {
                Console.WriteLine(employ);
            }
        }
    }
}

