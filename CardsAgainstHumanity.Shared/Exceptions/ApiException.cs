using System;

namespace CardsAgainstHumanity.Shared.Exceptions
{
    public class ApiException : Exception
    {
        public ApiException(string msg, params object[] args) : base(string.Format(msg, args))
        {
            
        }
    }
}
