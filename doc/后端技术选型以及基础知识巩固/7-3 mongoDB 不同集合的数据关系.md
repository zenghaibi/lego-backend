```
import { MongoClient, FindOptions, ObjectId, UpdateFilter } from 'mongodb';
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    const db = client.db('hello');
    const res = await db.command({ ping: 1 });
    console.log('connectd', res);
    const teamTable = db.collection('team');
    const userTable = db.collection('user');
    const lakerTeam = await teamTable.findOne({ name: 'Lakers' });
    const players = await userTable.find({ team: lakerTeam?._id }).toArray();
    console.log(players);
    const netTeam = await teamTable.findOne({ name: 'Nets' });
    const newPlayers = await userTable
      .find({ _id: { $in: netTeam?.players } })
      .toArray();
    console.log(newPlayers);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
run();

```

### 通过_id 来进行关联查询
