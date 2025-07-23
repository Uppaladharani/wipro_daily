using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System;

namespace demo2
{
    internal class Pro1
    {
        // Method to add two numbers
        public int Sum(int a, int b)
        {
            return a + b;
        }

        // Method to subtract two numbers
        public int Subtract(int a, int b)
        {
            return a - b;
        }

        // Method to multiply two numbers
        public int Multiply(int a, int b)
        {
            return a * b;
        }

        // Method to divide two numbers
        public double Divide(int a, int b)
        {
            if (b != 0)
                return (double)a / b;
            else
                throw new DivideByZeroException("Division by zero is not allowed.");
        }

        // Main method - entry point
        static void Main()
        {
            int a, b;

            Console.WriteLine("Enter 2 numbers:");
            a = Convert.ToInt32(Console.ReadLine());
            b = Convert.ToInt32(Console.ReadLine());

            Pro1 p = new Pro1();

            Console.WriteLine("\nResults:");
            Console.WriteLine("Sum: " + p.Sum(a, b));
            Console.WriteLine("Difference: " + p.Subtract(a, b));
            Console.WriteLine("Product: " + p.Multiply(a, b));

            try
            {
                Console.WriteLine("Quotient: " + p.Divide(a, b));
            }
            catch (DivideByZeroException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }

            Console.WriteLine("\nPress any key to exit...");
            Console.ReadKey();
        }
    }
}
