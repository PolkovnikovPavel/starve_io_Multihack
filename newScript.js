// ==UserScript==
// @name         Multihack V5
// @namespace    http://tampermonkey.net/
// @version      2025-06-29
// @description  Всё что нужно для реального пацана
// @author       setorg
// @match        https://starve.io/*
// @run-at       document-start
// @grant        unsafeWindow
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

// TODO
// Добавить счётчик поставленных предметов

// Таймер бури  ??? хз как
// Переформировать меню

// переводчик ?? хз какое api использовать


let disableVideo = () => { }

let LAST_CRAFT;

const charTotem = '🤵'
const charBred = '🍞'
const charDough = '🥣'
const charWood = '🥢'
const charWheat = '🌾'

let world;
let game;
let client;
let user;
let mouse;
let sdpfin;
let en;
let _this;
let log = console.log
let LAST_RECYCLE
let master = Symbol()
let isError = false;
const is_debug = false;

let craftImg, craftItems, craftHelperE, spanCraftTargetCount;
let craft_tree = {};



const abc = 'ABCDEFGHIJKLMNEWOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz';
function Gen(count) {
    let code = '';
    const len = abc.length;
    for (let i = 0; i < count; i++) {
        code += abc.charAt(Math.floor(Math.random() * len));
    }
    return code;
}

function ads() {
    let uwu = document.getElementById("preroll")
    let uws = document.getElementById("trevda")
    let style = document.createElement('style');

    uwu.remove()
    uws.remove()
    style.innerHTML = '.grecaptcha-badge { visibility: hidden; }';

    document.head.appendChild(style);
}

function log_debug(x) {
    const keys = Object.keys(x);
    for (let i = 0; i < keys.length; i++) {
        log(i, keys[i], x[keys[i]]);
    }
}


const originalTimeoutDescriptor = Object.getOwnPropertyDescriptor(Object.prototype, "timeout");
const originalIdleDescriptor = Object.getOwnPropertyDescriptor(Object.prototype, "IDLE");
const originalOptionsDescriptor = Object.getOwnPropertyDescriptor(Object.prototype, "options");
const originalModeDescriptor = Object.getOwnPropertyDescriptor(Object.prototype, "mode");
const originalWaitingDescriptor = Object.getOwnPropertyDescriptor(Object.prototype, "waiting");

function hooks() {
    Object.defineProperty(Object.prototype, "timeout", {
        get() {
            return this._myProperty;
        },
        set(data) {
            this._myProperty = data;
            if (!client) {
                client = this;
                console.log('client', Object.keys(client), client);
                unsafeWindow.client = client;
                setTimeout(() => {
                    if (originalTimeoutDescriptor) {
                        Object.defineProperty(Object.prototype, "timeout", originalTimeoutDescriptor);
                    } else delete Object.prototype.timeout;
                    console.log('OLD timeout');
                }, 0);
            }
        },
        configurable: true,
    });

    Object.defineProperty(Object.prototype, "IDLE", {
        get() {
            return this._myProperty;
        },
        set(data) {
            this._myProperty = data;
            if (!mouse) {
                mouse = this;
                console.log('mouse', Object.keys(mouse), mouse);
                unsafeWindow.mouse = mouse;
                setTimeout(() => {
                    if (originalIdleDescriptor) {
                        Object.defineProperty(Object.prototype, "IDLE", originalIdleDescriptor);
                    } else delete Object.prototype.IDLE;
                    console.log('OLD IDLE');
                }, 0);
            }
        },
        configurable: true,
    });

    Object.defineProperty(Object.prototype, "options", {
        get() {
            return this._myProperty;
        },
        set(data) {
            this._myProperty = data;
            if (!game && this["sign"]) {
                game = this;
                console.log('game', Object.keys(game), game);
                unsafeWindow.game = game;
            }
        },
        configurable: true,
    });

    Object.defineProperty(Screen.prototype, "width", {
        get() {
            return 3840;
        },
        set(value) {
            this._myProperty = value;
        }
    });

    Object.defineProperty(Screen.prototype, "height", {
        get() {
            return 2160;
        },
        set(value) {
            this._myProperty = value;
        }
    });

    Object.defineProperty(Object.prototype, "mode", {
        get() {
            return this._myProperty;
        },
        set(data) {
            this._myProperty = data;
            if (!world) {
                console.log('world', Object.keys(this), this);
                world = this;
                unsafeWindow.world = world;
            }
        },
        configurable: true,
    });

    Object.defineProperty(Object.prototype, "control", {
        get() {
            return this._myProperty;
        },
        set(data) {
            this._myProperty = data;
            if (!user) {
                user = this;
                console.log('user', Object.keys(user), user);
                unsafeWindow.user = user;
                user[Object.keys(user)[10]] = false; // alive
                ads();
                disableVideo();
            }
        },
        configurable: true,
    });

    Object.defineProperty(Object.prototype, "waiting", {
        get() {
            return this[master]
        },
        set(data) {
            this[master] = data;
            if (!_this) {
                _this = this;
                console.log('_this', Object.keys(_this), _this);
            }
            setTimeout(() => {
                if (originalWaitingDescriptor) {
                    Object.defineProperty(Object.prototype, "waiting", originalWaitingDescriptor);
                } else delete Object.prototype.waiting;
                console.log('OLD waiting');
            }, 0);
        },
        configurable: true
    });
}
hooks();

if (is_debug) {
    log("after hooks waiting", Object.getOwnPropertyDescriptor(Object.prototype, "waiting"));
    log("after hooks IDLE", Object.getOwnPropertyDescriptor(Object.prototype, "IDLE"));
    log("after hooks timeout", Object.getOwnPropertyDescriptor(Object.prototype, "timeout"));
    setTimeout(() => {
        console.log('after OLD waiting', Object.getOwnPropertyDescriptor(Object.prototype, "waiting"));
        console.log('after OLD IDLE', Object.getOwnPropertyDescriptor(Object.prototype, "IDLE"));
        console.log('after OLD timeout', Object.getOwnPropertyDescriptor(Object.prototype, "timeout"));
    }, 10000);
}

let craft_rules = {}


const packets = {
    speak: 5,
    Iamhere: 15,
    move: 14,
    drop: 35,
    dropall: 27,
    millPut: 37,
    millTake: 20,
    breadTake: 25,
    breadPutWood: 36,
    breadPutBatter: 1,
    extPut: 11,
    extTake: 21,
    placeBuild: 17,
    joinTotem: 12,
    angle: 10,
    attack: 19,
    stopAttack: 38,
    chestPut: 24,
    chestTake: 9,
    equip: 33,
    recycle: 31,
    craft: 13,
    buy: 22
};

let script = {
    sprites: {},
    lastHeal: undefined,
    lastHealTime: undefined,
    lastHungry: undefined,
    lastTimer: undefined,
    world: {
        fast_units: {},
        units: {},
    },
    user: {
        id: 0,
        uid: 0,
        team: {},
        cam: {
            x: 0,
            y: 0,
        },
        gauges: {
            health: 200,
            hungry: 100,
            cold: 200,
            water: 100
        },
        alive: false,
        ghost: false,
        gauges: {}

    },
    myPlayer: {
        x: 0,
        y: 0,
        ghost: false,
        angle: 0,
    }
}

disableVideo = () => {
    const _0x373f97 = new MutationObserver(function (_0x3516f5) {
        for (const _0x577155 of _0x3516f5) {
            for (const _0x3b8d74 of _0x577155['addedNodes']) {
                _0x3b8d74['src'] && (_0x3b8d74['src']["includes"]("server.cmpstar.net") || _0x3b8d74['src']["includes"]('sdk.truepush.com') || _0x3b8d74["src"]["includes"]('sdki.truepush.com') || _0x3b8d74['src']["includes"]("adinplay") || _0x3b8d74["src"]["includes"]("amazon-adsystem.com") || _0x3b8d74["src"]["includes"]("www.google-analytics.com") || _0x3b8d74["src"]['includes']('ib.adnxs.com') || _0x3b8d74['src']["includes"]("targeting.unrulymedia.com") || _0x3b8d74["src"]['includes']("www.google-analytics.com") || _0x3b8d74["src"]["includes"]("pagead2.googlesyndication.com") || _0x3b8d74['src']["includes"]("doubleclick.net") || _0x3b8d74["src"]["includes"]("script.4dex.io")) && (_0x3b8d74['src'] = '', _0x3b8d74["innerHTML"] = '', _0x3b8d74["textContent"] = ''), _0x3b8d74['className'] === "wg-ad-container" && setTimeout(function () {
                    _0x1cc076 = document["querySelector"](".wg-ad-player");
                    _0x1cc076["currentTime"] = 0x14;
                    const _0x4b0f71 = _0x1cc076['parentElement'];
                    _0x4b0f71["style"]["display"] = 'none';
                }, 0x1);
            }
        }
    });
    _0x373f97['observe'](document, {
        'childList': !![],
        'attributes': !![],
        'subtree': !![]
    });
};

function disable_exapush_popup() {
    // Удаление рекламки
    const popup = document.getElementById('exapush-popup');
    if (popup) { popup.style.display = 'none'; }
}


const SandstormImage = new Image();
SandstormImage.src = "https://raw.githubusercontent.com/XmreLoux/images/main/sandstorm.png";
const BlizzardImage = new Image();
BlizzardImage.src = "https://raw.githubusercontent.com/XmreLoux/images/main/blizzard.png";
const fly = 'ⲆⵠⲆⵠⲆᐃⲆ';
const fly2 = "\u0073\u0074\u006f\u0070\u0020\u0070\u006c\u0073";
let skins = [];
let lootboxes = [];
let scriptId;
let id_tings = 40;
OpenedNode = { e: true, node: null, a: 0.8, x: 0, y: 0, lastX: 0, lastY: 0, isPressed: false, isFocus: false, styleSheet: null, script_menu_button1: null, script_menu_button2: null }

let Ids = {
    counter: 0,
    is_set: false,
    units: 5,
    fast_units: 20,
    gauges: 61,
    uid: 18,
    team: 23,
    isAlive: 10,
    cam: 38,
    inv: 73,
    webSocket: 0,
    game_img: 63,
    blizzard: 86,
    sandstorm: 85,
    autofeed: 75,
    players_list: 4,
    turn: 134,
    movement: 135,
    block2: 30,
    back_to_lobby: 56,
    commands: 266,
}

let Keys = {
    is_set: false,
    units: 5,
    fast_units: 20,
    gauges: 61,
    uid: 18,
    team: 23,
    isAlive: 10,
    cam: 38,
    inv: 73,
    webSocket: 0,
    game_img: 63,
    blizzard: 86,
    sandstorm: 85,
    autofeed: 75,
    players_list: 4,
    turn: 156,
    movement: 157,
    block2: 30,
    back_to_lobby: 56,
    commands: 266,
}


function set_all_ids(user, world, game, mouse, client) {
    if (Ids.is_set) return true;
    if (Ids.counter < 20) { Ids.counter += 1; return false; }

    function get_fast_units(world, uid) {
        const keys = Object.keys(world);
        const foundKey = keys.find(key => {
            const value = world[key];
            if (typeof value !== "object") return false;
            return value.length && value[uid] != null && "id" in value[uid] && value[uid].id == 0 && "x" in value[uid] && "y" in value[uid];
        });

        if (foundKey) { return keys.indexOf(foundKey); }

        console.error("id of fast_units NOT FOUND! uses default = 20");
        return 20;
    }

    function get_units(world) {
        const keys = Object.keys(world);
        const foundKey = keys.find(key => {
            const value = world[key];
            return value && typeof value.length === 'number' && value.length >= 105 && value.length <= 120;
        });

        if (foundKey) { return keys.indexOf(foundKey); }

        console.error("id of units NOT FOUND! uses default = 5");
        return 5;
    }

    function get_gauges(user) {
        const keys = Object.keys(user);

        const foundKey = keys.find(key => {
            const value = user[key];
            if (!value || typeof value !== 'object') return false;
            const numbers = Object.values(value).filter(
                v => typeof v === 'number' && v >= 0 && v <= 1
            );
            return numbers.length === 6 && "c" in value;
        });

        if (foundKey) { return keys.indexOf(foundKey); }

        console.error("id of gauges NOT FOUND! uses default = 61");
        return 61;
    }

    function get_uid(user) {
        const keys = Object.keys(user);
        const uid = user.id * 1000;
        const foundKey = keys.find(key => {
            return user[key] == uid;
        });
        if (foundKey) { return keys.indexOf(foundKey); }
        console.error("id of uid NOT FOUND! uses default = 18");
        return 18;
    }

    function get_isAlive(user) {
        const keys = Object.keys(user);
        const idIndex = keys.indexOf("reconnect");
        if (idIndex !== -1 && idIndex < keys.length) { return idIndex - 1; }
        console.error("id of isAlive NOT FOUND! uses default = 10");
        return 10;
    }

    function get_team(user) {
        const keys = Object.keys(user);
        const foundKey = keys.find(key => {
            const value = user[key];
            if (!Array.isArray(value)) return false;
            return value.length === 0 || value.includes(user["id"]);
        });

        if (foundKey) { return keys.indexOf(foundKey); }

        console.error("id of team NOT FOUND! uses default = 23");
        return 23;
    }

    function get_cam(user) {
        const keys = Object.keys(user);
        const foundKey = keys.find(key => {
            const value = user[key];
            if (!value || typeof value !== 'object') return false;
            return 'x' in value && 'y' in value && 'rx' in value && 'ry' in value;
        });
        if (foundKey) { return keys.indexOf(foundKey); }
        console.error("id of cam NOT FOUND! uses default = 38");
        return 38;
    }

    function get_inv(user) {
        const keys = Object.keys(user);
        const foundKey = keys.find(key => {
            const value = user[key];
            if (!value || typeof value !== 'object') return false;
            return 'id' in value && 'max' in value && Object.values(value).filter(Array.isArray).length == 2;
        });
        if (foundKey) { return keys.indexOf(foundKey); }
        console.error("id of inv NOT FOUND! uses default = 73");
        return 73;
    }

    function get_game_img(game) {
        const keys = Object.keys(game);
        const foundKey = keys.find(key => {
            const value = game[key];
            if (!Array.isArray(value)) return false;
            return value.length > 350;
        });

        if (foundKey) { return keys.indexOf(foundKey); }

        console.error("id of game_img NOT FOUND! uses default = 63");
        return 63;
    }

    function get_sandstorm(user) {
        const keys = Object.keys(user);
        const foundKey = keys.find(key => {
            const value = user[key];
            if (!value || typeof value !== 'object') return false;
            const valueKeys = Object.keys(value);
            if (valueKeys.length !== 5) return false;
            return (
                Array.isArray(value[valueKeys[0]]) &&
                Number.isInteger(value[valueKeys[1]]) &&
                Number.isInteger(value[valueKeys[2]]) &&
                typeof value[valueKeys[3]] === 'function' &&
                typeof value[valueKeys[4]] === 'function'
            );
        });

        if (foundKey) { return keys.indexOf(foundKey); }

        console.error("id of sandstorm NOT FOUND! uses default = 85");
        return 85;
    }

    function get_autofeed(user) {
        const keys = Object.keys(user);
        const foundKey = keys.find(key => {
            const value = user[key];
            if (!value || typeof value !== 'object') return false;
            const valueKeys = Object.keys(value);
            if (valueKeys.length !== 5) return false;
            return "enabled" in value && "translate" in value;
        });

        if (foundKey) { return keys.indexOf(foundKey); }

        console.error("id of autofeed NOT FOUND! uses default = 75");
        return 75;
    }

    function get_players_list(world) {
        const keys = Object.keys(world);
        const foundKey = keys.find(key => {
            const value = world[key];
            if (!value || !Array.isArray(value)) return false;
            return value.length == 100;
        });

        if (foundKey) { return keys.indexOf(foundKey); }

        console.error("id of players_list NOT FOUND! uses default = 4");
        return 4;
    }

    function get_block2(game) {
        let recipe_craft = document.getElementById("recipe_craft");
        const keys = Object.keys(game);
        const foundKey = keys.find(key => {
            const value = game[key];
            if (!value || typeof value !== 'object') return false;
            if (!value.hasOwnProperty("button") || !value.hasOwnProperty("list")) return false;
            return value.list.id == recipe_craft;
        });

        if (foundKey) { return keys.indexOf(foundKey); }

        console.error("id of block2 NOT FOUND! uses default = 30");
        return 30;
    }

    function get_commands() {
        const keys = Object.keys(unsafeWindow);
        const foundKey = keys.find(key => {
            const value = unsafeWindow[key];
            if (!value || !Array.isArray(value)) return false;
            return value.length > 300 && value.length < 350;
        });

        if (foundKey) { return keys.indexOf(foundKey); }

        console.error("id of commands NOT FOUND! uses default = 266");
        return 266;
    }

    function get_func_back_to_lobby(client) {
        const keys = Object.keys(client);
        const foundKey = keys.find(key => {
            const value = client[key];
            if (!value || typeof client[key] != 'function') return false;
            const funcStr = client[key].toString();
            if (!funcStr.includes(Keys.commands)) return false;
            let num = funcStr.slice(funcStr.indexOf(Keys.commands) + Keys.commands.length + 1, funcStr.slice(funcStr.indexOf(Keys.commands) + Keys.commands.length + 1).indexOf(']') + funcStr.indexOf(Keys.commands) + Keys.commands.length + 1);
            return funcStr.includes('.reconnect.enabled=') && funcStr.includes('clearTimeout') && unsafeWindow[Keys.commands][num] == "close"
        });

        if (foundKey) { return keys.indexOf(foundKey); }

        console.error("id of commands NOT FOUND! uses default = 266");
        return 266;
    }

    function containsNumberInAnyBase(str, targetNumber) {
        // Создаем регулярные выражения для всех систем счисления
        const representations = [
            new RegExp(`(^|\\D)${targetNumber}(\\D|$)`, 'g'),
            // Восьмеричная система (0o... или 0...)
            new RegExp(`(^|\\D)0o${targetNumber.toString(8)}(\\D|$)`, 'gi'),
            new RegExp(`(^|\\D)0${targetNumber.toString(8)}(\\D|$)`, 'g'),
            // Шестнадцатеричная система (0x...)
            new RegExp(`(^|\\D)0x${targetNumber.toString(16)}(\\D|$)`, 'gi')
        ];

        return representations.some(regex => regex.test(str));
    }

    function get_turn(client) {
        const keys = Object.keys(client);
        const foundKey = keys.find(key => {
            const value = client[key];
            if (!value || typeof value != 'function') return false;
            const funcStr = value.toString();
            if (!funcStr.includes(Keys.webSocket)) return false;
            return funcStr.includes('Math.PI') && !funcStr.includes(';if') && funcStr.includes('.stringify([') && containsNumberInAnyBase(funcStr, packets.angle) && containsNumberInAnyBase(funcStr, 255);
        });

        if (foundKey) { return keys.indexOf(foundKey); }

        console.error("id of turn NOT FOUND! uses default = 134");
        return 134;
    }

    Ids.uid = get_uid(user); Keys.uid = Object.keys(user)[Ids.uid];
    Ids.fast_units = get_fast_units(world, user[Keys.uid]); Keys.fast_units = Object.keys(world)[Ids.fast_units];
    Ids.units = get_units(world); Keys.units = Object.keys(world)[Ids.units];
    Ids.gauges = get_gauges(user); Keys.gauges = Object.keys(user)[Ids.gauges];
    Ids.team = get_team(user); Keys.team = Object.keys(user)[Ids.team];
    Ids.isAlive = get_isAlive(user); Keys.isAlive = Object.keys(user)[Ids.isAlive];
    Ids.cam = get_cam(user); Keys.cam = Object.keys(user)[Ids.cam];
    Ids.inv = get_inv(user); Keys.inv = Object.keys(user)[Ids.inv];
    Ids.webSocket = 0; Keys.webSocket = Object.keys(client)[Ids.webSocket];
    Ids.game_img = get_game_img(game); Keys.game_img = Object.keys(game)[Ids.game_img];
    Ids.sandstorm = get_sandstorm(user); Keys.sandstorm = Object.keys(user)[Ids.sandstorm];
    Ids.blizzard = Ids.sandstorm + 1; Keys.blizzard = Object.keys(user)[Ids.blizzard];
    Ids.autofeed = get_autofeed(user); Keys.autofeed = Object.keys(user)[Ids.autofeed];
    Ids.players_list = get_players_list(world); Keys.players_list = Object.keys(world)[Ids.players_list];
    Ids.block2 = get_block2(game); Keys.block2 = Object.keys(game)[Ids.block2];
    Ids.commands = get_commands(); Keys.commands = Object.keys(unsafeWindow)[Ids.commands];
    Ids.back_to_lobby = get_func_back_to_lobby(client); Keys.back_to_lobby = Object.keys(client)[Ids.back_to_lobby];
    Ids.turn = get_turn(client); Keys.turn = Object.keys(client)[Ids.turn];
    Ids.movement = Ids.turn + 1; Keys.movement = Object.keys(client)[Ids.movement];


    Ids.is_set = true;
    Keys.is_set = true;
    log(Ids, Keys);
    log("==============");

    return true;
}

let Crafting = {
    isCraft: false,
    id: -1,
    old_count: 0,
    now: Date.now()
}

let Settings = {
    RemoveHands: { k: "ShiftLeft" },
    MainColor: 'rgb(16, 212, 68)',
    TextColor: "rgb(21, 201, 68)",
    BackgroundColor: "rgb(22, 22, 22)",
    fastOpenUI: { k: 'Insert', o: 0.8, otherO: 1 },
    miniMap: {
        e: true,
        type5: true,
        type6: false,
        o: 0.9,
    },

    menuButton: {
        isPressed: false,
        presPos: { x: 0, y: 0 },
        mosePos: { x: 0, y: 0 },
        pos: { x: 0, y: 0 }
    },

    spectator: {
        timeout: 0,
        is_back: false,
        count: 0,
        e: false,
        k: "KeyX",
        x: 0,
        y: 0,
        start_x: 0,
        start_y: 0,
        end_x: 0,
        end_y: 0,
        player: null,
        is_x: 0,
        is_y: 0,
        s: 10,
    },
    antiKick: {
        e: true,
        k: 'None',
        timeout: Date.now(),
        timeout2: 0,
        visible: true,
        dx: 0,
        dy: 0,

    },
    FPSBoost: { e: true },
    PathFinder: {
        e: false,
        k: "KeyB",
        x: 0,
        y: 0,
        autoRestart: false,
        autoDrop: true,
        dist: 150

    },
    Autofarm: {
        comand: ".",
        isDropBerries: false,
        e: false,
        k: "KeyJ",
        'water': ![],
        'keyMode': 'press',
        'angle': null,
        'x': 0x0,
        'y': 0x0,
        'xx': 0x0,
        'yy': 0x0,
        'sx': 0x0,
        'sy': 0x0
    },
    AutoIsland: {
        e: false,
        k: 'Numpad1',
        sx: 0,
        sy: 0,
    },
    dropSword: {
        k: "Numpad0",
        e: false,
    },
    AutoIce: {
        e: false,
        k: "KeyC",
    },
    AutoPutRed: {
        k: "KeyV",
        e: false,
    },
    Xray: {
        e: false,
        k: "KeyZ",
        a: 0.5,
        ready: false,
    },
    AMB: {
        e: false,
        k: "KeyF",
        a: null,
        t: null,
        off: false,
    },
    SwordInchest: {
        e: false,
        k: "KeyE",
    },
    AutoFeed: {
        e: true,
        a: 65,
    },
    AutoFeed2: {
        e: true,
        a: 65,
    },
    AutoSteal: {
        e: false,
        k: "KeyQ",
    },
    AutoTotem: {
        e: false,
        k: "KeyH"
    },
    AutoAttack: {
        e: false,
        k: "KeyY"
    },
    ExtractorInfo: {
        e: true
    },
    ExtractorSteal: {
        e: false,
        k: "KeyI"
    },
    ExtractorPut: {
        e: false,
        k: "KeyP"
    },
    AutoCrown: {
        e: false,
        k: "KeyM"
    },
    TurnOffScript: {
        e: false,
        k: "AltRight"
    },
    AutoShop: {
        wood: { e: false },
        stone: { e: false },
        gold: { e: false },
        diamond: { e: false },
        amethyst: { e: false },
        reidite: { e: false }
    },
    SkinChanger_Skin: 233,
    SkinChanger_LootBox: 220,
    AMB_V2: false,
    AMB_rotation: false,
    gaugesInfo: true,
    tracers: false,
    SandwormTracers: true,
    KrakenTracers: true,
    PlayerTracers: true,
    SpiderTracers: true,
    WolfTracers: true,
    RabbitTracers: false,
    FishTracers: true,
    VultureTracers: false,
    BabyDragonTracers: false,
    BabyLavaDragonTracers: true,
    esp: false,
    NoFog: true,
    textalert: { e: false, t: "none" },
    fps: { e: true, last: 0, count: 0, fps: 0 },
    buildinfo: true,
    machineInfo: true,
    ChestInfo: true,
    ChestInfo2: true,
    DropInChest: { id: 109, count: 255 },
    boxinfo: true,
    toteminfo: true,
    showNames: true,
    showFly: false,
    showScore: true,
    showHp: false,
    showHpPlayer: false,
    showMyHp: false,
    showHealTimer: true,
    showWeaponTimer: true,
    playerOnTop: true,
    ColoredSpikes: false,
    AutoBridge: false,
    autoRespawn: false,
    AutoSpikeMode2: false,
    AutoBreadPut: { e: false, k: "KeyM" },
    AutoBreadTake: { e: false, k: "KeyN" },
    AutoExtractorPut: { e: false, k: "KeyP" },
    AutoExtractorTake: { e: false, k: "KeyO" },
    AutoCraft: { e: false, k: "KeyK", lastcraft: -1, s: false },
    SmartCraft: { e: false, k: "Numpad2", lastcraft: -1 },
    AutoRecycle: { e: false, k: "KeyL", lastrecycle: -1, s: false },
    AutoSpike: { e: false, k: "Space", m: true, p: ["Reidite Spike", "Amethyst Spike", "Diamond Spike", "Gold Spike", "Stone Spike", "Wood Spike", "Wood Wall"] },
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
    },
    debug: {
        units_id: { e: false },
        show_items: { e: false },
        show_sprites: { e: false },
        player_action: { e: false },
    }
}


