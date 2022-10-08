### 使用$lookup进行多集合查询（相当于sql中的join）

文档地址: https://docs.mongodb.com/manual/reference/operator/aggregation/lookup

```
// $lookup关联查旬
    const pipeLine = [
      { $match: { name: 'Nets' } },
      {
        $lookup: {
          from: 'user',
          localField: 'players',
          foreignField: '_id',
          as: 'newPlayers',
        },
      },
    ];
    const teamWithPlayers = await teamCollection.aggregate(pipeLine).toArray();
    teamWithPlayers.forEach(t => console.log(t))
    console.log('----------------------------------------------------')
    const pipeLine2 = [
      {
        $match: { team: { $exists: true } },
      },
      {
        $lookup: {
          from: 'team',
          localField: 'team',
          foreignField: '_id',
          as: "newTeam"
        }
      }
    ];
    const playerWithTeam = await userCollection.aggregate(pipeLine2).toArray()
    playerWithTeam.forEach(p => console.log(p))
```
