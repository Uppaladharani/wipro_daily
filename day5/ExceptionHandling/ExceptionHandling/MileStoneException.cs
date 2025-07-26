using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExceptionHandling
{
    internal class MileStoneException_cs : ApplicationException
    {
        public MileStoneException_cs(string message) : base(message)
        {
        }
    }
    
 }