setTimeout(() => {
    let intId;
    unsafeWindow.kasdgiksadg = {
        KILLUKRSOLIDER: () => {
            if (!world || !client) return
            console.log(sdpfin, Object.keys(world).length, Object.keys(client).length);
            if (!sdpfin || Object.keys(world).length < 30 || !client || Object.keys(client).length < 30) {
                isError = true;
                Settings.textalert.t = 'Error loading script';
                Settings.textalert.e = true;
                let count_reloads = parseInt(localStorage.getItem("count_reloads"), 10);
                if (!count_reloads) { count_reloads = 0; }
                if (count_reloads < 3) {
                    location.reload();
                    localStorage.setItem("count_reloads", count_reloads + 1);
                }
                return;
            };
            localStorage.setItem("count_reloads", 0);

            clearInterval(scriptId);
            setNewUI();
            add_recipe_helper();
            Settings.textalert.e = false;
        },
        controls: null,
        controller: class {
            setKeyBind(callback) {
                Settings[callback].k = 'Press any key';
                let click = 0;
                unsafeWindow.document.addEventListener('keydown', function abc(event) {
                    click++;
                    if (click >= 1) {
                        if (event.code == "Escape") {
                            Settings[callback].k = "NONE";
                        } else {
                            Settings[callback].k = event.code;
                        };
                        unsafeWindow.document.removeEventListener('keydown', abc);
                        kasdgiksadg.saveSettings();
                    };
                });
            }
        },
        saveSettings: () => {
            for (let e in Settings) localStorage.setItem(e + "ZOV", JSON.stringify(Settings[e]))
        },
        loadSettings: () => {
            for (let e in Settings) {
                let o = localStorage.getItem(e + "ZOV");
                if (o) {
                    try {
                        Settings[e] = JSON.parse(o)
                    } catch { log(e, o) }
                } else {
                    log(e, o)
                }
            }
        },
        LoadHack: () => {
            log(unsafeWindow.document.body)
            if (!unsafeWindow.document.body) return
            log('id', intId)
            clearInterval(intId);


            document.addEventListener("keydown", (e) => {
                if (chatxterm()) return;
                if (OpenedNode.isFocus) return;
                let flag = false;
                switch (e.code) {
                    case Settings.AutoSpike.k:
                        Settings.AutoSpike.e = true;
                        flag = true
                        break;
                    case Settings.AutoSteal.k:
                        Settings.AutoSteal.e = true;
                        flag = true;
                        break;
                    case Settings.AutoTotem.k:
                        Settings.AutoTotem.e = true;
                        flag = true;
                        break;
                    case Settings.SwordInchest.k:
                        Settings.SwordInchest.e = true;
                        flag = true;
                        break;
                    case Settings.Xray.k:
                        Settings.Xray.e = true;
                        XrayOn();
                        flag = true;
                        break;
                    case Settings.dropSword.k:
                        Settings.dropSword.e = true;
                        flag = true;
                        break;
                    case Settings.AutoExtractorPut.k:
                        Settings.AutoExtractorPut.e = !Settings.AutoExtractorPut.e
                        flag = true;
                        break;
                    case Settings.AutoExtractorTake.k:
                        Settings.AutoExtractorTake.e = !Settings.AutoExtractorTake.e
                        flag = true;
                        break;
                    case Settings.AMB.k:
                        Settings.AMB.e = !Settings.AMB.e
                        Settings.AMB.off = false;
                        flag = true;
                        break;
                    case Settings.AutoBreadTake.k:
                        Settings.AutoBreadTake.e = !Settings.AutoBreadTake.e;
                        flag = true;
                        break;
                    case Settings.AutoBreadPut.k:
                        Settings.AutoBreadPut.e = !Settings.AutoBreadPut.e
                        flag = true;
                        break;
                    case Settings.spectator.k:
                        if (Settings.spectator.e) {
                            Settings.spectator.end_x = Settings.spectator.x
                            Settings.spectator.end_y = Settings.spectator.y
                            Settings.spectator.timeout = Date.now()
                            Settings.spectator.is_back = true
                        } else {
                            Settings.spectator.x = user[Keys.cam].x
                            Settings.spectator.y = user[Keys.cam].y
                            Settings.spectator.start_x = user[Keys.cam].x
                            Settings.spectator.start_y = user[Keys.cam].y
                            Settings.spectator.is_back = false
                        }
                        Settings.spectator.e = !Settings.spectator.e
                        flag = true;
                        break;
                    case Settings.AutoIce.k:
                        Settings.AutoIce.e = !Settings.AutoIce.e
                        flag = true;
                        break;
                    case Settings.AutoAttack.k:
                        Settings.AutoAttack.e = !Settings.AutoAttack.e
                        flag = true;
                        break;
                    case Settings.Autofarm.k:
                        Settings.Autofarm.e = !Settings.Autofarm.e
                        flag = true;
                        break;
                    case Settings.PathFinder.k:
                        Settings.PathFinder.e = !Settings.PathFinder.e
                        flag = true;
                        break;
                    case Settings.SmartCraft.k:
                        reCalculateCraftTree();
                        Settings.SmartCraft.e = !Settings.SmartCraft.e;
                        if (Settings.SmartCraft.e) Crafting.now = 0;
                        flag = true;
                        break;
                    case Settings.TurnOffScript.k:
                        Settings.TurnOffScript.e = !Settings.TurnOffScript.e
                        if (Settings.TurnOffScript.e) turnOff();
                        if (!Settings.TurnOffScript.e) turnOn();
                        break;
                    case Settings.fastOpenUI.k:
                        if (!OpenedNode.e) {
                            OpenedNode.node.script_menu.style.display = 'inline-block';
                            OpenedNode.e = true;
                        } else {
                            OpenedNode.node.script_menu.style.display = 'none';
                            OpenedNode.e = false;
                        }
                        break;
                    case Settings.RemoveHands.k:
                        console.log("ShiftLeft");
                        send([packets.equip, 7])
                        Settings.AMB.off = true;
                        break
                    case "ArrowRight":
                        id_tings += 1;
                        console.log(id_tings);
                        break
                    case "ArrowLeft":
                        id_tings -= 1;
                        console.log(id_tings);
                        break
                    case "ArrowUp":
                        // DEBUG
                        log('client', Object.keys(client), client);
                        log('_this', Object.keys(_this), _this);
                        log('mouse', Object.keys(mouse), mouse);
                        log('game', Object.keys(game), game);
                        log('world', Object.keys(world), world);
                        log('user', Object.keys(user), user);

                        log_debug(unsafeWindow);

                        break
                    case "KeyW":
                        Settings.spectator.is_y = 1;
                        break
                    case "KeyS":
                        Settings.spectator.is_y = -1;
                        break
                    case "KeyA":
                        Settings.spectator.is_x = 1;
                        break
                    case "KeyD":
                        Settings.spectator.is_x = -1;
                        break
                }
                if (flag) {
                    if (OpenedNode.e) {
                        OpenedNode.node.openFolder(OpenedNode.node);
                    }
                }
            });

            document.addEventListener("keyup", (e) => {
                if (chatxterm()) return;
                if (OpenedNode.isFocus) return;
                let flag = false;
                switch (e.code) {
                    case Settings.AutoSpike.k:
                        Settings.AutoSpike.e = false;
                        flag = true;
                        break;
                    case Settings.AutoSteal.k:
                        Settings.AutoSteal.e = false;
                        flag = true;
                        break;
                    case Settings.AutoTotem.k:
                        Settings.AutoTotem.e = false;
                        flag = true;
                        break;
                    case Settings.SwordInchest.k:
                        Settings.SwordInchest.e = false;
                        flag = true;
                        break;
                    case Settings.Xray.k:
                        Settings.Xray.e = false;
                        XrayOff();
                        flag = true;
                        break;
                    case Settings.dropSword.k:
                        Settings.dropSword.e = false;
                        flag = true;
                        break;
                    case Settings.AutoCraft.k:
                        Settings.AutoCraft.e = !Settings.AutoCraft.e;
                        flag = true;
                        break;
                    case Settings.AutoRecycle.k:
                        Settings.AutoRecycle.e = !Settings.AutoRecycle.e;
                        flag = true;
                        break;
                    case "KeyW":
                        if (Settings.spectator.is_y > 0) Settings.spectator.is_y = 0
                        break
                    case "KeyS":
                        if (Settings.spectator.is_y < 0) Settings.spectator.is_y = 0
                        break
                    case "KeyA":
                        if (Settings.spectator.is_x > 0) Settings.spectator.is_x = 0
                        break
                    case "KeyD":
                        if (Settings.spectator.is_x < 0) Settings.spectator.is_x = 0
                        break
                }
                if (flag) {
                    if (OpenedNode.e) {
                        OpenedNode.node.openFolder(OpenedNode.node);
                    }
                }
            });
            for (let i = 0; i < 236; i++) {
                if (i <= 222) {
                    lootboxes.push("LootBox: " + i);
                }
                skins.push("Skin: " + i);
            }
            kasdgiksadg.loadSettings();
            Settings.textalert.t = ''
            Settings.textalert.e = false
            Settings.Xray.e = false;
            Settings.spectator.e = false;
            Settings.TurnOffScript.e = false;
            Settings.SmartCraft.e = false;
            Settings.PathFinder.e = false; Settings.PathFinder.dist = 130;
            Settings.spectator.timeout = 0; Settings.spectator.is_back = false; Settings.spectator.count = 0; Settings.spectator.x = 0; Settings.spectator.y = 0; Settings.spectator.start_x = 0; Settings.spectator.start_y = 0; Settings.spectator.end_x = 0; Settings.spectator.end_y = 0; Settings.spectator.player = null;

            Settings.Autofarm['x'] = 0; Settings.Autofarm['y'] = 0; Settings.Autofarm['xx'] = 0; Settings.Autofarm['yy'] = 0; Settings.Autofarm['sx'] = 0; Settings.Autofarm['sy'] = 0;

            console.log('Settings', Settings);

            kasdgiksadg.controls = new kasdgiksadg.controller();
            createMiniMap()
            scriptId = setInterval(kasdgiksadg.KILLUKRSOLIDER, 50)
        },
    };

    intId = setInterval(kasdgiksadg.LoadHack, 100)
}, 500);


document.addEventListener("visibilitychange", function () {
    Settings.antiKick.visible = document.visibilityState === 'visible';
    Settings.antiKick.timeout = Date.now();
});



//////////////////////////////////////////////////////////////////////////////


class Field {
    constructor(data) {
        this.data = data;
    }

    toHtmlDiv(mode) {
        const div = document.createElement('div');
        div.textContent = this.data.label;
        div.className = this.data.type;

        div.id = this.data.label;

        const obj = document.createElement('div');
        switch (this.data.type) {
            case 'display':
                if (this.data.object) {
                    if (this.data.object[this.data.property]) {
                        obj.textContent = this.data.object[this.data.property];
                    }
                }

                obj.style.marginLeft = '20px';
                obj.style.textAlign = 'left';
                break;
            case 'range':
                const rangeInput = document.createElement('input');
                rangeInput.type = 'range';
                rangeInput.min = this.data.min;
                rangeInput.max = this.data.max;
                rangeInput.step = this.data.step;
                rangeInput.value = this.data.object[this.data.property];

                rangeInput.style.cursor = 'pointer';
                rangeInput.style.outline = 'none';
                rangeInput.style.height = '13px';
                rangeInput.style.borderRadius = '10px';

                const numberInput = document.createElement('input');
                numberInput.type = 'number';
                numberInput.min = this.data.min;
                numberInput.max = this.data.max;
                numberInput.step = this.data.step;
                numberInput.value = this.data.object[this.data.property];

                numberInput.style.width = '70px';
                numberInput.style.borderRadius = '10px';
                numberInput.style.border = '3px solid #513810';
                numberInput.style.textAlign = 'center';
                numberInput.style.fontSize = '20px';
                numberInput.style.fontFamily = "Baloo Paaji";
                numberInput.style.marginLeft = '20px';
                numberInput.style.backgroundColor = '#3A2A0D';
                numberInput.style.color = '#fff';


                rangeInput.addEventListener('input', this.rangeHandler.bind(null, this));
                rangeInput.addEventListener('input', function () {
                    numberInput.value = rangeInput.value;
                });

                numberInput.addEventListener('input', function () {
                    rangeInput.value = numberInput.value;
                });
                numberInput.addEventListener('input', this.rangeHandler.bind(null, this));


                obj.appendChild(rangeInput)
                obj.appendChild(numberInput)
                this.rangeInput = rangeInput;
                break;
            case 'text':
                let input = document.createElement("input");
                input.type = 'text';
                input.value = this.data.object[this.data.property];

                input.style.width = "220px";
                input.style.height = "35px";
                input.style.padding = "5px";
                input.style.border = '3px solid #513810';
                input.style.borderRadius = "10px";
                input.style.fontSize = "20px";
                input.style.fontFamily = "Baloo Paaji";
                input.style.marginBottom = "6px";
                input.style.backgroundColor = '#3A2A0D';
                input.style.color = '#fff';
                input.style.marginLeft = '15px'

                input.addEventListener('input', this.inputHandler.bind(null, this));

                input.addEventListener('focus', () => { OpenedNode.isFocus = true; })
                input.addEventListener('blur', () => { OpenedNode.isFocus = false; OpenedNode.node.openFolder(OpenedNode.node); })

                this.textInput = input;
                obj.appendChild(input);

                break;
            case 'button':
                obj.style.marginLeft = '20px';
                obj.style.marginRight = '0px';
                obj.style.textAlign = 'center';
                obj.className = 'quit';
                if (this.data.label2) {
                    obj.textContent = this.data.label2;
                } else {
                    obj.textContent = this.data.label;
                }

                obj.addEventListener('click', this.clickHandler.bind(null, this));
                break;

            case 'setkey':
                obj.style.marginLeft = '20px';
                obj.style.marginRight = '0px';
                obj.style.textAlign = 'center';
                obj.className = 'quit';
                obj.textContent = this.data.object[this.data.property]
                obj.addEventListener('click', this.clickHandler.bind(null, this));
                break;


            case 'checkbox':
                obj.id = 'agree_opt';
                obj.style.top = 'auto';
                obj.style.left = 'auto';
                obj.style.marginLeft = '20px';
                obj.style.height = '30px';
                obj.style.width = '30px';
                obj.style.position = 'relative';


                const img = document.createElement('img');
                img.src = './img/agree.png'
                img.style.width = '30px'
                img.style.height = '30px'

                if (this.data.object[this.data.property]) {
                    img.style = "display: inline-block;"
                } else {
                    img.style = "display: none;"
                }

                obj.appendChild(img);
                obj.addEventListener('click', this.clickHandler.bind(null, this));
                this.img = img;
                break;

            default:
                break;
        }
        this.obj = obj;

        const table = document.createElement('table');
        table.style.width = '80%';
        table.style.tableLayout = 'fixed';
        table.style.borderCollapse = 'collapse';
        table.style.margin = 'auto';
        table.style.fontSize = '20px';
        table.style.color = '#FFFFFF'

        const row = document.createElement('tr');

        const td1 = document.createElement('td');
        td1.style.width = '60%';
        td1.style.textAlign = 'left';
        td1.style.verticalAlign = 'middle';
        td1.appendChild(div);


        const td2 = document.createElement('td');
        td2.style.width = '70%';
        td2.style.textAlign = 'right';
        td2.style.verticalAlign = 'middle';
        td2.appendChild(obj);



        row.appendChild(td1);
        row.appendChild(td2);

        table.appendChild(row);


        return table;
    }

    inputHandler(field, event) {
        switch (field.data.type) {
            case 'text':
                field.data.object[field.data.property] = field.textInput.value;
                log(field.data.property, field.textInput.value)
                if (field.data.onChange) {
                    field.data.onChange()
                }
                break;

            default:
                break;
        }
    }

    rangeHandler(field, event) {
        switch (field.data.type) {
            case 'range':
                field.data.object[field.data.property] = parseFloat(field.rangeInput.value);
                if (field.data.onChange) {
                    field.data.onChange()
                }
                break;

            default:
                break;
        }
    }

    clickHandler(field, event) {
        switch (field.data.type) {
            case 'checkbox':
                if (field.data.object[field.data.property]) {
                    field.img.style = "display: none;"
                } else {
                    field.img.style = "display: inline-block;"
                }
                field.data.object[field.data.property] = !field.data.object[field.data.property]
                if (field.data.onChange) {
                    field.data.onChange()
                }
                break;
            case 'button':
                if (field.data.action) {
                    field.data.action()
                }
                // OpenedNode.node.openFolder(OpenedNode.node);
                break;
            case 'setkey':
                if (field.data.action) {
                    field.data.action()
                }
                field.obj.textContent = field.data.object[field.data.property]
                let click = 0;
                unsafeWindow.document.addEventListener('keydown', function abc(event) {
                    click++;
                    if (click >= 1) {
                        if (event.code == "Escape") {
                            field.obj.textContent = "NONE";
                        } else {
                            field.obj.textContent = event.code;
                        };
                        unsafeWindow.document.removeEventListener('keydown', abc);
                    };
                });
                break;

            default:
                break;
        }
    }

}


class TreeNode {
    constructor(name, parent = null, script_menu = null) {
        this.parent = parent;
        this.script_menu = script_menu;
        this.name = name;
        this.children = [];
        this.clickHandler = null;
        if (parent) {
            parent.addChild(this)
        }
    }

    addChild(childNode) {
        this.children.push(childNode);
    }

    setClickHandler(handler) {
        this.clickHandler = handler;
    }

    openFolder(node, event) {
        OpenedNode.node = node;
        node.script_menu.replaceChildren();
        node.script_menu.appendChild(node.toHtmlDiv());
    }

    toHtmlDiv(mode = 0) {
        const div = document.createElement('div');

        if (mode === 0) {
            div.className = 'script_menu';
            div.id = 'script_menu';

            div.style.left = document.getElementById('game_body').offsetWidth / 2 - 275 + 'px';
            div.style.top = '50%';
            div.style.left = '50%';
            div.style.transform = 'translate(-50%, -50%)';
            div.style.display = 'inline-block';
            div.style.zIndex = '9999';
            if (OpenedNode.x > 0 & OpenedNode.y > 0) {
                div.style.left = OpenedNode.x + 'px'
                div.style.top = OpenedNode.y + 'px'
            }

            const title = document.createElement('h3');
            title.textContent = this.name;
            div.appendChild(title);

            this.children.forEach(child => {
                const childDiv = child.toHtmlDiv(1);
                div.appendChild(childDiv);
            });

            const quit = document.createElement('div');
            quit.id = 'quit_opt';
            quit.className = 'quit';
            quit.style.marginRight = '36%';
            if (this.parent) {
                quit.innerText = 'BACK';
            } else {
                quit.innerText = 'QUIT';
            }

            quit.addEventListener('click', () => {
                if (this.parent) {
                    this.script_menu.replaceChildren();
                    this.script_menu.appendChild(this.parent.toHtmlDiv());
                    OpenedNode.node = this.parent;
                } else {
                    this.script_menu.style.display = 'none';
                    OpenedNode.e = false;
                }
            });


            div.appendChild(quit);
        } else {
            div.id = this.name;
            div.className = 'quit';
            div.style.width = '80%';
            div.style.marginLeft = '10%';
            div.style.marginBottom = '15px';
            div.style.height = '33px';
            div.style.float = 'none';
            div.innerText = this.name;

            div.addEventListener('click', this.openFolder.bind(null, this));
        }

        return div;
    }
}

const script_menu = document.createElement('div');
script_menu.id = 'main_menu_script'

