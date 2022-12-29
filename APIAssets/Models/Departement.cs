using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace APIAssets.Models
{
    [Table("Departements")]
    public class Departement
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [ForeignKey("EmployeeHoD")]
        public string NIK_HoD { get; set; }

        [JsonIgnore]
        public virtual Employee EmployeeHoD { get; set; }

        [JsonIgnore]
        public virtual ICollection<Employee> Employees { get; set; }
    }
}
