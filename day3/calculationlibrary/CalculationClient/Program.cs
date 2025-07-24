using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using calculationlibrary; // Ensure this namespace matches the one in your library

namespace CalculationClient
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int a, b;
            Console.WriteLine("Enter 2 Numbers  ");
            a = Convert.ToInt32(Console.ReadLine());
            b = Convert.ToInt32(Console.ReadLine());
            Calculation calc = new Calculation();
            int sum = calc.Sum(a, b);
            int sub = calc.Sub(a, b);
            int mult = calc.Mult(a, b);
            Console.WriteLine("Sum: " + sum);
            Console.WriteLine("Subtraction: " + sub);
            Console.WriteLine("Multiplication: " + mult);

        }
    }
}
