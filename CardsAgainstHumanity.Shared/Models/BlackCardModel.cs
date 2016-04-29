using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CardsAgainstHumanity.Shared.Models
{
    public class BlackCardModel
    {
        public Guid BlackCardId { get; set; }
        public string RawValue { get; set; }
        public int Pick { get { return Regex.Matches(RawValue, "**").Count; } }

        public string BlankValue { get { return string.Format(FormattableValue, Enumerable.Range(0, Pick - 1).Select(k => "____")); } }

        public string FormattableValue
        {
            get
            {
                for (var i = 0; i < Pick; i++)
                {
                    var regex = new Regex(Regex.Escape("**"));
                    var fs = "{" + i + "}";
                    RawValue = regex.Replace(RawValue, fs, 1);
                }
                return RawValue;
            }
        }

    }
}
