using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExceptionClasses
{
    internal class StringException
    {
        static void Main()
        {
            string str = "Hello World...";
            try
            {
                Console.WriteLine(str.Substring(2, 100));
            }
            catch (ArgumentOutOfRangeException e)
            {
                Console.WriteLine("String is Small as Range (2 to 100) not Possible...");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            finally
            {

            }
        }
    }
}
