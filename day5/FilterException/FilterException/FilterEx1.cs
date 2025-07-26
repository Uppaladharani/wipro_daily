using System;

namespace FilterExceptionExample
{
    public class FilterException : Exception
    {
        public FilterException(string message) : base(message)
        {
        }
    }

    internal class FilterEx1
    {
        static void FilterData(string name)
        {
            string filter = "";

            if (name.Length >= 0 && name.Length <= 3)
            {
                filter = "small";
            }
            else if (name.Length > 3 && name.Length <= 10)
            {
                filter = "medium";
            }
            else if (name.Length > 10)
            {
                filter = "good";
            }

            if (filter == "small")
            {
                throw new FilterException("small name exception occurred");
            }
            else if (filter == "medium")
            {
                throw new FilterException("medium name exception occurred");
            }
            else if (filter == "good")
            {
                throw new FilterException("good — it's not an exception...");
            }
            else
            {
                throw new FilterException("This case is not defined...");
            }
        }

        static void Main()
        {
            Console.WriteLine("Enter Name:");
            string name = Console.ReadLine();

            try
            {
                FilterData(name);
            }
            catch (FilterException e) when (e.Message.Contains("small"))
            {
                Console.WriteLine(e.Message);
            }
            catch (FilterException e) when (e.Message.Contains("medium"))
            {
                Console.WriteLine(e.Message);
            }
            catch (FilterException e) when (e.Message.Contains("good"))
            {
                Console.WriteLine(e.Message);
            }
            catch (FilterException e)
            {
                Console.WriteLine(e.Message);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}

