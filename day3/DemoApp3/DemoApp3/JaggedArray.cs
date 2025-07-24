using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoApp3
{
    internal class JaggedArray
    {
        static void Main(string[] args)  // Preferred signature

        {
            int[][] jaggedArray = new int[2][];

            int[] x = new int[] { 1, 2, 3 };
            int[] y = new int[] { 5, 1, 5 };

            jaggedArray[0] = x;
            jaggedArray[1] = y;

            Console.WriteLine(jaggedArray[0][0]);
            Console.WriteLine(jaggedArray[0][1]);
            Console.WriteLine(jaggedArray[0][2]);

            Console.WriteLine(jaggedArray[1][0]);
            Console.WriteLine(jaggedArray[1][1]);
            Console.WriteLine(jaggedArray[1][2]);
        }
    }
}
