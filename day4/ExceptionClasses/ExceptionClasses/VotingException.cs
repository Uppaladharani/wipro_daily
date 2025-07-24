using System;

namespace ExceptionClasses
{
    // Step 1: Make VotingException extend Exception
    public class VotingException : Exception
    {
        public VotingException(string message) : base(message)
        {
        }
    }

    // Step 2: Create a separate class for logic and Main method
    internal class Voting
    {
        public void Check(int age)
        {
            if (age < 18)
            {
                throw new VotingException("You are Not Eligible For Voting...");
            }
            Console.WriteLine("You Can Vote...");
        }
    }

    // Step 3: Use this class for execution
    internal class VotingApp
    {
        static void Main(string[] args)
        {
            int age;
            Console.WriteLine("Enter Age: ");
            age = Convert.ToInt32(Console.ReadLine());

            Voting voting = new Voting();

            try
            {
                voting.Check(age);
            }
            catch (VotingException v)
            {
                Console.WriteLine(v.Message);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}
