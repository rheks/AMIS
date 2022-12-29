﻿using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace APIAssets.Models
{
    [Table("Borrow_Assets")]
    public class BorrowAsset
    {
        [Key]
        public string NIK { get; set; }
        [JsonIgnore]
        public virtual User Users { get; set; }
        [ForeignKey("Assets")]
        public int Asset_Id { get; set; }
        [JsonIgnore]
        public virtual Asset Assets { get; set; }
        public int Quantity { get; set; }
        public DateTime Borrowing_Time { get; set; }
        public DateTime Return_Time { get; set; }
    }
}
