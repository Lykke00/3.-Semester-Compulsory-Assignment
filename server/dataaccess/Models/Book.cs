using System;
using System.Collections.Generic;

namespace dataaccess.Models;

public partial class Book
{
    public Guid Id { get; set; }

    public string Title { get; set; } = null!;

    public int Pages { get; set; }

    public DateTime? Createdat { get; set; }

    public Guid? Genreid { get; set; }

    public virtual Genre? Genre { get; set; }

    public virtual ICollection<Author> Authors { get; set; } = new List<Author>();
}
