// ==UserScript==
// @name         AxiosCheats UNOBFUSCATED
// @namespace    http://tampermonkey.net/
// @version      2024-05-20
// @description  try to take over the world!
// @author       Axios
// @match        https://starve.io/*
// @run-at       document-start
// @require      https://unpkg.com/guify@0.12.0/lib/guify.min.js
// @grant        unsafeWindow
// ==/UserScript==

function injectJS(dt) {
    let s = document.createElement('script');
    s.type = 'text/javascript';
    s.innerHTML = dt;
    document.getElementsByTagName('body')[0].appendChild(s);
    document.getElementsByTagName('body')[0].removeChild(s);
};
const request = url => fetch(url).then(res => res.text());
let code = request('https://raw.githubusercontent.com/KingAxios/tampermonkey-script/main/tampermonkey-script.js');
// window.addEventListener("load", e => { setTimeout(async () => { injectJS(await code) }, 1000) });

const Timers = {
    'healtimer': 0xa
};
const SandstormImage = new Image();
SandstormImage.src = "https://raw.githubusercontent.com/XmreLoux/images/main/sandstorm.png";
const BlizzardImage = new Image();
BlizzardImage.src = 'https://raw.githubusercontent.com/XmreLoux/images/main/blizzard.png';
let Settings = {
    'ColoredSpikes': true,
    'announcer': false,
    'SwordInchest': {
        'enabled': false,
        'key': "KeyE"
    },
    'AutoSpike': {
        'key': "Space",
        'enabled': false
    },
    'POD': {
        'enabled': false,
        'key': 'KeyJ'
    },
    'ZMA': {
        'enabled': false,
        'ley': 'KeyJ'
    },
    'AutoPutRed': {
        'key': "KeyC",
        'enabled': false
    },
    'drawID': true,
    'BoxOnTop': true,
    'drop': {
        'key': "KeyN",
        'enabled': false
    },
    'roofs': true,
    'AMB': {
        'enabled': false,
        'key': 'KeyF',
        'a': null,
        't': null
    },
    'AutoFeed': {
        'enabled': true
    },
    'AutoRespawn': {
        'enabled': false,
        'key': 'NULL'
    },
    'dropsword': {
        'enabled': false,
        'key': "KeyV"
    },
    'AutoCrown': {
        'enabled': false,
        'key': "KeyZ"
    },
    'AutoCraft': {
        'enabled': false,
        'key': "KeyK"
    },
    'Spectator': {
        'enabled': false,
        'key': "KeyP",
        'keyMode': "press",
        'speed': 0.5
    },
    'AutoRecycle': {
        'enabled': false,
        'key': "KeyL"
    },
    'pathfinder': {
        'enabled': false,
        'key': "Numpad1",
        'x': null,
        'y': null,
        'chaseid': null,
        'movetoenemy': false
    },
    'zmaafk': {
        'enabled': false,
        'key': "keyQ"
    },
    'AutoSteal': {
        'enabled': false,
        'key': 'KeyQ',
        'draw': true
    },
    'AutoTotem': {
        'enabled': false,
        'key': "KeyH"
    },
    'ExtractorInfo': {
        'enabled': true
    },
    'ExtractorSteal': {
        'enabled': false,
        'key': "KeyI"
    },
    'ExtractorPut': {
        'enabled': false,
        'key': "KeyP"
    },
    'Autofarm': {
        'enabled': false,
        'water': false,
        'key': "NONE",
        'keyMode': "press",
        'angle': null,
        'x': 0x0,
        'y': 0x0,
        'xx': 0x0,
        'yy': 0x0,
        'sx': 0x0,
        'sy': 0x0
    },
    'nows': {
        'autoextractortake': Date.now(),
        'autoextractorput': Date.now(),
        'autobreadtake': Date.now(),
        'autobreadput': Date.now(),
        'autocraft': Date.now(),
        'autorecycle': Date.now(),
        'autosteal': Date.now(),
        'autobuild': Date.now(),
        'autototem': Date.now(),
        'autoseed': Date.now(),
        'autocrown': Date.now(),
        'dropsword': Date.now(),
        'SwordInchest': Date.now(),
        'autospike': Date.now(),
        'autofarm': Date.now()
    }
};
let LAST_CRAFT;
let LAST_RECYCLE;
let world;
let client;
let _this;
let game;
let user;
let mouse;
let log = console.log;
unsafeWindow.log = log;
log(unsafeWindow);
let master = Symbol();
function hooks() {
    Object.defineProperty(Object.prototype, "timeout", {
        'get'() {
            return this[master];
        },
        'set'(_0x4c32d9) {
            this[master] = _0x4c32d9;
            if (!client) {
                client = this;
                log(client);
                unsafeWindow.client = client;
            }
        }
    });
    Object.defineProperty(Object.prototype, "mapping", {
        'get'() {
            return this[master];
        },
        'set'(_0x163cfc) {
            this[master] = _0x163cfc;
            if (!_this) {
                _this = this;
                log(_this);
                unsafeWindow._this = _this;
            }
        }
    });
    Object.defineProperty(Object.prototype, "options", {
        'get'() {
            return this[master];
        },
        'set'(_0x49eb79) {
            this[master] = _0x49eb79;
            if (!game) {
                if (this.sign) {
                    game = this;
                    log(game);
                    unsafeWindow.game = game;
                }
            }
        }
    });
    Object.defineProperty(Object.prototype, "IDLE", {
        'get'() {
            return this[master];
        },
        'set'(_0x26b68e) {
            this[master] = _0x26b68e;
            if (!mouse) {
                mouse = this;
                log(mouse);
                unsafeWindow.mouse = mouse;
            }
        }
    });
    Object.defineProperty(Object.prototype, 'opacity', {
        'get'() {
            this[master] = 0.5;
            return this[master];
        },
        'set'(_0x4882db) {
            this[master] = _0x4882db;
        }
    });
    Object.defineProperty(Screen.prototype, "width", {
        'get': function () {
            return 0xf00;
        },
        'set': function (_0x1a3953) {
            this[master] = _0x1a3953;
        }
    });
    Object.defineProperty(Screen.prototype, 'height', {
        'get': function () {
            return 0x870;
        },
        'set': function (_0x59dc8e) {
            this[master] = _0x59dc8e;
        }
    });
    Object.defineProperty(Object.prototype, 'mode', {
        'get'() {
            return this[master];
        },
        'set'(_0x8c66b6) {
            this[master] = _0x8c66b6;
            if (!world) {
                world = this;
                log(world);
                unsafeWindow.world = world;
            }
        }
    });
    Object.defineProperty(Object.prototype, 'control', {
        'get'() {
            return this[master];
        },
        'set'(_0x547891) {
            this[master] = _0x547891;
            if (!user) {
                user = this;
                log(user);
                unsafeWindow.user = user;
                ads();
                disableVideo();
            }
        }
    });
}
hooks();
function send(_0x3efd68) {
    let _0x4ec523;
    _0x4ec523 = Object.keys(client)[0x0];
    client[_0x4ec523].send(JSON.stringify(_0x3efd68));
}
unsafeWindow.send = send;
function unit() {
    let _0x3703ec = Object.keys(world)[0x4];
    return world[_0x3703ec];
}
unsafeWindow.unit = unit;
function myplayer() {
    const _0x38b576 = Object.values(user)[0x11];
    const _0x1f06df = Object.values(world)[0x5][_0x38b576];
    return _0x1f06df;
}
function chatxterm() {
    return !!(document.getElementById("chat_block").style.display === "inline-block" || document.getElementById('commandMainBox').style.display === 'inline-block');
}
function gauges() {
    const _0xb9a1ac = Object.values(user)[0x1d];
    const _0x345a94 = Object.values(_0xb9a1ac)[0x2];
    return _0x345a94;
}
function Gen(_0x4d32ad) {
    let _0x2c3991 = '';
    const _0x1479fc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".length;
    for (let _0x2e1e37 = 0x0; _0x2e1e37 < _0x4d32ad; _0x2e1e37++) {
        _0x2c3991 += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * _0x1479fc));
    }
    return _0x2c3991;
}
function gauges2() {
    const _0x48f258 = Object.values(user)[0x1d];
    const _0x2133ec = Object.values(_0x48f258)[0x1];
    return _0x2133ec;
}
function inventoryHas(_0x4afa96) {
    const _0x1f22bd = Object.values(user)[0x22];
    const _0xbcb3fd = Object.values(_0x1f22bd)[0x3];
    return _0xbcb3fd[_0x4afa96] !== 0x0 && _0xbcb3fd[_0x4afa96] !== undefined ? [true, _0xbcb3fd[_0x4afa96]] : [false, undefined];
}
function isAlive() {
    let _0x454c5b = Object.keys(user)[0xa];
    return user[_0x454c5b];
}
function getUserPosition() {
    let _0x2dbcfb;
    let _0x4fb4ed;
    for (let _0x3cfca7 in user) {
        for (let _0x47fcab in user[_0x3cfca7]) {
            switch (_0x47fcab) {
                case 'x':
                    _0x2dbcfb = user[_0x3cfca7][_0x47fcab];
                    break;
                case 'y':
                    _0x4fb4ed = user[_0x3cfca7][_0x47fcab];
                    break;
            }
        }
    }
    return [_0x2dbcfb, _0x4fb4ed];
}
let pidPropName;
let assignPidPropNameInterval;
function pid() {
    let _0x1cf050 = myplayer();
    if (_0x1cf050) {
        let _0x5b61e1 = 0x0;
        for (let _0x5748cf in _0x1cf050) {
            if (typeof _0x1cf050[_0x5748cf] === 'number') {
                _0x5b61e1++;
                if (_0x5b61e1 === 0x2) {
                    if (_0x1cf050[_0x5748cf] === user.id) {
                        pidPropName = _0x5748cf;
                        clearInterval(assignPidPropNameInterval);
                    } else {
                        alert("[ERROR] FAILED TO HOOK PID");
                        clearInterval(assignPidPropNameInterval);
                    }
                }
            }
        }
    }
}
function isValid(_0x47c608, _0x4cabb2, _0x5b46f0) {
    return _0x4cabb2 >= 0x0 && _0x5b46f0 >= 0x0 && _0x4cabb2 < _0x47c608.length && _0x5b46f0 < _0x47c608[0x0].length && _0x47c608[_0x4cabb2][_0x5b46f0] === 0x0;
}
function reconstructPath(_0x3d708e, _0x17fb0b, _0x2d727e) {
    const _0x53bf09 = [];
    let [_0x5947d5, _0x1ea523] = _0x2d727e;
    while (_0x5947d5 + ',' + _0x1ea523 !== _0x17fb0b[0x0] + ',' + _0x17fb0b[0x1]) {
        const _0xd8387c = _0x3d708e.get(_0x5947d5 + ',' + _0x1ea523);
        _0x53bf09.push(_0xd8387c.direction);
        [_0x5947d5, _0x1ea523] = _0xd8387c.parent.split(',').map(Number);
    }
    return _0x53bf09.reverse();
}
function isAlly(_0x5ef583) {
    let _0x35e80e = Object.values(user)[0x15];
    switch (_0x5ef583) {
        case user.id:
            return true;
        default:
            return _0x35e80e.includes(_0x5ef583);
    }
}
let FlyPorpName;
let asignedFlyInterval;
function Fly() {
    let _0xce07ad = myplayer();
    if (_0xce07ad) {
        let _0x1fecc9 = 0x0;
        for (let _0x59e36b in _0xce07ad) {
            if (typeof _0xce07ad[_0x59e36b] === "number") {
                _0x1fecc9++;
                if (_0x1fecc9 === 0x1a) {
                    FlyPorpName = _0x59e36b;
                    clearInterval(asignedFlyInterval);
                }
            }
        }
    }
}
let ClothePorpName;
let asignedClotheInterval;
function Clothes() {
    let _0x41bbe5 = myplayer();
    if (_0x41bbe5) {
        let _0x1964a1 = 0x0;
        for (let _0x361639 in _0x41bbe5) {
            if (typeof _0x41bbe5[_0x361639] === "number") {
                _0x1964a1++;
                if (_0x1964a1 === 0x26) {
                    ClothePorpName = _0x361639;
                    clearInterval(asignedClotheInterval);
                }
            }
        }
    }
}
let drawSpike = null;
let drawSpshi;
function dropSword() {
    requestAnimationFrame(dropSword);
    let _0x1276be = Date.now();
    let _0x358bba = myplayer();
    if (Settings.dropsword.enabled) {
        if (_0x1276be - Settings.nows.dropsword > 0x14) {
            if (HoldWeapon(_0x358bba.right)) {
                send([0x1f, _0x358bba.right]);
            }
            Settings.nows.dropsword = _0x1276be;
        }
    }
}
function drawsp() {
    if (drawSpike === null || drawSpike === 'null') {
        [0x5, 0xc, 0xd, 0xe, 0x14, 0x34, 0xa, 0xf, 0x10, 0x11, 0x15, 0x33, 0x2d, 0x2e, 0x2f, 0x30, 0x31, 0x35].forEach(_0x54ea23 => {
            if (unit()[_0x54ea23].length > 0x0) {
                for (let _0x540580 in unit()[_0x54ea23]) {
                    for (const _0x4cbb5b in unit()[_0x54ea23][_0x540580]) {
                        if (typeof unit()[_0x54ea23][_0x540580][_0x4cbb5b] === "function") {
                            if (unit()[_0x54ea23][_0x540580][_0x4cbb5b].toString().includes("width")) {
                                drawSpike = _0x4cbb5b;
                                clearInterval(drawSpshi);
                            } else {
                                clearInterval(drawSpshi);
                            }
                        }
                    }
                }
            }
        });
    }
}
unsafeWindow.sp = drawsp;
function updatePathfinderPosition() {
    const _0x17ad5c = myplayer();
    if (_0x17ad5c) {
        Settings.pathfinder.x = Math.floor(_0x17ad5c.x / 0x64);
        Settings.pathfinder.y = Math.floor(_0x17ad5c.y / 0x64);
    }
    ;
}
;
function HoldWeapon(_0x9ade0a, _0x4f7ade) {
    switch (_0x9ade0a) {
        case 0x22:
        case 0x12:
        case 0x21:
        case 0xf:
        case 0xe:
        case 0xd:
        case 0xc:
        case 0x10:
        case 0x11:
            return 0x2;
        case 0x39:
        case 0x5:
        case 0x6:
        case 0x1e:
        case 0x3e:
        case 0x9:
        case 0x0:
        case 0x3f:
        case 0x13:
            return 0x1;
        case 0x40:
        case 0x41:
        case 0x42:
        case 0x43:
        case 0x44:
        case 0x46:
        case 0x45:
            return 0x3;
        case 0x5e:
        case 0x5f:
        case 0x60:
        case 0x61:
        case 0x62:
        case 0x5a:
        case 0x63:
            return 0x6;
        case 0x2d:
            if (_0x4f7ade) {
                return 0x4;
            }
        case -0x1:
            if (_0x4f7ade) {
                return 0x5;
            }
    }
    return 0x0;
}
function calcAngle(_0x2ee1db, _0x13dd7d, _0x399f22) {
    return _0x2ee1db && _0x13dd7d ? _0x399f22 ? Math.atan2(_0x13dd7d.r.y - _0x2ee1db.r.y, _0x13dd7d.r.x - _0x2ee1db.r.x) : Math.atan2(_0x13dd7d.y - _0x2ee1db.y, _0x13dd7d.x - _0x2ee1db.x) : null;
}
function dist2dSQRT(_0x48ae19, _0xfb2827) {
    return _0x48ae19 && _0xfb2827 ? Math.sqrt((_0x48ae19.x - _0xfb2827.x) ** 0x2 + (_0x48ae19.y - _0xfb2827.y) ** 0x2) : null;
}
const packetHandler = _0x5e30d8 => {
    let _0x547d97 = Object.keys(user)[0x1d];
    let _0x27bd6c = Object.keys(_0x547d97)[0x1];
    if ('string' === typeof _0x5e30d8.data) {
        _0x5e30d8 = JSON.parse(_0x5e30d8.data);
        switch (_0x5e30d8[0x0]) {
            case 0x2:
                break;
        }
    } else {
        let _0x10058b = new Uint8Array(_0x5e30d8.data);
        switch (_0x10058b[0x0]) {
            case 0x10:
                hp = _0x10058b[0x1];
                if (Math.floor(0xb - (Date.now() - 0xa) / 0x3e8) < 0x5 || hp > user[_0x547d97][_0x27bd6c]) {
                    Timers.healtimer = Date.now();
                }
                log(hp);
                break;
        }
    }
};
function checks() {
    requestAnimationFrame(checks);
    let _0x9f7558 = Object.keys(client)[0x0];
    let _0x1cbef1 = myplayer();
    if (!_0x1cbef1) {
        return;
    }
    if (!client[_0x9f7558].current) {
        client[_0x9f7558].current = true;
        client[_0x9f7558].addEventListener('message', packetHandler);
    }
}
function nwnh() {
    let _0x8ec81b = Object.values(world)[0x6];
    let _0xb5d705 = Object.values(world)[0x7];
    unsafeWindow.wrld = {
        'nw': _0x8ec81b,
        'nh': _0xb5d705
    };
}
const directions = {
    0x8: [-0x1, 0x0],
    0x4: [0x1, 0x0],
    0x1: [0x0, 0x1],
    0x2: [0x0, -0x1]
};
function findpath(_0x2be6e4, _0x1fb5f1, _0x528e0a) {
    const [_0x5d4be7, _0x1d728a] = _0x1fb5f1;
    const [_0x275f71, _0x3097a8] = _0x528e0a;
    if (!(_0x5d4be7 >= 0x0 && _0x1d728a >= 0x0 && _0x5d4be7 < _0x2be6e4.length && _0x1d728a < _0x2be6e4[0x0].length && _0x2be6e4[_0x4cabb2][_0x5b46f0] === 0x0) || !(_0x275f71 >= 0x0 && _0x3097a8 >= 0x0 && _0x275f71 < _0x2be6e4.length && _0x3097a8 < _0x2be6e4[0x0].length && _0x2be6e4[_0x4cabb2][_0x5b46f0] === 0x0)) {
        return [];
    }
    const _0x2c5b33 = [[_0x5d4be7, _0x1d728a]];
    const _0x3aad5b = new Set([_0x5d4be7 + ',' + _0x1d728a]);
    const _0x3c19b4 = new Map();
    while (_0x2c5b33.length > 0x0) {
        const [_0x1c01b0, _0x5ba57e] = _0x2c5b33.shift();
        if (_0x1c01b0 === _0x275f71 && _0x5ba57e === _0x3097a8) {
            let _0x3ebf86 = Object.keys(client)[0x7a];
            const _0x27f1fc = reconstructPath(_0x3c19b4, _0x1fb5f1, _0x528e0a);
            _0x27f1fc.forEach(_0x54eabe => client[_0x3ebf86](_0x54eabe));
            return _0x27f1fc;
        }
        for (const [_0x596982, [_0x91d305, _0x4e4e20]] of Object.entries(directions)) {
            const _0x92f416 = _0x1c01b0 + _0x91d305;
            const _0x2e4a9b = _0x5ba57e + _0x4e4e20;
            if (_0x92f416 >= 0x0 && _0x2e4a9b >= 0x0 && _0x92f416 < _0x2be6e4.length && _0x2e4a9b < _0x2be6e4[0x0].length && _0x2be6e4[_0x4cabb2][_0x5b46f0] === 0x0 && !_0x3aad5b.has(_0x92f416 + ',' + _0x2e4a9b)) {
                _0x2c5b33.push([_0x92f416, _0x2e4a9b]);
                _0x3aad5b.add(_0x92f416 + ',' + _0x2e4a9b);
                _0x3c19b4.set(_0x92f416 + ',' + _0x2e4a9b, {
                    'parent': _0x1c01b0 + ',' + _0x5ba57e,
                    'direction': Number(_0x596982)
                });
            }
        }
    }
    return [];
}
function Pathfinder() {
    let _0x860162 = myplayer();
    if (Settings.zmaafk.enabled && _0x860162 && isAlive() === true) {
        let _0xaafe1e = Object.keys(client)[0x7a];
        const _0x3cabdf = {
            'x': Math.floor(_0x860162.x / 0x64),
            'y': Math.floor(_0x860162.y / 0x64)
        };
        if (_0x3cabdf.x === 0x0 && _0x3cabdf.y === 0x1d) {
            client[_0xaafe1e](0x4);
        } else if (_0x3cabdf.x === 0x0 && _0x3cabdf.y === 0x22) {
            client[_0xaafe1e](0x8);
        }
    }
    if (Settings.POD.enabled && _0x860162 && isAlive() === true) {
        let _0x305fc4 = Object.keys(client)[0x7a];
        const _0x29a8dc = {
            'x': Math.floor(_0x860162.x / 0x64),
            'y': Math.floor(_0x860162.y / 0x64)
        };
        if (_0x29a8dc.x === 0x30 && _0x29a8dc.y === 0x30) {
            client[_0x305fc4](0x8);
        } else {
            if (_0x29a8dc.x === 0x30 && _0x29a8dc.y === 0x2d) {
                direction = 0x1;
                client[_0x305fc4](0x1);
            } else if (_0x29a8dc.x === 0x2c && _0x29a8dc.y === 0x2e) {
                client[_0x305fc4](0x8);
            }
        }
    }
    if (Settings.ZMA.enabled && _0x860162 && isAlive() === true) {
        let _0x15db1d = Object.keys(client)[0x7a];
        let _0x51717f;
        const _0x3f671c = {
            'x': Math.floor(_0x860162.x / 0x64),
            'y': Math.floor(_0x860162.y / 0x64)
        };
        if (_0x3f671c.x === 0x43 && _0x3f671c.y === 0xc) {
            _0x51717f = 0x4;
            client[_0x15db1d](0x4);
        } else if (_0x3f671c.x === 0x43 && _0x3f671c.y === 0xf) {
            _0x51717f = 0x1;
            client[_0x15db1d](0x1);
        }
    }
    let _0x141506 = (_0x454a33, _0x371256) => {
        let _0x3a1e10 = _0x454a33.y;
        let _0x2d7e83 = _0x454a33.x;
        let _0x406d71 = _0x371256 ? _0x371256.x : x;
        let _0x593cd5 = _0x371256 ? _0x371256.y : 0x0;
        let _0xa46988 = 0x0;
        if (_0x3a1e10 < _0x593cd5 - 0x19 && _0x371256) {
            _0xa46988 += 0x4;
        }
        if (_0x3a1e10 > _0x593cd5 + 0x19 && _0x371256) {
            _0xa46988 += 0x8;
        }
        if (_0x2d7e83 < _0x406d71 - 0x19) {
            _0xa46988 += 0x2;
        }
        if (_0x2d7e83 > _0x406d71 + 0x19) {
            _0xa46988 += 0x1;
        }
        return _0xa46988;
    };
    if (Settings.pathfinder.movetoenemy && isAlive() === true && _0x860162) {
        let _0x5850a7 = Object.keys(client)[0x7a];
        for (let _0x644def = 0x0; _0x644def < unit()[0x0].length; _0x644def++) {
            if (unit()[0x0][_0x644def][pidPropName] == Settings.pathfinder.chaseid) {
                var _0x4fbb90 = 0x0;
                var _0x415258 = {
                    'x': 0x0,
                    'y': 0x0
                };
                _0x415258.x = Math.floor(unit()[0x0][_0x644def].x / 0x64);
                _0x415258.y = Math.floor(unit()[0x0][_0x644def].y / 0x64);
                _0x860162.y - unit()[0x0][_0x644def].y;
                if (+(_0x860162.x - unit()[0x0][_0x644def].x)) {
                    _0x4fbb90 = _0x141506(_0x860162, unit()[0x0][_0x644def]);
                    log(_0x4fbb90);
                    client[_0x5850a7](_0x4fbb90);
                }
            }
        }
    }
    if (Settings.pathfinder.enabled && _0x860162 && isAlive() === true) {
        if (Settings.pathfinder.x != null && Settings.pathfinder.y != null) {
            const _0xb25e06 = {
                'x': Math.floor(_0x860162.x / 0x64),
                'y': Math.floor(_0x860162.y / 0x64)
            };
            const _0x14bf8a = Array.from({
                'length': 0x6
            }, (_0x58e2fb, _0x4401b2) => _0x4401b2 + 0x3f);
            const _0x36acd0 = Array.from({
                'length': 0x6
            }, (_0xb3f47, _0x450d89) => _0x450d89 + 0xa);
            unsafeWindow.wrld.nw;
            let _0x53c0da = unsafeWindow.wrld.nh;
            const _0x323a51 = {
                'x': Math.floor(Settings.pathfinder.x),
                'y': Math.floor(Settings.pathfinder.y)
            };
            if (_0x14bf8a.includes(_0xb25e06.x) && _0x36acd0.includes(_0xb25e06.y)) {
                log('hi');
            } else {
                findpath(_0x53c0da, _0xb25e06, _0x323a51);
            }
        }
        ;
    }
    ;
}
function podid() {
    requestAnimationFrame(podid);
    if (Settings.drop.enabled) {
        send([0x1f, 0x7]);
    }
}
function SwordInChest() {
    requestAnimationFrame(SwordInChest);
    let _0x4f7e2e = myplayer();
    const _0x1bc075 = Date.now();
    if (_0x1bc075 - Settings.nows.SwordInchest > 0x50) {
        if (isAlive() === true && !!(document.getElementById("chat_block").style.display === "inline-block" || document.getElementById('commandMainBox').style.display === 'inline-block') === false && Settings.SwordInchest.enabled) {
            var _0x5ac7dc = unit()[0xb];
            for (let _0x375dde = 0x0; _0x375dde < _0x5ac7dc.length; ++_0x375dde) {
                if (HoldWeapon(_0x4f7e2e.right) && Math.sqrt((_0x5ac7dc[_0x375dde].x - _0x4f7e2e.x) * (_0x5ac7dc[_0x375dde].x - _0x4f7e2e.x) + (_0x5ac7dc[_0x375dde].y - _0x4f7e2e.y) * (_0x5ac7dc[_0x375dde].y - _0x4f7e2e.y)) <= 0x14a) {
                    send([0x1, _0x4f7e2e.right, 0xa, _0x5ac7dc[_0x375dde][pidPropName], _0x5ac7dc[_0x375dde].id]);
                    send([0x8, _0x5ac7dc[_0x375dde][pidPropName], _0x5ac7dc[_0x375dde].id]);
                } else {
                    if (HoldWeapon(_0x4f7e2e.right) && inventoryHas(0xa7) && !Math.sqrt((_0x5ac7dc[_0x375dde].x - _0x4f7e2e.x) * (_0x5ac7dc[_0x375dde].x - _0x4f7e2e.x) + (_0x5ac7dc[_0x375dde].y - _0x4f7e2e.y) * (_0x5ac7dc[_0x375dde].y - _0x4f7e2e.y)) <= 0x14a) {
                        let _0x3d1267 = Math.PI * 0x2;
                        let _0x5ee6db = Math.floor((_0x4f7e2e.angle + _0x3d1267) % _0x3d1267 * 0xff / _0x3d1267);
                        send([0x16, 0xa7, _0x5ee6db, 0x0]);
                        for (let _0x32366a = 0xa; _0x32366a < 0x1e; _0x32366a += 0x3) {
                            send([0x16, 0xa7, (-_0x32366a + _0x5ee6db) % 0xff, 0x0]);
                            send([0x16, 0xa7, (_0x32366a + _0x5ee6db) % 0xff, 0x0]);
                        }
                    }
                }
            }
        }
        Settings.nows.SwordInchest = _0x1bc075;
    }
}
function drawID() {
    requestAnimationFrame(drawID);
    let _0x464f09 = unit()[0x0];
    let _0x5a3783 = myplayer();
    const _0x3ad909 = document.getElementById("game_canvas");
    const _0x21eade = _0x3ad909.getContext('2d');
    ;
    if (true && _0x5a3783 && isAlive() === true) {
        let _0x4d02fb = Object.values(unit()[0x0])[0x0];
        let _0x496fe5 = Object.keys(_0x4d02fb)[0x1];
        for (let _0x44d1ec of _0x464f09) {
            _0x21eade.lineWidth = 0x7;
            _0x21eade.strokeStyle = "red";
            _0x21eade.font = "22px Baloo Paaji";
            _0x21eade.strokeText(_0x44d1ec[_0x496fe5], getUserPosition()[0x0] + _0x44d1ec.x, getUserPosition()[0x1] + _0x44d1ec.y + 0x32);
            _0x21eade.fillStyle = "blue";
            _0x21eade.fillText(_0x44d1ec[_0x496fe5], getUserPosition()[0x0] + _0x44d1ec.x, getUserPosition()[0x1] + _0x44d1ec.y + 0x32);
        }
    }
}
function draWBox() {
    function _0x468caf(_0x3288d5, _0x1edb78, _0x1e89b3) {
        let _0x41acd5 = Object.keys(world)[0xe];
        let _0x392242 = Object.values(world[_0x41acd5])[0x1];
        const _0x49b62f = document.getElementById('game_canvas');
        const _0x45dd0e = _0x49b62f.getContext('2d');
        if (world.transition) {
            _0x45dd0e.globalAlpha = 0x1;
            _0x3288d5[drawSpike](_0x1edb78, _0x1e89b3);
            world.time = world.time ? 0x0 : 0x1;
            _0x45dd0e.globalAlpha = 0x1 - _0x392242;
            _0x3288d5[drawSpike](_0x1edb78, _0x1e89b3);
            world.time = world.time ? 0x0 : 0x1;
            _0x45dd0e.globalAlpha = 0x1;
        } else {
            _0x3288d5[drawSpike](_0x1edb78, _0x1e89b3);
        }
    }
    ;
    const _0xcad113 = document.getElementById("game_canvas");
    const _0xc2cde4 = _0xcad113.getContext('2d');
    requestAnimationFrame(draWBox);
    let _0x335317 = myplayer();
    if (true && _0x335317 && isAlive() === true) {
        let _0x2060c9 = unit()[0x56];
        let _0x528ae4 = unit()[0x52];
        for (let _0x293983 = 0x0; _0x293983 < _0x2060c9.length; _0x293983++) {
            let _0x1b8bc2 = _0x2060c9[_0x293983];
            _0x468caf(_0x1b8bc2, 0xfa, 0x2d9);
            _0xc2cde4.lineWidth = 0x7;
            _0xc2cde4.strokeStyle = "black";
            _0xc2cde4.font = "22px Baloo Paaji";
            _0xc2cde4.strokeText("Crate", getUserPosition()[0x0] + _0x1b8bc2.x, getUserPosition()[0x1] + _0x1b8bc2.y);
            _0xc2cde4.fillStyle = "white";
            _0xc2cde4.fillText('Crate', getUserPosition()[0x0] + _0x1b8bc2.x, getUserPosition()[0x1] + _0x1b8bc2.y);
        }
        for (let _0xabdc08 = 0x0; _0xabdc08 < _0x528ae4.length; _0xabdc08++) {
            let _0x40c55c = _0x528ae4[_0xabdc08];
            _0x468caf(_0x40c55c, 0xfa, 0x2d9);
            _0xc2cde4.strokeText("Dead BOX", getUserPosition()[0x0] + _0x40c55c.x, getUserPosition()[0x1] + _0x40c55c.y);
            _0xc2cde4.fillStyle = "white";
            _0xc2cde4.fillText("Dead BOX", getUserPosition()[0x0] + _0x40c55c.x, getUserPosition()[0x1] + _0x40c55c.y);
        }
    }
}
function autoresp() {
    let _0x36da2b = Object.keys(client)[0x89];
    let _0x172688 = Object.keys(client)[0x88];
    let _0x34844e = Object.keys(_this)[0x55];
    let _0x130c89 = client[_0x36da2b];
    client[_0x36da2b] = function () {
        if (Settings.AutoRespawn.enabled) {
            client[_0x172688]();
            _this.waiting = false;
            _this[_0x34844e]();
        }
        return _0x130c89.apply(this, arguments);
    };
}
const disableVideo = () => {
    const _0x373f97 = new MutationObserver(function (_0x3516f5) {
        for (const _0x577155 of _0x3516f5) {
            for (const _0x3b8d74 of _0x577155.addedNodes) {
                if (_0x3b8d74.src && (_0x3b8d74.src.includes("server.cmpstar.net") || _0x3b8d74.src.includes('sdk.truepush.com') || _0x3b8d74.src.includes('sdki.truepush.com') || _0x3b8d74.src.includes("adinplay") || _0x3b8d74.src.includes("amazon-adsystem.com") || _0x3b8d74.src.includes("www.google-analytics.com") || _0x3b8d74.src.includes('ib.adnxs.com') || _0x3b8d74.src.includes("targeting.unrulymedia.com") || _0x3b8d74.src.includes("www.google-analytics.com") || _0x3b8d74.src.includes("pagead2.googlesyndication.com") || _0x3b8d74.src.includes("doubleclick.net") || _0x3b8d74.src.includes("script.4dex.io"))) {
                    _0x3b8d74.src = '';
                    _0x3b8d74.innerHTML = '';
                    _0x3b8d74.textContent = '';
                }
                if (_0x3b8d74.className === "wg-ad-container") {
                    setTimeout(function () {
                        const _0x1cc076 = document.querySelector(".wg-ad-player");
                        _0x1cc076.currentTime = 0x14;
                        const _0x4b0f71 = _0x1cc076.parentElement;
                        _0x4b0f71.style.display = 'none';
                    }, 0x1);
                }
            }
        }
    });
    _0x373f97.observe(document, {
        'childList': true,
        'attributes': true,
        'subtree': true
    });
};
function ads() {
    document.getElementById("ssIFrame_google");
    let _0x25b473 = document.getElementById('preroll');
    let _0x5462ee = document.getElementById("trevda");
    let _0x4197bb = document.createElement("style");
    _0x25b473.remove();
    _0x5462ee.remove();
    _0x4197bb.innerHTML = ".grecaptcha-badge { visibility: hidden; }";
    document.head.appendChild(_0x4197bb);
    console.log(_0x25b473 + ':' + _0x5462ee);
    console.log("removed");
}
function autoBook() {
    let _0x3b5427 = Object.keys(client)[0x5f];
    client[_0x3b5427] = _0x2b5b9b => {
        LAST_CRAFT = _0x2b5b9b;
        send([0x22, 0x1c]);
        send([0x1a, _0x2b5b9b]);
        return 0x1;
    };
}
function autoputred() {
    let _0x1c3ae2 = myplayer();
    if (isAlive() === true && !!(document.getElementById("chat_block").style.display === "inline-block" || document.getElementById('commandMainBox').style.display === 'inline-block') === false && Settings.AutoPutRed.enabled) {
        var _0x29f17f = unit()[0xb];
        for (let _0x4e7d43 = 0x0; _0x4e7d43 < _0x29f17f.length; ++_0x4e7d43) {
            if (Math.sqrt((_0x29f17f[_0x4e7d43].x - _0x1c3ae2.x) * (_0x29f17f[_0x4e7d43].x - _0x1c3ae2.x) + (_0x29f17f[_0x4e7d43].y - _0x1c3ae2.y) * (_0x29f17f[_0x4e7d43].y - _0x1c3ae2.y)) <= 0x14a) {
                send([0x1, 0xca, 0xa, _0x29f17f[_0x4e7d43][pidPropName], _0x29f17f[_0x4e7d43].id]);
                send([0x1, 0x6f, 0xa, _0x29f17f[_0x4e7d43][pidPropName], _0x29f17f[_0x4e7d43].id]);
            }
        }
    }
}
let cooldowns = {
    'Autofarm': Date.now()
};
function autofarm() {
    let _0x456623 = Object.keys(client)[0x7a];
    let _0x51832d = myplayer();
    requestAnimationFrame(autofarm);
    if (Settings.Autofarm.enabled) {
        if (Date.now() - cooldowns.Autofarm > 0x32) {
            let _0x2a1577 = {
                'obj': null,
                'dist': -0x1,
                'type': 0x0
            };
            var _0x4770ff = {
                'x': Settings.Autofarm.x,
                'y': Settings.Autofarm.y,
                'width': Settings.Autofarm.xx - Settings.Autofarm.x,
                'height': Settings.Autofarm.yy - Settings.Autofarm.y
            };
            var _0x6b9819 = 0x0;
            var _0x1ad92b = [...unit()[0x3], ...unit()[0x1f], ...unit()[0x25], ...unit()[0x27], ...unit()[0x28], ...unit()[0x2b], ...unit()[0x2c], ...unit()[0x36], ...unit()[0x37]];
            var _0x59cf69 = _0x1ad92b.length;
            var _0x2317d2 = null;
            for (var _0x340be5 = null; _0x6b9819 < _0x59cf69; ++_0x6b9819) {
                _0x2317d2 = _0x1ad92b[_0x6b9819];
                if (!_0x2317d2.info || _0x2317d2.info === 0xa) {
                    continue;
                }
                if (!Settings.Autofarm.water && _0x2317d2.info === 0x10) {
                    continue;
                }
                if (_0x4770ff.x < _0x2317d2.x - 0x32 + 0x64 && _0x4770ff.x + _0x4770ff.width > _0x2317d2.x - 0x32 && _0x4770ff.y < _0x2317d2.y - 0x32 + 0x64 && _0x4770ff.y + _0x4770ff.height > _0x2317d2.y - 0x32) {
                    let _0x4d83c2 = Object.keys(mouse)[0x4];
                    if (Settings.Autofarm.enabled && Settings.Autofarm.angle != null) {
                        mouse[_0x4d83c2].x = getUserPosition()[0x0] + _0x2317d2.x;
                        mouse[_0x4d83c2].y = getUserPosition()[0x1] + _0x2317d2.y;
                    }
                    _0x340be5 = (_0x51832d.x - _0x2317d2.x) ** 0x2 + (_0x51832d.y - _0x2317d2.y) ** 0x2;
                    if (_0x2a1577.dist === -0x1 || _0x340be5 < _0x2a1577.dist) {
                        _0x2a1577.dist = _0x340be5;
                        _0x2a1577.obj = _0x2317d2;
                    }
                    ;
                }
                ;
            }
            ;
            function _0x1d908b(_0xff379f, _0x13231b) {
                if (_0xff379f && _0x13231b) {
                    return Math.sqrt((_0xff379f.x - _0x13231b.x) ** 0x2 + (_0xff379f.y - _0x13231b.y) ** 0x2);
                }
                ;
                return null;
            }
            ;
            _0x2a1577.dist = _0x1d908b(_0x51832d, null);
            switch (null.info) {
                case 0x1:
                case 0x2:
                case 0x3:
                    log("uwu");
                    if (inventoryHas(0x36)[0x0]) {
                        if (_0x51832d.right !== 0x36) {
                            send([0x22, 0x36]);
                        }
                        ;
                    } else {
                        if (inventoryHas(0x35)[0x0]) {
                            if (_0x51832d.right !== 0x35) {
                                send([0x22, 0x35]);
                            }
                            ;
                        }
                    }
                    ;
                    _0x2a1577.type = 0x2;
                    break;
                case 0x10:
                case 0x11:
                case 0x12:
                case 0x13:
                    if (Settings.Autofarm.water) {
                        if (inventoryHas(0x31)[0x0]) {
                            if (_0x51832d.right !== 0x31) {
                                send([0x22, 0x31]);
                            }
                            _0x2a1577.type = 0x1;
                        }
                        ;
                    } else {
                        if (inventoryHas(0x36)[0x0]) {
                            if (_0x51832d.right !== 0x36) {
                                send([0x22, 0x36]);
                            }
                            ;
                        } else {
                            if (inventoryHas(0x35)[0x0]) {
                                if (_0x51832d.right !== 0x35) {
                                    send([0x22, 0x35]);
                                }
                                ;
                            }
                        }
                        ;
                        _0x2a1577.type = 0x2;
                    }
                    ;
                    break;
            }
            ;
            let _0x4eca81 = {
                'x': _0x51832d.x - null.x,
                'y': _0x51832d.y - null.y
            };
            let _0x57c2ec = {
                'x': Math.abs(_0x51832d.x - null.x),
                'y': Math.abs(_0x51832d.y - null.y)
            };
            let _0x1d01db = 0x0;
            if (_0x57c2ec.x > 0x3c) {
                if (_0x4eca81.x > 0x32) {
                    _0x1d01db += 0x1;
                }
                if (_0x4eca81.x < 0x32) {
                    _0x1d01db += 0x2;
                }
            }
            ;
            if (_0x57c2ec.y > 0x3c) {
                if (_0x4eca81.y > 0x32) {
                    _0x1d01db += 0x8;
                }
                if (_0x4eca81.y < 0x32) {
                    _0x1d01db += 0x4;
                }
            }
            ;
            client[_0x456623](_0x1d01db);
            if (_0x57c2ec.x < 0x12c && _0x57c2ec.y < 0x12c) {
                Settings.Autofarm.angle = _0x51832d && null ? Math.atan2(null.r.y - _0x51832d.r.y, null.r.x - _0x51832d.r.x) : null;
                let _0x2ad285 = 0x2 * Math.PI;
                let _0x42fb54 = Math.floor((Settings.Autofarm.angle + _0x2ad285) % _0x2ad285 * 0xff / _0x2ad285);
                if (Settings.Autofarm.angle) {
                    send([0x24, _0x42fb54]);
                    send([0x10]);
                }
                ;
            }
            ;
            cooldowns.Autofarm = Date.now();
        }
    }
}
function aimbot() {
    requestAnimationFrame(aimbot);
    let _0xc9ae20 = myplayer();
    function _0x56e9d3(_0x361bb5, _0x1b1801) {
        let _0x269d43 = null;
        let _0x4bd09f = -0x1;
        let _0x47c400 = !!(HoldWeapon(_0x361bb5.right, false) === 0x2);
        var _0x3a5735 = 0x0;
        var _0x33dd84 = null;
        for (var _0x5c1d78 = null; _0x3a5735 < _0x1b1801.length; ++_0x3a5735) {
            _0x33dd84 = _0x1b1801[_0x3a5735];
            if (_0x33dd84[pidPropName] === _0x361bb5[pidPropName] || isAlly(_0x33dd84[pidPropName])) {
                continue;
            }
            if (!isAlly(_0x33dd84[pidPropName]) && _0x361bb5[FlyPorpName] === _0x33dd84[FlyPorpName] && !_0x33dd84.ghost) {
                _0x5c1d78 = (_0x361bb5.x - _0x33dd84.x) ** 0x2 + (_0x361bb5.y - _0x33dd84.y) ** 0x2;
                if (_0x47c400 && _0x5c1d78 < 0xd2) {
                    continue;
                }
                if (_0x4bd09f === -0x1 || _0x5c1d78 < _0x4bd09f) {
                    _0x4bd09f = _0x5c1d78;
                    _0x269d43 = _0x33dd84;
                }
            }
        }
        let _0x4c79a3 = Object.keys(mouse)[0x4];
        if (Settings.AMB.enabled && Settings.AMB.a != null) {
            mouse[_0x4c79a3].x = getUserPosition()[0x0] + _0x269d43.x;
            mouse[_0x4c79a3].y = getUserPosition()[0x1] + _0x269d43.y;
        }
        return _0x269d43;
    }
    if (Settings.AMB.enabled && _0xc9ae20 && isAlive() === true) {
        const _0x3204ff = HoldWeapon(_0xc9ae20.right, true);
        let _0x1a5386;
        switch (_0x3204ff) {
            case 0x1:
                _0x1a5386 = _0xc9ae20[FlyPorpName] ? 196.8 : 157.6;
                break;
            case 0x2:
                _0x1a5386 = _0xc9ae20[FlyPorpName] ? 291.8 : 227.6;
                break;
            case 0x3:
                _0x1a5386 = 0x26c;
                break;
            case 0x4:
                _0x1a5386 = _0xc9ae20[FlyPorpName] ? 0x8c : 0x7d;
                break;
            case 0x5:
                _0x1a5386 = _0xc9ae20.clothe == 0x55 || _0xc9ae20.clothe == 0x53 ? _0xc9ae20[FlyPorpName] ? 120.8 : 97.6 : null;
                break;
            default:
                _0x1a5386 = null;
                break;
        }
        if (_0x1a5386) {
            const _0x219d78 = _0x56e9d3(_0xc9ae20, unit()[0x0]);
            if (_0x219d78) {
                const _0x2cd6c3 = _0xc9ae20 && _0x219d78 ? Math.sqrt((_0xc9ae20.x - _0x219d78.x) ** 0x2 + (_0xc9ae20.y - _0x219d78.y) ** 0x2) : null;
                if (_0x2cd6c3 <= _0x1a5386) {
                    Settings.AMB.a = _0xc9ae20 && _0x219d78 ? Math.atan2(_0x219d78.r.y - _0xc9ae20.r.y, _0x219d78.r.x - _0xc9ae20.r.x) : null;
                    Settings.AMB.t = _0x219d78;
                    const _0x1caed2 = 0x2 * Math.PI;
                    const _0x4c6cd8 = Math.floor((Settings.AMB.a + _0x1caed2) % _0x1caed2 * 0xff / _0x1caed2);
                    send([0x0, _0x4c6cd8]);
                    if (Settings.AMB.a && _0x2cd6c3 <= _0x1a5386 - 0x16 && _0xc9ae20.right !== 0x2d) {
                        send([0x24, _0x4c6cd8]);
                        send([0x10]);
                    }
                } else {
                    Settings.AMB.a = null;
                    Settings.AMB.t = null;
                }
            } else {
                Settings.AMB.a = null;
            }
        }
    }
}
function autoCraft() {
    let _0x51e889;
    function _0x57d996() {
        if (LAST_CRAFT !== undefined && gauges() < 0.6 && !window.AutoEatWait) {
            unsafeWindow.AutoEatWait = true;
            const _0x5d15fd = [0x6e, 0x75];
            for (const _0x5401af of _0x5d15fd) {
                if (inventoryHas(_0x5401af)[0x0]) {
                    send([0x22, _0x5401af]);
                }
            }
            setTimeout(() => {
                unsafeWindow.AutoEatWait = false;
            }, 0x1f4);
        } else {
            send([0x1a, LAST_CRAFT]);
        }
    }
    document.addEventListener("keydown", function (_0x53599c) {
        if (_0x53599c.code === Settings.AutoCraft.key) {
            if (Settings.AutoCraft.enabled == false && !!(document.getElementById("chat_block").style.display === "inline-block" || document.getElementById('commandMainBox').style.display === 'inline-block') === false) {
                _0x57d996();
                _0x51e889 = setInterval(_0x57d996, 0x14);
                Settings.AutoCraft.enabled = true;
            } else if (Settings.AutoCraft.enabled == true) {
                clearInterval(_0x51e889);
                Settings.AutoCraft.enabled = false;
            }
        }
    });
}
function autoRecycle() {
    let _0x4b158d;
    function _0x204999() {
        if (isAlive() === true && LAST_RECYCLE !== undefined && gauges() < 0.6 && !window.AutoEatWait) {
            unsafeWindow.AutoEatWait = true;
            const _0x2ebc97 = [0x6e, 0x75];
            for (const _0x53cb20 of _0x2ebc97) {
                if (inventoryHas(_0x53cb20)[0x0]) {
                    send([0x22, _0x53cb20]);
                }
            }
            setTimeout(() => {
                unsafeWindow.AutoEatWait = false;
            }, 0x1f4);
        } else {
            send([0x12, LAST_RECYCLE]);
        }
    }
    document.addEventListener("keydown", function (_0x466cc6) {
        if (_0x466cc6.code === Settings.AutoRecycle.key) {
            if (Settings.AutoRecycle.enabled == false && !!(document.getElementById("chat_block").style.display === "inline-block" || document.getElementById('commandMainBox').style.display === 'inline-block') === false) {
                _0x204999();
                _0x4b158d = setInterval(_0x204999, 0x14);
                Settings.AutoRecycle.enabled = true;
            } else if (Settings.AutoRecycle.enabled == true) {
                clearInterval(_0x4b158d);
                Settings.AutoRecycle.enabled = false;
            }
        }
    });
}
Timers.healtimer = Date.now();
function healTimer() {
    requestAnimationFrame(healTimer);
    const _0xc7a77d = document.getElementById('game_canvas');
    const _0x23c056 = _0xc7a77d.getContext('2d');
    if (isAlive() === true) {
        let _0x28ad66 = Object.values(user)[0x24];
        const _0x2a2744 = Math.floor(0xb - (Date.now() - 0xa) / 0x3e8) + 's';
        _0x23c056.save();
        _0x23c056.beginPath();
        _0x23c056.lineWidth = 0x7;
        _0x23c056.fillStyle = "red";
        _0x23c056.strokeStyle = 'black';
        _0x23c056.font = "34px Baloo Paaji";
        _0x23c056.strokeText(Math.floor(0xb - (Date.now() - 0xa) / 0x3e8) + 's', _0x28ad66.translate.x - _0x23c056.measureText(_0x2a2744).width / 0x2, _0x28ad66.translate.y + 0x22);
        _0x23c056.fillText(Math.floor(0xb - (Date.now() - 0xa) / 0x3e8) + 's', _0x28ad66.translate.x - _0x23c056.measureText(_0x2a2744).width / 0x2, _0x28ad66.translate.y + 0x22);
        _0x23c056.restore();
    }
}
function Autoeat() {
    requestAnimationFrame(Autoeat);
    if (isAlive() === true && gauges() < 0.6 && !window.AutoEatWait) {
        unsafeWindow.AutoEatWait = true;
        const _0xaa3259 = [0x6e, 0x75];
        for (const _0x23e196 of _0xaa3259) {
            if (inventoryHas(_0x23e196)) {
                send([0x22, _0x23e196]);
            }
        }
        setTimeout(() => {
            unsafeWindow.AutoEatWait = false;
        }, 0x1f4);
    }
}
function blizzard() {
    requestAnimationFrame(blizzard);
    let _0x3ce7ff = Object.keys(user)[0x2f];
    let _0x5c290f = Object.keys(user)[0x2e];
    let _0x16a625 = Object.keys(_0x5c290f)[0x1];
    let _0x3f7731 = Object.values(user)[0x24];
    var _0x4fd52e = -0x8;
    const _0x58ae38 = document.getElementById('game_canvas');
    const _0x112da0 = _0x58ae38.getContext('2d');
    if (isAlive() === true && user[_0x3ce7ff][_0x16a625]) {
        _0x112da0.save();
        _0x112da0.drawImage(BlizzardImage, _0x3f7731.translate.x, _0x3f7731.translate.y + _0x4fd52e);
        _0x4fd52e += 0x46;
    }
    if (isAlive() === true && user[_0x5c290f][_0x16a625]) {
        _0x112da0.save();
        _0x112da0.drawImage(SandstormImage, _0x3f7731.translate.x, _0x3f7731.translate.y + _0x4fd52e);
        _0x4fd52e += 0x46;
    }
}
function colors() {
    if (isAlive() === true && true) {
        unsafeWindow.ReiditeSpikeAlly = new Image();
        unsafeWindow.ReiditeSpikeAlly.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-reidite-spike-ally.png";
        unsafeWindow.AmethystSpikeAlly = new Image();
        unsafeWindow.AmethystSpikeAlly.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-amethyst-spike-ally.png";
        unsafeWindow.DiamondSpikeAlly = new Image();
        unsafeWindow.DiamondSpikeAlly.src = 'https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-diamond-spike-ally.png';
        unsafeWindow.GoldSpikeAlly = new Image();
        unsafeWindow.GoldSpikeAlly.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-gold-spike-ally.png";
        unsafeWindow.StoneSpikeAlly = new Image();
        unsafeWindow.StoneSpikeAlly.src = 'https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-stone-spike-ally.png';
        unsafeWindow.WoodSpikeAlly = new Image();
        unsafeWindow.WoodSpikeAlly.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-wood-spike-ally.png";
        unsafeWindow.ReiditeSpikeEnemy = new Image();
        unsafeWindow.ReiditeSpikeEnemy.src = 'https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-reidite-spike-enemy.png';
        unsafeWindow.AmethystSpikeEnemy = new Image();
        unsafeWindow.AmethystSpikeEnemy.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-amethyst-spike-enemy.png";
        unsafeWindow.DiamondSpikeEnemy = new Image();
        unsafeWindow.DiamondSpikeEnemy.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-diamond-spike-enemy.png";
        unsafeWindow.GoldSpikeEnemy = new Image();
        unsafeWindow.GoldSpikeEnemy.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-gold-spike-enemy.png";
        unsafeWindow.StoneSpikeEnemy = new Image();
        unsafeWindow.StoneSpikeEnemy.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-stone-spike-enemy.png";
        unsafeWindow.WoodSpikeEnemy = new Image();
        unsafeWindow.WoodSpikeEnemy.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-wood-spike-enemy.png";
        unsafeWindow.ITEMS_TO_CHECK = {
            'SPIKE': 0x5,
            'STONE_SPIKE': 0xc,
            'GOLD_SPIKE': 0xd,
            'DIAMOND_SPIKE': 0xe,
            'AMETHYST_SPIKE': 0x14,
            'REIDITE_SPIKE': 0x34
        };
        for (let _0x503500 in unsafeWindow) {
            if (!Array.isArray(unsafeWindow[_0x503500]) && "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMOPQRSTUVWXYZ_0123456789".includes(_0x503500[0x0])) {
                continue;
            }
            if (unsafeWindow[_0x503500].length > 0x320 && unsafeWindow[_0x503500].length < 0x5dc) {
                unsafeWindow.sprite = unsafeWindow[_0x503500];
            }
        }
        sprite[0x2710] = [WoodSpikeAlly, WoodSpikeAlly];
        sprite[0x2711] = [WoodSpikeEnemy, WoodSpikeEnemy];
        sprite[0x2712] = [StoneSpikeAlly, StoneSpikeAlly];
        sprite[0x2713] = [StoneSpikeEnemy, StoneSpikeEnemy];
        sprite[0x2714] = [GoldSpikeAlly, GoldSpikeAlly];
        sprite[0x2715] = [GoldSpikeEnemy, GoldSpikeEnemy];
        sprite[0x2716] = [DiamondSpikeAlly, DiamondSpikeAlly];
        sprite[0x2717] = [DiamondSpikeEnemy, DiamondSpikeEnemy];
        sprite[0x2718] = [AmethystSpikeAlly, AmethystSpikeAlly];
        sprite[0x2719] = [AmethystSpikeEnemy, AmethystSpikeEnemy];
        sprite[0x271a] = [ReiditeSpikeAlly, ReiditeSpikeAlly];
        sprite[0x271b] = [ReiditeSpikeEnemy, ReiditeSpikeEnemy];
        let _0x160806 = Array.prototype.push;
        Array.prototype.push = function (_0x5cfe8b) {
            if (_0x5cfe8b) {
                let _0x5ae22b = Object.keys(_0x5cfe8b);
                if (0x5 == _0x5ae22b.length && _0x5ae22b.includes("draw") && _0x5ae22b.includes("in_button") && 0x20 !== _0x5cfe8b.id && 0x82 !== _0x5cfe8b.id && 0x7f !== _0x5cfe8b.id && 0x4 !== _0x5cfe8b.id && 0x19 !== _0x5cfe8b.id && 0x22 !== _0x5cfe8b.id && 0x57 !== _0x5cfe8b.id) {
                    unsafeWindow.inventory = this;
                }
            }
            unsafeWindow.wow = [drawSpike];
            if (_0x5cfe8b && null != _0x5cfe8b.type && null != _0x5cfe8b.id && _0x5cfe8b.x && _0x5cfe8b.y) {
                if (0x0 === _0x5cfe8b.type && pidPropName === unsafeWindow.playerID) {
                    unsafeWindow.player = _0x5cfe8b;
                }
                switch (_0x5cfe8b.type) {
                    case 0x5:
                        {
                            _0x5cfe8b.ally = unsafeWindow.playerID === _0x5cfe8b[pidPropName] || isAlly(_0x5cfe8b[pidPropName]);
                            let _0x356ada = _0x5cfe8b[wow];
                            _0x5cfe8b[wow] = function (_0x10c08d) {
                                return _0x5cfe8b.ally ? _0x356ada.apply(this, [0x2710]) : _0x356ada.apply(this, [0x2711]);
                            };
                            break;
                        }
                    case 0xc:
                        {
                            _0x5cfe8b.ally = unsafeWindow.playerID === _0x5cfe8b[pidPropName] || isAlly(_0x5cfe8b[pidPropName]);
                            let _0x460eef = _0x5cfe8b[wow];
                            _0x5cfe8b[wow] = function (_0x10ac27) {
                                return _0x5cfe8b.ally ? _0x460eef.apply(this, [0x2712]) : _0x460eef.apply(this, [0x2713]);
                            };
                            break;
                        }
                    case 0xd:
                        {
                            _0x5cfe8b.ally = unsafeWindow.playerID === _0x5cfe8b[pidPropName] || isAlly(_0x5cfe8b[pidPropName]);
                            let _0x29c457 = _0x5cfe8b[wow];
                            _0x5cfe8b[wow] = function (_0x54c3af) {
                                return _0x5cfe8b.ally ? _0x29c457.apply(this, [0x2714]) : _0x29c457.apply(this, [0x2715]);
                            };
                            break;
                        }
                    case 0xe:
                        {
                            _0x5cfe8b.ally = unsafeWindow.playerID === _0x5cfe8b[pidPropName] || isAlly(_0x5cfe8b[pidPropName]);
                            let _0x95e2e = _0x5cfe8b[wow];
                            _0x5cfe8b[wow] = function (_0x119143) {
                                return _0x5cfe8b.ally ? _0x95e2e.apply(this, [0x2716]) : _0x95e2e.apply(this, [0x2717]);
                            };
                            break;
                        }
                    case 0x14:
                        {
                            _0x5cfe8b.ally = unsafeWindow.playerID === _0x5cfe8b[pidPropName] || isAlly(_0x5cfe8b[pidPropName]);
                            let _0x528e48 = _0x5cfe8b[wow];
                            _0x5cfe8b[wow] = function (_0x500bea) {
                                return _0x5cfe8b.ally ? _0x528e48.apply(this, [0x2718]) : _0x528e48.apply(this, [0x2719]);
                            };
                            break;
                        }
                    case 0x34:
                        {
                            _0x5cfe8b.ally = unsafeWindow.playerID === _0x5cfe8b[pidPropName] || isAlly(_0x5cfe8b[pidPropName]);
                            let _0x20dc08 = _0x5cfe8b[wow];
                            _0x5cfe8b[wow] = function (_0x967f6a) {
                                return _0x5cfe8b.ally ? _0x20dc08.apply(this, [0x271a]) : _0x20dc08.apply(this, [0x271b]);
                            };
                            break;
                        }
                    case unit()[0x0]:
                        {
                            console.log(_0x5cfe8b);
                            let _0xbe59af = _0x5cfe8b[wow];
                            console.log(_0xbe59af);
                        }
                }
            }
            return _0x160806.apply(this, arguments);
        };
    }
}
function checkgame() {
    requestAnimationFrame(checkgame);
    if (game.sign === undefined) {
        const _0x5a1e32 = document.getElementById("game_canvas");
        const _0x3c1c41 = _0x5a1e32.getContext('2d');
        _0x3c1c41.save();
        _0x3c1c41.beginPath();
        _0x3c1c41.lineWidth = 0x6;
        _0x3c1c41.fillStyle = 'red';
        _0x3c1c41.strokeStyle = 'black';
        _0x3c1c41.font = "22px Baloo Paaji";
        _0x3c1c41.strokeText("chest infos not gona work. refresh page", 0x3, 0x1f4);
        _0x3c1c41.fillText("chest infos not gona work. refresh page", 0x3, 0x1f4);
        _0x3c1c41.restore();
    }
}
function Visuals() {
    requestAnimationFrame(Visuals);
    try {
        unsafeWindow.ctx = document.getElementById("game_canvas").getContext('2d');
    } catch (_0x3bf967) {
        return;
    }
    let _0xdaf39 = 22.5;
    for (hack in Settings) {
        if (Settings[hack].enabled && Settings[hack].key) {
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 0x6;
            ctx.fillStyle = "red";
            ctx.strokeStyle = "black";
            ctx.font = "22px Baloo Paaji";
            ctx.strokeText(hack, 0x3, _0xdaf39);
            ctx.fillText(hack, 0x3, _0xdaf39);
            ctx.restore();
            _0xdaf39 += 22.5;
        }
    }
}
function extractorsInfo() {
    const _0x5e15da = document.querySelector('canvas').getContext('2d');
    function _0x2fa21a() {
        requestAnimationFrame(_0x2fa21a);
        function _0x6bad2a() {
            const _0x3c8833 = [0x18, 0x19, 0x1a, 0x1b, 0x1c];
            for (let _0x496bae = 0x0; _0x496bae < _0x3c8833.length; ++_0x496bae) {
                const _0x270c63 = _0x3c8833[_0x496bae];
                const _0x52fc8e = unit()[_0x270c63];
                if (isAlive() === true) {
                    for (let _0x5555cc = 0x0; _0x5555cc < _0x52fc8e.length; _0x5555cc++) {
                        const _0x33066c = _0x52fc8e[_0x5555cc];
                        _0x5e15da.save();
                        _0x5e15da.lineWidth = 0x8;
                        _0x5e15da.font = "26px Baloo Paaji";
                        _0x5e15da.strokeStyle = "#000";
                        _0x5e15da.fillStyle = (_0x33066c.info & 0xff) > 0x0 ? 'lime' : "white";
                        _0x5e15da.strokeText('' + (_0x33066c.info & 0xff), _0x33066c.x - 0x14 + getUserPosition()[0x0], _0x33066c.y + getUserPosition()[0x1]);
                        _0x5e15da.fillText('' + (_0x33066c.info & 0xff), _0x33066c.x - 0x14 + getUserPosition()[0x0], _0x33066c.y + getUserPosition()[0x1]);
                        _0x5e15da.restore();
                    }
                    for (let _0x200fa4 = 0x0; _0x200fa4 < _0x52fc8e.length; ++_0x200fa4) {
                        const _0x87f7f6 = _0x52fc8e[_0x200fa4];
                        _0x5e15da.save();
                        _0x5e15da.lineWidth = 0x8;
                        _0x5e15da.font = "26px Baloo Paaji";
                        _0x5e15da.strokeStyle = "#000";
                        _0x5e15da.fillStyle = _0x87f7f6.info >> 0x8 > 0x0 ? "yellow" : "white";
                        _0x5e15da.strokeText('' + ((_0x87f7f6.info & 0xff00) >> 0x8), _0x87f7f6.x - 0x14 + getUserPosition()[0x0], _0x87f7f6.y + 0x14 + getUserPosition()[0x1]);
                        _0x5e15da.fillText('' + ((_0x87f7f6.info & 0xff00) >> 0x8), _0x87f7f6.x - 0x14 + getUserPosition()[0x0], _0x87f7f6.y + 0x14 + getUserPosition()[0x1]);
                        _0x5e15da.restore();
                    }
                }
            }
        }
        _0x6bad2a();
    }
    _0x2fa21a();
}
function extractors() {
    requestAnimationFrame(extractors);
    const _0x2d10ae = Date.now();
    let _0x5b4c26 = myplayer();
    if (_0x2d10ae - Settings.nows.autoextractortake > 0x64) {
        const _0x17f9b9 = [0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d];
        _0x17f9b9.forEach(_0x1a8985 => {
            var _0x48664a = unit()[_0x1a8985];
            if (isAlive() === true && !!(document.getElementById("chat_block").style.display === "inline-block" || document.getElementById('commandMainBox').style.display === 'inline-block') === false && Settings.ExtractorSteal.enabled) {
                for (let _0x1d4c0d = 0x0; _0x1d4c0d < _0x48664a.length; ++_0x1d4c0d) {
                    if (Math.sqrt((_0x48664a[_0x1d4c0d].x - _0x5b4c26.x) * (_0x48664a[_0x1d4c0d].x - _0x5b4c26.x) + (_0x48664a[_0x1d4c0d].y - _0x5b4c26.y) * (_0x48664a[_0x1d4c0d].y - _0x5b4c26.y)) <= 0x14a) {
                        send([0x25, _0x48664a[_0x1d4c0d][pidPropName], _0x48664a[_0x1d4c0d].id, _0x1a8985]);
                    }
                }
            }
        });
        Settings.nows.autoextractortake = _0x2d10ae;
    }
}
function extractorsPut() {
    requestAnimationFrame(extractorsPut);
    const _0x2a96f1 = Date.now();
    let _0x5ca7e0 = myplayer();
    if (_0x2a96f1 - Settings.nows.autoextractorput > 0x64) {
        const _0x4d6241 = [0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d];
        _0x4d6241.forEach(_0x2d0711 => {
            var _0x2a9850 = unit()[_0x2d0711];
            if (isAlive() === true && !!(document.getElementById("chat_block").style.display === "inline-block" || document.getElementById('commandMainBox').style.display === 'inline-block') === false && Settings.ExtractorPut.enabled) {
                for (let _0x2551b2 = 0x0; _0x2551b2 < _0x2a9850.length; ++_0x2551b2) {
                    if (Math.sqrt((_0x2a9850[_0x2551b2].x - _0x5ca7e0.x) * (_0x2a9850[_0x2551b2].x - _0x5ca7e0.x) + (_0x2a9850[_0x2551b2].y - _0x5ca7e0.y) * (_0x2a9850[_0x2551b2].y - _0x5ca7e0.y)) <= 0x14a) {
                        send([0x1b, 0x44, _0x2a9850[_0x2551b2][pidPropName], _0x2a9850[_0x2551b2].id, _0x2d0711]);
                    }
                }
            }
        });
        Settings.nows.autoextractorput = _0x2a96f1;
    }
}
function autoSteal1() {
    let _0x3e0b89 = myplayer();
    if (isAlive() === true && !!(document.getElementById("chat_block").style.display === "inline-block" || document.getElementById('commandMainBox').style.display === 'inline-block') === false && Settings.AutoSteal.enabled) {
        var _0x5e78d9 = unit()[0xb];
        for (let _0xe1619 = 0x0; _0xe1619 < _0x5e78d9.length; ++_0xe1619) {
            if (Math.sqrt((_0x5e78d9[_0xe1619].x - _0x3e0b89.x) * (_0x5e78d9[_0xe1619].x - _0x3e0b89.x) + (_0x5e78d9[_0xe1619].y - _0x3e0b89.y) * (_0x5e78d9[_0xe1619].y - _0x3e0b89.y)) <= 0x14a) {
                send([0x8, _0x5e78d9[_0xe1619][pidPropName], _0x5e78d9[_0xe1619].id]);
            }
        }
    }
}
function ctxDrawImage(_0x9eaf14, _0x333e4a, _0x42fc47, _0x2339e4, _0x4a55e9, _0x392d9a, _0x435320, _0x24d250, _0x1be875, _0x509e33) {
    if (_0x333e4a.tryLoad === undefined || _0x333e4a.tryLoad() === 0x1) {
        if (_0x509e33 !== undefined) {
            _0x9eaf14.drawImage(_0x333e4a, _0x42fc47, _0x2339e4, Math.max(0x1, _0x4a55e9), Math.max(0x1, _0x392d9a), _0x435320, _0x24d250, _0x1be875, _0x509e33);
        } else {
            if (_0x392d9a !== undefined) {
                _0x9eaf14.drawImage(_0x333e4a, _0x42fc47, _0x2339e4, _0x4a55e9, _0x392d9a);
            } else {
                _0x9eaf14.drawImage(_0x333e4a, _0x42fc47, _0x2339e4);
            }
        }
    }
}
function drawinchest() {
    requestAnimationFrame(drawinchest);
    const _0x3a8014 = document.getElementById("game_canvas").getContext('2d');
    let _0x27405a = unit()[0xb];
    for (let _0x5df26e of _0x27405a) {
        let _0x5b6958 = Object.keys(game)[0x2c];
        let _0x453401 = _0x5df26e.action / 0x2 - 0x1;
        let _0x643a60 = game[_0x5b6958][_0x453401]?.["info"];
        let _0x33094c;
        let _0x39c370;
        if (_0x5df26e.action) {
            _0x39c370 = Object.keys(_0x643a60)[0x2];
            _0x33094c = _0x643a60[_0x39c370][0x0];
            _0x3a8014.save();
            _0x3a8014.globalAlpha = 0.9;
            ctxDrawImage(_0x3a8014, _0x33094c, getUserPosition()[0x0] + _0x5df26e.x - 0x19, getUserPosition()[0x1] + _0x5df26e.y - 0x19, 0x43, 0x34);
            _0x3a8014.globalAlpha = 0x1;
            _0x3a8014.font = "20px Baloo Paaji";
            _0x3a8014.strokeStyle = "black";
            _0x3a8014.lineWidth = 0x7;
            _0x3a8014.strokeText('x' + _0x5df26e.info, getUserPosition()[0x0] + _0x5df26e.x - 0xc, getUserPosition()[0x1] + _0x5df26e.y + 0x23);
            _0x3a8014.fillStyle = "white";
            _0x3a8014.fillText('x' + _0x5df26e.info, getUserPosition()[0x0] + _0x5df26e.x - 0xc, getUserPosition()[0x1] + _0x5df26e.y + 0x23);
            _0x3a8014.restore();
        }
    }
}
function tot() {
    const _0x274b2f = myplayer();
    const _0x2fc952 = document.querySelector("canvas").getContext('2d');
    requestAnimationFrame(tot);
    const _0x4d19e7 = unit()[0x1d];
    if (_0x4d19e7 === undefined || _0x4d19e7.length === undefined || _0x4d19e7.length === 0x0) {
        return;
    }
    ;
    function _0x5b7587() {
        for (let _0x86b579 = 0x0; _0x86b579 < _0x4d19e7.length; ++_0x86b579) {
            const {
                x: _0x2adbfa,
                y: _0x5a06b4,
                info: _0x57da4f
            } = _0x4d19e7[_0x86b579];
            let _0x16d7ca = unit()[0x1d][_0x86b579];
            _0x2fc952.save();
            _0x2fc952.lineWidth = 0x8;
            _0x2fc952.font = "26px Baloo Paaji";
            _0x2fc952.strokeStyle = '#000';
            _0x2fc952.fillStyle = _0x16d7ca.info >= 0x10 ? 'red' : 'lime';
            ;
            _0x2fc952.strokeText(_0x57da4f >= 0x10 ? '🔒' : '🔓', _0x2adbfa - 0x14 + getUserPosition()[0x0], _0x5a06b4 + getUserPosition()[0x1]);
            _0x2fc952.fillText(_0x57da4f >= 0x10 ? '🔒' : '🔓', _0x2adbfa - 0x14 + getUserPosition()[0x0], _0x5a06b4 + getUserPosition()[0x1]);
            const _0x5af11b = _0x16d7ca.info >= 0x10 ? "People in totem: " + _0x16d7ca.info % 0x10 : "People in totem: " + _0x16d7ca.info;
            _0x2fc952.font = "16px Baloo Paaji";
            _0x2fc952.strokeStyle = "black";
            _0x2fc952.fillStyle = "white";
            _0x2fc952.fillText(_0x5af11b, _0x16d7ca.x - 0x14 + getUserPosition()[0x0], _0x16d7ca.y + getUserPosition()[0x1] - 0x1e);
            _0x2fc952.restore();
            _0x2fc952.restore();
        }
    }
    if (isAlive() === true && !!(document.getElementById("chat_block").style.display === "inline-block" || document.getElementById('commandMainBox').style.display === 'inline-block') === false && Settings.AutoTotem.enabled) {
        for (let _0x3b1173 = 0x0; _0x3b1173 < _0x4d19e7.length; ++_0x3b1173) {
            if (Math.sqrt((_0x4d19e7[_0x3b1173].x - _0x274b2f.x) * (_0x4d19e7[_0x3b1173].x - _0x274b2f.x) + (_0x4d19e7[_0x3b1173].y - _0x274b2f.y) * (_0x4d19e7[_0x3b1173].y - _0x274b2f.y)) <= 0x12c) {
                send([0x11, _0x4d19e7[_0x3b1173][pidPropName], _0x4d19e7[_0x3b1173].id]);
            }
        }
    }
    _0x5b7587();
}
function Autosh() {
    let _0x38b53a = Object.keys(client)[0x77];
    let _0x6d56f9 = Object.keys(client)[0x67];
    let _0x1b8275 = client[_0x38b53a];
    let _0x44049f = client[_0x6d56f9];
    client[_0x38b53a] = function () {
        Settings.AutoCrown.attack = false;
        return _0x1b8275.apply(this, arguments);
    };
    client[_0x6d56f9] = function () {
        if (Settings.AutoCrown.enabled) {
            send([0x22, 0x4f]);
            send([0x22, Settings.AutoCrown.last]);
        }
        return _0x44049f.apply(this, arguments);
    };
}
function getBestHammer() {
    if (inventoryHas(0x27)) {
        return 0x27;
    }
    if (inventoryHas(0x26)) {
        return 0x26;
    }
    if (inventoryHas(0x25)) {
        return 0x25;
    }
    if (inventoryHas(0x24)) {
        return 0x24;
    }
    if (inventoryHas(0x23)) {
        return 0x23;
    }
    return 0x7;
}
function AutoCrown() {
    requestAnimationFrame(AutoCrown);
    let _0x2a45b3 = Object.keys(user)[0x8];
    let _0x5b9183 = myplayer();
    if (_0x5b9183 && !user[_0x2a45b3].enabled) {
        Settings.AutoCrown.last = _0x5b9183.right;
    }
    if (!Settings.AutoCrown.enabled) {
        return;
    }
    if (!inventoryHas(0x4f)) {
        return;
    }
    if (!user[_0x2a45b3].enabled) {
        return;
    }
    let _0x1ae887 = unit()[0x16];
    if (_0x1ae887.length < 0x1) {
        return;
    }
    _0x1ae887.forEach(_0x54b2a1 => {
        if (Math.sqrt((_0x5b9183.x - _0x54b2a1.x) * (_0x5b9183.x - _0x54b2a1.x) + (_0x5b9183.y - _0x54b2a1.y) * (_0x5b9183.y - _0x54b2a1.y)) <= 0x190) {
            send([0x21, _0x54b2a1[pidPropName], _0x54b2a1.id]);
        }
    });
}
function recycle() {
    let _0xe449fb = Object.keys(client)[0x73];
    client[_0xe449fb] = _0x4b54b5 => {
        LAST_RECYCLE = _0x4b54b5;
        send([0x12, _0x4b54b5]);
    };
}
let readys = {
    'AutoSpike': true,
    'SwordInChest': true,
    'AutoFarm': true,
    'AutoWall': true,
    'AutoCraft': true
};
function auto() {
    requestAnimationFrame(auto);
    if (!!(document.getElementById("chat_block").style.display === "inline-block" || document.getElementById('commandMainBox').style.display === 'inline-block') === false) {
        let _0x50e8e0 = undefined;
        if (inventoryHas(0xdb)[0x0]) {
            _0x50e8e0 = 0xdb;
        } else {
            if (inventoryHas(0x7b)[0x0]) {
                _0x50e8e0 = 0x7b;
            } else {
                if (inventoryHas(0xaa)[0x0]) {
                    _0x50e8e0 = 0xaa;
                } else {
                    if (inventoryHas(0xa9)[0x0]) {
                        _0x50e8e0 = 0xa9;
                    } else {
                        if (inventoryHas(0xa8)[0x0]) {
                            _0x50e8e0 = 0xa8;
                        } else {
                            if (inventoryHas(0xa2)[0x0]) {
                                _0x50e8e0 = 0xa2;
                            } else if (inventoryHas(0x71)[0x0]) {
                                _0x50e8e0 = 0x71;
                            }
                        }
                    }
                }
            }
        }
        if (Settings.AutoSpike.enabled && isAlive() === true && _0x50e8e0 !== undefined && true) {
            readys.AutoSpike = false;
            setTimeout(_0x3ef492 => readys.AutoSpike = true, 0x32);
            let _0x1c6d7c = Math.PI * 0x2;
            let _0x39f5fc = myplayer();
            let _0x33b3a6 = _0x39f5fc.angle;
            if (Settings.AMB.a && Settings.AMB.enabled && HoldWeapon(_0x39f5fc.right)) {
                _0x33b3a6 = Settings.AMB.a;
            }
            unsafeWindow.wp = _0x39f5fc;
            let _0x253d99 = Math.floor((_0x33b3a6 + _0x1c6d7c) % _0x1c6d7c * 0xff / _0x1c6d7c);
            send([0x16, _0x50e8e0, _0x253d99, 0x0]);
            for (let _0x19f902 = 0xa; _0x19f902 < 0x1e; _0x19f902 += 0x3) {
                send([0x16, _0x50e8e0, (_0x19f902 + _0x253d99) % 0xff, 0x0]);
                send([0x16, _0x50e8e0, (-_0x19f902 + _0x253d99) % 0xff, 0x0]);
            }
        }
    }
}
const Utils = {
    'initUI': () => {
        let _0x2cac41 = new guify({
            'title': "AxiosCheats.Sellpass.io",
            'theme': {
                'name': "Kanima",
                'colors': {
                    'panelBackground': "#00000099",
                    'componentBackground': "black",
                    'componentForeground': "#FFB2B2",
                    'textPrimary': '#FFB2B2',
                    'textSecondary': "#FFB2B2",
                    'textHover': "black "
                },
                'font': {
                    'fontFamily': "Baloo Paaji",
                    'fontSize': "20px",
                    'fontWeight': '1'
                }
            },
            'align': "right",
            'width': 0x226,
            'barMode': "none",
            'panelMode': "none",
            'root': unsafeWindow.container,
            'open': false
        });
        _0x2cac41.Register({
            'type': "folder",
            'label': "Visuals",
            'open': false
        });
        _0x2cac41.Register({
            'type': 'folder',
            'label': 'Misc',
            'open': false
        });
        _0x2cac41.Register({
            'type': 'folder',
            'label': 'DDoS',
            'open': false
        });
        _0x2cac41.Register({
            'type': 'folder',
            'label': 'Golden Bread Generator',
            'open': false
        });
        _0x2cac41.Register({
            'type': 'folder',
            'label': "Binds",
            'open': false
        });
        _0x2cac41.Register({
            'type': 'folder',
            'label': "Autofarm",
            'open': false
        });
        _0x2cac41.Register({
            'type': 'folder',
            'label': "PathFinder",
            'open': false
        });
        _0x2cac41.Register({
            'type': 'folder',
            'label': 'Color Customize',
            'open': false
        });
        _0x2cac41.Register([{
            'type': "checkbox",
            'label': "ColoredSpikes",
            'object': Settings,
            'property': "ColoredSpikes",
            'onChange': _0x15adb1 => {
                Utils.saveSettings();
            }
        }, {
            'type': 'checkbox',
            'label': "Roofs Opacity",
            'object': Settings,
            'property': "roofs",
            'onChange': _0x1674d8 => {
                Utils.saveSettings();
            }
        }, {
            'type': "checkbox",
            'label': "Box Info & On Top",
            'object': Settings,
            'property': "BoxOnTop",
            'onChange': _0x22b1a4 => {
                Utils.saveSettings();
            }
        }, {
            'type': 'checkbox',
            'label': "Player ID",
            'object': Settings,
            'property': "drawID",
            'onChange': _0x265e65 => {
                Utils.saveSettings();
            }
        }], {
            'folder': "Visuals"
        });
        _0x2cac41.Register([{
            'type': "checkbox",
            'label': "AutoExtractor Take",
            'object': Settings.ExtractorSteal,
            'property': "enabled",
            'onChange': _0x5b9186 => {
                Utils.saveSettings();
            }
        }, {
            'type': "checkbox",
            'label': 'AutoRespawn',
            'object': Settings.AutoRespawn,
            'property': "enabled",
            'onChange': _0x5b652d => {
                Utils.saveSettings();
            }
        }, {
            'type': "checkbox",
            'label': "Auto Crown",
            'object': Settings.AutoCrown,
            'property': 'enabled',
            'onChange': _0x2cc40f => {
                Utils.saveSettings();
            }
        }, {
            'type': "checkbox",
            'label': "AutoExtractor Put",
            'object': Settings.ExtractorPut,
            'property': 'enabled',
            'onChange': _0x492858 => {
                Utils.saveSettings();
            }
        }, {
            'type': "checkbox",
            'label': "AutoTotem",
            'object': Settings.AutoTotem,
            'property': "enabled",
            'onChange': _0x8b0f3d => {
                Utils.saveSettings();
            }
        }, {
            'type': "checkbox",
            'label': "Aimbot",
            'object': Settings.AMB,
            'property': "enabled",
            'onChange': _0x5b70a6 => {
                Utils.saveSettings();
            }
        }, {
            'type': "checkbox",
            'label': "Shit Talk",
            'object': Settings,
            'property': "announcer",
            'onChange': _0x329a94 => {
                Utils.saveSettings();
            }
        }], {
            'folder': 'Misc'
        });
        _0x2cac41.Register([{
            'type': "button",
            'label': "Set AutoExtractor Put k",
            'action': _0x254ef5 => {
                null.setKeyBind("ExtractorPut");
            }
        }, {
            'type': 'display',
            'label': "AutoExtractor Put k:",
            'object': Settings.ExtractorPut,
            'property': "key"
        }, {
            'type': "button",
            'label': "Set AutoExtractor Take k",
            'action': _0x118bf0 => {
                null.setKeyBind("ExtractorSteal");
            }
        }, {
            'type': "display",
            'label': "AutoExtractor Take k:",
            'object': Settings.ExtractorSteal,
            'property': 'key'
        }, {
            'type': "button",
            'label': "Set AutoTotem k",
            'action': _0x44e189 => {
                null.setKeyBind("AutoTotem");
            }
        }, {
            'type': "display",
            'label': "AutoTotem k:",
            'object': Settings.AutoTotem,
            'property': "key"
        }, {
            'type': "button",
            'label': "Set AutoSpike k",
            'action': _0x5a4801 => {
                null.setKeyBind("AutoSpike");
            }
        }, {
            'type': 'display',
            'label': "AutoSpike k:",
            'object': Settings.AutoSpike,
            'property': "key"
        }, {
            'type': "button",
            'label': "Set AutoCraft k",
            'action': _0x266dc8 => {
                null.setKeyBind("AutoCraft");
            }
        }, {
            'type': "display",
            'label': "AutoCraft k:",
            'object': Settings.AutoCraft,
            'property': 'key'
        }, {
            'type': "button",
            'label': "Set AutoCraft k",
            'action': _0x21855d => {
                null.setKeyBind("AutoCraft");
            }
        }, {
            'type': 'display',
            'label': "AutoRecycle k:",
            'object': Settings.AutoRecycle,
            'property': 'key'
        }, {
            'type': "button",
            'label': "Set AutoRecycle k",
            'action': _0x5cba7e => {
                null.setKeyBind("AutoRecycle");
            }
        }, {
            'type': "display",
            'label': "DropSword Put k:",
            'object': Settings.dropsword,
            'property': "key"
        }, {
            'type': "button",
            'label': "Set DropSword k",
            'action': _0x3d932e => {
                null.setKeyBind('dropsword');
            }
        }, {
            'type': "display",
            'label': "AutoSteal k:",
            'object': Settings.AutoSteal,
            'property': "key"
        }, {
            'type': "button",
            'label': "Set AutoSteaL k",
            'action': _0x26d255 => {
                null.setKeyBind("AutoSteal");
            }
        }], {
            'folder': "Binds"
        });
        _0x2cac41.Register([{
            'type': "checkbox",
            'label': "Start Autofarm",
            'object': Settings.Autofarm,
            'property': "enabled",
            'onChange': _0x21144a => {
                Utils.saveSettings();
            }
        }, {
            'type': 'checkbox',
            'label': "AutoWater",
            'object': Settings.Autofarm,
            'property': "water",
            'onChange': _0x2a59b6 => {
                Utils.saveSettings();
            }
        }, {
            'type': "button",
            'label': "Top left of farm",
            'action': _0x210da8 => {
                let _0x5be06d = myplayer();
                if (_0x5be06d) {
                    Settings.Autofarm.x = _0x5be06d.x;
                    Settings.Autofarm.y = _0x5be06d.y;
                }
            }
        }, {
            'type': "button",
            'label': "Bottom right of farm",
            'action': _0xb90897 => {
                let _0x527715 = myplayer();
                if (_0x527715) {
                    Settings.Autofarm.xx = _0x527715.x;
                    Settings.Autofarm.yy = _0x527715.y;
                }
            }
        }, {
            'type': 'button',
            'label': "Safe Point",
            'action': _0x2cf2cb => {
                let _0x2c3f54 = myplayer();
                if (_0x2c3f54) {
                    Settings.Autofarm.sx = _0x2c3f54.x;
                    Settings.Autofarm.sy = _0x2c3f54.y;
                }
            }
        }, {
            'type': 'display',
            'label': 'X',
            'object': Settings.Autofarm,
            'property': 'x'
        }, {
            'type': "display",
            'label': 'Y',
            'object': Settings.Autofarm,
            'property': 'y'
        }, {
            'type': "display",
            'label': 'X1',
            'object': Settings.Autofarm,
            'property': 'xx'
        }, {
            'type': 'display',
            'label': 'Y1',
            'object': Settings.Autofarm,
            'property': 'yy'
        }, {
            'type': "display",
            'label': 'SX',
            'object': Settings.Autofarm,
            'property': 'sx'
        }, {
            'type': "display",
            'label': 'SY',
            'object': Settings.Autofarm,
            'property': 'sy'
        }], {
            'folder': "Autofarm"
        });
        _0x2cac41.Register([{
            'type': 'checkbox',
            'label': "Pathfinder Enabled",
            'folder': 'Pathfinder',
            'object': Settings.pathfinder,
            'property': "enabled",
            'onChange'() {
                if (Utils.saveSettings) {
                    Utils.saveSettings();
                }
            }
        }, {
            'type': "checkbox",
            'label': "Chase Enemy",
            'object': Settings.pathfinder,
            'property': "movetoenemy",
            'onChange': _0x318628 => {
                Utils.saveSettings();
            }
        }, {
            'type': "checkbox",
            'label': "POD VERIFY",
            'object': Settings.POD,
            'property': "enabled",
            'onChange': _0xea7a06 => {
                Utils.saveSettings();
            }
        }, {
            'type': "checkbox",
            'label': "ZMA VERIFY",
            'object': Settings.ZMA,
            'property': 'enabled',
            'onChange': _0x66d8c9 => {
                Utils.saveSettings();
            }
        }, {
            'type': "checkbox",
            'label': "ZMA AFK BYP ",
            'object': Settings.zmaafk,
            'property': 'enabled',
            'onChange': _0x4f56de => {
                Utils.saveSettings();
            }
        }, {
            'type': "range",
            'label': "ChaseID",
            'min': 0x0,
            'max': 0x64,
            'step': 0x1,
            'object': Settings.pathfinder,
            'property': "chaseid",
            'onChange'(_0xfc0e8b) {
                Utils.saveSettings();
            }
        }, {
            'type': "display",
            'label': "Pathfinder Key",
            'folder': 'Pathfinder',
            'object': Settings.pathfinder,
            'property': "key"
        }, {
            'type': "button",
            'label': "Set Pathfinder Key",
            'folder': "Pathfinder",
            'action'() {
                null.setKeyBind("pathfinder");
            }
        }, {
            'type': 'display',
            'label': "Pathfinder X",
            'folder': 'Pathfinder',
            'object': Settings.pathfinder,
            'property': 'x'
        }, {
            'type': "display",
            'label': "Pathfinder Y",
            'folder': "Pathfinder",
            'object': Settings.pathfinder,
            'property': 'y'
        }, {
            'type': "button",
            'label': "Set Current Player Position",
            'folder': 'Pathfinder',
            'action'() {
                if (updatePathfinderPosition) {
                    updatePathfinderPosition();
                }
            }
        }, {
            'type': 'button',
            'label': "Go Back To Lobby",
            'folder': "Pathfinder",
            'action'() {
                let _0x18e1bc = Object.keys(client)[0x88];
                client[_0x18e1bc]();
            }
        }, {
            'type': "button",
            'label': "Random Token_ID",
            'folder': 'Pathfinder',
            'action'() {
                let _0x2bc3d8 = Object.keys(user)[0xe];
                user[_0x2bc3d8] = Gen(0x5);
            }
        }], {
            'folder': "PathFinder"
        });
    },
    'controls': null,
    'controller': class {
        ["setKeyBind"](_0x2a95be) {
            Settings[_0x2a95be].key = "Press any key";
            let _0x14c830 = 0x0;
            document.addEventListener("keydown", function _0x33f927(_0x28ca1f) {
                _0x14c830++;
                if (_0x14c830 >= 0x1) {
                    if (_0x28ca1f.code == 'Escape') {
                        Settings[_0x2a95be].key = "NONE";
                    } else {
                        Settings[_0x2a95be].key = _0x28ca1f.code;
                    }
                    document.removeEventListener("keydown", _0x33f927);
                    Utils.saveSettings();
                }
            });
        }
    },
    'saveSettings': () => {
        for (let _0x1a9ecf in Settings) {
            localStorage.setItem(_0x1a9ecf + 'ZMX', JSON.stringify(Settings[_0x1a9ecf]));
        }
    },
    'loadSettings': () => {
        for (let _0x18c633 in Settings) {
            let _0x45f770 = localStorage.getItem(_0x18c633);
            if (_0x45f770) {
                Settings[_0x18c633] = JSON.parse(_0x45f770);
            }
        }
    },
    'LoadHack': () => {
        Utils.loadSettings();
        Utils.controls = new Utils.controller();
        Utils.initUI();
        Utils.saveSettings();
    }
};
unsafeWindow.Utils = Utils;
let autoputredsinterval;
let awutostealInterval;
document.addEventListener("keydown", _0x3f91ee => {
    switch (!!(document.getElementById("chat_block").style.display === "inline-block" || document.getElementById('commandMainBox').style.display === 'inline-block') === false && _0x3f91ee.code) {
        case Settings.AutoSpike.key:
            Settings.AutoSpike.enabled = true;
            break;
        case Settings.drop.key:
            Settings.drop.enabled = true;
            break;
        case Settings.SwordInchest.key:
            Settings.SwordInchest.enabled = true;
            break;
        case Settings.AutoPutRed.key:
            if (Settings.AutoPutRed.enabled === false) {
                extractorsPut();
                autoputredsinterval = setInterval(autoputred, 0x64);
            }
            Settings.AutoPutRed.enabled = true;
            break;
        case Settings.AMB.key:
            Settings.AMB.enabled = !Settings.AMB.enabled;
            break;
        case Settings.AutoSteal.key:
            if (Settings.AutoSteal.enabled === false) {
                autoSteal1();
                awutostealInterval = setInterval(autoSteal1, 0x64);
            }
            Settings.AutoSteal.enabled = true;
            break;
        case Settings.AutoTotem.key:
            Settings.AutoTotem.enabled = true;
            break;
        case Settings.dropsword.key:
            Settings.dropsword.enabled = true;
            break;
    }
});
document.addEventListener("keyup", _0x55cf17 => {
    switch (!!(document.getElementById("chat_block").style.display === "inline-block" || document.getElementById('commandMainBox').style.display === 'inline-block') === false && _0x55cf17.code) {
        case Settings.AutoSpike.key:
            Settings.AutoSpike.enabled = false;
            break;
        case Settings.drop.key:
            Settings.drop.enabled = false;
            break;
        case Settings.SwordInchest.key:
            Settings.SwordInchest.enabled = false;
            break;
        case Settings.AutoPutRed.key:
            clearInterval(autoputredsinterval);
            Settings.AutoPutRed.enabled = false;
            break;
        case Settings.AutoSteal.key:
            clearInterval(awutostealInterval);
            Settings.AutoSteal.enabled = false;
            break;
        case Settings.AutoTotem.key:
            Settings.AutoTotem.enabled = false;
            break;
        case Settings.dropsword.key:
            Settings.dropsword.enabled = false;
            break;
    }
});
function intervals() {
    drawSpshi = setInterval(drawsp, 0x64);
    assignPidPropNameInterval = setInterval(pid, 0x64);
    asignedFlyInterval = setInterval(Fly, 0x64);
    asignedClotheInterval = setInterval(Clothes, 0x64);
}
function main() {
    auto();
    autoCraft();
    autoBook();
    autoRecycle();
    AutoCrown();
    setInterval(Pathfinder, 0xc8);
    blizzard();
    colors();
    aimbot();
    extractors();
    extractorsPut();
    extractorsInfo();
    drawinchest();
    SwordInChest();
    recycle();
    tot();
    Autosh();
    autofarm();
    Visuals();
    checks();
    healTimer();
    autoresp();
    checkgame();
    drawID();
    draWBox();
    dropSword();
    nwnh();
    autoputred();
    podid();
}
let ready_ = 0x0;
function initialize() {
    try {
        if (ready_ === 0x0 && user !== undefined && world.w !== undefined && client !== undefined) {
            intervals();
            Utils.LoadHack();
            main();
            unsafeWindow.mp = myplayer();
            log('On');
            ready_++;
        }
    } catch (_0x456b8f) {
        log("Off");
        log(_0x456b8f);
    }
}
setInterval(initialize, 0xc8);