function setNewUI() {
    const root = new TreeNode('Script menu', null, script_menu);
    const Visuals = new TreeNode('Visual', root, script_menu);
    const Misc = new TreeNode('Misc', root, script_menu);
    const AutoSpike = new TreeNode('Auto Spike', root, script_menu);
    const AutoCraft_Recycle = new TreeNode('AutoCraft & AutoRecycle', root, script_menu);
    const AutoFarm = new TreeNode('Auto Farm', Misc, script_menu);
    const Bind = new TreeNode('Bind', root, script_menu);
    const PathFinder = new TreeNode('Path Finder', root, script_menu);
    const Drop_in_Chest = new TreeNode('Drop in chest', root, script_menu);
    const TokenSetter = new TreeNode('Token setter', root, script_menu);
    const Debug = new TreeNode('Debug', root, script_menu);
    const Aimbot = new TreeNode('Aimbot', Misc, script_menu);
    const Shop = new TreeNode('Shop', Misc, script_menu);

    const UI = new TreeNode('UI settings', Visuals, script_menu);
    const Map = new TreeNode('Mini Map', Visuals, script_menu);
    const Tracers = new TreeNode('Tracers', Visuals, script_menu);


    Visuals.addChild(new Field({ type: 'checkbox', label: 'FPS', object: Settings.fps, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'Gauges', object: Settings, property: 'gaugesInfo', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'BuildInfo', object: Settings, property: 'buildinfo', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'MachineInfo', object: Settings, property: 'machineInfo', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'ChestInfo', object: Settings, property: 'ChestInfo', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'TotemInfo', object: Settings, property: 'toteminfo', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'BoxInfo', object: Settings, property: 'boxinfo', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'ShowNames', object: Settings, property: 'showNames', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'showScore', object: Settings, property: 'showScore', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'playerOnTop', object: Settings, property: 'playerOnTop', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'weaponTimer', object: Settings, property: 'showWeaponTimer', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'show Heal Timer', object: Settings, property: 'showHealTimer', onChange: data => { kasdgiksadg.saveSettings(); } }));
    // Visuals.addChild(new Field({ type: 'checkbox', label: 'show HP', object: Settings, property: 'showHp', onChange: data => { kasdgiksadg.saveSettings(); } }));
    // Visuals.addChild(new Field({ type: 'checkbox', label: 'show player HP', object: Settings, property: 'showHpPlayer', onChange: data => { kasdgiksadg.saveSettings(); } }));
    // Visuals.addChild(new Field({ type: 'checkbox', label: 'show my HP', object: Settings, property: 'showMyHp', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'ColoredSpikes', object: Settings, property: 'ColoredSpikes', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'NoFog', object: Settings, property: 'NoFog', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: "range", label: "Xray", min: 0, max: 1, step: 0.1, object: Settings.Xray, property: "a", onChange: data => { Settings.Xray.ready = false; kasdgiksadg.saveSettings(); } }));

    Tracers.addChild(new Field({ type: 'checkbox', label: 'Tracers', object: Settings, property: 'tracers', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Tracers.addChild(new Field({ type: 'display', label: '==================' }));
    Tracers.addChild(new Field({ type: 'checkbox', label: 'PlayerTracers', object: Settings, property: 'PlayerTracers', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Tracers.addChild(new Field({ type: 'checkbox', label: 'SandwormTracers', object: Settings, property: 'SandwormTracers', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Tracers.addChild(new Field({ type: 'checkbox', label: 'KrakenTracers', object: Settings, property: 'KrakenTracers', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Tracers.addChild(new Field({ type: 'checkbox', label: 'SpiderTracers', object: Settings, property: 'SpiderTracers', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Tracers.addChild(new Field({ type: 'checkbox', label: 'WolfTracers', object: Settings, property: 'WolfTracers', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Tracers.addChild(new Field({ type: 'checkbox', label: 'RabbitTracers', object: Settings, property: 'RabbitTracers', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Tracers.addChild(new Field({ type: 'checkbox', label: 'FishTracers', object: Settings, property: 'FishTracers', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Tracers.addChild(new Field({ type: 'checkbox', label: 'VultureTracers', object: Settings, property: 'VultureTracers', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Tracers.addChild(new Field({ type: 'checkbox', label: 'BabyDragonTracers', object: Settings, property: 'BabyDragonTracers', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Tracers.addChild(new Field({ type: 'checkbox', label: 'BabyLavaDragonTracers', object: Settings, property: 'BabyLavaDragonTracers', onChange: data => { kasdgiksadg.saveSettings(); } }));

    Misc.addChild(new Field({ type: 'checkbox', label: 'Anti Kick', object: Settings.antiKick, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ type: 'checkbox', label: 'FPS Boost', object: Settings.FPSBoost, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ type: 'checkbox', label: 'AutoFood', object: Settings.AutoFeed2, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ type: 'range', label: 'AutoFood Value', min: 0, max: 99, step: 1, object: Settings.AutoFeed2, property: 'a', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ type: 'checkbox', label: 'AutoSteal', object: Settings.AutoSteal, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    // Misc.addChild(new Field({ type: 'checkbox', label: 'SwordInchest', object: Settings.SwordInchest, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ type: 'checkbox', label: 'autoRespawn', object: Settings, property: 'autoRespawn', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ type: 'checkbox', label: 'AutoIce', object: Settings.AutoIce, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ type: 'checkbox', label: 'AutoTotem', object: Settings.AutoTotem, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ type: 'checkbox', label: 'AutoAttack', object: Settings.AutoAttack, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ type: 'checkbox', label: 'AutoBreadPut', object: Settings.AutoBreadPut, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ type: 'checkbox', label: 'AutoBreadTake', object: Settings.AutoBreadTake, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ type: 'checkbox', label: 'AutoExtractorPut', object: Settings.AutoExtractorPut, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ type: 'checkbox', label: 'AutoExtractorTake', object: Settings.AutoExtractorTake, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ type: 'checkbox', label: 'Spectator', object: Settings.spectator, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ type: "range", label: "SpectatorSpeed", min: 5, max: 50, step: 1, object: Settings.spectator, property: "s", onChange: data => { kasdgiksadg.saveSettings() } }));

    Aimbot.addChild(new Field({ type: 'checkbox', label: 'Aimbot', object: Settings.AMB, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Aimbot.addChild(new Field({ type: 'checkbox', label: 'Aimbot mode V2', object: Settings, property: 'AMB_V2', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Aimbot.addChild(new Field({ type: 'checkbox', label: 'Aim rotation', object: Settings, property: 'AMB_rotation', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Aimbot.addChild(new Field({ type: 'setkey', label: 'Set Aimbot Key', property: 'k', object: Settings.AMB, action: data => { kasdgiksadg.controls.setKeyBind('AMB'); } }));

    Shop.addChild(new Field({ type: 'checkbox', label: 'AutoWood', object: Settings.AutoShop.wood, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Shop.addChild(new Field({ type: 'button', label: 'Buy wood', label2: 'Buy', action: data => { buyResMax(0); } }));
    Shop.addChild(new Field({ type: 'checkbox', label: 'AutoStone', object: Settings.AutoShop.stone, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Shop.addChild(new Field({ type: 'button', label: 'Buy stone', label2: 'Buy', action: data => { buyResMax(1); } }));
    Shop.addChild(new Field({ type: 'checkbox', label: 'AutoGold', object: Settings.AutoShop.gold, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Shop.addChild(new Field({ type: 'button', label: 'Buy gold', label2: 'Buy', action: data => { buyResMax(2); } }));
    Shop.addChild(new Field({ type: 'checkbox', label: 'AutoDiamond', object: Settings.AutoShop.diamond, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Shop.addChild(new Field({ type: 'button', label: 'Buy diamond', label2: 'Buy', action: data => { buyResMax(3); } }));
    Shop.addChild(new Field({ type: 'checkbox', label: 'AutoAmethyst', object: Settings.AutoShop.amethyst, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Shop.addChild(new Field({ type: 'button', label: 'Buy amethyst', label2: 'Buy', action: data => { buyResMax(4); } }));
    Shop.addChild(new Field({ type: 'checkbox', label: 'AutoReidite', object: Settings.AutoShop.reidite, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Shop.addChild(new Field({ type: 'button', label: 'Buy reidite', label2: 'Buy', action: data => { buyResMax(5); } }));

    AutoFarm.addChild(new Field({ type: 'checkbox', label: 'Start Autofarm', object: Settings.Autofarm, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    AutoFarm.addChild(new Field({ type: 'checkbox', label: 'Auto water', object: Settings.Autofarm, property: 'water', onChange: data => { kasdgiksadg.saveSettings(); } }));

    AutoFarm.addChild(new Field({ type: 'text', label: 'Drop command', object: Settings.Autofarm, property: 'comand', onChange: data => { kasdgiksadg.saveSettings(); } }));
    AutoFarm.addChild(new Field({ type: 'checkbox', label: 'is DropBerries', object: Settings.Autofarm, property: 'isDropBerries', onChange: data => { kasdgiksadg.saveSettings(); } }));

    AutoFarm.addChild(new Field({ type: 'button', label: 'Top left of farm', label2: 'set pos', action: data => { mp = myplayer(); mp && (Settings.Autofarm['x'] = mp.x, Settings.Autofarm['y'] = mp.y); OpenedNode.node.openFolder(OpenedNode.node); } }));
    AutoFarm.addChild(new Field({ type: 'button', label: 'Bottom right of farm', label2: 'set pos', action: data => { mp = myplayer(); mp && (Settings.Autofarm['xx'] = mp.x, Settings.Autofarm['yy'] = mp.y); OpenedNode.node.openFolder(OpenedNode.node); } }));
    AutoFarm.addChild(new Field({ type: 'button', label: 'Safe Point', label2: 'set pos', action: data => { mp = myplayer(); mp && (Settings.Autofarm['sx'] = mp.x, Settings.Autofarm['sy'] = mp.y); OpenedNode.node.openFolder(OpenedNode.node); } }));
    AutoFarm.addChild(new Field({ type: 'display', label: 'X:', object: Settings.Autofarm, property: 'x' }));
    AutoFarm.addChild(new Field({ type: 'display', label: 'Y:', object: Settings.Autofarm, property: 'y' }));
    AutoFarm.addChild(new Field({ type: 'display', label: 'X1:', object: Settings.Autofarm, property: 'xx' }));
    AutoFarm.addChild(new Field({ type: 'display', label: 'Y1:', object: Settings.Autofarm, property: 'yy' }));
    AutoFarm.addChild(new Field({ type: 'display', label: 'SX:', object: Settings.Autofarm, property: 'sx' }));
    AutoFarm.addChild(new Field({ type: 'display', label: 'SY:', object: Settings.Autofarm, property: 'sy' }));
    AutoFarm.addChild(new Field({ type: 'setkey', label: 'Set AutoFarm Key', property: 'k', object: Settings.Autofarm, action: data => { kasdgiksadg.controls.setKeyBind('Autofarm'); } }));

    AutoSpike.addChild(new Field({ type: 'checkbox', label: 'AutoBridge', object: Settings, property: 'AutoBridge', onChange: data => { kasdgiksadg.saveSettings(); } }));
    AutoSpike.addChild(new Field({ type: 'checkbox', label: 'G Spike mode', object: Settings, property: 'AutoSpikeMode2', onChange: data => { kasdgiksadg.saveSettings(); } }));
    AutoSpike.addChild(new Field({ type: 'setkey', label: 'Set AutoSpike Key', property: 'k', object: Settings.AutoSpike, action: data => { kasdgiksadg.controls.setKeyBind('AutoSpike'); } }));

    AutoCraft_Recycle.addChild(new Field({ type: 'checkbox', label: 'Smart Craft', object: Settings.SmartCraft, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); if (Settings.SmartCraft.e) Crafting.now = 0; reCalculateCraftTree(); } }));
    AutoCraft_Recycle.addChild(new Field({ type: 'setkey', label: 'Set SmartCraft Key', property: 'k', object: Settings.SmartCraft, action: data => { kasdgiksadg.controls.setKeyBind('SmartCraft'); } }));
    AutoCraft_Recycle.addChild(new Field({ type: 'display', label: '==================' }));
    AutoCraft_Recycle.addChild(new Field({ type: 'checkbox', label: 'AutoCraft', object: Settings.AutoCraft, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    AutoCraft_Recycle.addChild(new Field({ type: 'checkbox', label: 'SafeMode', object: Settings.AutoCraft, property: 's', onChange: data => { kasdgiksadg.saveSettings(); } }));
    AutoCraft_Recycle.addChild(new Field({ type: 'setkey', label: 'Set AutoCraft Key', property: 'k', object: Settings.AutoCraft, action: data => { kasdgiksadg.controls.setKeyBind('AutoCraft'); } }));
    AutoCraft_Recycle.addChild(new Field({ type: 'display', label: 'CraftId: ', object: Settings.AutoCraft, property: 'lastcraft' }));
    AutoCraft_Recycle.addChild(new Field({ type: 'display', label: '==================' }));
    AutoCraft_Recycle.addChild(new Field({ type: 'checkbox', label: 'AutoRecycle', object: Settings.AutoRecycle, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    AutoCraft_Recycle.addChild(new Field({ type: 'checkbox', label: 'SafeMode', object: Settings.AutoRecycle, property: 's', onChange: data => { kasdgiksadg.saveSettings(); } }));
    AutoCraft_Recycle.addChild(new Field({ type: 'setkey', label: 'Set AutoRecycle Key', property: 'k', object: Settings.AutoRecycle, action: data => { kasdgiksadg.controls.setKeyBind('AutoRecycle'); } }));
    AutoCraft_Recycle.addChild(new Field({ type: 'display', label: 'RecycleId: ', object: Settings.AutoRecycle, property: 'lastrecycle' }));

    FTextX = new Field({ type: 'display', label: 'X:', object: Settings.PathFinder, property: 'x' });
    FTextY = new Field({ type: 'display', label: 'Y:', object: Settings.PathFinder, property: 'y' });

    PathFinder.addChild(new Field({ type: 'checkbox', label: 'Path Finder', object: Settings.PathFinder, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    PathFinder.addChild(new Field({ type: 'setkey', label: 'Set PathFinder Key', property: 'k', object: Settings.PathFinder, action: data => { kasdgiksadg.controls.setKeyBind('PathFinder'); } }));
    PathFinder.addChild(new Field({ type: 'checkbox', label: 'Auto Drop', object: Settings.PathFinder, property: 'autoDrop', onChange: data => { kasdgiksadg.saveSettings(); } }));
    PathFinder.addChild(new Field({ type: 'checkbox', label: 'Auto Restart', object: Settings.PathFinder, property: 'autoRestart', onChange: data => { kasdgiksadg.saveSettings(); } }));
    PathFinder.addChild(new Field({ type: 'range', label: 'set X', min: 0, max: 300, step: 1, object: Settings.PathFinder, property: 'x', onChange: data => { kasdgiksadg.saveSettings(); FTextX.obj.textContent = Settings.PathFinder.x; } }));
    PathFinder.addChild(new Field({ type: 'range', label: 'set Y', min: 0, max: 300, step: 1, object: Settings.PathFinder, property: 'y', onChange: data => { kasdgiksadg.saveSettings(); FTextY.obj.textContent = Settings.PathFinder.y; } }));
    PathFinder.addChild(new Field({ type: 'range', label: 'Min Dist', min: 50, max: 300, step: 1, object: Settings.PathFinder, property: 'dist', onChange: data => { kasdgiksadg.saveSettings(); } }));
    PathFinder.addChild(new Field({ type: 'button', label: 'Set current Pos', label2: 'set', action: data => { mp = myplayer(); mp && (log(mp), Settings.PathFinder.x = Math.floor(mp.x / 100), Settings.PathFinder.y = Math.floor(mp.y / 100)); OpenedNode.node.openFolder(OpenedNode.node); } }));
    PathFinder.addChild(FTextX);
    PathFinder.addChild(FTextY);

    Drop_in_Chest.addChild(new Field({ type: 'checkbox', label: 'Show Items ID', object: Settings, property: 'ChestInfo2', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Drop_in_Chest.addChild(new Field({ type: 'range', label: 'Item ID', min: 1, max: 250, step: 1, object: Settings.DropInChest, property: 'id', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Drop_in_Chest.addChild(new Field({ type: 'range', label: 'Count', min: 1, max: 1000, step: 1, object: Settings.DropInChest, property: 'count', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Drop_in_Chest.addChild(new Field({ type: 'button', label: 'Drop', action: data => { DropInChest(); } }));

    FDisplay1 = new Field({ type: 'display', label: 'Token:', object: user, property: Object.keys(user)[14] });
    FDisplay2 = new Field({ type: 'display', label: 'Token:', object: user, property: Object.keys(user)[15] });

    FText1 = new Field({ type: 'text', label: 'Set Token', object: user, property: Object.keys(user)[14], onChange: data => { FDisplay1.obj.textContent = user[Object.keys(user)[14]]; } });
    FText2 = new Field({ type: 'text', label: 'Set Token', object: user, property: Object.keys(user)[15], onChange: data => { FDisplay2.obj.textContent = user[Object.keys(user)[15]]; } });

    TokenSetter.addChild(FText1);
    TokenSetter.addChild(FText2);
    TokenSetter.addChild(FDisplay1);
    TokenSetter.addChild(FDisplay2);
    TokenSetter.addChild(new Field({ type: 'button', label: 'Go Back To Lobby', action: data => { backToLobby(); } }));
    TokenSetter.addChild(new Field({ type: 'button', label: 'Set Random Token', action: data => { user[Object.keys(user)[14]] = Gen(7); user[Object.keys(user)[15]] = Gen(5); OpenedNode.node.openFolder(OpenedNode.node); } }));

    Bind.addChild(new Field({ type: 'setkey', label: 'AutoSteal Key', property: 'k', object: Settings.AutoSteal, action: data => { kasdgiksadg.controls.setKeyBind('AutoSteal'); } }));
    // Bind.addChild(new Field({ type: 'setkey', label: 'Set SwordInchest ', property: 'k', object: Settings.SwordInchest, action: data => { kasdgiksadg.controls.setKeyBind('SwordInchest'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'AutoExtractorPut', property: 'k', object: Settings.AutoExtractorPut, action: data => { kasdgiksadg.controls.setKeyBind('AutoExtractorPut'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'AutoExtractorTake', property: 'k', object: Settings.AutoExtractorTake, action: data => { kasdgiksadg.controls.setKeyBind('AutoExtractorTake'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'Aimbot Key', property: 'k', object: Settings.AMB, action: data => { kasdgiksadg.controls.setKeyBind('AMB'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'AutoIce Key', property: 'k', object: Settings.AutoIce, action: data => { kasdgiksadg.controls.setKeyBind('AutoIce'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'AutoTotem Key', property: 'k', object: Settings.AutoTotem, action: data => { kasdgiksadg.controls.setKeyBind('AutoTotem'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'AutoAttack Key', property: 'k', object: Settings.AutoAttack, action: data => { kasdgiksadg.controls.setKeyBind('AutoAttack'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'AutoBreadPut Key', property: 'k', object: Settings.AutoBreadPut, action: data => { kasdgiksadg.controls.setKeyBind('AutoBreadPut'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'AutoBreadTake Key', property: 'k', object: Settings.AutoBreadTake, action: data => { kasdgiksadg.controls.setKeyBind('AutoBreadTake'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'AutoFarm Key', property: 'k', object: Settings.Autofarm, action: data => { kasdgiksadg.controls.setKeyBind('Autofarm'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'Xray Key', property: 'k', object: Settings.Xray, action: data => { kasdgiksadg.controls.setKeyBind('Xray'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'DropSword Key', property: 'k', object: Settings.dropSword, action: data => { kasdgiksadg.controls.setKeyBind('dropSword'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'Enable/disable script', property: 'k', object: Settings.TurnOffScript, action: data => { kasdgiksadg.controls.setKeyBind('TurnOffScript'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'Spectator Key', property: 'k', object: Settings.spectator, action: data => { kasdgiksadg.controls.setKeyBind('spectator'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'Remove hands', property: 'k', object: Settings.RemoveHands, action: data => { kasdgiksadg.controls.setKeyBind('RemoveHands'); } }));

    Map.addChild(new Field({ type: 'checkbox', label: 'Show map', object: Settings.miniMap, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); OpenedNode.styleSheet.textContent = getUIStyle(); } }));
    Map.addChild(new Field({ type: 'range', label: 'Opacity', min: 0.1, max: 1, step: 0.01, object: Settings.miniMap, property: 'o', onChange: data => { kasdgiksadg.saveSettings(); OpenedNode.styleSheet.textContent = getUIStyle(); } }));
    Map.addChild(new Field({ type: 'checkbox', label: 'Grid 5X5', object: Settings.miniMap, property: 'type5', onChange: data => { Settings.miniMap.type6 = !Settings.miniMap.type5; kasdgiksadg.saveSettings(); OpenedNode.node.openFolder(OpenedNode.node); } }));
    Map.addChild(new Field({ type: 'checkbox', label: 'Grid 6X6', object: Settings.miniMap, property: 'type6', onChange: data => { Settings.miniMap.type5 = !Settings.miniMap.type6; kasdgiksadg.saveSettings(); OpenedNode.node.openFolder(OpenedNode.node); } }));
    Map.addChild(new Field({ type: 'display', label: 'To change Grid', object: { t: 'reload page' }, property: 't' }));

    UI.addChild(new Field({ type: 'setkey', label: 'Fast open Key', property: 'k', object: Settings.fastOpenUI, action: data => { kasdgiksadg.controls.setKeyBind('fastOpenUI'); } }));
    UI.addChild(new Field({ type: 'range', label: 'Script Opacity', min: 0.1, max: 1, step: 0.05, object: Settings.fastOpenUI, property: 'o', onChange: data => { kasdgiksadg.saveSettings(); OpenedNode.styleSheet.textContent = getUIStyle(); } }));
    UI.addChild(new Field({ type: 'range', label: 'Other Opacity', min: 0.1, max: 1, step: 0.05, object: Settings.fastOpenUI, property: 'otherO', onChange: data => { kasdgiksadg.saveSettings(); OpenedNode.styleSheet.textContent = getUIStyle(); } }));

    Debug.addChild(new Field({ type: 'checkbox', label: 'units_id', object: Settings.debug.units_id, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Debug.addChild(new Field({ type: 'checkbox', label: 'show_items', object: Settings.debug.show_items, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); Settings.debug.show_sprites.e = false; } }));
    Debug.addChild(new Field({ type: 'checkbox', label: 'show_sprites', object: Settings.debug.show_sprites, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); Settings.debug.show_items.e = false; } }));
    Debug.addChild(new Field({ type: 'checkbox', label: 'player_action', object: Settings.debug.player_action, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));


    script_menu.appendChild(root.toHtmlDiv());
    document.getElementById('game_body').appendChild(script_menu);

    const script_menu_button1 = document.createElement('img')
    const script_menu_button2 = document.createElement('img')
    script_menu_button1.style.width = '55px';
    script_menu_button1.style.height = '55px';
    script_menu_button1.style.position = 'absolute';
    script_menu_button1.style.right = '230px';
    script_menu_button1.style.top = '284px';
    script_menu_button1.style.display = '';
    script_menu_button1.className = 'button_img';

    script_menu_button2.style.width = script_menu_button1.style.width
    script_menu_button2.style.height = script_menu_button1.style.height
    script_menu_button2.style.position = script_menu_button1.style.position
    script_menu_button2.style.right = script_menu_button1.style.right
    script_menu_button2.style.top = script_menu_button1.style.top
    script_menu_button2.style.display = 'none';
    script_menu_button2.className = 'button_img';


    OpenedNode.script_menu_button1 = script_menu_button1;
    OpenedNode.script_menu_button2 = script_menu_button2;

    script_menu_button1.src = 'https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/icon_script_btn1.png?raw=true';
    script_menu_button2.src = 'https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/icon_script_btn2.png?raw=true';

    script_menu_button1.addEventListener('mouseenter', () => {
        script_menu_button1.style.display = 'none';
        script_menu_button2.style.display = '';
    });

    script_menu_button2.addEventListener('mouseleave', () => {
        script_menu_button1.style.display = '';
        script_menu_button2.style.display = 'none';
    });

    script_menu_button2.addEventListener('click', () => {
        if (script_menu.style.display == 'none') {
            script_menu.style.display = 'inline-block';
            OpenedNode.e = true;
        } else {
            script_menu.style.display = 'none';
            OpenedNode.e = false;
        }
    });


    document.addEventListener('mousedown', function (event) {
        if (OpenedNode.e & event.button == 1) {
            const div = document.getElementById('script_menu');
            if (event.clientX < div.offsetLeft - div.offsetWidth / 2 || event.clientX > div.offsetLeft + div.offsetWidth / 2 || event.clientY < div.offsetTop - div.offsetHeight / 2 || event.clientY > div.offsetTop + div.offsetHeight / 2) {
                return
            }
            OpenedNode.isPressed = true;
            OpenedNode.x = div.offsetLeft
            OpenedNode.y = div.offsetTop
            OpenedNode.lastX = event.clientX
            OpenedNode.lastY = event.clientY
        }
    });

    document.addEventListener('mouseup', function (event) {
        if (event.button == 1) {
            OpenedNode.isPressed = false;
        }
    });
    document.addEventListener('mousemove', function (event) {
        if (OpenedNode.isPressed) {
            const div = document.getElementById('script_menu');
            OpenedNode.x += event.clientX - OpenedNode.lastX
            OpenedNode.y += event.clientY - OpenedNode.lastY
            OpenedNode.lastX = event.clientX
            OpenedNode.lastY = event.clientY

            div.style.left = OpenedNode.x + 'px'
            div.style.top = OpenedNode.y + 'px'
        }
    });


    document.getElementById('game_body').appendChild(script_menu_button1);
    document.getElementById('game_body').appendChild(script_menu_button2);
    OpenedNode.node = root;

    const scriptMenu = document.getElementById('script_menu');


    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.textContent = getUIStyle();
    document.head.appendChild(styleSheet);

    OpenedNode.styleSheet = styleSheet;
}


function getUIStyle() {
    // Добавляем стили
    const styles = `
    .hover-opacity {
        cursor: url(../img/cursor0.png), auto;
        opacity: 0.5;
        transition: opacity 0.1s ease-in-out;
    }
    .hover-opacity:hover {
        opacity: 1;
    }
    .hover-img-width {
        transition: transform 0.1s ease-in-out;
    }
    .hover-img-width:hover {
        transform: scale(1.25);
    }
    .button_style {
        width: 130px;
        margin-right: 70px;
        background: #513810;
        box-shadow: 0px 6px 0px #2f2009;
        border-radius: 10px;
        border: 4px #704e18 solid;
        cursor: url(../img/cursor1.png), pointer;
        font-family: "Baloo Paaji";
        color: white;
        outline: none;
        font-size: 20px;
        float: right;
        margin-bottom: 20px;
        margin-left: 200px;
    }
    .button_style:hover {
        background: #5c3f11;
        border: 4px #79551b solid;
    }

    #option_in_game {
        opacity: ${Settings.fastOpenUI.otherO};
    }

    #chronoquest {
        opacity: ${Settings.fastOpenUI.otherO};
    }

    #shop_market {
        opacity: ${Settings.fastOpenUI.otherO};
    }

    #home_craft {
        opacity: ${Settings.fastOpenUI.otherO};
    }

    #recipe_craft {
        opacity: ${Settings.fastOpenUI.otherO};
    }

    #sure_delete {
        opacity: ${Settings.fastOpenUI.otherO};
    }

    #cancel_sure_delete {
        opacity: ${Settings.fastOpenUI.otherO};
    }
    
    #myNewImage {
        opacity: ${Settings.miniMap.o};
        display: ${Settings.miniMap.e ? '' : 'none'};
    }
    
    #agree_opt {
        width: 35px;
        height: 35px;
        border-radius: 7px;
        text-align: center;
        cursor: url(../img/cursor1.png), pointer;
        border: solid 2px #755219;
        box-shadow: 0px 5px #302009;
        float: left;
        display: inline-block;
        position: absolute;
        top: 245px;
        left: 160px;
        outline: none;
    }

    #script_menu {
        cursor: url(../img/cursor0.png), auto;
        position: absolute;
        width: 550px;
        background: #3A2A0D;
        border: 6px #513810 solid;
        box-shadow: -5px 6px 0px #302009;
        box-sizing: border-box;
        border-radius: 14px;
        font-size: 20px;
        font-weight: normal;
        text-shadow: 0px 2px 0px #281806;
        text-align: center;
        padding-top: 40px;
        padding-bottom: 10px;
        color: #FFFFFF;
        opacity: ${Settings.fastOpenUI.o};
        font-family: "Baloo Paaji";
        outline: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: inline-block;
    }
    #script_menu:before {
        content: "SCRIPT MENU";
        background: #443110;
        border: 5px #513810 solid;
        box-shadow: 0px 6px 0px #221605;
        border-radius: 14px;
        color: #745018;
        width: 150px;
        height: 35px;
        display: block;
        position: absolute;
        top: -25px;
        left: 82.5%;
        margin-left: -47%;
    .keyboard-option {
        padding: 5px 10px;
        margin: 5px;
        color: white;
        cursor: pointer;
    }
    #azerty_ing {
        background-color: rgb(58, 42, 13);
    }
    #qwerty_ing {
        background-color: rgb(181, 109, 24);
    }
    #high_ing {
        background-color: rgb(181, 109, 24);
    }
    #low_ing {
        background-color: rgb(58, 42, 13);
    }   
    
    `;
    return styles;
}


//////////////////////////////////////////////////////////////////////////////



function send(data) {
    try {
        client[Keys.webSocket].send(JSON.stringify(data));
    } catch (error) {
        if (script.user.alive) {
            Settings.textalert.t = 'Error loading script'
            Settings.textalert.e = true
            return
        }
    }
}


function unit() {
    return script.world.units;

}


function myplayer() {
    return script.world.fast_units[script.user.uid];
}


function chatxterm() {
    if (document.getElementById("chat_block").style.display === 'inline-block' || document.getElementById("commandMainBox").style.display === 'inline-block') {
        return true;
    } else {
        return false;
    }
}


function pretty_time_string(num) {
    return (num < 10 ? "0" : "") + num;
}

var startTimer = new Date;

setInterval(function () {
    var total_seconds = (new Date - startTimer) / 1000;

    var days = Math.floor(total_seconds / 12960000);
    total_seconds = total_seconds % 12960000;

    var hours = Math.floor(total_seconds / 3600);
    total_seconds = total_seconds % 3600;

    var minutes = Math.floor(total_seconds / 60);
    total_seconds = total_seconds % 60;

    var seconds = Math.floor(total_seconds);
    days = pretty_time_string(days);
    hours = pretty_time_string(hours);
    minutes = pretty_time_string(minutes);
    seconds = pretty_time_string(seconds);

    var currentTimeString = days + ":" + hours + ":" + minutes + ":" + seconds;

    jQuery('#ratata').text(currentTimeString);
}, 1000);


////////////////////////////////////////// ##############################

let count_recipe_spin;
let button_start_craft;

function findItemIdByImg(sourceImage) {
    if (!game[Keys.game_img]) return -1;

    const img = Object.keys(game[Keys.game_img][0].info)[2];
    for (let i = 0; i < game[Keys.game_img].length; i++) {
        const item = game[Keys.game_img][i];
        if (!item) continue;
        if (item.info[img] && item.info[img][0]) {
            src = sourceImage.getAttribute('src');
            o_src = Object.keys(item.info[img][0])[3];
            if (item.info[img][0].currentSrc == src || item.info[img][0][o_src] == src) return i;
            if (item.info[img][1].currentSrc == src || item.info[img][1][o_src] == src) return i;
            if (item.info[img][2].currentSrc == src || item.info[img][2][o_src] == src) return i;
        }
    }

    return -1; // Возвращаем -1 если изображение не найдено
}


function create_craft_tree(need_id, count, inventory, is_root, len = 0) {
    if (!(need_id in craft_rules)) return { count: count, id: need_id, comp: [], startCount: 0 };
    if (len > 10) return { count: count, id: need_id, comp: [], startCount: 0 };
    const comp = craft_rules[need_id];
    let craft_tree = { count: count, id: need_id, comp: [], startCount: 0 };
    let inv_count = inventory[need_id];
    if (!inv_count) inv_count = 0
    if (is_root) { craft_tree.startCount = inv_count; inv_count = 0; }

    if (inv_count >= count) inventory[need_id] -= count;
    else if (inv_count != 0) inventory[need_id] = 0;


    if (count - inv_count <= 0) return craft_tree;
    else {
        for (let i = 0; i < comp.length; i++) {
            const element = comp[i];
            let one_comp = create_craft_tree(element[0], element[1] * (count - inv_count), inventory, false, len + 1);
            craft_tree.comp.push(one_comp);
        }
    }
    return craft_tree;
}

function recursively_get_ingridients(ingridients, craft_tree, j) {
    for (let i = 0; i < craft_tree.comp.length; i++) {
        const comp = craft_tree.comp[i];
        if (comp.comp.length == 0) {
            if (comp.id in ingridients) {
                ingridients[comp.id].j = j;
                ingridients[comp.id].count += comp.count;
            } else {
                ingridients[comp.id] = { id: comp.id, count: comp.count, j: j, is_craft: false };
            }
        } else {
            if (comp.id in ingridients) {
                ingridients[comp.id].j = j;
                ingridients[comp.id].count += comp.count;
            } else {
                ingridients[comp.id] = { id: comp.id, count: comp.count, j: j, is_craft: true };
            }
            recursively_get_ingridients(ingridients, comp, j + 1);
        }
    }
}

function getCraftId(craft_tree) {
    if (!(craft_tree.id in craft_rules)) return -1;
    hasinv = inventoryHas(craft_tree.id);
    need_count = craft_tree.startCount + craft_tree.count;
    if (hasinv[0] && hasinv[1] >= need_count) return -1;
    let is_craft = true;
    for (let i = 0; i < craft_rules[craft_tree.id].length; i++) {
        const comp = craft_rules[craft_tree.id][i];
        hasinv = inventoryHas(comp[0]);
        if (!hasinv[0] || hasinv[1] < comp[1]) {
            is_craft = false;
            break;
        }
    }
    hasinv = inventoryHas(craft_tree.id);
    if (is_craft && (!hasinv[0] || hasinv[1] < need_count)) return craft_tree.id;
    for (let i = 0; i < craft_tree.comp.length; i++) {
        const comp = craft_tree.comp[i];
        let res = getCraftId(comp);
        if (res != -1) return res;
    }
    return -1;
}

function sortKeysByJ(obj) {
    // Сортируем ключи по значению поля j
    const keys = Object.keys(obj);
    keys.sort((keyA, keyB) => {
        let a = obj[keyA].j + obj[keyA].is_craft ? 100 : 0;
        let b = obj[keyB].j + obj[keyB].is_craft ? 100 : 0;
        return a - b;
    });
    return keys;
}

let lastValueTargetId = {};
let checkListCraft = [];


function updateActionsCraftHelper() {
    if (!craft_tree) return;
    if (!script.user.alive) return;
    let isChange = false;
    let inventory = realGetinventory();
    checkListCraft.forEach(key => {
        const value = lastValueTargetId[key];
        if (inventory[key] != value) { isChange = true; }
        lastValueTargetId[key] = inventory[key];
    });
    if (isChange) reCalculateCraftTree();
}

function reCalculateCraftTree(isReset = false) {
    if (!craft_tree) return;
    if (isReset) {
        craft_tree = create_craft_tree(craft_tree.id, Number(count_recipe_spin.value), Array.from(realGetinventory()), true);
        spanCraftTargetCount.innerHTML = count_recipe_spin.value;
        viewCraftHelper();
        return;
    }

    let inventory = realGetinventory();
    let inv_count = inventory[craft_tree.id];
    if (!inv_count) inv_count = 0

    let need_count = craft_tree.count - (inv_count - craft_tree.startCount);
    if (!need_count || need_count < 0) need_count = 0;

    spanCraftTargetCount.innerHTML = need_count;

    craft_tree = create_craft_tree(craft_tree.id, need_count, Array.from(realGetinventory()), true);


    viewCraftHelper();
    if (need_count == 0) { craft_tree = {}; Settings.SmartCraft.e = false; }
}

function viewCraftHelper() {
    craftItems = document.getElementById('craftItems');
    craftItems.innerHTML = "";
    craftItems.style.display = "grid";
    craftItems.style.gridTemplateColumns = "repeat(7, 1fr)";
    craftItems.style.gridTemplateRows = "auto auto";
    craftItems.style.gap = "10px";
    craftItems.style.fontSize = "20";

    if (Object.keys(craft_tree).length === 0) {
        checkListCraft = [];
        return;
    }
    const img = Object.keys(game[Keys.game_img][0].info)[2];

    let ingridients = {}
    recursively_get_ingridients(ingridients, craft_tree, 0);
    let keys_ingridients = sortKeysByJ(ingridients);
    checkListCraft = Object.keys(ingridients);
    checkListCraft.push(craft_tree.id);

    for (let i = 0; i < keys_ingridients.length; i++) {
        const key = keys_ingridients[i];
        const ingridient = ingridients[key];

        let div = document.createElement('div');
        div.style.display = "flex";
        div.style.alignItems = "center";

        let invImg = document.createElement('img');
        invImg.id = "craftImg-" + ingridient.id;
        o_src = Object.keys(game[Keys.game_img][ingridient.id].info[img][0])[3];
        if (game[Keys.game_img][ingridient.id].info[img][0].currentSrc) {
            invImg.src = game[Keys.game_img][ingridient.id].info[img][0].currentSrc;
        } else {
            invImg.src = game[Keys.game_img][ingridient.id].info[img][0][o_src];
        }
        invImg.classList.add("inv", "hover-img-width");

        let span = document.createElement('span');
        span.style.backgroundColor = "black";
        span.id = "craftSpan-" + ingridient.id;
        span.innerHTML = ingridient.count;

        div.appendChild(invImg);
        div.appendChild(span);
        if (realInventoryHas(ingridient.id)[0] && realInventoryHas(ingridient.id)[1] >= ingridient.count) {
            invImg.style.borderBlockColor = "rgb(54, 255, 87)";
            invImg.style.background = "rgb(54, 255, 87)";
        } else if (ingridient.is_craft) {
            invImg.style.borderBlockColor = "aqua";
            invImg.style.background = "aqua";
        } else {
            invImg.style.borderBlockColor = "red";
            invImg.style.background = "red";
        }
        craftItems.appendChild(div);

    }
}


document.addEventListener("DOMContentLoaded", function (event) {
    document.body.insertAdjacentHTML('beforeend', '<div id="divSmartCraft" class="hover-opacity" style="user-select: none; position: absolute; left: 0; color: white; bottom: 0; margin: 10px; "><div id="craftItems"></div> <div id="craftImg"></div><div id="craftStart"></div>');
    craftImg = document.getElementById('craftImg');
    craftImg.style.display = "flex";
    craftImg.style.alignItems = "center";
    craftImg.style.fontSize = "20";
    spanCraftTargetCount = document.createElement('span');
    spanCraftTargetCount.id = "craft-target-count";

    craftHelperE = document.getElementById('craftStart');
    craftStart = document.createElement('div');
    craftStart.classList.add("quit");
    craftStart.innerHTML = "Start/Stop";
    craftStart.style.marginLeft = "0";
    craftStart.style.textAlign = "center";
    craftStart.style.float = "left";
    craftStart.addEventListener('click', function (event) {
        reCalculateCraftTree();
        Settings.SmartCraft.e = !Settings.SmartCraft.e;
        if (Settings.SmartCraft.e) Crafting.now = 0;
    });

    craftClear = document.createElement('div');
    craftClear.classList.add("quit");
    craftClear.innerHTML = "🗑️";
    craftClear.style.marginLeft = "0";
    craftClear.style.textAlign = "center";
    craftClear.style.float = "left";
    craftClear.style.width = "50px";
    craftClear.style.marginRight = "10px";
    craftClear.addEventListener('click', function (event) {
        craft_tree = {}; Settings.SmartCraft.e = false;
        viewCraftHelper();
    });

    craftHelperE.appendChild(craftClear);
    craftHelperE.appendChild(craftStart);


    craftItems = document.getElementById('craftItems');
    document.getElementsByClassName('content')[0].addEventListener('click', (e) => {
        if (e.target instanceof HTMLImageElement) {
            spanCraftTargetCount.innerHTML = count_recipe_spin.value;
            craftItems.innerHTML = "";
            craftImg.innerHTML = "";
            craftImg.style.opacity = "1"
            craftImg.appendChild(e.target.cloneNode());
            craftImg.appendChild(spanCraftTargetCount);


            craft_tree = create_craft_tree(findItemIdByImg(e.target), Number(count_recipe_spin.value), Array.from(Getinventory()), true);

            viewCraftHelper();
        }
    });

    craft_tree = create_craft_tree(330, 1, [], true);
    viewCraftHelper();
});

function add_recipe_helper() {
    let recipe_content = document.getElementById('recipe_craft').querySelector('div.content');
    count_recipe_spin = document.createElement('input');
    count_recipe_spin.type = 'number';
    count_recipe_spin.min = 1;
    count_recipe_spin.max = 255;
    count_recipe_spin.step = 1;
    count_recipe_spin.value = 1;

    count_recipe_spin.style.width = '70px';
    count_recipe_spin.style.borderRadius = '10px';
    count_recipe_spin.style.border = '3px solid #513810';
    count_recipe_spin.style.textAlign = 'center';
    count_recipe_spin.style.fontSize = '20px';
    count_recipe_spin.style.fontFamily = "Baloo Paaji";
    count_recipe_spin.style.marginLeft = '20px';
    count_recipe_spin.style.backgroundColor = '#3A2A0D';
    count_recipe_spin.style.color = '#fff';
    count_recipe_spin.style.position = "absolute";
    count_recipe_spin.style.top = "380px";
    count_recipe_spin.style.left = "180px";

    count_recipe_spin.addEventListener('input', function () {
        if (count_recipe_spin.value > 255) count_recipe_spin.value = 255;
        if (count_recipe_spin.value < 1) count_recipe_spin.value = 1;
        reCalculateCraftTree(true);

    });

    button_start_craft = document.createElement('div');
    button_start_craft.style.marginLeft = '20px';
    button_start_craft.style.marginRight = '0px';
    button_start_craft.style.textAlign = 'center';
    button_start_craft.className = 'quit';
    button_start_craft.textContent = "✅ Set";
    button_start_craft.style.position = "absolute";
    button_start_craft.style.top = "381px";
    button_start_craft.style.left = "260px";
    button_start_craft.style.width = "90px";


    button_start_craft.addEventListener('click', function (event) {
        reCalculateCraftTree(true);
        Settings.SmartCraft.e = true;
        Crafting.now = 0;
    });

    recipe_content.appendChild(count_recipe_spin);
    recipe_content.appendChild(button_start_craft);
}


function create_craft_rules() {
    game[Keys.block2].list.select(id_tings);
    let rulesKey = Object.keys(game[Keys.block2].list)[2];
    let recipe_craft = document.getElementById("recipe_craft");
    craft_rules = {};

    for (let i = 0; i < 6; i++) {
        game[Keys.block2].list.select(i);
        for (let j = 0; j < game[Keys.block2].list[rulesKey].length; j++) {
            const element = game[Keys.block2].list[rulesKey][j];
            if (element.id in craft_rules) continue;
            craft_rules[element.id] = Array.from(element.r);
        }
    }
    recipe_craft.style.display = "none";
    log("Create new recipe_craft");

}

function createMiniMap() {
    jQuery("a[href='https://iogames.space']").hide();

    jQuery('#nickname_input').css({ "color": "Black", "font-size": "25", "background-color": "white" });
    jQuery('#chat_input').css({ "color": "black", "font-size": "20", "background-color": "white" });
    jQuery('#game_canvas').css("image-rendering", "initial");
    jQuery('#trevda').css("visibility", "hidden");
    jQuery("#loading").css({ "background-color": "black", "color": "white" });
    jQuery("body").on("contextmenu", function (e) {
        return false;
    });



    //////////////////////////////////////////////////////////////

    sdpfin = true;



    //////////////////////////////////////////////////////////////

    if (Settings.miniMap.type5) {
        jQuery("body").append('<img draggable="false" id="myNewImage" border="0" src="https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/mapv2_5x5.png?raw=true">')
    } else {
        jQuery("body").append('<img draggable="false" id="myNewImage" border="0" src="https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/mapv2_6x6.png?raw=true">')
    }
    jQuery("body").append('<p id="hrs"></p>')
    jQuery('body').append('<p id="ratata">Loading..</p>');

    jQuery("#author").animate({ right: '55px' }).css({
        cursor: "url(http://starve.io/img/cursor1.png), pointer",
        boxSizing: "border-box",
        borderRadius: "8px",
        backgroundColor: "#9b2a2d",
        boxShadow: "0px 5px #5f2a2d",
        paddingLeft: "10px",
        paddingRight: "10px",
        webkitTouchCallout: "none",
        webkitUserSelect: "none",
        khtmlUserSelect: "none",
        mozUserSelect: "none",
        msUserSelect: "none",
        userSelect: "none",
        position: "absolute",
        color: "#FFFFFF",
        fontFamily: "Baloo Paaji",
        position: "absolute",
        right: "55px",
        bottom: "30px",

    });

    jQuery("#myNewImage").animate({ right: '10px' }).css({
        cursor: "url(http://starve.io/img/cursor0.png), default",
        imageRendering: "initial",
        webkitTouchCallout: "none",
        webkitUserSelect: "none",
        khtmlUserSelect: "none",
        mozUserSelect: "none",
        msUserSelect: "none",
        userSelect: "none",
        position: "absolute",
        right: "10px",
        bottom: "130px",
        width: "180px",
        height: "180px",
    });

    jQuery("#ratata").animate({ right: '43px' }).css({
        cursor: "url(http://starve.io/img/cursor0.png), default",
        boxSizing: "border-box",
        borderRadius: "8px",
        backgroundColor: "#9e4e12",
        boxShadow: "0px 5px #593109",
        paddingLeft: "10px",
        paddingRight: "10px",
        webkitTouchCallout: "none",
        webkitUserSelect: "none",
        khtmlUserSelect: "none",
        mozUserSelect: "none",
        msUserSelect: "none",
        userSelect: "none",
        position: "absolute",
        color: "#FFFFFF",
        fontFamily: "Baloo Paaji",
        position: "absolute",
        right: "45px",
        bottom: "80px",

    });
    let img = document.getElementById('myNewImage');
    if (!Settings.miniMap.e) {
        log('NO MAP');
        img.style.visibility = 'hidden';
    }
    img.style.opacity = Settings.miniMap.o;
}

function realGetinventory() {

    let inv;
    let inv2;
    inv = user[Keys.inv];
    inv2 = Array.from(inv[Object.keys(inv)[3]]);

    return inv2;
}

function Getinventory() {
    let inv2 = Array.from(realGetinventory());
    if (Crafting.isCraft) {
        if (inv2[Crafting.id] == undefined) inv2[Crafting.id] = 0;
        inv2[Crafting.id] += 1;
    }
    return inv2;
}

function inventoryHas(id) {
    let inv;
    let inv2;

    inv = user[Keys.inv];
    inv2 = Array.from(inv[Object.keys(inv)[3]]);

    if (Crafting.isCraft) {
        if (inv2[Crafting.id] == undefined) inv2[Crafting.id] = 0;
        inv2[Crafting.id] += 1;
    }

    if (inv2[id] !== 0 && inv2[id] !== undefined) {
        return [true, inv2[id]]
    } else {
        return [false, undefined]
    }
}


function realInventoryHas(id) {
    let inv;
    let inv2;

    inv = user[Keys.inv];
    inv2 = inv[Object.keys(inv)[3]];


    if (inv2[id] !== 0 && inv2[id] !== undefined) {
        return [true, inv2[id]]
    } else {
        return [false, undefined]
    }
}

function resetColors() {
    Settings.MainColor = 'rgb(16, 212, 68)',
        Settings.TextColor = "rgb(21, 201, 68)",
        Settings.BackgroundColor = "rgb(22, 22, 22)",
        kasdgiksadg.saveSettings();
}

function DropInChest() {
    if (!script.user.alive) return;

    let myPlayer = myplayer();
    let chests = script.world.units[11];
    let currentchest = null;
    let dist = 100000;
    for (let i = 0; i < chests.length; i++) {
        let chest = chests[i];
        if (chest.info && chest.action / 2 - 1 != Settings.DropInChest.id) continue;
        d = (myPlayer.x - chest.x) ** 2 + (myPlayer.y - chest.y) ** 2;
        if (d < dist) {
            dist = d;
            currentchest = chest;
            currentchest.dist = d;
        }
    }

    const pid = currentchest[Object.keys(currentchest)[1]]
    send([packets.chestPut, Settings.DropInChest.id, Settings.DropInChest.count, pid, currentchest.id]);
}


function isAlive() {
    return user[Keys.isAlive];
}

function getUserPosition() {

    let camx;
    let camy;
    for (let prop1 in user) {
        for (let prop2 in user[prop1]) {
            switch (prop2) {
                case "x":
                    camx = user[prop1][prop2];
                    break;
                case "y":
                    camy = user[prop1][prop2];
                    break;
            }
        }
    }
    return [camx, camy]
}


function turnOff() {
    Settings.ColoredSpikes = false;
    Settings.spectator.e = false;

    OpenedNode.node.script_menu.style.display = 'none';
    OpenedNode.e = false;

    OpenedNode.script_menu_button1.style.display = 'none'
    OpenedNode.script_menu_button2.style.display = 'none'

    document.getElementById("divSmartCraft").style.display = 'none';

}

function turnOn() {
    Settings.ColoredSpikes = true;

    OpenedNode.script_menu_button1.style.display = ''
    OpenedNode.script_menu_button2.style.display = 'none'

    document.getElementById("divSmartCraft").style.display = 'inline-block';

}

// function drawsp() {
//     let drawSpike = null;

//     if (drawSpike === null || drawSpike === "null") {
//         [5, 12, 13, 14, 20, 52, 10, 15, 16, 17, 21, 51, 45, 46, 47, 48, 49, 53].forEach((id) => {
//             if (unit()[id].length > 0) {
//                 for (let e in unit()[id]) {
//                     for (const k in unit()[id][e]) {
//                         if (typeof unit()[id][e][k] === "function") {
//                             if (unit()[id][e][k].toString().includes("width")) {
//                                 drawSpike = k;
//                                 break; // Exit the loop once the key is found
//                             }
//                         }
//                     }
//                 }
//             }
//         });
//     }
//     return drawSpike
// }



function autoresp() {
    // let dying = Object.keys(client)[75];
    // let dyingFunc = client[dying];
    // let is_resp = Date.now();
    // client[dying] = function (...arguments) {
    //     if (Settings.autoRespawn) {
    //         const date_now = Date.now();
    //         cooldowns.PathFinder = date_now;
    //         if (date_now - is_resp > 1000) { is_resp = date_now; backToLobby(); }
    //         setTimeout(spawn, 1500);
    //         return dyingFunc.apply(this, arguments);
    //     }
    //     else return dyingFunc.apply(this, arguments);
    //     return Settings.PathFinder.e && Settings.PathFinder.autoRestart && (cooldowns.PathFinder = date_now, backToLobby(), spawn()), dyingFunc.apply(this, arguments);
    // };

    // For tests
    // for (let i = 0; i < Object.keys(client).length; i++) {
    //     if (i == 152 || i == 153 || i == 143 || i == 141 || i == 100) continue;
    //     const func = Object.keys(client)[i];
    //     if (typeof client[func] == "function") {
    //         let origin = client[func];
    //         log("add func", i, func, origin);
    //         client[func] = function (...rest) {
    //             log('F', i, rest, func);
    //             return origin.apply(this, rest);
    //         };
    //     }
    // }
}


function backToLobby() {
    client[Keys.back_to_lobby]();
}


function spawn() {
    _this[Object.keys(_this)[120]]();
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


function autoBook() {

    let craft = Object.keys(client)[115];

    client[craft] = (id) => {

        Settings.AutoCraft.lastcraft = id

        send([packets.equip, 46])
        send([packets.craft, id]);
        return 1;
    };
}

function recycle() {

    let rec = Object.keys(client)[116];
    client[rec] = (id) => {
        Settings.AutoRecycle.lastrecycle = id
        send([packets.recycle, id]);
    };
}

function isDeathBox(id) {
    return true;
}

// SOSITE
function isAlly(id) {
    return ally.includes(id);
}

function getdist(a, b) {
    return Math.sqrt(((b.x - a.x) * (b.x - a.x)) + ((b.y - a.y) * (b.y - a.y)));
}

function getImgForChest(chest) {
    let copy_game = game
    if (!copy_game) return;
    let o = copy_game[Keys.game_img][chest.action / 2 - 1]["info"]
    return o[Object.keys(o)[2]][0];
}

function buyResMax(id) {
    if (!inventoryHas(cropsById[id])[0]) return;
    let coast = 100000;
    switch (id) {
        case 0:
        case 1:
        case 2:
            coast = 1;
            break;
        case 3:
            coast = 4;
            break;
        case 4:
            coast = 8;
            break;
        case 5:
            coast = 16;
            break;
    }
    let count = Number(Math.floor(inventoryHas(cropsById[id])[1] / coast) * coast);
    if (count > 0) send([packets.buy, count, id]);
}

let cooldowns = {
    Autofarm: Date['now'](),
    PathFinder: Date['now'](),
    AutofarmDrop: Date['now']()
};

const cropsName = { 201: "berries", 227: "wheat", 291: "pumpkin", 294: "garlic", 296: "thorn", 315: "carrot", 317: "tomato", 319: "watermelon", 321: "aloe" }
const cropsById = { 0: 201, 1: 291, 2: 236, 3: 315, 4: 317, 5: 296 }
const crops = Object.keys(cropsName);
const berries = 201;
let dropText = { crops: [], isDrop: false, text: [] };

function autofarm(time = 1) {
    if (time) requestAnimationFrame(autofarm);

    if (!script.user.alive) return;

    function _0x2c4b97(_0x2965fb, _0x5723f3, _0x30ace0) {
        return _0x2965fb && _0x5723f3 ? _0x30ace0 ? Math['atan2'](_0x5723f3['r']['y'] - _0x2965fb['r']['y'], _0x5723f3['r']['x'] - _0x2965fb['r']['x']) : Math['atan2'](_0x5723f3['y'] - _0x2965fb['y'], _0x5723f3['x'] - _0x2965fb['x']) : null;
    }
    player = myplayer();
    if (Settings.Autofarm.e) {
        if (Date['now']() - cooldowns.Autofarm > 0x32) {
            let players = unit()[0];
            let isTextDrop = false;
            for (let i = 0; i < players.length; i++) {
                const p = players[i];
                if (p.text.includes(Settings.Autofarm.comand)) {
                    isTextDrop = true
                    if (dropText.isDrop) break;
                    dropText.isDrop = true;
                    dropText.text = [];
                    dropText.crops = [];
                    crops.forEach(crop => {
                        if (!Settings.Autofarm.isDropBerries && crop == berries && inventoryHas(crop)[0]) {
                            dropText.text.push(dropText.text.length + 1 + ") save " + inventoryHas(crop)[1] + " ber");
                        } else {
                            if (inventoryHas(crop)[0]) {
                                dropText.text.push(dropText.text.length + 1 + ") " + inventoryHas(crop)[1] + " " + cropsName[crop]);
                                dropText.crops.push(Number(crop));
                            }
                        }
                    });
                }
            }
            if (!isTextDrop) {
                dropText.isDrop = false;
            }

            if (Date['now']() - cooldowns.AutofarmDrop > 500) {
                cooldowns.AutofarmDrop = Date.now();
                if (dropText.crops.length > 0) {
                    send([packets.dropall, dropText.crops.shift()]);
                }
                if (dropText.text.length > 0) {
                    send([packets.speak, dropText.text.shift()]);
                }
            }

            let _0x2a1577 = {
                'obj': null,
                'dist': -0x1,
                'type': 0x0
            };
            var _0x4770ff = {
                'x': Settings.Autofarm['x'],
                'y': Settings.Autofarm['y'],
                'width': Settings.Autofarm['xx'] - Settings.Autofarm['x'],
                'height': Settings.Autofarm['yy'] - Settings.Autofarm['y']
            };
            plants = [...unit()[3], ...unit()[40], ...unit()[46], ...unit()[48], ...unit()[49], ...unit()[52], ...unit()[53], ...unit()[63], ...unit()[64]]
            for (var i = 0x0, _0x59cf69 = plants['length'], plant = null, _0x340be5 = null; i < _0x59cf69; ++i) {
                plant = plants[i];
                if (!plant['info'] || plant['info'] === 0xa) continue;
                if (!Settings.Autofarm['water'] && plant['info'] === 0x10) continue;
                if (_0x4770ff['x'] < plant['x'] - 0x32 + 0x64 && _0x4770ff['x'] + _0x4770ff['width'] > plant['x'] - 0x32 && _0x4770ff['y'] < plant['y'] - 0x32 + 0x64 && _0x4770ff['y'] + _0x4770ff['height'] > plant['y'] - 0x32) {
                    let _0x4d83c2 = Object.keys(mouse)[0x4 + 1];
                    Settings.Autofarm.e && Settings.Autofarm['angle'] != null && (mouse[_0x4d83c2]['x'] = getUserPosition()[0x0] + plant['x'], mouse[_0x4d83c2]['y'] = getUserPosition()[0x1] + plant['y']);
                    _0x340be5 = (player['x'] - plant['x']) ** 0x2 + (player['y'] - plant['y']) ** 0x2;
                    (_0x2a1577['dist'] === -0x1 || _0x340be5 < _0x2a1577['dist']) && (_0x2a1577['dist'] = _0x340be5, _0x2a1577['obj'] = plant);;
                };
            };

            function _0x1d908b(_0xff379f, _0x13231b) {
                if (_0xff379f && _0x13231b) return Math['sqrt']((_0xff379f['x'] - _0x13231b['x']) ** 0x2 + (_0xff379f['y'] - _0x13231b['y']) ** 0x2);;
                return null;
            };
            if (_0x2a1577['obj']) {
                _0x2a1577['dist'] = _0x1d908b(player, _0x2a1577['obj']);
                switch (_0x2a1577['obj']['info']) {
                    case 0x1:
                    case 0x2:
                    case 0x3:
                        if (inventoryHas(100)[0x0]) {
                            player['right'] !== 100 && send([packets['equip'], 100]);;
                        } else {
                            if (inventoryHas(99)[0x0]) {
                                player['right'] !== 99 && send([packets['equip'], 99]);;
                            }
                        };
                        _0x2a1577['type'] = 0x2;
                        break;
                    case 0x10:
                    case 0x11:
                    case 0x12:
                    case 0x13:
                        if (Settings.Autofarm['water']) {
                            if (inventoryHas(85)[0]) {
                                if (player['right'] !== 85) send([packets['equip'], 85]);
                                _0x2a1577['type'] = 0x1;
                            };
                        } else {
                            if (inventoryHas(100)[0]) {
                                player['right'] !== 100 && send([packets['equip'], 100]);;
                            } else {
                                if (inventoryHas(99)[0]) {
                                    player['right'] !== 99 && send([packets['equip'], 99]);;
                                }
                            };
                            _0x2a1577['type'] = 0x2;
                        };
                        break;
                };
                let _0x4eca81 = {
                    'x': player['x'] - _0x2a1577['obj']['x'],
                    'y': player['y'] - _0x2a1577['obj']['y']
                },
                    _0x57c2ec = {
                        'x': Math['abs'](player['x'] - _0x2a1577['obj']['x']),
                        'y': Math['abs'](player['y'] - _0x2a1577['obj']['y'])
                    },
                    _0x1d01db = 0x0;
                if (_0x57c2ec['x'] > 0x3c) {
                    if (_0x4eca81['x'] > 0x32) _0x1d01db += 0x1;
                    if (_0x4eca81['x'] < 0x32) _0x1d01db += 0x2;
                };
                if (_0x57c2ec['y'] > 0x3c) {
                    if (_0x4eca81['y'] > 0x32) _0x1d01db += 0x8;
                    if (_0x4eca81['y'] < 0x32) _0x1d01db += 0x4;
                };
                client[Keys.movement](_0x1d01db);
                if (_0x57c2ec['x'] < (_0x2a1577['type'] === 0x1 ? 0x78 : 0x12c) && _0x57c2ec['y'] < (_0x2a1577['type'] === 0x1 ? 0x78 : 0x12c)) {
                    Settings.Autofarm['angle'] = _0x2c4b97(player, _0x2a1577['obj'], !![]);
                    let _0x2ad285 = 0x2 * Math['PI'],
                        _0x42fb54 = Math['floor']((Settings.Autofarm['angle'] + _0x2ad285) % _0x2ad285 * 0xff / _0x2ad285);
                    Settings.Autofarm['angle'] && (send([packets['attack'], _0x42fb54]), send([packets['stopAttack']]));;
                };
            } else {
                let _0x897afa = {
                    'x': player['x'] - Settings.Autofarm['sx'],
                    'y': player['y'] - Settings.Autofarm['sy']
                },
                    _0x52a51a = {
                        'x': Math['abs'](player['x'] - Settings.Autofarm['sx']),
                        'y': Math['abs'](player['y'] - Settings.Autofarm['sy'])
                    },
                    _0x265b45 = 0x0;
                if (_0x52a51a['x'] > 0x3c) {
                    if (_0x897afa['x'] > 0x0) _0x265b45 += 0x1;
                    if (_0x897afa['x'] < 0x0) _0x265b45 += 0x2;
                };
                if (_0x52a51a['y'] > 0x3c) {
                    if (_0x897afa['y'] > 0x0) _0x265b45 += 0x8;
                    if (_0x897afa['y'] < 0x0) _0x265b45 += 0x4;
                };
                client[Keys.movement](_0x265b45);
            }
            cooldowns.Autofarm = Date['now']();
        }
    }
}

function PathFinder() {
    if (!Settings.PathFinder.e) return;
    if (!script.user.alive) {
        if (Date['now']() - cooldowns.PathFinder > 3000) {
            user[Object.keys(user)[14]] = Gen(7);
            user[Object.keys(user)[15]] = Gen(5);
            spawn();
            cooldowns.PathFinder = Date['now']();
        }
        return;
    }
    let player = myplayer()


    function dropInv() {
        inv = Getinventory()
        itemIds = Object.keys(inv);
        rightItemsId = []
        counter = 0;
        for (let i = 0; i < itemIds.length; i++) {
            const id = itemIds[i];
            if (inv[id]) rightItemsId.push(id);
            counter += inv[id];
        }
        if (counter == 0) return false;

        for (let i = rightItemsId.length - 1; i >= 0; i--) {
            const id = parseInt(rightItemsId[i], 10)
            let chests = script.world.units[11];
            let currentchest = null;
            let dist = 100000;
            for (let i = 0; i < chests.length; i++) {
                let chest = chests[i];
                if (chest.info && chest.action / 2 - 1 != id) continue;
                d = (player.x - chest.x) ** 2 + (player.y - chest.y) ** 2;
                if (d < dist) {
                    dist = d;
                    currentchest = chest;
                    currentchest.dist = d;
                }
            }
            if (!currentchest) { return true }
            const pid = currentchest[Object.keys(currentchest)[1]]
            send([packets.chestPut, id, 100, pid, currentchest.id]);
        }
        return true
    }

    let dist = Math.sqrt((player['x'] - (Settings.PathFinder.x * 100 + 50)) ** 0x2 + (player['y'] - (Settings.PathFinder.y * 100 + 50)) ** 2);
    if (Settings.PathFinder.autoRestart && dist > Settings.PathFinder.dist * 100) {
        cooldowns.PathFinder = Date['now']();
        backToLobby();
    };
    if (Settings.PathFinder.autoDrop && dist < 300) {
        if (!dropInv()) {
            counter2 = 0;
            cooldowns.PathFinder = Date['now']();
            backToLobby();
        }
    };
    if (inventoryHas(333)[0]) {  // Лодка
        if (player[Object.keys(player)[63]] !== 333) send([packets['equip'], 333]);
    };

    let normDelta = {
        'x': player['x'] - (Settings.PathFinder.x * 100 + 50),
        'y': player['y'] - (Settings.PathFinder.y * 100 + 50)
    },
        absDelta = {
            'x': Math['abs'](player['x'] - (Settings.PathFinder.x * 100 + 50)),
            'y': Math['abs'](player['y'] - (Settings.PathFinder.y * 100 + 50))
        },
        res = 0x0;
    if (absDelta['x'] > 60) {
        if (normDelta['x'] > 0) res += 0x1;
        if (normDelta['x'] < 0) res += 0x2;
    };
    if (absDelta['y'] > 60) {
        if (normDelta['y'] > 0) res += 0x8;
        if (normDelta['y'] < 0) res += 0x4;
    };
    client[Keys.movement](res);
}

function HoldWeapon(_, $) {
    switch (_) {
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
        case 25:
        case 26:
        case 27:
        case 60:
        case 61:
            return 2;   // копья
        case 0:
        case 5:
        case 6:
        case 9:
        case 28:
        case 48:
        case 103:
        case 108:
        case 109:
        case 110:
        case 111:
        case 112:
        case 113:
        case 114:
        case 115:
        case 116:
        case 117:
        case 118:
            return 1;   // мечи
        case 119:
        case 120:
        case 121:
        case 122:
        case 123:
        case 124:
        case 125:
        case 126:
        case 127:
        case 128:
        case 129:
        case 130:
        case 131:
        case 132:
        case 133:
        case 134:
            return 3;   // луки
        case 167:
        case 168:
        case 169:
        case 170:
        case 171:
        case 172:
        case 173:
        case 174:
        case 175:
        case 176:
        case 177:
        case 178:
        case 179:
        case 180:
        case 181:
            return 6;   // топоры
        case 72:
            if ($) return 4;   // супер молот
        case -1:
            if ($) return 5;   // руки
    }
    return 0;
}


function aimbot() {
    requestAnimationFrame(aimbot);
    if (!script.user.alive) return;
    if (!Settings.AMB.off) Settings.textalert.e = false;
    if (Settings.TurnOffScript.e) return;

    let myPlayer = myplayer();
    const maxDist = 550000;
    const outDist = 120000;
    const normDist = 50000;

    function calcAngle(_, $, o) {
        return _ && $ ? (o ? Math.atan2($.r.y - _.r.y, $.r.x - _.r.x) : Math.atan2($.y - _.y, $.x - _.x)) : null;
    }

    function EnemyToAttack(myPlayer, PlayerList) {
        let nearest = NearestEnemy(myPlayer, PlayerList);

        if (Settings.AMB_rotation && Settings.AMB.e && Settings.AMB.a != null) {
            mouse[Object.keys(mouse)[4 + 1]].x = getUserPosition()[0] + nearest.x;
            mouse[Object.keys(mouse)[4 + 1]].y = getUserPosition()[1] + nearest.y;
        }

        return nearest;
    }

    function NearestEnemy(myPlayer, PlayerList) {
        let nearest = null;
        let distSqrd = maxDist;
        const myPid = myPlayer[Object.keys(myPlayer)[1]]

        for (var i = 0, obj = null, d = null; i < PlayerList.length; ++i) {
            obj = PlayerList[i];
            const pid = obj[Object.keys(obj)[1]]
            if (pid === myPid || isAlly(pid)) continue; // Skip self and allies
            if (!isAlly(pid) && myPlayer[fly] === obj[fly] && !obj.ghost) {
                d = (myPlayer.x - obj.x) ** 2 + (myPlayer.y - obj.y) ** 2;
                if (d < distSqrd) {
                    distSqrd = d;
                    nearest = obj;
                    enemyForAMB.pid = pid;
                    enemyForAMB.d = d;
                }
            }
        }
        return nearest;
    }

    function EnemyToAttack_V2(myPlayer, PlayerList) {
        if (enemyForAMB.pid) {
            for (var i = 0, obj = null, d = null; i < PlayerList.length; ++i) {
                obj = PlayerList[i];
                const pid = obj[Object.keys(obj)[1]]
                if (pid != enemyForAMB.pid) continue;


                if (!isAlly(pid) && myPlayer[fly] === obj[fly] && !obj.ghost) {
                    d = (myPlayer.x - obj.x) ** 2 + (myPlayer.y - obj.y) ** 2;
                    if (d < normDist) {
                        enemyForAMB.d = d;
                        return obj
                    }
                    if (d < outDist) {
                        enemyForAMB.d = d;
                        return obj
                    } else {
                        return NearestEnemy(myPlayer, PlayerList);
                    }
                } else {
                    return NearestEnemy(myPlayer, PlayerList);
                }
            }

        } else {
            return NearestEnemy(myPlayer, PlayerList);
        }
    }

    function dist2dSQRT(p1, p2) {
        if (p1 && p2) {
            return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
        }
        return null;
    }
    if (!Settings.AMB.e) enemyForAMB.pid = null;
    if (Settings.AMB.e && Settings.AMB_V2 && myPlayer && script.user.alive) {
        aimbotV2();
    }

    if (Settings.AMB.e && !Settings.AMB_V2 && myPlayer && script.user.alive) {
        const weaponType = HoldWeapon(myPlayer.right, true);
        let myRange;
        switch (weaponType) {
            case 1:
                myRange = myPlayer[fly] ? 196.8 : 157.6;
                break;
            case 2:
                myRange = myPlayer[fly] ? 291.8 : 227.6;
                break;
            case 3:
                myRange = 620;
                break;
            case 4:
                myRange = myPlayer[fly] ? 196.8 : 157.6;
                break;
            case 5:
                myRange = myPlayer.clothe == 158 || myPlayer.clothe == 156 ? (myPlayer[fly] ? 120.8 : 97.6) : null;
                break;
            case 6:
                myRange = myPlayer[fly] ? 140 : 125;
                break;
            default:
                myRange = null;
                break;
        }
        if (myRange) {
            const Enemy = EnemyToAttack(myPlayer, script.world.units[0]);

            ctx.save();
            const pid = Enemy[Object.keys(Enemy)[1]]
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(script.user.cam.x + myPlayer.x, script.user.cam.y + myPlayer.y);
            ctx.lineTo(script.user.cam.x + Enemy.x, script.user.cam.y + Enemy.y);
            ctx.strokeStyle = "#e100ff";
            ctx.stroke();
            ctx.restore();

            if (Enemy) {
                const RangeBetweenMeAndEnemy = dist2dSQRT(myPlayer, Enemy);
                if (RangeBetweenMeAndEnemy <= myRange) {
                    Settings.AMB.a = calcAngle(myPlayer, Enemy, true);
                    Settings.AMB.t = Enemy;
                    const e = 2 * Math.PI;
                    const Angle255 = Math.floor((((Settings.AMB.a + e) % e) * 255) / e);

                    if (Settings.AMB_rotation) {
                        // send([packets.angle, Angle255]);
                    }
                    if (Settings.AMB.a && RangeBetweenMeAndEnemy <= myRange - 27) {
                        send([packets.attack, Angle255]);
                        send([packets.stopAttack]);
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

    function aimbotV2() {
        const weaponType = HoldWeapon(myPlayer.right, true);
        let myRange;
        switch (weaponType) {
            case 1:
                myRange = myPlayer[fly] ? 196.8 : 157.6;
                break;
            case 2:
                myRange = myPlayer[fly] ? 291.8 : 227.6;
                break;
            case 3:
                myRange = 620;
                break;
            case 4:
                myRange = myPlayer[fly] ? 140 : 125;
                break;
            case 5:
                myRange = myPlayer[Object.keys(myPlayer)[63]] == 85 || myPlayer.clothe == 83 ? (myPlayer[fly] ? 120.8 : 97.6) : null;
                break;
            default:
                myRange = null;
                break;
        }


        const Enemy = EnemyToAttack_V2(myPlayer, script.world.units[0]);
        if (Enemy) {
            ctx.save();
            const pid = Enemy[Object.keys(Enemy)[1]]
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(script.user.cam.x + myPlayer.x, script.user.cam.y + myPlayer.y);
            ctx.lineTo(script.user.cam.x + Enemy.x, script.user.cam.y + Enemy.y);
            if (enemyForAMB.d < normDist) ctx.strokeStyle = "#e100ff";
            else ctx.strokeStyle = "#ff006a";
            if (enemyForAMB.d > normDist) Settings.AMB.off = false;
            ctx.stroke();
            ctx.restore();

            if (enemyForAMB.d < normDist) {
                if (Settings.AMB_rotation) {
                    mouse[Object.keys(mouse)[4 + 1]].x = getUserPosition()[0] + Enemy.x;
                    mouse[Object.keys(mouse)[4 + 1]].y = getUserPosition()[1] + Enemy.y;
                }
                ctx.save();
                ctx.font = "15px Baloo Paaji";
                ctx.fillStyle = "red";
                ctx.fillText(`⬤`, mouse[Object.keys(mouse)[4 + 1]].x, mouse[Object.keys(mouse)[4 + 1]].y);
                ctx.restore();
            }
        }

        if (Settings.AMB.off) {
            Settings.textalert.t = "AMB OFF"
            Settings.textalert.e = true
        }

        if (myRange) {
            if (Enemy) {

                const RangeBetweenMeAndEnemy = dist2dSQRT(myPlayer, Enemy);
                if (RangeBetweenMeAndEnemy <= myRange) {
                    Settings.AMB.a = calcAngle(myPlayer, Enemy, true);
                    Settings.AMB.t = Enemy;
                    const e = 2 * Math.PI;
                    const Angle255 = Math.floor((((Settings.AMB.a + e) % e) * 255) / e);

                    if (!Settings.AMB.off && Settings.AMB.a && RangeBetweenMeAndEnemy <= myRange - 22) {
                        send([packets.attack, Angle255]);
                        send([packets.stopAttack]);
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


function calculateHp(units) {
    if (!script.user.alive) return;

    function getWeaponDist(myPlayer) {
        let weaponType = 0
        switch (myPlayer.right) {
            case 34:
            case 18:
            case 33:
            case 15:
            case 14:
            case 13:
            case 12:
            case 16:
            case 17:
                weaponType = 2;
                break
            case 28:   // book
            case 57:
            case 5:
            case 6:
            case 30:
            case 62:
            case 9:
            case 0:
            case 63:
            case 19:
                weaponType = 1;
                break
            case 64:
            case 65:
            case 66:
            case 67:
            case 68:
            case 70:
            case 69:
                weaponType = 3;
                break
            case 8:
            case 1:
            case 3:
            case 4:
            case 31:
            case 32:
            case 46:
            case 50:
            case 51:
            case 52:
            case 49:
            case 55:
            case 56:
            case 28:
            case 35:
            case 36:
            case 37:
            case 38:
            case 39:
            case 45:
                weaponType = 4;
                break
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case -1:
                weaponType = 5;
                break
        }
        let myRange;
        switch (weaponType) {
            case 1:
                myRange = myPlayer[fly] ? 196.8 : 157.6;
                break;
            case 2:
                myRange = myPlayer[fly] ? 291.8 : 227.6;
                break;
            case 3:
                myRange = 620;
                break;
            case 4:
                myRange = myPlayer[fly] ? 140 : 125;
                break;
            case 5:
                myRange = myPlayer[fly] ? 120.8 : 97.6;
                break;
            default:
                myRange = 0;
                break;
        }
        return myRange;
    }

    function calcAngle(_, $, o) {
        return _ && $ ? (o ? Math.atan2($.r.y - _.r.y, $.r.x - _.r.x) : Math.atan2($.y - _.y, $.x - _.x)) : null;
    }

    function NearestEntity(myPlayer, AllEntity) {
        let weaponDist = getWeaponDist(myPlayer)
        let nearest = [];
        let myPid = myPlayer[Object.keys(myPlayer)[1]]

        for (var i = 0, obj = null, d = null; i < AllEntity.length; ++i) {
            obj = AllEntity[i];
            if (obj.type == 0 && myPid == obj[Object.keys(obj)[1]]) continue;
            if (!myPlayer.ghost) {
                d = (myPlayer.x - obj.x) ** 2 + (myPlayer.y - obj.y) ** 2;
                d = Math.sqrt(d)
                if (d < weaponDist) {
                    angle = calcAngle(myPlayer, obj)
                    if (Math.abs(angle - myPlayer.angle) < 1.5) {
                        nearest.push(obj);
                    }
                }
            }
        }
        return nearest;
    }

    function NearestPlayer(ent, PlayerList) {
        let nearest = null;
        let dist = 900;

        for (var i = 0, obj = null, d = null; i < PlayerList.length; ++i) {
            obj = PlayerList[i];
            if (!obj.ghost) {
                d = Math.sqrt((ent.x - obj.x) ** 2 + (ent.y - obj.y) ** 2)
                if (d < dist) {
                    dist = d;
                    nearest = obj;
                }
            }
        }
        return nearest;
    }

    function NearestEnemy(player) {
        Mobs = [...units[60], ...units[61], ...units[62], ...units[63], ...units[64], ...units[65], ...units[66], ...units[68], ...units[69], ...units[76]]
        let nearest = null;
        let dist = 300;

        for (var i = 0, obj = null, d = null; i < Mobs.length; ++i) {
            obj = Mobs[i];
            d = Math.sqrt((player.x - obj.x) ** 2 + (player.y - obj.y) ** 2)
            if (d < dist) {
                dist = d;
                nearest = obj;
            }
        }
        if (nearest) {
            let dmg = damageList[nearest.type];
            if (protectionList[player[Object.keys(player)[63]]]) {
                log('protect m', protectionList[player[Object.keys(player)[63]]][1]);
                dmg -= protectionList[player[Object.keys(player)[63]]][1]
            }
            if (dmg < 0) dmg = 0;
            activeUnits[player.type][player.id].hp -= damageList[nearest.type];
            return
        }

        dist = 150;
        nearest = null;
        Spikes = [...units[5], ...units[12], ...units[13], ...units[14], ...units[20], ...units[52]]
        for (var i = 0, obj = null, d = null; i < Spikes.length; ++i) {
            obj = Spikes[i];
            d = Math.sqrt((player.x - obj.x) ** 2 + (player.y - obj.y) ** 2)
            if (d < dist) {
                dist = d;
                nearest = obj;
            }
        }
        if (nearest) {
            activeUnits[player.type][player.id].hp -= damageList[nearest.type];
        }

    }



    const players = units[0];
    AllEntity = [...units[0], ...units[82], ...units[69], ...units[73], ...units[68], ...units[66], ...units[65], ...units[62], ...units[63], ...units[78], ...units[77], ...units[64], ...units[72], ...units[88], ...units[76], ...units[75], ...units[74], ...units[60], ...units[80], ...units[61], ...units[67], ...units[71], ...units[70]]

    for (let i = 0; i < AllEntity.length; i++) {
        ent = AllEntity[i];
        if (ent.type == 0) ent.id = ent[Object.keys(ent)[1]];
        action = (ent.action >> 1) & 1
        if (!activeUnits[ent.type][ent.id]) {
            activeUnits[ent.type][ent.id] = {
                timer: Date.now(),
                hp: maxHpList[ent.type],
                lastAction: 0,
                players: [],
                counter: 0,
                lastHEAL: 0,
                lastCOLD: 0,
                lastHUNGER: 0,

            };
        }
        if (action && activeUnits[ent.type][ent.id].players.length) {
            if (activeUnits[ent.type][ent.id].players.length > 1) { log('TOO MACH Atakers!!!') }
            activeUnits[ent.type][ent.id].counter += activeUnits[ent.type][ent.id].players.length
            for (let j = 0; j < activeUnits[ent.type][ent.id].players.length; j++) {
                const pid = activeUnits[ent.type][ent.id].players[j];
                if (damageMap.has(activePlayers[pid].right)) {
                    dmg = damageMap.get(activePlayers[pid].right)
                } else dmg = 0;

                if (ent.type == 0) {
                    mypid = ent[Object.keys(ent)[1]]
                    if (isAlly(pid) && isAlly(mypid)) {
                        dmg = Math.floor(dmg * 0.3)
                    }
                    if (protectionList[ent[Object.keys(ent)[63]]]) {
                        dmg -= protectionList[ent[Object.keys(ent)[63]]][0]
                    }
                    if (dmg < 0) dmg = 0;
                }
                if (dmg) activeUnits[ent.type][ent.id].hp -= dmg;
            }
            activeUnits[ent.type][ent.id].players = [];

        }
        if (action != activeUnits[ent.type][ent.id].lastAction && !action && activeUnits[ent.type][ent.id].counter == 0) {
            if (ent.type == 0) {
                NearestEnemy(ent)
            } else {
                pl = NearestPlayer(ent, players);
                if (pl) {
                    if (damageMap.has(pl.right)) {
                        dmg = damageMap.get(pl.right)
                    } else dmg = 0;
                    activeUnits[ent.type][ent.id].hp -= dmg;
                }
            }
        }
        if (action != activeUnits[ent.type][ent.id].lastAction && !action) activeUnits[ent.type][ent.id].counter = 0;


        if (ent.type == 0) {
            isHEAL = (ent.action >> 7) & 1   // + 42
            isCOLD = (ent.action >> 2) & 1   // 20
            isHUNGER = (ent.action >> 3) & 1 // 30

            if (isHUNGER && isHUNGER != activeUnits[ent.type][ent.id].lastHUNGER) activeUnits[ent.type][ent.id].hp -= 30;
            if (isCOLD && isCOLD != activeUnits[ent.type][ent.id].lastCOLD) activeUnits[ent.type][ent.id].hp -= 20;
            if (isHEAL && isHEAL != activeUnits[ent.type][ent.id].lastHEAL) activeUnits[ent.type][ent.id].hp += 42;
            if (activeUnits[ent.type][ent.id].hp > 200) activeUnits[ent.type][ent.id].hp = 200;
            if (activeUnits[ent.type][ent.id].hp < 0) activeUnits[ent.type][ent.id].hp = 0;

            activeUnits[ent.type][ent.id].lastHUNGER = isHUNGER;
            activeUnits[ent.type][ent.id].lastCOLD = isCOLD;
            activeUnits[ent.type][ent.id].lastHEAL = isHEAL;
        }

        activeUnits[ent.type][ent.id].lastAction = action;
        activeUnits[ent.type][ent.id].timer = Date.now();
    }



    for (let i = 0; i < players.length; i++) {
        pl = players[i];
        let pid = players[i][Object.keys(players[i])[1]]
        let PAttack = (players[i].action >> 4) & 1
        if (!activePlayers[pid]) {
            activePlayers[pid] = {
                right: players[i].right,
                attack: PAttack
            };
        } else {
            activePlayers[pid].right = players[i].right;
        }
        if (activePlayers[pid].attack != PAttack && PAttack) {
            entitys = NearestEntity(pl, AllEntity);
            for (let j = 0; j < entitys.length; j++) {
                ent = entitys[j];
                if (!activeUnits[ent.type][ent.id].players.includes(pid)) {
                    activeUnits[ent.type][ent.id].players.push(pid)
                }
            }
        }
        if (activePlayers[pid].attack != PAttack && !PAttack) {
            for (let j = 0; j < AllEntity.length; j++) {
                ent = AllEntity[j];
                if (activeUnits[ent.type][ent.id].players.includes(pid)) {
                    activeUnits[ent.type][ent.id].players.splice(activeUnits[ent.type][ent.id].players.indexOf(pid), 1);
                }
            }
        }
        activePlayers[pid].attack = PAttack
    }

    timeNow = Date.now();
    types = Object.keys(activeUnits);
    for (let i = 0; i < types.length; i++) {
        type = types[i]
        ids = Object.keys(activeUnits[type]);
        for (let j = 0; j < types.length; j++) {
            ent = activeUnits[type][ids[j]]
            if (type == 86) {
                if (timeNow - ids.timer > 2000) {
                    delete activeUnits[type][ids[j]]
                    continue
                }
            }
            if (timeNow - ids.timer > 19000) {
                delete activeUnits[type][ids[j]]
            }
        }
    }

}

function valueToColor(value) {
    const red = Math.floor(255 * (1 - value));
    const green = Math.floor(255 * value);
    const blue = 0;

    if (value > 10000) {
        return 'rgb(0, 255, 0)';
    }

    // Форматируем RGB-строку
    return `rgb(${red}, ${green}, ${blue})`;
}

PlayersTimer = {};

function calculateTimers(units) {
    const players = units[0];
    const timeNow = Date.now();

    ctx.strokeStyle = "black";
    ctx.lineWidth = 7;

    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        let pid = player[Object.keys(player)[1]];

        if (pid === script.user.id) continue;
        isHEAL = (player.action >> 7) & 1;
        if (isHEAL) {
            if (pid in PlayersTimer && timeNow - PlayersTimer[pid].t > 1000) {
                PlayersTimer[pid].t = timeNow;
            } else {
                PlayersTimer[pid] = { t: timeNow };
            }
        }
        if (!(pid in PlayersTimer)) PlayersTimer[pid] = { t: timeNow };

        t = ((timeNow - PlayersTimer[pid].t) % 10000) / 10000;
        ctx.fillStyle = valueToColor(t);
        ctx.strokeText((t * 10).toFixed(1), script.user.cam.x + player.x - 25, script.user.cam.y + player.y + 5);
        ctx.fillText((t * 10).toFixed(1), script.user.cam.x + player.x - 25, script.user.cam.y + player.y + 5);
    }
}


function blizzard() {
    requestAnimationFrame(blizzard)
    if (Settings.TurnOffScript.e || !Keys.is_set) return;

    var use = -8;

    const canvas = document.getElementById("game_canvas");
    const ctx = canvas.getContext("2d");
    autofeed = user[Keys.autofeed];

    if (script.user.alive && user[Keys.blizzard][Object.keys(user[Keys.blizzard])[1]]) {
        ctx.save();
        ctx.drawImage(
            BlizzardImage,
            autofeed.translate.x - 100,
            autofeed.translate.y + use - 80
        );
        use += 70;
    }
    if (script.user.alive && user[Keys.sandstorm][Object.keys(user[Keys.blizzard])[1]]) {
        ctx.save();
        ctx.drawImage(
            SandstormImage,
            autofeed.translate.x - 100,
            autofeed.translate.y + use - 80
        );
        use += 70;
    }

    if (Settings.fps.e) {
        timeNow = Date.now();
        if (timeNow - Settings.fps.last > 1000) {
            Settings.fps.fps = Settings.fps.count;
            Settings.fps.count = 0;
            Settings.fps.last = timeNow;
        }
        Settings.fps.count += 1;
        ctx.save();
        ctx.lineWidth = 6;
        ctx.textAlign = 'left';
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.font = "34px Baloo Paaji";

        ctx.strokeText('FPS ' + Settings.fps.fps, canvas.width * 1.2, 30);
        ctx.fillText('FPS ' + Settings.fps.fps, canvas.width * 1.2, 30);
        ctx.restore();

    }

}
let ally = [];
const heartEmoji = "\u{1F9E1}";
const extractor_ids = [24, 25, 26, 27, 28];

const foodItems = [294, 231, 201, 208, 291, 229, 238, 315, 317, 356, 236]
let ice = [235, 200];
let lastFood = [0, 0];
let enemyForAMB = { pid: null, d: 0 };
let lootboxsinfo = {};
let deathboxinfo = {};
let mobboxinfo = {};
let activeUnits = {
    0: {},
    82: {},
    86: {},
    69: {},
    73: {},
    68: {},
    66: {},
    65: {},
    62: {},
    63: {},
    78: {},
    77: {},
    64: {},
    72: {},
    88: {},
    76: {},
    75: {},
    74: {},
    60: {},
    80: {},
    61: {},
    67: {},
    71: {},
    70: {},
};
let activePlayers = {};
const protectionList = {
    58: [1, 4],
    25: [2, 8],
    26: [4, 13],
    27: [5, 19],
    43: [6, 23],
    44: [7, 25],
    59: [8, 27],
    60: [9, 30],
    61: [9, 30],  // CROWN_CRAB
    48: [2, 8],
    47: [4, 16],
    77: [4, 16],
    78: [4, 16],
    79: [4, 16],
};
const damageList = {
    5: 10,    // Spikes
    12: 20,
    13: 30,
    14: 40,
    20: 50,
    52: 60,
    60: 40,   // Mobs
    61: 30,
    62: 40,
    63: 60,
    64: 85,
    65: 40,
    66: 60,
    68: 50,
    69: 90,
    76: 60,
};
const maxHpList = {
    82: 300,
    86: 30,
    0: 200,   // PLAYERS
    69: 3000,
    73: 1500,
    68: 600,
    66: 6000,
    65: 300,
    62: 300,
    63: 900,
    78: 3000,
    77: 1000,
    64: 1500,
    72: 900,
    88: 90,
    76: 1500,
    75: 600,
    74: 300,
    60: 300,
    80: 60,
    61: 120,
    67: 240,
    71: 1500,
    70: 600,
};
const damageMap = new Map([
    [-1, 5],
    [8, 1],
    [1, 2],
    [3, 3],
    [4, 4],
    [31, 5],
    [32, 6],
    [46, 2],
    [50, 3],
    [51, 4],
    [52, 5],
    [35, 2],
    [36, 3],
    [37, 4],
    [38, 5],
    [39, 6],
    [45, 12],
    [12, 10],
    [13, 14],
    [14, 15],
    [15, 17],
    [33, 18],
    [34, 22],
    [16, 22],
    [17, 24],
    [18, 24],   // CRAB_SPEAR (for seafarm)
    [49, 1],
    [55, 1],
    [56, 1],
    [28, 1],
    [57, 12],
    [0, 19],
    [5, 22],
    [6, 24],
    [30, 27],
    [19, 30],
    [62, 30],
    [63, 33],
    [9, 24],    // PIRATE_SWORD
    [71, 1],    // SHIELDs
    [72, 2],
    [73, 3],
    [74, 4],
    [75, 5],
    [76, 6],
]);



const whuteListXray = [199, 200, 202, 203, 205, 212, 304, 418, 524, 526, 527, 895, 898, 912, 1755]
const fogs = [354, 1349]
const roof_id = 1102;
XraySprites = {}
NoXraySprites = {}
let mypid = -1;



function loadRoof() {
    for (let k = 0; k < unsafeWindow.sprite[roof_id].length; k++) {
        if (!unsafeWindow.sprite[roof_id][k]) continue;
        if (!unsafeWindow.sprite[roof_id][k].length) continue;
        for (let l = 0; l < unsafeWindow.sprite[roof_id][k].length; l++) {
            const originalImg = unsafeWindow.sprite[roof_id][k][l];

            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = originalImg.width;
            tempCanvas.height = originalImg.height;
            const tempCtx = tempCanvas.getContext('2d');

            tempCtx.drawImage(originalImg, 0, 0);

            const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
            const data = imageData.data;

            const alphaValue = 0.5;
            for (let j = 0; j < data.length; j += 4) {
                if (data[j + 3] !== 0) {
                    data[j + 3] = Math.round(data[j + 3] * alphaValue);
                }
            }

            tempCtx.putImageData(imageData, 0, 0);

            const newImg = new Image();
            newImg.src = tempCanvas.toDataURL();

            unsafeWindow.sprite[roof_id][k][l] = newImg;

        }
    }
    log('load Roofs')
}

function loadFog() {
    if (isError) { return; }

    const FogCanvas = document.createElement('canvas');
    FogCanvas.width = 10;
    FogCanvas.height = 10;

    const img = new Image();
    img.src = FogCanvas.toDataURL();

    fogs.forEach(function (i, id, arr) {
        for (let k = 0; k < unsafeWindow.sprite[i].length; k++) {
            if (!unsafeWindow.sprite[i][k]) continue;
            if (!unsafeWindow.sprite[i][k].length) continue;
            log(i);
            for (let l = 0; l < unsafeWindow.sprite[i][k].length; l++) {
                unsafeWindow.sprite[i][k][l] = img;
            }
        }
    });

}

function loadXray() {
    if (isError) { return; }

    log('sprite', unsafeWindow.sprite);

    whuteListXray.forEach(function (i, id, arr) {
        XraySprites[i] = [];
        NoXraySprites[i] = [];
        for (let k = 0; k < unsafeWindow.sprite[i].length; k++) {
            if (!unsafeWindow.sprite[i][k]) continue;
            if (!unsafeWindow.sprite[i][k].length) continue;
            log(i, Settings.Xray.ready);
            XraySprites[i].push([]);
            NoXraySprites[i].push([]);

            for (let l = 0; l < unsafeWindow.sprite[i][k].length; l++) {
                const originalImg = unsafeWindow.sprite[i][k][l];
                if (!originalImg) continue;
                const cachedDataURL = localStorage.getItem('XrayImg' + i + '_' + k + '_' + l);
                if (cachedDataURL & Settings.Xray.ready) {
                    const newImg = new Image();
                    newImg.src = cachedDataURL;
                    newImg.onload = function () {
                        XraySprites[i][k].push(newImg);
                    };
                    const tempCanvas2 = document.createElement('canvas');
                    tempCanvas2.width = originalImg.width;
                    tempCanvas2.height = originalImg.height;
                    const tempCtx2 = tempCanvas2.getContext('2d');
                    tempCtx2.drawImage(originalImg, 0, 0);
                    const copyImg = new Image();
                    copyImg.src = tempCanvas2.toDataURL();
                    copyImg.onload = function () {
                        NoXraySprites[i][k].push(copyImg);
                    };
                    continue;
                }

                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = originalImg.width;
                tempCanvas.height = originalImg.height;
                if (tempCanvas.width == 0) continue;
                const tempCtx = tempCanvas.getContext('2d');
                const tempCanvas2 = document.createElement('canvas');
                tempCanvas2.width = originalImg.width;
                tempCanvas2.height = originalImg.height;
                const tempCtx2 = tempCanvas2.getContext('2d');

                tempCtx.drawImage(originalImg, 0, 0);
                tempCtx2.drawImage(originalImg, 0, 0);

                const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
                const data = imageData.data;

                const alphaValue = Settings.Xray.a;
                for (let j = 0; j < data.length; j += 4) {
                    if (data[j + 3] !== 0) {
                        data[j + 3] = Math.round(data[j + 3] * alphaValue);
                    }
                }

                tempCtx.putImageData(imageData, 0, 0);

                const newImg = new Image();
                const copyImg = new Image();
                newImg.src = tempCanvas.toDataURL();
                copyImg.src = tempCanvas2.toDataURL();
                localStorage.setItem('XrayImg' + i + '_' + k + '_' + l, tempCanvas.toDataURL());
                newImg.onload = function () {
                    XraySprites[i][k].push(newImg);
                };
                copyImg.onload = function () {
                    NoXraySprites[i][k].push(copyImg);
                };
            }
        }
    });
    Settings.Xray.ready = true;
    kasdgiksadg.saveSettings();

}


function drow(i, img, ctx) {

    if (img.localName == 'img') {
        if (img[Object.keys(img)[0]] == 0) {
            img.src = img.baseURI + img[Object.keys(img)[3]]
        }
    } else {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = img.width;
        tempCanvas.height = img.height;
        const tempCtx = tempCanvas.getContext('2d');

        tempCtx.drawImage(img, 0, 0);

        const newImg = new Image();
        newImg.src = tempCanvas.toDataURL();
    }

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 6;
    ctx.fillStyle = "red";
    ctx.strokeStyle = "black";
    ctx.font = "50px Baloo Paaji";
    if (img) ctx.drawImage(img, 500, 300);
    ctx.strokeText(i, 500, 250);
    ctx.fillText(i, 500, 250);
    ctx.restore();

}


function draw(i, ctx) {
    if (!unsafeWindow.sprite[i].length) return;
    for (let k = 0; k < unsafeWindow.sprite[i].length; k++) {
        if (!unsafeWindow.sprite[i][k]) return;
        if (!unsafeWindow.sprite[i][k].length) {
            drow(i, unsafeWindow.sprite[i][k], ctx);
            return;
        } else {
            for (let l = 0; l < unsafeWindow.sprite[i].length; l++) {
                if (!unsafeWindow.sprite[i][k][l]) return;
                if (!unsafeWindow.sprite[i][k][l].length) {
                    drow(i, unsafeWindow.sprite[i][k][l], ctx);
                    return;
                } else {
                    drow(i, unsafeWindow.sprite[i][k][l][0], ctx);
                    return;
                }
            }
        };
    }
}

function draw2(i, ctx) {
    if (!Keys.is_set) return;
    if (!game[Keys.game_img].length) return;
    if (!game[Keys.game_img][i]["info"]) return;
    let o = game[Keys.game_img][i]["info"]
    o[Object.keys(o)[2]][0]
    drow(i, o[Object.keys(o)[2]][0], ctx);
}


// Xray!!!
function XrayOn() {
    if (!script.user.alive) return;
    whuteListXray.forEach(function (i, id, arr) {
        if (XraySprites[i].length != 0) {
            for (let k = 0; k < unsafeWindow.sprite[i].length; k++) {
                if (XraySprites[i][k].length == 0) return;
                for (let l = 0; l < unsafeWindow.sprite[i][k].length; l++) {
                    unsafeWindow.sprite[i][k][l] = XraySprites[i][k][l].cloneNode(true);
                }
            }
        }
    });


}
function XrayOff() {
    whuteListXray.forEach(function (i, id, arr) {
        if (XraySprites[i].length != 0) {
            for (let k = 0; k < unsafeWindow.sprite[i].length; k++) {
                if (NoXraySprites[i][k].length == 0) return;
                for (let l = 0; l < unsafeWindow.sprite[i][k].length; l++) {
                    unsafeWindow.sprite[i][k][l] = NoXraySprites[i][k][l].cloneNode(true);
                }
            }
        }
    });
}


function loadSpikes() {
    RSpikeAlly = new Image;
    RSpikeAlly.src = "https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/d-r-s-a.png?raw=true"
    AmethystSpikeAlly = new Image;
    AmethystSpikeAlly.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-amethyst-spike-ally.png"
    DiamondSpikeAlly = new Image;
    DiamondSpikeAlly.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-diamond-spike-ally.png"
    GoldSpikeAlly = new Image;
    GoldSpikeAlly.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-gold-spike-ally.png"
    StoneSpikeAlly = new Image;
    StoneSpikeAlly.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-stone-spike-ally.png"
    WoodSpikeAlly = new Image;
    WoodSpikeAlly.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-wood-spike-ally.png"

    dayWoodDoorAlly = new Image;
    dayWoodDoorAlly.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-wood-door-ally.png?raw=true"
    dayStoneDoorAlly = new Image;
    dayStoneDoorAlly.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-stone-door-ally.png?raw=true"
    dayGoldDoorAlly = new Image;
    dayGoldDoorAlly.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-gold-door-ally.png?raw=true"
    dayDiamondDoorAlly = new Image;
    dayDiamondDoorAlly.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-diamond-door-ally.png?raw=true"
    dayAmethystDoorAlly = new Image;
    dayAmethystDoorAlly.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-amethyst-door-ally.png?raw=true"
    dayReiditeDoorAlly = new Image;
    dayReiditeDoorAlly.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-reidite-door-ally.png?raw=true"
    dayWoodDoorSpikeAlly = new Image;
    dayWoodDoorSpikeAlly.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-wood-spike-door-ally.png?raw=true"
    dayStoneDoorSpikeAlly = new Image;
    dayStoneDoorSpikeAlly.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-stone-spike-door-ally.png?raw=true"
    dayGoldDoorSpikeAlly = new Image;
    dayGoldDoorSpikeAlly.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-gold-spike-door-ally.png?raw=true"
    dayDiamondDoorSpikeAlly = new Image;
    dayDiamondDoorSpikeAlly.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-diamond-spike-door-ally.png?raw=true"
    dayAmethystDoorSpikeAlly = new Image;
    dayAmethystDoorSpikeAlly.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-amethyst-spike-door-ally.png?raw=true"
    dayReiditeDoorSpikeAlly = new Image;
    dayReiditeDoorSpikeAlly.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-reidite-spike-door-ally.png?raw=true"


    ReiditeSpikeEnemy = new Image;
    ReiditeSpikeEnemy.src = 'https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/d-r-s-e.png?raw=true'
    AmethystSpikeEnemy = new Image;
    AmethystSpikeEnemy.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-amethyst-spike-enemy.png"
    DiamondSpikeEnemy = new Image;
    DiamondSpikeEnemy.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-diamond-spike-enemy.png"
    GoldSpikeEnemy = new Image;
    GoldSpikeEnemy.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-gold-spike-enemy.png"
    StoneSpikeEnemy = new Image;
    StoneSpikeEnemy.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-stone-spike-enemy.png"
    WoodSpikeEnemy = new Image;
    WoodSpikeEnemy.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-wood-spike-enemy.png"

    dayWoodDoorEnemy = new Image;
    dayWoodDoorEnemy.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-wood-door-enemy.png?raw=true"
    dayStoneDoorEnemy = new Image;
    dayStoneDoorEnemy.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-stone-door-enemy.png?raw=true"
    dayGoldDoorEnemy = new Image;
    dayGoldDoorEnemy.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-gold-door-enemy.png?raw=true"
    dayDiamondDoorEnemy = new Image;
    dayDiamondDoorEnemy.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-diamond-door-enemy.png?raw=true"
    dayAmethystDoorEnemy = new Image;
    dayAmethystDoorEnemy.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-amethyst-door-enemy.png?raw=true"
    dayReiditeDoorEnemy = new Image;
    dayReiditeDoorEnemy.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-reidite-door-enemy.png?raw=true"
    dayWoodDoorSpikeEnemy = new Image;
    dayWoodDoorSpikeEnemy.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-wood-spike-door-enemy.png?raw=true"
    dayStoneDoorSpikeEnemy = new Image;
    dayStoneDoorSpikeEnemy.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-stone-spike-door-enemy.png?raw=true"
    dayGoldDoorSpikeEnemy = new Image;
    dayGoldDoorSpikeEnemy.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-gold-spike-door-enemy.png?raw=true"
    dayDiamondDoorSpikeEnemy = new Image;
    dayDiamondDoorSpikeEnemy.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-diamond-spike-door-enemy.png?raw=true"
    dayAmethystDoorSpikeEnemy = new Image;
    dayAmethystDoorSpikeEnemy.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-amethyst-spike-door-enemy.png?raw=true"
    dayReiditeDoorSpikeEnemy = new Image;
    dayReiditeDoorSpikeEnemy.src = "https://raw.githubusercontent.com/PolkovnikovPavel/starve_io_Multihack/refs/heads/master/img/day-reidite-spike-door-enemy.png?raw=true"



    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMOPQRSTUVWXYZ_0123456789";

    for (let e in unsafeWindow) {
        if (!Array.isArray(unsafeWindow[e]) && chars.includes(e[0])) continue;
        if (unsafeWindow[e].length > 1300 && unsafeWindow[e].length < 2000) {
            unsafeWindow.sprite = unsafeWindow[e];
        }
    }
    // return
    unsafeWindow.sprite[10000] = [WoodSpikeAlly, WoodSpikeAlly];
    unsafeWindow.sprite[10001] = [WoodSpikeEnemy, WoodSpikeEnemy];

    unsafeWindow.sprite[10002] = [StoneSpikeAlly, StoneSpikeAlly];
    unsafeWindow.sprite[10003] = [StoneSpikeEnemy, StoneSpikeEnemy];

    unsafeWindow.sprite[10004] = [GoldSpikeAlly, GoldSpikeAlly];
    unsafeWindow.sprite[10005] = [GoldSpikeEnemy, GoldSpikeEnemy];

    unsafeWindow.sprite[10006] = [DiamondSpikeAlly, DiamondSpikeAlly];
    unsafeWindow.sprite[10007] = [DiamondSpikeEnemy, DiamondSpikeEnemy];

    unsafeWindow.sprite[10008] = [AmethystSpikeAlly, AmethystSpikeAlly];
    unsafeWindow.sprite[10009] = [AmethystSpikeEnemy, AmethystSpikeEnemy];

    unsafeWindow.sprite[10010] = [RSpikeAlly, RSpikeAlly];
    unsafeWindow.sprite[10011] = [ReiditeSpikeEnemy, ReiditeSpikeEnemy];


    unsafeWindow.sprite[9000] = [dayWoodDoorAlly, dayWoodDoorAlly];
    unsafeWindow.sprite[9001] = [dayWoodDoorEnemy, dayWoodDoorEnemy];

    unsafeWindow.sprite[9002] = [dayStoneDoorAlly, dayStoneDoorAlly];
    unsafeWindow.sprite[9003] = [dayStoneDoorEnemy, dayStoneDoorEnemy];

    unsafeWindow.sprite[9004] = [dayGoldDoorAlly, dayGoldDoorAlly];
    unsafeWindow.sprite[9005] = [dayGoldDoorEnemy, dayGoldDoorEnemy];

    unsafeWindow.sprite[9006] = [dayDiamondDoorAlly, dayDiamondDoorAlly];
    unsafeWindow.sprite[9007] = [dayDiamondDoorEnemy, dayDiamondDoorEnemy];

    unsafeWindow.sprite[9008] = [dayAmethystDoorAlly, dayAmethystDoorAlly];
    unsafeWindow.sprite[9009] = [dayAmethystDoorEnemy, dayAmethystDoorEnemy];

    unsafeWindow.sprite[9010] = [dayReiditeDoorAlly, dayReiditeDoorAlly];
    unsafeWindow.sprite[9011] = [dayReiditeDoorEnemy, dayReiditeDoorEnemy];


    unsafeWindow.sprite[9100] = [dayWoodDoorSpikeAlly, dayWoodDoorSpikeAlly];
    unsafeWindow.sprite[9101] = [dayWoodDoorSpikeEnemy, dayWoodDoorSpikeEnemy];

    unsafeWindow.sprite[9102] = [dayStoneDoorSpikeAlly, dayStoneDoorSpikeAlly];
    unsafeWindow.sprite[9103] = [dayStoneDoorSpikeEnemy, dayStoneDoorSpikeEnemy];

    unsafeWindow.sprite[9104] = [dayGoldDoorSpikeAlly, dayGoldDoorSpikeAlly];
    unsafeWindow.sprite[9105] = [dayGoldDoorSpikeEnemy, dayGoldDoorSpikeEnemy];

    unsafeWindow.sprite[9106] = [dayDiamondDoorSpikeAlly, dayDiamondDoorSpikeAlly];
    unsafeWindow.sprite[9107] = [dayDiamondDoorSpikeEnemy, dayDiamondDoorSpikeEnemy];

    unsafeWindow.sprite[9108] = [dayAmethystDoorSpikeAlly, dayAmethystDoorSpikeAlly];
    unsafeWindow.sprite[9109] = [dayAmethystDoorSpikeEnemy, dayAmethystDoorSpikeEnemy];

    unsafeWindow.sprite[9110] = [dayReiditeDoorSpikeAlly, dayReiditeDoorSpikeAlly];
    unsafeWindow.sprite[9111] = [dayReiditeDoorSpikeEnemy, dayReiditeDoorSpikeEnemy];
    console.log("Load Spikes successful");
}


const srsImg = 'abbccc';
let playersOnTop = {};

function colors() {
    loadSpikes();

    if (true) {
        let ITEMS = {
            CHEST: 11,
            SPIKE: 5,
            STONE_SPIKE: 12,
            GOLD_SPIKE: 13,
            DIAMOND_SPIKE: 14,
            AMETHYST_SPIKE: 20,
            REIDITE_SPIKE: 61,
            WOOD_DOOR: 10,
            STONE_DOOR: 15,
            GOLD_DOOR: 16,
            DIAMOND_DOOR: 17,
            AMETHYST_DOOR: 21,
            REIDITE_DOOR: 60,
            WOOD_DOOR_SPIKE: 54,
            STONE_DOOR_SPIKE: 55,
            GOLD_DOOR_SPIKE: 56,
            DIAMOND_DOOR_SPIKE: 57,
            AMETHYST_DOOR_SPIKE: 58,
            REIDITE_DOOR_SPIKE: 62,
        }

        let push = Array.prototype.push
        Array.prototype.push = function (p) {
            if (p && null != p.type && null != p.id && p.x && p.y) {
                // log(p)
                try {
                    unsafeWindow.wow = Object.keys(p)[14];
                    const pid = p[Object.keys(p)[1]];
                    p.ally = mypid === pid || isAlly(pid);
                    // log_debug(p);
                    if (p.type == 0) {
                        playersOnTop[pid] = [p[Object.keys(p)[36]], true, p, p[Object.keys(p)[37]]];
                        p[Object.keys(p)[36]] = function () {
                            playersOnTop[pid][1] = true;
                            if (p.x < 50) return;
                            if (Settings.playerOnTop) return;
                            playersOnTop[pid][0].apply(this, arguments);
                        }
                        p[Object.keys(p)[37]] = function () {
                            if (p.x < 50) return;
                            if (Settings.playerOnTop) return;
                            playersOnTop[pid][3].apply(this, arguments);
                        }
                    }

                    switch ((0 === p.type && pid(p) === unsafeWindow.playerID && (unsafeWindow.player = p), p.type)) {
                        case ITEMS.SPIKE: {
                            let l = p[wow]; // draw
                            p[wow] = function (a) {
                                return Settings.ColoredSpikes ? (p.ally ? l.apply(this, [10000]) : l.apply(this, [10001])) : l.apply(this, arguments);
                            };
                            break;
                        }
                        case ITEMS.STONE_SPIKE: {
                            let i = p[wow]; // draw
                            p[wow] = function (a) {
                                return Settings.ColoredSpikes ? (p.ally ? i.apply(this, [10002]) : i.apply(this, [10003])) : i.apply(this, arguments);
                            };
                            break;
                        }
                        case ITEMS.GOLD_SPIKE: {
                            let e = p[wow]; // draw
                            p[wow] = function (a) {
                                return Settings.ColoredSpikes ? (p.ally ? e.apply(this, [10004]) : e.apply(this, [10005])) : e.apply(this, arguments);
                            };
                            break;
                        }
                        case ITEMS.DIAMOND_SPIKE: {
                            let t = p[wow]; // draw
                            p[wow] = function (a) {
                                return Settings.ColoredSpikes ? (p.ally ? t.apply(this, [10006]) : t.apply(this, [10007])) : t.apply(this, arguments);
                            };
                            break;
                        }
                        case ITEMS.AMETHYST_SPIKE: {
                            let r = p[wow]; // draw
                            p[wow] = function (a) {
                                return Settings.ColoredSpikes ? (p.ally ? r.apply(this, [10008]) : r.apply(this, [10009])) : r.apply(this, arguments);
                            };
                            break;
                        }
                        case ITEMS.REIDITE_SPIKE: {
                            let y = p[wow]; // draw
                            p[wow] = function (a) {
                                return Settings.ColoredSpikes ? (p.ally ? y.apply(this, [10010]) : y.apply(this, [10011])) : y.apply(this, arguments);
                            };
                            break;
                        }
                        case ITEMS.WOOD_DOOR: {
                            let w1 = p[wow]; // draw
                            p[wow] = function (a) {
                                if (p.info % 2 == 1) return w1.apply(this, arguments);
                                return Settings.ColoredSpikes ? (p.ally ? w1.apply(this, [9000]) : w1.apply(this, [9001])) : w1.apply(this, arguments);
                            };
                            break;
                        }
                        case ITEMS.STONE_DOOR: {
                            let s1 = p[wow]; // draw
                            p[wow] = function (a) {
                                if (p.info % 2 == 1) return s1.apply(this, arguments);
                                return Settings.ColoredSpikes ? (p.ally ? s1.apply(this, [9002]) : s1.apply(this, [9003])) : s1.apply(this, arguments);
                            };
                            break;
                        }
                        case ITEMS.GOLD_DOOR: {
                            let g1 = p[wow]; // draw
                            p[wow] = function (a) {
                                if (p.info % 2 == 1) return g1.apply(this, arguments);
                                return Settings.ColoredSpikes ? (p.ally ? g1.apply(this, [9004]) : g1.apply(this, [9005])) : g1.apply(this, arguments);
                            };
                            break;
                        }
                        case ITEMS.DIAMOND_DOOR: {
                            let d1 = p[wow]; // draw
                            p[wow] = function (a) {
                                if (p.info % 2 == 1) return d1.apply(this, arguments);
                                return Settings.ColoredSpikes ? (p.ally ? d1.apply(this, [9006]) : d1.apply(this, [9007])) : d1.apply(this, arguments);
                            };
                            break;
                        }
                        case ITEMS.AMETHYST_DOOR: {
                            let a1 = p[wow]; // draw
                            p[wow] = function (a) {
                                if (p.info % 2 == 1) return a1.apply(this, arguments);
                                return Settings.ColoredSpikes ? (p.ally ? a1.apply(this, [9008]) : a1.apply(this, [9009])) : a1.apply(this, arguments);
                            };
                            break;
                        }
                        case ITEMS.REIDITE_DOOR: {
                            let r1 = p[wow]; // draw
                            p[wow] = function (a) {
                                if (p.info % 2 == 1) return r1.apply(this, arguments);
                                return Settings.ColoredSpikes ? (p.ally ? r1.apply(this, [9010]) : r1.apply(this, [9011])) : r1.apply(this, arguments);
                            };
                            break;
                        }
                        case ITEMS.WOOD_DOOR_SPIKE: {
                            let w2 = p[wow]; // draw
                            p[wow] = function (a) {
                                if (p.info % 2 == 1) return w2.apply(this, arguments);
                                return Settings.ColoredSpikes ? (p.ally ? w2.apply(this, [9100]) : w2.apply(this, [9101])) : w2.apply(this, arguments);
                            };
                            break;
                        }
                        case ITEMS.STONE_DOOR_SPIKE: {
                            let s2 = p[wow]; // draw
                            p[wow] = function (a) {
                                if (p.info % 2 == 1) return s2.apply(this, arguments);
                                return Settings.ColoredSpikes ? (p.ally ? s2.apply(this, [9102]) : s2.apply(this, [9103])) : s2.apply(this, arguments);
                            };
                            break;
                        }
                        case ITEMS.GOLD_DOOR_SPIKE: {
                            let g2 = p[wow]; // draw
                            p[wow] = function (a) {
                                if (p.info % 2 == 1) return g2.apply(this, arguments);
                                return Settings.ColoredSpikes ? (p.ally ? g2.apply(this, [9104]) : g2.apply(this, [9105])) : g2.apply(this, arguments);
                            };
                            break;
                        }
                        case ITEMS.DIAMOND_DOOR_SPIKE: {
                            let d2 = p[wow]; // draw
                            p[wow] = function (a) {
                                if (p.info % 2 == 1) return d2.apply(this, arguments);
                                return Settings.ColoredSpikes ? (p.ally ? d2.apply(this, [9106]) : d2.apply(this, [9107])) : d2.apply(this, arguments);
                            };
                            break;
                        }
                        case ITEMS.AMETHYST_DOOR_SPIKE: {
                            let a2 = p[wow]; // draw
                            p[wow] = function (a) {
                                if (p.info % 2 == 1) return a2.apply(this, arguments);
                                return Settings.ColoredSpikes ? (p.ally ? a2.apply(this, [9108]) : a2.apply(this, [9109])) : a2.apply(this, arguments);
                            };
                            break;
                        }
                        case ITEMS.REIDITE_DOOR_SPIKE: {
                            let r2 = p[wow]; // draw
                            p[wow] = function (a) {
                                if (p.info % 2 == 1) return r2.apply(this, arguments);
                                return Settings.ColoredSpikes ? (p.ally ? r2.apply(this, [9110]) : r2.apply(this, [9111])) : r2.apply(this, arguments);
                            };
                            break;
                        }
                        case unit()[0]: {
                            let w = p[wow]
                        }
                    }
                } catch (error) {
                    return push.apply(this, arguments);
                }
            }
            return push.apply(this, arguments);
        };
    }
}


function drawMob(ctx, mob) {
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    keys = Object.keys(mob)

    ctx.strokeText(mob.action, script.user.cam.x + mob.x, script.user.cam.y + mob.y + 40);
    //ctx.fillText(mob.action, script.user.cam.x + mob.x, script.user.cam.y + mob.y + 40);
}


function roundRect(ctx, x1, y1, x2, y2, radius) {
    radius = Math.min(radius, (x2 - x1) / 2, (y2 - y1) / 2);
    ctx.beginPath();
    ctx.moveTo(x1 + radius, y1);
    ctx.lineTo(x2 - radius, y1);
    ctx.arcTo(x2, y1, x2, y1 + radius, radius);
    ctx.lineTo(x2, y2 - radius);
    ctx.arcTo(x2, y2, x2 - radius, y2, radius);
    ctx.lineTo(x1 + radius, y2);
    ctx.arcTo(x1, y2, x1, y2 - radius, radius);
    ctx.lineTo(x1, y1 + radius);
    ctx.arcTo(x1, y1, x1 + radius, y1, radius);
    ctx.stroke();
}


let weaponPlayers = {};
function drawPartialCircle(ctx, radius, centerX, centerY, fillRatio, lineWidth = 5) {
    if (fillRatio <= 0 || fillRatio > 1) return;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = lineWidth;

    const endAngle = 2 * Math.PI * fillRatio;
    const startAngle = 0;

    // Рисуем дугу
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.stroke();
}

function updater(time = 1) {
    if (time) {
        requestAnimationFrame(updater)
    }


    if (Settings.TurnOffScript.e) return;

    unsafeWindow.ctx = document.getElementById("game_canvas").getContext("2d");

    if (!script.user.alive & script.user.alive != user[Object.keys(user)[10]]) {
        startTimer = new Date;
        if (!set_all_ids(user, world, game, mouse, client)) return;
        create_craft_rules();
    }

    script.user.alive = user[Object.keys(user)[10]];

    if (Settings.debug.show_items.e) draw2(id_tings, unsafeWindow.ctx);
    else if (Settings.debug.show_sprites.e) draw(id_tings, unsafeWindow.ctx);


    let i = 22.5;
    ctx.save();
    for (hack in Settings) {
        if (Settings[hack].e && Settings[hack].k) {
            ctx.lineWidth = 6;
            ctx.textAlign = 'left';
            ctx.fillStyle = "red";
            ctx.strokeStyle = "black";
            ctx.font = "22px Baloo Paaji";
            ctx.strokeText(hack, 3, i);
            ctx.fillText(hack, 3, i);
            i += 22.5;
        }
    }
    if (Settings.textalert.e) {
        ctx.lineWidth = 6;
        ctx.fillStyle = "red";
        ctx.strokeStyle = "black";
        ctx.font = "55px Baloo Paaji";
        ctx.strokeText(Settings.textalert.t, unsafeWindow.innerWidth / 2, unsafeWindow.innerHeight / 14);
        ctx.fillText(Settings.textalert.t, unsafeWindow.innerWidth / 2, unsafeWindow.innerHeight / 14);
    }
    ctx.restore();

    if (script.user.alive) {
        let gauges = user[Keys.gauges];
        script.world.units = world[Keys.units];
        script.world.fast_units = world[Keys.fast_units];
        script.user.id = user.id;
        script.user.uid = user[Keys.uid];
        script.user.gauges.health = Math.floor(gauges[Object.keys(gauges)[1]] * 200);
        script.user.gauges.hungry = Math.floor(gauges[Object.keys(gauges)[2]] * 100);
        script.user.gauges.cold = Math.floor(gauges.c * 100) + Math.floor(100 - (gauges[Object.keys(gauges)[5]] * 100));
        script.user.gauges.water = Math.floor(gauges[Object.keys(gauges)[3]] * 100);

        script.user.cam.x = user[Keys.cam].x;
        script.user.cam.y = user[Keys.cam].y;
        script.user.team = user[Keys.team];
        try {
            let myPlayer = script.world.fast_units[script.user.uid];
        } catch (error) {
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 6;
            ctx.fillStyle = "red";
            ctx.strokeStyle = "black";
            ctx.font = "55px Baloo Paaji";
            ctx.strokeText("Error loading script", unsafeWindow.innerWidth / 2, unsafeWindow.innerHeight / 14);
            ctx.fillText("Error loading script", unsafeWindow.innerWidth / 2, unsafeWindow.innerHeight / 14);
            ctx.restore();
            return
        }
        let myPlayer = script.world.fast_units[script.user.uid];
        if (myPlayer) {
            if (Settings.spectator.e) Settings.spectator.player = myPlayer
        } else {
            if ((Settings.spectator.e || Settings.spectator.is_back) && Settings.spectator.player) {
                myPlayer = Settings.spectator.player
            }
        }
        mypid = myPlayer[Object.keys(myPlayer)[1]]


        /*
        if (myPlayer) {
            script.myPlayer.skin = myPlayer[Object.keys(myPlayer)[14]];
            script.myPlayer.lootbox = myPlayer[Object.keys(myPlayer)[1]];
            myPlayer[Object.keys(myPlayer)[14]] = Settings.SkinChanger_Skin;
            myPlayer[Object.keys(myPlayer)[1]] = Settings.SkinChanger_LootBox;
            script.myPlayer.angle = myPlayer.angle;
        }
        */


        script.myPlayer.angle = myPlayer.angle;
        script.myPlayer.x = myPlayer.x
        script.myPlayer.y = myPlayer.y
        script.myPlayer.ghost = myPlayer[Object.keys(myPlayer)[64]]

        ally = script.user.team.length > 0 ? script.user.team : [script.user.id];
        units = script.world.units;
        if (Settings.gaugesInfo) {
            const r = unsafeWindow.innerWidth / 2;
            const a = unsafeWindow.innerHeight - 50;
            let hp = script.user.gauges.health
            let food = script.user.gauges.hungry
            let timeNow = performance.now();

            ctx.save();
            ctx.lineWidth = 7;
            ctx.strokeStyle = "black";
            ctx.font = "34px Baloo Paaji";

            ctx.fillStyle = "#69a148";
            ctx.strokeText(hp + "", r - 270 - 100, a - 70);
            ctx.fillText(hp + "", r - 270 - 100, a - 70);

            ctx.fillStyle = "#AF352A";
            ctx.strokeText(food + "", r - 120, a - 70);
            ctx.fillText(food + "", r - 120, a - 70);

            ctx.fillStyle = "#669BB1";
            ctx.strokeText(script.user.gauges.cold + "", r + 210 - 100, a - 70);
            ctx.fillText(script.user.gauges.cold + "", r + 210 - 100, a - 70);

            ctx.fillStyle = "#074A87";
            ctx.strokeText(script.user.gauges.water + "", r + 450 - 100, a - 70);
            ctx.fillText(script.user.gauges.water + "", r + 450 - 100, a - 70);

            if (hp > script.lastHeal) {
                script.lastHealTime = timeNow;
            }
            if (food < script.lastHungry) {
                script.lastTimer = timeNow;
                if (timeNow - script.lastHealTime > 6000) {
                    script.lastHealTime = timeNow;
                }
            }

            let healTimer = Math.round(10 - (timeNow - script.lastHealTime) / 1000);
            let otherTimer = Math.round(5 - (timeNow - script.lastTimer) / 1000);
            if (!isNaN(healTimer)) {
                if (healTimer > 10 || healTimer < 0) script.lastHealTime = timeNow;
                ctx.fillStyle = "#69a148";
                ctx.strokeText(healTimer + "s", r - 150 - 100, a - 40);
                ctx.fillText(healTimer + "s", r - 150 - 100, a - 40);
            }
            if (!isNaN(otherTimer)) {
                ctx.fillStyle = "red";
                ctx.strokeText(otherTimer + "s", r + 90 - 100, a - 40);
                ctx.fillText(otherTimer + "s", r + 90 - 100, a - 40);
            }

            script.lastHeal = hp;
            script.lastHungry = food;

            ctx.restore();
        }

        const players = script.world.units[0];

        // if (Settings.ColoredSpikes) {
        //     ctx.font = "45px Baloo Paaji";
        //     Spikes = [...units[5], ...units[12], ...units[13], ...units[14], ...units[20], ...units[52]]
        //     for (let i = 0; i < Spikes.length; ++i) {
        //         const spike = Spikes[i];
        //         const pid = spike[Object.keys(spike)[1]];
        //         let ally = mypid === pid || isAlly(pid);

        //         if (ally) {
        //             ctx.strokeStyle = "#56c28c";
        //             ctx.fillStyle = "#56c28c";
        //         } else {
        //             ctx.strokeStyle = "#be2719";
        //             ctx.fillStyle = "#be2719";
        //         }
        //         ctx.strokeText(`⬤`, spike.x + script.user.cam.x - 20, spike.y + script.user.cam.y + 15);
        //         ctx.fillText(`⬤`, spike.x + script.user.cam.x - 20, spike.y + script.user.cam.y + 15);
        //     }
        //     ctx.font = "20px Baloo Paaji";
        // }

        ctx.save();
        ctx.font = '20px Baloo Paaji';
        if (Settings.showFly) {
            for (let i = 0; i < players.length; i++) {
                if (players[i][fly]) {
                    ctx.strokeStyle = "black";
                    ctx.fillStyle = '#3683ff';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.strokeText('Fly', script.user.cam.x + players[i].x, script.user.cam.y + players[i].y + 35);
                    ctx.fillText('Fly', script.user.cam.x + players[i].x, script.user.cam.y + players[i].y + 35);
                }

            }
        }

        if (Settings.tracers) {
            ctx.lineWidth = 2.6;
            if (Settings.PlayerTracers) {
                for (let i = 0; i < players.length; i++) {
                    const pid = players[i][Object.keys(players[i])[1]]
                    if (pid === script.user.id) continue;
                    ctx.strokeStyle = isAlly(pid) ? "cyan" : "red";
                    ctx.beginPath();
                    ctx.moveTo(script.user.cam.x + myPlayer.x, script.user.cam.y + myPlayer.y);
                    ctx.lineTo(script.user.cam.x + players[i].x, script.user.cam.y + players[i].y);
                    ctx.stroke();
                };
            }
            if (Settings.SandwormTracers) {
                mobs = units[83];
                for (let i = 0; i < mobs.length; i++) {
                    ctx.strokeStyle = "#000000";
                    ctx.beginPath();
                    ctx.moveTo(script.user.cam.x + myPlayer.x, script.user.cam.y + myPlayer.y);
                    ctx.lineTo(script.user.cam.x + mobs[i].x, script.user.cam.y + mobs[i].y);
                    ctx.stroke();
                };
            }
            if (Settings.KrakenTracers) {
                mobs = units[73];
                for (let i = 0; i < mobs.length; i++) {
                    ctx.strokeStyle = "#440b8a";
                    ctx.beginPath();
                    ctx.moveTo(script.user.cam.x + myPlayer.x, script.user.cam.y + myPlayer.y);
                    ctx.lineTo(script.user.cam.x + mobs[i].x, script.user.cam.y + mobs[i].y);
                    ctx.stroke();
                };
            }
            if (Settings.SpiderTracers) {
                mobs = units[68];
                for (let i = 0; i < mobs.length; i++) {
                    ctx.strokeStyle = "#ffffff";
                    ctx.beginPath();
                    ctx.moveTo(script.user.cam.x + myPlayer.x, script.user.cam.y + myPlayer.y);
                    ctx.lineTo(script.user.cam.x + mobs[i].x, script.user.cam.y + mobs[i].y);
                    ctx.stroke();
                };
            }
            if (Settings.WolfTracers) {
                mobs = units[67];
                for (let i = 0; i < mobs.length; i++) {
                    ctx.strokeStyle = "#8a0b5e";
                    ctx.beginPath();
                    ctx.moveTo(script.user.cam.x + myPlayer.x, script.user.cam.y + myPlayer.y);
                    ctx.lineTo(script.user.cam.x + mobs[i].x, script.user.cam.y + mobs[i].y);
                    ctx.stroke();
                };
            }
            if (Settings.RabbitTracers) {
                mobs = units[92];
                for (let i = 0; i < mobs.length; i++) {
                    ctx.strokeStyle = "pink";
                    ctx.beginPath();
                    ctx.moveTo(script.user.cam.x + myPlayer.x, script.user.cam.y + myPlayer.y);
                    ctx.lineTo(script.user.cam.x + mobs[i].x, script.user.cam.y + mobs[i].y);
                    ctx.stroke();
                };
            }
            if (Settings.FishTracers) {
                mobs = units[72];
                for (let i = 0; i < mobs.length; i++) {
                    ctx.strokeStyle = "#f77d72";
                    ctx.beginPath();
                    ctx.moveTo(script.user.cam.x + myPlayer.x, script.user.cam.y + myPlayer.y);
                    ctx.lineTo(script.user.cam.x + mobs[i].x, script.user.cam.y + mobs[i].y);
                    ctx.stroke();
                };
            }
            if (Settings.VultureTracers) {
                mobs = units[75];
                for (let i = 0; i < mobs.length; i++) {
                    ctx.strokeStyle = "#42423c";
                    ctx.beginPath();
                    ctx.moveTo(script.user.cam.x + myPlayer.x, script.user.cam.y + myPlayer.y);
                    ctx.lineTo(script.user.cam.x + mobs[i].x, script.user.cam.y + mobs[i].y);
                    ctx.stroke();
                };
            }
            if (Settings.BabyDragonTracers) {
                mobs = units[79];
                for (let i = 0; i < mobs.length; i++) {
                    ctx.strokeStyle = "#fff";
                    ctx.beginPath();
                    ctx.moveTo(script.user.cam.x + myPlayer.x, script.user.cam.y + myPlayer.y);
                    ctx.lineTo(script.user.cam.x + mobs[i].x, script.user.cam.y + mobs[i].y);
                    ctx.stroke();
                };
            }
            if (Settings.BabyLavaDragonTracers) {
                mobs = units[80];
                for (let i = 0; i < mobs.length; i++) {
                    ctx.strokeStyle = "#eb6200";
                    ctx.beginPath();
                    ctx.moveTo(script.user.cam.x + myPlayer.x, script.user.cam.y + myPlayer.y);
                    ctx.lineTo(script.user.cam.x + mobs[i].x, script.user.cam.y + mobs[i].y);
                    ctx.stroke();
                };
            }
        }

        if (Settings.machineInfo) {
            let machines = units[23];
            for (let i = 0; i < machines.length; i++) {
                let owner = world[Keys.players_list][machines[i][Object.keys(machines[i])[1]]];
                let owner_name = owner[Object.keys(owner)[0]];
                ctx.strokeStyle = "black";
                ctx.lineWidth = 7;
                ctx.fillStyle = "white";
                ctx.strokeText(owner_name, script.user.cam.x + machines[i].x - 25, script.user.cam.y + machines[i].y - 25);
                ctx.fillText(owner_name, script.user.cam.x + machines[i].x - 25, script.user.cam.y + machines[i].y - 25);
            }
        }

        if (Settings.toteminfo) {
            let totems = units[38];
            for (let i = 0; i < totems.length; i++) {
                let owner = world[Keys.players_list][totems[i][Object.keys(totems[i])[1]]];
                let owner_name = owner[Object.keys(owner)[0]];
                ctx.strokeStyle = "black";
                ctx.lineWidth = 7;
                ctx.fillStyle = "white";
                ctx.strokeText(owner_name, script.user.cam.x + totems[i].x - 20, script.user.cam.y + totems[i].y - 25);
                ctx.fillText(owner_name, script.user.cam.x + totems[i].x - 20, script.user.cam.y + totems[i].y - 25);

                ctx.strokeText(totems[i].info >= 16 ? charTotem + totems[i].info % 16 : charTotem + totems[i].info, script.user.cam.x + totems[i].x - 20, script.user.cam.y + totems[i].y);
                ctx.fillText(totems[i].info >= 16 ? charTotem + totems[i].info % 16 : charTotem + totems[i].info, script.user.cam.x + totems[i].x - 20, script.user.cam.y + totems[i].y);

                ctx.strokeText(totems[i].info >= 16 ? "Lock" : "Open", script.user.cam.x + totems[i].x - 20, script.user.cam.y + totems[i].y + 25);
                ctx.fillText(totems[i].info >= 16 ? "Lock" : "Open", script.user.cam.x + totems[i].x - 20, script.user.cam.y + totems[i].y + 25);
            };
        }
        ctx.lineWidth = 8;
        const deathBoxId = 94;
        const lootBoxId = 98;
        if (Settings.boxinfo) {
            timeNow = Date.now();
            deathBoxs = units[deathBoxId];
            for (let i = 0; i < deathBoxs.length; i++) {
                const box = deathBoxs[i];
                if (isDeathBox(box.info)) {
                    if (box.id in deathboxinfo) {
                        if (deathboxinfo[box.id][1] != box.action) {
                            if (box.action != 0) { deathboxinfo[box.id][0] += 1; }
                            deathboxinfo[box.id][1] = box.action;
                        }
                    } else {
                        deathboxinfo[box.id] = [0, 0, timeNow]
                    }
                    let count = deathboxinfo[box.id][0];
                    ctx.strokeStyle = "red";
                    ctx.fillStyle = "black";
                    ctx.strokeText(`Death box`, box.x + script.user.cam.x - 20, box.y + script.user.cam.y - 15);
                    ctx.fillText(`Death box`, box.x + script.user.cam.x - 20, box.y + script.user.cam.y - 15);
                    let hp = 300;
                    // if (activeUnits[deathBoxId][box.id]) hp = activeUnits[deathBoxId][box.id].hp;
                    if (!Settings.showHp) hp = count;
                    ctx.strokeText(`${hp} hp`, box.x + script.user.cam.x - 10, box.y + script.user.cam.y + 28);
                    ctx.fillText(`${hp} hp`, box.x + script.user.cam.x - 10, box.y + script.user.cam.y + 28);
                    ctx.strokeText(`${Math.round(2400 - (timeNow - deathboxinfo[box.id][2]) / 100) / 10}`, box.x + script.user.cam.x - 20, box.y + script.user.cam.y + 5);
                    ctx.fillText(`${Math.round(2400 - (timeNow - deathboxinfo[box.id][2]) / 100) / 10}`, box.x + script.user.cam.x - 20, box.y + script.user.cam.y + 5);
                } else {
                    if (box.id in mobboxinfo) {
                        if (mobboxinfo[box.id][1] != box.action) {
                            if (box.action != 0) { mobboxinfo[box.id][0] += 1; }
                            mobboxinfo[box.id][1] = box.action;
                        }
                    } else {
                        mobboxinfo[box.id] = [0, 0, timeNow]
                    }
                    let count = mobboxinfo[box.id][0];
                    ctx.strokeStyle = "black";
                    ctx.fillStyle = "white";
                    ctx.strokeText(`Mob box`, box.x + script.user.cam.x - 20, box.y + script.user.cam.y - 15);
                    ctx.fillText(`Mob box`, box.x + script.user.cam.x - 20, box.y + script.user.cam.y - 15);
                    ctx.strokeText(`${count}`, box.x + script.user.cam.x - 10, box.y + script.user.cam.y + 28);
                    ctx.fillText(`${count}`, box.x + script.user.cam.x - 10, box.y + script.user.cam.y + 28);
                    ctx.strokeText(`${Math.round(300 - (timeNow - mobboxinfo[box.id][2]) / 100) / 10}`, box.x + script.user.cam.x - 20, box.y + script.user.cam.y + 5);
                    ctx.fillText(`${Math.round(300 - (timeNow - mobboxinfo[box.id][2]) / 100) / 10}`, box.x + script.user.cam.x - 20, box.y + script.user.cam.y + 5);
                }
            }
            for (const id in mobboxinfo) {
                if (timeNow - mobboxinfo[id][2] > 30500) {
                    delete mobboxinfo[id];
                }
            }
            for (const id in deathboxinfo) {
                if (timeNow - deathboxinfo[id][2] > 240500) {
                    delete deathboxinfo[id];
                }
            }
            lootBoxs = units[lootBoxId];
            for (let i = 0; i < lootBoxs.length; i++) {
                const box = lootBoxs[i];
                if (box.id in lootboxsinfo) {
                    if (lootboxsinfo[box.id][1] != box.action) {
                        if (box.action != 0) { lootboxsinfo[box.id][0] += 1; }
                        lootboxsinfo[box.id][1] = box.action;
                    }
                } else {
                    lootboxsinfo[box.id] = [0, 0, timeNow]
                }
                let count = lootboxsinfo[box.id][0];
                ctx.strokeStyle = "black";
                ctx.fillStyle = "white";
                ctx.strokeText(`loot`, box.x + script.user.cam.x - 20, box.y + script.user.cam.y - 5);
                ctx.fillText(`loot`, box.x + script.user.cam.x - 20, box.y + script.user.cam.y - 5);
                ctx.strokeText(`${Math.round(162 - (timeNow - lootboxsinfo[box.id][2]) / 100) / 10}`, box.x + script.user.cam.x - 20, box.y + script.user.cam.y + 13);
                ctx.fillText(`${Math.round(162 - (timeNow - lootboxsinfo[box.id][2]) / 100) / 10}`, box.x + script.user.cam.x - 20, box.y + script.user.cam.y + 13);
            }
            for (const id in lootboxsinfo) {
                if (timeNow - lootboxsinfo[id][2] > 16300) {
                    delete lootboxsinfo[id];
                }
            }
        }

        if (Settings.ChestInfo) {
            chests = units[11];
            for (let i = 0; i < chests.length; i++) {
                const chest = chests[i];
                if (chest.info == 0) {
                    continue
                }
                let img = getImgForChest(chest)
                if (img.localName == 'img') {   // Прогрузка изображений даже если они не были загружены
                    if (img[Object.keys(img)[0]] == 0) {
                        img.src = img.baseURI + img[Object.keys(img)[3]]
                    }
                }
                if (img) ctx.drawImage(img, chest.x + script.user.cam.x - 32, chest.y + script.user.cam.y - 32, 60, 65);
                ctx.strokeStyle = isAlly(chest[Object.keys(chest)[1]]) ? "#30ab36" : "red";
                ctx.fillStyle = "black";
                if (chest.lock) {
                    ctx.strokeText(`L`, chest.x + script.user.cam.x - 10, chest.y + script.user.cam.y - 17);
                    ctx.fillText(`L`, chest.x + script.user.cam.x - 10, chest.y + script.user.cam.y - 17);
                }
                ctx.strokeStyle = "black";
                ctx.fillStyle = "white";
                if (Settings.ChestInfo2) {
                    ctx.font = "15px Baloo Paaji";
                    ctx.strokeText(`${chest.action / 2 - 1}`, chest.x + script.user.cam.x - 10, chest.y + script.user.cam.y + 10);
                    ctx.fillText(`${chest.action / 2 - 1}`, chest.x + script.user.cam.x - 10, chest.y + script.user.cam.y + 10);
                }
                ctx.font = "20px Baloo Paaji";
                ctx.strokeText('x' + `${chest.info}`, chest.x + script.user.cam.x - 10, chest.y + script.user.cam.y + 30);
                ctx.fillText('x' + `${chest.info}`, chest.x + script.user.cam.x - 10, chest.y + script.user.cam.y + 30);
            }
        }

        if (Settings.buildinfo) {
            for (let i = 0; i < extractor_ids.length; ++i) {
                const extractorType = extractor_ids[i];
                const extractors = units[extractorType];
                if (script.user.alive) {
                    for (let j = 0; j < extractors.length; j++) {
                        const extractor = extractors[j];
                        ctx.strokeStyle = "black";
                        ctx.fillStyle = "white";
                        ctx.strokeText(`${extractor.info & 0xFF}` + 'x', extractor.x + script.user.cam.x - 15, extractor.y + script.user.cam.y - 5);
                        ctx.fillText(`${extractor.info & 0xFF}` + 'x', extractor.x + script.user.cam.x - 15, extractor.y + script.user.cam.y - 5);
                        ctx.strokeText(`${(extractor.info & 0xFF00) >> 8}` + 'x', extractor.x + script.user.cam.x - 15, extractor.y + script.user.cam.y + 15);
                        ctx.fillText(`${(extractor.info & 0xFF00) >> 8}` + 'x', extractor.x + script.user.cam.x - 15, extractor.y + script.user.cam.y + 15);
                    }
                }
            }

            mils = units[41];
            for (let i = 0; i < mils.length; ++i) {
                const mill = mils[i];
                let x = mill.info;
                let b = parseInt(x / 256);
                x -= b * 256;

                ctx.strokeStyle = "black";
                ctx.fillStyle = "white";
                ctx.strokeText(`${x}` + charWheat, mill.x + script.user.cam.x - 10, mill.y + script.user.cam.y - 10);
                ctx.fillText(`${x}` + charWheat, mill.x + script.user.cam.x - 10, mill.y + script.user.cam.y - 10);
                ctx.strokeText(`${b}` + charDough, mill.x + script.user.cam.x - 10, mill.y + script.user.cam.y + 15);
                ctx.fillText(`${b}` + charDough, mill.x + script.user.cam.x - 10, mill.y + script.user.cam.y + 15);
            }

            ovens = units[43];
            for (let i = 0; i < ovens.length; ++i) {
                const oven = ovens[i];
                let x = oven.info;
                let b = parseInt(x / 1024);
                x -= b * 1024;
                let m = parseInt(x / 32);
                x -= m * 32;

                ctx.strokeStyle = "black";
                ctx.fillStyle = "white";
                ctx.strokeText(`${x}` + charWood, oven.x + script.user.cam.x - 10, oven.y + script.user.cam.y - 25);
                ctx.fillText(`${x}` + charWood, oven.x + script.user.cam.x - 10, oven.y + script.user.cam.y - 25);
                ctx.strokeText(`${m}` + charDough, oven.x + script.user.cam.x - 10, oven.y + script.user.cam.y - 5);
                ctx.fillText(`${m}` + charDough, oven.x + script.user.cam.x - 10, oven.y + script.user.cam.y - 5);
                ctx.strokeText(`${b}` + charBred, oven.x + script.user.cam.x - 10, oven.y + script.user.cam.y + 15);
                ctx.fillText(`${b}` + charBred, oven.x + script.user.cam.x - 10, oven.y + script.user.cam.y + 15);
            }
        }
        if (Settings.playerOnTop) {
            keys = Object.keys(playersOnTop);
            keys.forEach(key => {
                if (playersOnTop[key][1] && playersOnTop[key][2].x >= 50) {
                    try {
                        playersOnTop[key][3].apply(playersOnTop[key][2], []);
                        playersOnTop[key][0].apply(playersOnTop[key][2], []);
                    } catch (error) {
                        console.error("Error playersOnTop");
                        Settings.playerOnTop = false;
                    }
                    playersOnTop[key][1] = false;
                }
            });
        }

        if (Settings.showHp) {
            ctx.save();
            AllEntity = [...units[69], ...units[73], ...units[68], ...units[66], ...units[65], ...units[62], ...units[63], ...units[78], ...units[77], ...units[64], ...units[72], ...units[88], ...units[76], ...units[75], ...units[74], ...units[60], ...units[80], ...units[61], ...units[67], ...units[71], ...units[70]]
            ctx.lineWidth = 3;
            ctx.font = '30px Baloo Paaji';
            ctx.strokeStyle = "black";
            ctx.fillStyle = '#db4537';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            for (let i = 0; i < AllEntity.length; i++) {
                ent = AllEntity[i];
                if (activeUnits[ent.type][ent.id]) {
                    ctx.strokeText(activeUnits[ent.type][ent.id].hp + heartEmoji, script.user.cam.x + ent.x, script.user.cam.y + ent.y + 20);
                    ctx.fillText(activeUnits[ent.type][ent.id].hp + heartEmoji, script.user.cam.x + ent.x, script.user.cam.y + ent.y + 20);
                }
            }
            ctx.restore();
        }
        if (Settings.showHpPlayer) {
            ctx.save();
            ctx.font = '22px Baloo Paaji';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            for (let i = 0; i < players.length; i++) {
                const pid = players[i][Object.keys(players[i])[1]]
                pl = players[i];
                let hp = 200;
                if (activeUnits[0][pl.id]) {
                    hp = activeUnits[0][pl.id].hp
                }
                if (pid == mypid) {
                    hp = script.user.gauges.health;
                    if (!Settings.showMyHp) continue
                }

                ctx.strokeStyle = "#496e34";
                ctx.fillStyle = "rgba(126,194,85,0.6)";
                let x = script.user.cam.x + pl.x - 40;
                let y = script.user.cam.y + pl.y - 61;
                ctx.lineWidth = 3;
                ctx.fillRect(x, y, parseInt(hp / 200 * 80), 20);
                ctx.fillStyle = "rgba(240,86,72,0.6)";
                ctx.fillRect(x + parseInt(hp / 200 * 80), y, 80 - parseInt(hp / 200 * 80), 20);
                roundRect(ctx, x, y, x + 80, y + 20, 5)
                ctx.fillStyle = 'black'
                ctx.strokeStyle = "black";
                ctx.fillText(hp, x + 21, y + 13);
            }
            ctx.restore();
        }

        if (Settings.showHealTimer) {
            calculateTimers(units);
        }

        if (Settings.showWeaponTimer) {
            let now = Date.now();
            for (let i = 0; i < players.length; i++) {
                const player = players[i];
                const pid = player[Object.keys(player)[1]];
                if (!(pid in weaponPlayers)) {
                    weaponPlayers[pid] = { time: 0, lastWeapon: -1, type: 0 };
                }
                if (player.right != weaponPlayers[pid].lastWeapon) {
                    weaponPlayers[pid].time = now;
                    weaponPlayers[pid].lastWeapon = player.right;
                    weaponPlayers[pid].type = HoldWeapon(player.right, false);
                }
                if (weaponPlayers[pid].type != 0) {
                    if (pid === script.user.id) {
                        drawPartialCircle(ctx, 50, script.user.cam.x + player.x, script.user.cam.y + player.y, (now - weaponPlayers[pid].time) / 10000, 9);
                    } else {
                        drawPartialCircle(ctx, 10, script.user.cam.x + player.x + 43, script.user.cam.y + player.y - 43, (now - weaponPlayers[pid].time) / 10000, 5);
                    }
                }
            }
        }

        if (Settings.showNames || Settings.showScore) {
            ctx.strokeStyle = "black";
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            for (let i = 0; i < players.length; i++) {
                const pid = players[i][Object.keys(players[i])[1]];
                if (pid === script.user.id) continue;
                if (Settings.showScore) {
                    score = players[i][Object.keys(players[i])[14]]
                    score = score[Object.keys(score)[13]]
                    if (score > 0) {
                        if (score > 100000) {
                            score = Math.floor(score / 1000) + 'k'
                        } else if (score > 10000) {
                            score = Math.floor(score / 100) / 10 + 'k'
                        }
                        ctx.strokeText(score, script.user.cam.x + players[i].x - 1, script.user.cam.y + players[i].y - 27);
                        ctx.fillText(score, script.user.cam.x + players[i].x - 1, script.user.cam.y + players[i].y - 27);
                    }
                }
                if (Settings.showNames) {
                    let nikcname = players[i][Object.keys(players[i])[14]]
                    nikcname = nikcname[Object.keys(nikcname)[0]]
                    ctx.strokeText(nikcname, script.user.cam.x + players[i].x - 1, script.user.cam.y + players[i].y - 70);
                    ctx.fillText(nikcname, script.user.cam.x + players[i].x - 1, script.user.cam.y + players[i].y - 70);
                }
            };
        }

        if (Settings.debug.player_action.e) {
            ctx.strokeStyle = "black";
            ctx.fillStyle = '#3683ff';
            for (let i = 0; i < players.length; i++) {
                ctx.strokeText(players[i].action, script.user.cam.x + players[i].x + 25, script.user.cam.y + players[i].y - 1);
                ctx.fillText(players[i].action, script.user.cam.x + players[i].x + 25, script.user.cam.y + players[i].y - 1);
            }
        }

        if (Settings.debug.units_id.e) {
            ctx.strokeStyle = "black";
            ctx.fillStyle = 'pink';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            for (let i = 0; i < units.length; i++) {
                const unit = units[i];
                for (let j = 0; j < unit.length; j++) {
                    const one = unit[j];
                    ctx.strokeText(unit[j].type, script.user.cam.x + unit[j].x, script.user.cam.y + unit[j].y + 35);
                    ctx.fillText(unit[j].type, script.user.cam.x + unit[j].x, script.user.cam.y + unit[j].y + 35);

                }
            }
        }

        ctx.restore();
    } else {
        let lootboxsinfo = {};
        let deathboxinfo = {};
    }
}


function loadSpectator() {
    requestAnimationFrame(loadSpectator);
    if (client[Keys.webSocket]) {
        if (!client[Keys.webSocket]["current"]) {
            client[Keys.webSocket]["current"] = true;
            client[Keys.webSocket].send = new Proxy(client[Keys.webSocket].send, {
                apply: function (target, thisArg, args) {
                    // log('b', args);

                    if (args[0][0] == packets.move && Settings.spectator.e && !Settings.PathFinder.e && !Settings.Autofarm.e) {
                        return
                    }

                    if (typeof args[0] == 'string') {
                        const obj = JSON.parse(args[0]);
                        if (obj[0] == 0) {
                            mp = script.world.fast_units[script.user.uid];
                            if (mp) {
                                Settings.antiKick.dx = Math.round(obj[1] - mp.x)
                                Settings.antiKick.dy = Math.round(obj[2] - mp.y)
                            }
                        }

                        if (obj[0] == packets.recycle) {
                            Settings.AutoRecycle.lastrecycle = obj[1];
                            log("new recycle " + Settings.AutoRecycle.lastrecycle);
                        }
                        if (obj[0] == packets.craft) {
                            Settings.AutoCraft.lastcraft = obj[1];
                            send([packets.equip, 46]);

                            if (!Crafting.isCraft) {
                                log("Craft", obj[1]);
                                Crafting.isCraft = true;
                                Crafting.id = Number(obj[1]);
                                Crafting.old_count = realInventoryHas(Crafting.id)[1];
                                if (!Crafting.old_count) Crafting.old_count = 0;
                                Crafting.now = Date.now();
                            }
                        }
                    }
                    return target.apply(thisArg, args);
                }
            });
            const oldFunction = client[Object.keys(client)[68 + 1]];
            client[Object.keys(client)[68 + 1]] = function () {
                if (Settings.spectator.e) return
                oldFunction.apply(this, arguments);
            }
            const userCam = user[Keys.cam];
            const moveCam = userCam[Object.keys(userCam)[12]];
            userCam[Object.keys(userCam)[12]] = function () {
                moveCam.apply(this, arguments);
                if (Settings.spectator.e || Settings.spectator.is_back) {
                    // log('userCam', userCam, Settings.spectator.x, Settings.spectator.y)
                    userCam.x = Settings.spectator.x;
                    userCam.y = Settings.spectator.y;
                }
            }
        }
    }
    if (!script.user.alive) return

    if (Settings.spectator.e && !Settings.spectator.is_back) {
        if (Settings.spectator.is_x > 0) Settings.spectator.x += Settings.spectator.s;
        if (Settings.spectator.is_x < 0) Settings.spectator.x -= Settings.spectator.s;
        if (Settings.spectator.is_y > 0) Settings.spectator.y += Settings.spectator.s;
        if (Settings.spectator.is_y < 0) Settings.spectator.y -= Settings.spectator.s;
    }
    if (Settings.spectator.is_back) {

        dist = Math.sqrt((Settings.spectator.x - Settings.spectator.start_x) ** 2 + (Settings.spectator.y - Settings.spectator.start_y) ** 2)
        // log(dist)
        if (dist < 10) {
            Settings.spectator.is_back = false;
        } else {
            dt = Date.now() - Settings.spectator.timeout;
            dx = Settings.spectator.start_x - Settings.spectator.end_x
            dy = Settings.spectator.start_y - Settings.spectator.end_y
            Settings.spectator.x = Settings.spectator.end_x + (dx * Settings.spectator.s * dt / 4000)
            Settings.spectator.y = Settings.spectator.end_y + (dy * Settings.spectator.s * dt / 4000)
            if (Settings.spectator.end_x > Settings.spectator.start_x) {
                if (Settings.spectator.x < Settings.spectator.start_x) Settings.spectator.x = Settings.spectator.start_x;
            } else {
                if (Settings.spectator.x > Settings.spectator.start_x) Settings.spectator.x = Settings.spectator.start_x;
            }
            if (Settings.spectator.end_y > Settings.spectator.start_y) {
                if (Settings.spectator.y < Settings.spectator.start_y) Settings.spectator.y = Settings.spectator.start_y;
            } else {
                if (Settings.spectator.y > Settings.spectator.start_y) Settings.spectator.y = Settings.spectator.start_y;
            }
        }

    }

}


function antiKick() {
    if (!Settings.antiKick.e) return
    if (!script.user.alive) return
    if (Settings.antiKick.visible) return
    timeNow = Date.now();

    if (timeNow - Settings.antiKick.timeout > 5 * 1000) {
        send([packets.Iamhere]);
        Settings.antiKick.timeout = timeNow;
    }
    updater(0)
    autofarm(0)
}


function mainscript() {
    if (Settings.TurnOffScript.e) return;

    PathFinder();

    updateActionsCraftHelper();


    if (Settings.showHpPlayer || Settings.showHp) calculateHp(script.world.units);

    if (Settings.dropSword.e) {
        let mp = myplayer()
        type = HoldWeapon(mp.right, false);
        if (type) send([packets.dropall, mp.right])
    }

    if (Settings.AutoBreadPut.e) {
        var mils = units[41];
        for (let i = 0; i < mils.length; ++i) {
            if (getdist(script.myPlayer, mils[i]) <= 300) {
                const pid = mils[i][Object.keys(mils[i])[1]];
                send([packets.millPut, 10, pid, mils[i].id]);
            }
        }
        var ovens = units[43];
        for (let i = 0; i < ovens.length; ++i) {
            if (getdist(script.myPlayer, ovens[i]) <= 300) {
                const pid = ovens[i][Object.keys(ovens[i])[1]];
                send([packets.breadPutBatter, 5, pid, ovens[i].id]);
                send([packets.breadPutWood, 31, pid, ovens[i].id]);
            }
        }
    }
    if (Settings.AutoBreadTake.e || Settings.AutoSteal.e) {
        var mils = units[41];
        for (let i = 0; i < mils.length; ++i) {
            if (getdist(script.myPlayer, mils[i]) <= 300) {
                const pid = mils[i][Object.keys(mils[i])[1]];
                send([packets.millTake, pid, mils[i].id]);
            }
        }
        var ovens = units[43];
        for (let i = 0; i < ovens.length; ++i) {
            if (getdist(script.myPlayer, ovens[i]) <= 300) {
                const pid = ovens[i][Object.keys(ovens[i])[1]];
                send([packets.breadTake, pid, ovens[i].id]);
            }
        }
    }

    if (Settings.AutoExtractorPut.e) {
        extractor_ids.forEach((extractorType) => {
            var extractor = units[extractorType];
            if (!chatxterm()) {
                for (let i = 0; i < extractor.length; ++i) {
                    if (getdist(script.myPlayer, extractor[i]) <= 300) {
                        const pid = extractor[i][Object.keys(extractor[i])[1]]
                        send([packets.extPut, 20, pid, extractor[i].id, extractorType]);
                    }
                }
            }
        });
    }
    if (Settings.AutoExtractorTake.e || Settings.AutoSteal.e) {
        extractor_ids.forEach((extractorType) => {
            var extractor = units[extractorType];
            if (!chatxterm()) {
                for (let i = 0; i < extractor.length; ++i) {
                    if (getdist(script.myPlayer, extractor[i]) <= 300) {
                        const pid = extractor[i][Object.keys(extractor[i])[1]]
                        send([packets.extTake, pid, extractor[i].id, extractorType]);
                    }
                }
            }
        });
    }
    if (Settings.AutoAttack.e & script.user.alive) {
        send([packets.attack, script.myPlayer.angle]);
        send([packets.stopAttack]);
    }
    if (Settings.AutoSteal.e) {
        var chests = units[11];
        for (let i = 0; i < chests.length; ++i) {
            if (getdist(script.myPlayer, chests[i]) <= 300) {
                const pid = chests[i][Object.keys(chests[i])[1]]
                send([packets.chestTake, pid, chests[i].id]);
            }
        }
    }

    if (Settings.AutoTotem.e) {
        const tt = units[38];
        for (let i = 0; i < tt.length; ++i) {
            if (getdist(script.myPlayer, tt[i]) <= 300) {
                const pid = tt[i][Object.keys(tt[i])[1]]
                send([packets.joinTotem, pid, tt[i].id]);
            }
        }
    }

    if (Settings.AutoCraft.lastcraft != -1 && Settings.AutoCraft.e) {
        if (Settings.AutoCraft.s && script.user.gauges.hungry < 60) {
            let isEated = false
            for (const item of foodItems) {
                if (inventoryHas(item)[0]) {
                    send([packets.equip, item])
                    isEated = true;
                    break
                }
            }
            if (!isEated && Settings.AutoCraft.s) {
                showalert("AutoCraft disabled. No food", 5000)
                Settings.AutoCraft.e = false
            }
        } else {
            if (script.myPlayer.right != 46) send([packets.equip, 46]);
            send([packets.craft, Settings.AutoCraft.lastcraft]);
        }
    }

    if (Crafting.isCraft) {
        let realInv = realInventoryHas(Crafting.id);
        if (realInv[0] && realInv[1] > Crafting.old_count || Date.now() - Crafting.now > 10000) {
            Crafting.now = Date.now();
            Crafting.isCraft = false;
        }
    }

    if (script.user.alive && Settings.SmartCraft.e) {
        if (Settings.AutoCraft.s && script.user.gauges.hungry < 60) {
            let isEated = false
            for (const item of foodItems) {
                if (inventoryHas(item)[0]) {
                    send([packets.equip, item])
                    isEated = true;
                    break
                }
            }
            if (!isEated && Settings.AutoCraft.s) {
                showalert("AutoCraft disabled. No food", 5000)
                Settings.AutoCraft.e = false
            }
        } else {
            if (!Crafting.isCraft) {
                let craftId = getCraftId(craft_tree);
                if (script.myPlayer.right != 46) send([packets.equip, 46]);
                if (craftId != -1) send([packets.craft, craftId]);
            }
        }
    }

    if (Settings.AutoRecycle.lastcraft != -1 && Settings.AutoRecycle.e) {
        if (Settings.AutoRecycle.s && script.user.gauges.hungry < 60) {
            let isEated = false
            for (const item of foodItems) {
                if (inventoryHas(item)[0]) {
                    send([packets.equip, item])
                    isEated = true;
                    break
                }
            }
            if (!isEated && Settings.AutoRecycle.s) {
                showalert("AutoCraft disabled. No food", 5000)
                Settings.AutoRecycle.e = false
            }
        } else {
            send([packets.recycle, Settings.AutoRecycle.lastrecycle]);
        }
    }
    if (Settings.AutoFeed2.e) {
        if (lastFood[1] == 0 && script.user.gauges.hungry < Settings.AutoFeed2.a) {
            for (const item of foodItems) {
                if (inventoryHas(item)[0] && lastFood[0] != script.user.gauges.hungry) {
                    send([packets.equip, item]);
                    lastFood[1] += 1;
                    break
                }
            }
        }
    }

    if (script.user.gauges.hungry - lastFood[0] < 0) {
        lastFood[1] = 0;
    }
    lastFood[0] = script.user.gauges.hungry;


    if (Settings.AutoIce.e) {
        if (script.user.gauges.cold == 200) {
            if (ice[1] != script.user.gauges.cold) {
                if (inventoryHas(ice[0])[0]) {
                    send([packets.equip, ice[0]])
                }
            }
        }

        ice[1] = script.user.gauges.cold;
    }


    if (Settings.AutoSpike.e && !chatxterm()) {
        for (let i = 0, SpikeP = Settings.AutoSpike.p; i < SpikeP.length; i++) {
            var CurrentSpike = SpikeP[i];
            switch (CurrentSpike) {
                case "Reidite Spike":
                    CurrentSpike = 329;
                    break;
                case "Amethyst Spike":
                    CurrentSpike = 214;
                    break;
                case "Diamond Spike":
                    CurrentSpike = 272; //
                    break;
                case "Gold Spike":
                    CurrentSpike = 271; //
                    break;
                case "Stone Spike":
                    CurrentSpike = 270; //
                    break;
                case "Wood Wall":
                    CurrentSpike = 264;
                    break;
                case "Nothing":
                    CurrentSpike = -1;
                    break;
            };
            if (CurrentSpike === -1 || !inventoryHas(CurrentSpike)[0]) continue;
            var spikeid = CurrentSpike;
            break;
        };
        let angle = Math.floor((((script.myPlayer.angle + Math.PI * 2) % (Math.PI * 2)) * 255) / (Math.PI * 2));
        if (spikeid) {
            let range = 10;
            if (Settings.AutoSpikeMode2) range = 9;
            for (let i = 0; i < range; i++) {
                send([packets.placeBuild, spikeid, (angle - i * 2 + 255) % 255, 0]);
                send([packets.placeBuild, spikeid, (angle + i * 2 + 255) % 255, 0]);
            }
            if (Settings.AutoSpikeMode2) {
                send([packets.placeBuild, spikeid, (angle) % 255, 1]);
            }
        };
        if (Settings.AutoBridge) {
            send([packets.placeBuild, 216, (angle) % 255, 0]);
        }
    }

    if (script.user.alive && Ids.is_set) {
        let players = unit()[0];
        for (let i = 0; i < players.length; i++) {
            const p = players[i];
            const pid = p[Object.keys(p)[1]]
            if (isAlly(pid)) continue;
            if (p.text.includes("pls " + fly2)) {
                client[Keys.movement](0);
                send([packets.equip, 7]);
            }
        }
    }

    if (script.user.alive && Ids.is_set) {
        if (Settings.AutoShop.wood.e) buyResMax(0);
        if (Settings.AutoShop.stone.e) buyResMax(1);
        if (Settings.AutoShop.gold.e) buyResMax(2);
        if (Settings.AutoShop.diamond.e) buyResMax(3);
        if (Settings.AutoShop.amethyst.e) buyResMax(4);
        if (Settings.AutoShop.reidite.e) buyResMax(5);
    }
}

function showalert(text, time) {
    try {
        Settings.textalert.t = text
        Settings.textalert.e = true
        setTimeout(() => {
            Settings.textalert.e = false
        }, parseInt(time));
    } catch (error) { }
}

function circleAngle(t, e, i, s, n) {
    t.beginPath();
    t.lineCap = "round";
    t.arc(e, i, s, 0, Math.PI * 2 * n);
}



function resetGraphics() {
    if (!Settings.FPSBoost.e) { return }
    const divLow = document.getElementById('low_ing');
    const divHigh = document.getElementById('high_ing');

    const mouseUpEvent = new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
    });

    divLow.dispatchEvent(mouseUpEvent);
    log('resetGraphics');
    setTimeout(() => { divHigh.dispatchEvent(mouseUpEvent); }, 0)
}



function main() {
    colors()
    // autoBook() // Сделан по другому (см loadSpectator)
    // recycle()  // Сделан по другому (см loadSpectator)
    blizzard()
    updater()
    aimbot()
    autofarm()
    setTimeout(loadFog, 100)
    setTimeout(loadRoof, 150)
    setTimeout(loadXray, 300)
    setTimeout(disable_exapush_popup, 1000)
    autoresp()
    loadSpectator()

    // SwordInChest()   // not work (пофиксили на уровне сервера)

    setInterval(() => {
        mainscript()
    }, 130);

    setInterval(() => {
        antiKick()
    }, 500);

    setInterval(() => {
        resetGraphics()
    }, 1000 * 60 * 3);   // 3 min.
}

let ready_ = 0;
let initId;

function initialize() {
    try {
        if (ready_ === 0 && user !== undefined && world !== undefined && client !== undefined) {
            main()
            log("On");
            ready_++;
            clearInterval(initId);
        }
    } catch (err) {
        log("Off");
        log(err)
    }
}

initId = setInterval(initialize, 1500);

