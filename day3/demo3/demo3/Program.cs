using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo3
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int[,] X = new int[2, 3]

                {
                    { 1, 2, 3 },
                    { 4, 5, 6 }
                };
            for (int i = 0; i < X.GetLength(0); i++)
            {
                for (int j = 0; j < X.GetLength(1); j++)
                {
                    Console.Write(X[i, j] +  "  ");
                }
            }
            Console.WriteLine();

            ;
        }
    }
}
