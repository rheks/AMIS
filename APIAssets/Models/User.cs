using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace APIAssets.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        public string NIK { get; set; }
        [JsonIgnore]
        public virtual Employee Employee { get; set; }
        public string Password { get; set; }
        [JsonIgnore]
        public virtual ICollection<BorrowAsset> BorrowAssets { get; set; }
    }
}
