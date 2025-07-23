using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo2
{
    internal class CaseEx
    {
        public void Show() { 
            Console.WriteLine("Enter a number between 1 and 5:");
            int number = Convert.ToInt32(Console.ReadLine());
            switch (number)
            {
                case 1:
                    Console.WriteLine("You entered One.");
                    break;
                case 2:
                    Console.WriteLine("You entered Two.");
                    break;
                case 3:
                    Console.WriteLine("You entered Three.");
                    break;
                case 4:
                    Console.WriteLine("You entered Four.");
                    break;
                case 5:
                    Console.WriteLine("You entered Five.");
                    break;
                default:
                    Console.WriteLine("Invalid input! Please enter a number between 1 and 5.");
                    break;
            }

        }
        static void Main()
        {
            CaseEx caseExample = new CaseEx();
            caseExample.Show();
        }
    }
}
