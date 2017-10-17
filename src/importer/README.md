NB: initial analysis; might be out of date WRT the actual implementation


Data Fields
-----------

based on [Utopia](http://kfnexus.github.io/staw-utopia/)'s
[source data](https://github.com/KFNEXUS/KFNEXUS.github.io/tree/master/staw-utopia)

             | ships | ship classes | captains | admirals | upgrades | resources | others
    ---------+-------+--------------+----------+----------+----------+-----------+--------
    id       |   ✓   |      ✓       |    ✓     |    ✓     |    ✓     |     ✓     |   ?
    type     |   ✓   |      ✓       |    ✓     |    ✓     |    ✓     |     ✓     |   ?
    name     |   ✓   |      ✓       |    ✓     |    ✓     |    ✓     |     ✓     |   ?
    classId  |   ✓   |      -       |    -     |    -     |    -     |     -     |   ?
    class    |   ✓   |      -       |    -     |    -     |    -     |     -     |   ?
    factions |   ✓   |      -       |    ✓     |    ✓     |    ✓     |     -     |   ?
    unique   |   ✓   |      -       |    ✓     |    ✓     |    ✓     |     -     |   ?
    cost     |   ✓   |      -       |    ✓     |    ✓     |    ✓     |     ✓     |   ?
    frontArc |   -   |      ✓       |    -     |    -     |    -     |     -     |   ?
    rearArc  |   -   |      ✓       |    -     |    -     |    -     |     -     |   ?
    attack   |   ✓   |      -       |    -     |    -     |    ✓²    |     -     |   ?
    agility  |   ✓   |      -       |    -     |    -     |    -     |     -     |   ?
    hull     |   ✓   |      -       |    -     |    -     |    -     |     -     |   ?
    shields  |   ✓   |      -       |    -     |    -     |    -     |     -     |   ?
    skill    |   ✓¹  |      -       |    ✓     |    ✓     |    -     |     -     |   ?
    talents  |   -   |      -       |    ✓     |    ✓     |    ✓     |     -     |   ?
    range    |   -   |      -       |    -     |    -     |    ✓²    |     -     |   ?
    actions  |   ✓   |      -       |    -     |    -     |    -     |     -     |   ?
    upgrades |   ✓   |      -       |    -     |    -     |    -     |     -     |   ?
    text     |   ✓   |      -       |    ✓     |    ✓     |    ✓     |     ✓     |   ?

¹ squadrons only
² weapons only


Models
------

                | admirals | captains | resources | ships | upgrades
       ---------+----------+----------+-----------+-------+----------
             id |    ✓     |    ✓     |     ✓     |   ✓   |    ✓
           name |    ✓     |    ✓     |     ✓     |   ✓   |    ✓
       factions |    ✓     |    ✓     |           |   ✓   |    ✓
         unique |    ✓     |    ✓     |           |   ✓   |    ✓
           cost |    ✓     |    ✓     |     ✓     |   ✓   |    ✓
         attack |          |          |           |   ✓   |    ✓
        agility |          |          |           |   ✓   |
           hull |          |          |           |   ✓   |    ✓⁴
        shields |          |          |           |   ✓   |
        actions |          |          |           |   ✓   |
       upgrades |          |          |           |   ✓   |
    description |          |          |           |   ✓   |
          class |          |          |           |   ✓   |
          skill |    ✓     |    ✓     |     ✓     |   ✓¹  |    ✓
        talents |    ✓     |    ✓     |           |       |    ✓
          range |          |    ✓     |           |       |    ✓
           arcs |          |          |           |   ✓²  |    ✓³

¹ squadrons only
² via ship class
³ weapons only
⁴ tech only
