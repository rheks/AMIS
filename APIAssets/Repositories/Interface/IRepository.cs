using System.Collections.Generic;

namespace APIAssets.Repositories.Interface
{
    public interface IRepository<Entity, Key> where Entity : class
    {
        IEnumerable<Entity> Read();
        Entity Read(Key key);
        int Create(Entity entity);
        int Update(Entity entity);
        int Delete(Key key);
    }
}
