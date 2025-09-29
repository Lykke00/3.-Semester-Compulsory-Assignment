using System;
using System.Collections.Generic;

namespace dataaccess.Models;

public partial class Author
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public DateTime? Createdat { get; set; }

    public virtual ICollection<Book> Books { get; set; } = new List<Book>();
}
