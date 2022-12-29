using APIAssets.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace APIAssets.ViewModels
{
    public class RegisterEmployee
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
        public string Password { get; set; }
        public User User { get; set; }
        public int Role_Id { get; set; }
        public int Departement_Id { get; set; }
    }

    public enum Gender
    {
        Male, Female
    }
}
