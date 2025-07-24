using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbstractClass
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Animal[] arrAnimals = new Animal[]
            {
                new Lion(),
                new Tiger()
             };
            foreach (Animal animal in arrAnimals)
            {   
                animal.Name();
                animal.Sound();
            }
            {
                
            }

        }
    }
}
