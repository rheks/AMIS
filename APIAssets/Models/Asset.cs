using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace APIAssets.Models
{
    [Table("Assets")]
    public class Asset
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Stock { get; set; }

        [JsonIgnore]
        public virtual ICollection<BorrowAsset> BorrowAssets { get; set; }
    }
}
