let lootboxsinfo = {};


let x = 9;

if (x in lootboxsinfo) {
    console.log(1);
} else {
    lootboxsinfo[x] = 0;
    console.log(0);
}
if (x in lootboxsinfo) {
    console.log(1);
} else {
    lootboxsinfo[x] = 0;
    console.log(0);
}
console.log(lootboxsinfo);
