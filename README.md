# metatutor

Scrape and analyze tournament and deck data from https://www.mtggoldfish.com

## Usage

``` js
npm install
```

Scrape data:
``` js
node gatherer.js
```

Print stats:
``` js
node index.js
```

## Example output

```
Fetchless Storm

mainboard
card                        total  average  decks
--------------------------  -----  -------  --------------
Baral, Chief of Compliance  328    4        82/82 (100%)
Desperate Ritual            328    4        82/82 (100%)
Gifts Ungiven               327    3.988    82/82 (100%)
Goblin Electromancer        175    2.134    82/82 (100%)
Grapeshot                   239    2.915    82/82 (100%)
Island                      189    2.305    82/82 (100%)
Manamorphose                328    4        82/82 (100%)
Past in Flames              164    2        82/82 (100%)
Pyretic Ritual              328    4        82/82 (100%)
Remand                      180    2.195    82/82 (100%)
Serum Visions               328    4        82/82 (100%)
Shivan Reef                 327    3.988    82/82 (100%)
Sleight of Hand             323    3.939    82/82 (100%)
Spirebluff Canal            328    4        82/82 (100%)
Steam Vents                 326    3.976    82/82 (100%)
Noxious Revival             81     1        81/82 (98%)
Opt                         242    2.988    81/82 (98%)
Mountain                    79     1        79/82 (96%)
Snow-Covered Island         140    1.892    74/82 (90%)
Repeal                      66     1        66/82 (80%)
Unsubstantiate              62     1        62/82 (75%)
Lightning Bolt              10     1.429    7/82 (8%)
Empty the Warrens           7      1        7/82 (8%)
Snow-Covered Mountain       3      1        3/82 (3%)
Search for Azcanta          3      1        3/82 (3%)
Blood Moon                  2      1        2/82 (2%)
Abrade                      1      1        1/82 (1%)
Echoing Truth               1      1        1/82 (1%)
Anticipate                  1      1        1/82 (1%)
Polluted Delta              2      2        1/82 (1%)
Strategic Planning          2      2        1/82 (1%)

sideboard
card                        total  average  decks
--------------------------  -----  -------  --------------
Empty the Warrens           160    1.951    82/82 (100%)
Pieces of the Puzzle        321    3.915    82/82 (100%)
Lightning Bolt              226    2.79     81/82 (98%)
Wipe Away                   77     1.013    76/82 (92%)
Shattering Spree            94     1.324    71/82 (86%)
Gigadrowse                  73     1.141    64/82 (78%)
Echoing Truth               56     1.037    54/82 (65%)
Abrade                      55     1.25     44/82 (53%)
Pyromancer Ascension        66     1.941    34/82 (41%)
Engineered Explosives       24     1.043    23/82 (28%)
Dispel                      16     1.231    13/82 (15%)
Peer Through Depths         10     1        10/82 (12%)
Search for Azcanta          12     1.714    7/82 (8%)
Chandra, Torch of Defiance  6      1        6/82 (7%)
Dismember                   7      1.167    6/82 (7%)
Blood Moon                  6      1.2      5/82 (6%)
Thing in the Ice            3      1.5      2/82 (2%)
Pyroclasm                   3      1.5      2/82 (2%)
Anger of the Gods           2      1        2/82 (2%)
Magma Spray                 1      1        1/82 (1%)
Grapeshot                   1      1        1/82 (1%)
Unsubstantiate              1      1        1/82 (1%)
Void Snare                  1      1        1/82 (1%)
Pyromancer's Swath          1      1        1/82 (1%)
Spell Pierce                3      3        1/82 (1%)
Hurkyl's Recall             1      1        1/82 (1%)
Silent Gravestone           2      2        1/82 (1%)
Ignite Memories             1      1        1/82 (1%)
Jace's Sanctum              1      1        1/82 (1%)
```

## License

MIT