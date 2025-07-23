using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace demo2
{
    internal class Demoex
    {
        public void Calc(double n) {

            double area, circ;
            area = Math.PI * n * n;
            circ = 2* Math.PI * n;
            Console.WriteLine($"Area of the circle: {area}");
            Console.WriteLine($"Circumference of the circle: {circ}");
        }
            static void Main()
                
        {
            double radius;
            Console.WriteLine("Enter the radius of the circle:");
            radius = Convert.ToDouble(Console.ReadLine());
            Demoex demo = new Demoex();
            demo.Calc(radius);
          



        }
    }
}
