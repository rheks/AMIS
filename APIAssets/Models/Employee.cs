using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace APIAssets.Models
{
    [Table("Employees")]
    public class Employee
    {
        [Key]
        public string NIK { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime BirthOfDate { get; set; }
        public Gender Gender { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }

        [ForeignKey("Role")]
        public int Role_Id { get; set; }
        
        [JsonIgnore]
        public virtual Role Role { get; set; }

        [ForeignKey("Departements")]
        public int Departement_Id { get; set; }
        
        [JsonIgnore]
        public virtual Departement Departements { get; set; }
        
        [JsonIgnore]
        public virtual Departement DepartementHoD { get; set; }

        [JsonIgnore]
        public virtual User User { get; set; }
    }

    public enum Gender
    {
        Male, Female
    }
}
