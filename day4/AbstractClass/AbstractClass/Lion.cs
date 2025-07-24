using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbstractClass
{

    internal class Lion : Animal
    {
        public override void Name()
        {
            Console.WriteLine(" name is Lion");
        }
        public override void Sound()
        {
            Console.WriteLine(" sound Roar");
        }
    }
}
