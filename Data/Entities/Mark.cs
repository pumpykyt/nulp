using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace lpnu.Data.Entities
{
    public class Mark
    {
        [Key]
        public int Id { get; set; }
        public int Value { get; set; }
        public int SubjectId { get; set; }
        public string UserId { get; set; }
        public virtual Subject Subject { get; set; }
        public virtual User User { get; set; }
    }
}