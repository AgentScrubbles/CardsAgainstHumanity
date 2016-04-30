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
        public int Pick { get { return Regex.Matches(RawValue, "{}").Count; } }

        public string BlankValue
        {
            get
            {
                var arr = Enumerable.Range(0, Pick).Select(k => "____").ToArray();
                return string.Format(FormattableValue, arr);
            }
        }

        public string FormattableValue
        {
            get
            {
                var val = RawValue;
                for (var i = 0; i < Pick; i++)
                {
                    var regex = new Regex(Regex.Escape("{}"));
                    var fs = "{" + i + "}";
                    val = regex.Replace(val, fs, 1);
                }
                return val;
            }
        }

    }
}
