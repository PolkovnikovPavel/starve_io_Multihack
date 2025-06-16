// ==UserScript==
// @name         Multihack V3
// @namespace    http://tampermonkey.net/
// @version      2024-05-20
// @description  Всё что нужно для реального пацана
// @author       setorg
// @match        https://starve.io/*
// @run-at       document-start
// @grant        unsafeWindow
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

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


const abc = 'ABCDEFGHIJKLMNEWOPQRSTUVXYZabcdefghijklmnopqrstuvwxy!z';
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


const originalTimeoutDescriptor = Object.getOwnPropertyDescriptor(Object.prototype, "timeout");
const originalIdleDescriptor = Object.getOwnPropertyDescriptor(Object.prototype, "IDLE");
const originalOptionsDescriptor = Object.getOwnPropertyDescriptor(Object.prototype, "options");
const originalModeDescriptor = Object.getOwnPropertyDescriptor(Object.prototype, "mode");
const originalMappingDescriptor = Object.getOwnPropertyDescriptor(Object.prototype, "mapping");

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
    // Object.defineProperty(Object.prototype, "opacity", {
    //     get() {
    //         this._myProperty = 0.5
    //         return this._myProperty
    //     },
    //     set(data) {
    //         this._myProperty = data;
    //     },
    // })

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
}
hooks();



const packets = {
    Iamhere: 21,
    move: 11,
    drop: 24,
    dropall: 31,
    millPut: 30,
    millTake: 4,
    breadTake: 13,
    breadPutWood: 14,
    breadPutBatter: 25,
    extPut: 27,
    extTake: 37,
    placeBuild: 22,
    joinTotem: 17,
    angle: 0,
    attack: 36,
    stopAttack: 16,
    chestPut: 1,
    chestTake: 8,
    equip: 34,
    recycle: 18,
    craft: 26,
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


const SandstormImage = new Image();
SandstormImage.src = "https://raw.githubusercontent.com/XmreLoux/images/main/sandstorm.png";
const BlizzardImage = new Image();
BlizzardImage.src = "https://raw.githubusercontent.com/XmreLoux/images/main/blizzard.png";
const fly = 'ⲆⵠⲆⵠⲆᐃⲆ';
let skins = [];
let lootboxes = [];
let scriptId;
let id_tings = 124;
OpenedNode = { e: true, node: null, a: 0.8, x: 0, y: 0, lastX: 0, lastY: 0, isPressed: false, isFocus: false, styleSheet: null, script_menu_button1: null, script_menu_button2: null }



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
    ChestInfo: true,
    ChestInfo2: true,
    DropInChest: { id: 109, count: 255 },
    boxinfo: true,
    toteminfo: true,
    showNames: true,
    showFly: false,
    showScore: true,
    showHp: true,
    showHpPlayer: true,
    showMyHp: true,
    ColoredSpikes: false,
    AutoBridge: false,
    autoRespawn: false,
    AutoSpikeMode2: false,
    AutoBreadPut: { e: false, k: "KeyM" },
    AutoBreadTake: { e: false, k: "KeyN" },
    AutoExtractorPut: { e: false, k: "KeyP" },
    AutoExtractorTake: { e: false, k: "KeyO" },
    AutoCraft: { e: false, k: "KeyK", lastcraft: -1, s: false },
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
    }
}


setTimeout(() => {
    let intId;
    unsafeWindow.kasdgiksadg = {
        KILLUKRSOLIDER: () => {
            if (!world || !client) return
            console.log(sdpfin, Object.keys(world).length, Object.keys(client).length);
            if (!sdpfin || Object.keys(world).length < 30 || !client || Object.keys(client).length < 30) {
                Settings.textalert.t = 'Error loading script';
                Settings.textalert.e = true;
                return;
            };

            clearInterval(scriptId);
            setNewUI();
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
            // document.addEventListener("keypress", event => {
            //     if (chatxterm()) return;
            //     if (event.code === Settings.spectator.k && !Settings.spectator.e) {
            //         // client[Object.keys(client)[0]].send([11, 0]);
            //     };
            // });


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
                            Settings.spectator.x = user[Object.keys(user)[28]].x
                            Settings.spectator.y = user[Object.keys(user)[28]].y
                            Settings.spectator.start_x = user[Object.keys(user)[28]].x
                            Settings.spectator.start_y = user[Object.keys(user)[28]].y
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

                        // DEBUG
                        // log('client', Object.keys(client), client)
                        // log('mouse', Object.keys(mouse), mouse)
                        // log('game', Object.keys(game), game)
                        // log('world', Object.keys(world), world)
                        // log('user', Object.keys(user), user)


                        break
                    case "ArrowLeft":
                        id_tings -= 1;
                        console.log(id_tings);
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
    log(11111);

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
    const Aimbot = new TreeNode('Aimbot', Misc, script_menu);

    const UI = new TreeNode('UI settings', Visuals, script_menu);
    const Map = new TreeNode('Mini Map', Visuals, script_menu);
    const Tracers = new TreeNode('Tracers', Visuals, script_menu);


    Visuals.addChild(new Field({ type: 'checkbox', label: 'FPS', object: Settings.fps, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'Gauges', object: Settings, property: 'gaugesInfo', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'BuildInfo', object: Settings, property: 'buildinfo', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'ChestInfo', object: Settings, property: 'ChestInfo', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'TotemInfo', object: Settings, property: 'toteminfo', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'BoxInfo', object: Settings, property: 'boxinfo', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'ShowNames', object: Settings, property: 'showNames', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'showScore', object: Settings, property: 'showScore', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'show HP', object: Settings, property: 'showHp', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'show player HP', object: Settings, property: 'showHpPlayer', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'show my HP', object: Settings, property: 'showMyHp', onChange: data => { kasdgiksadg.saveSettings(); } }));
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


    AutoFarm.addChild(new Field({ type: 'checkbox', label: 'Start Autofarm', object: Settings.Autofarm, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    AutoFarm.addChild(new Field({ type: 'checkbox', label: 'Auto water', object: Settings.Autofarm, property: 'water', onChange: data => { kasdgiksadg.saveSettings(); } }));
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

    AutoCraft_Recycle.addChild(new Field({ type: 'display', label: 'Smart Craft', object: { t: 'coming soon...' }, property: 't' }));
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
    PathFinder.addChild(new Field({ type: 'range', label: 'set X', min: 0, max: 250, step: 1, object: Settings.PathFinder, property: 'x', onChange: data => { kasdgiksadg.saveSettings(); FTextX.obj.textContent = Settings.PathFinder.x; } }));
    PathFinder.addChild(new Field({ type: 'range', label: 'set Y', min: 0, max: 250, step: 1, object: Settings.PathFinder, property: 'y', onChange: data => { kasdgiksadg.saveSettings(); FTextY.obj.textContent = Settings.PathFinder.y; } }));
    PathFinder.addChild(new Field({ type: 'range', label: 'Min Dist', min: 50, max: 250, step: 1, object: Settings.PathFinder, property: 'dist', onChange: data => { kasdgiksadg.saveSettings(); } }));
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
    TokenSetter.addChild(new Field({ type: 'button', label: 'Go Back To Lobby', action: data => { client[Object.keys(client)[136 + 1]](); } }));
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



    script_menu.appendChild(root.toHtmlDiv());
    document.getElementById('game_body').appendChild(script_menu);

    const script_menu_button1 = document.createElement('img')
    const script_menu_button2 = document.createElement('img')
    script_menu_button1.style.width = '55px';
    script_menu_button1.style.height = '55px';
    script_menu_button1.style.position = 'absolute';
    script_menu_button1.style.right = '227px';
    script_menu_button1.style.top = '280px';
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

    script_menu_button1.src = 'https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/icon_script2_btn1.png?raw=true';
    script_menu_button2.src = 'https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/icon_script2_btn2.png?raw=true';

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
        client[Object.keys(client)[0]].send(JSON.stringify(data));
    } catch (error) {
        if (script.user.alive) {
            Settings.textalert.t = 'Error loading script'
            Settings.textalert.e = true
            return
        }
    }
}

function unit() {
    // log(Object.keys(world), world);
    // let units = world[Object.keys(world)[4 + 1]];
    return script.world.units;

}


function myplayer() {
    let fast_units = script.world.fast_units[script.user.uid];

    return fast_units;

}

/*
function pid(obj) {
    let wow
    if (unit()[0].length > 0) {
        unit()[0].forEach((obj) => {
            for (const e in obj) {
                if (obj[e] == user.id && e !== "info") {
                    wow = e;
                    break; // This will exit the for-in loop
                }
            }
        });
    }

    return obj.ΔⵠⵠⲆ;
}
*/

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
        jQuery("body").append('<img draggable="false" id="myNewImage" border="0" src="https://github.com/PolkovnikovPavel/golf_onlain/blob/master/images/mapv2transparent.png?raw=true">')
    } else {
        jQuery("body").append('<img draggable="false" id="myNewImage" border="0" src="https://github.com/PolkovnikovPavel/golf_onlain/blob/master/images/mapv2transparent2.png?raw=true">')
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

function Getinventory() {

    let inv;
    let inv2;
    let counter = 0;
    inv = user[Object.keys(user)[35]]
    inv2 = inv[Object.keys(inv)[3]]

    return inv2;
}

function inventoryHas(id) {

    let inv;
    let inv2;
    let counter = 0;

    inv = user[Object.keys(user)[35]]
    inv2 = inv[Object.keys(inv)[3]]
    // log(1, Object.keys(user), user)
    // log(2, inv)
    // log(3, Object.keys(inv), inv)
    // log(4, inv2)


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
    let team = user[Object.keys(user)[11]];
    // let counter = 0;

    // for (let prop1 in user) {
    //     counter++;

    //     if (counter === 11) {
    //         team = user[prop1];
    //         break;
    //     }
    // }

    return team;
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

}

function turnOn() {
    Settings.ColoredSpikes = true;

    OpenedNode.script_menu_button1.style.display = ''
    OpenedNode.script_menu_button2.style.display = 'none'

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
    let _0x36da2b = Object.keys(client)[137 + 1];
    let _0x172688 = Object.keys(client)[136 + 1];
    let _0x34844e = Object.keys(_this)[85];
    let _0x130c89 = client[_0x36da2b];
    client[_0x36da2b] = function () {
        if (Settings.autoRespawn) {
            cooldowns.PathFinder = Date['now']();
            client[_0x172688]();
            setTimeout(spawn, 1500);
            return _0x130c89.apply(this, arguments);
        }
        return Settings.PathFinder.e && Settings.PathFinder.autoRestart && (cooldowns.PathFinder = Date['now'](), client[_0x172688](), _this[_0x34844e]()), _0x130c89.apply(this, arguments);
    };
}


function backToLobby() {
    let _0x172688 = Object.keys(client)[136 + 1];
    client[_0x172688]()
}


function spawn() {
    let _0x34844e = Object.keys(_this)[85 + 1];
    _this[_0x34844e]()
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

    let craft = Object.keys(client)[96];

    client[craft] = (id) => {

        Settings.AutoCraft.lastcraft = id

        send([packets.equip, 28])
        send([packets.craft, id]);
        return 1;
    };
}


function isDeathBox(id) {
    return true;
    // switch (id) {
    //     case 69:
    //         return false;
    //     case 73:
    //         return false;
    //     case 68:
    //         return false;
    //     case 66:
    //         return false;
    //     case 65:
    //         return false;
    //     case 62:
    //         return false;
    //     case 63:
    //         return false;
    //     case 78:
    //         return false;
    //     case 77:
    //         return false;
    //     case 64:
    //         return false;
    //     case 72:
    //         return false;
    //     case 88:
    //         return false;
    //     case 76:
    //         return false;
    //     case 75:
    //         return false;
    //     case 74:
    //         return false;
    //     case 60:
    //         return false;
    //     case 80:
    //         return false;
    //     case 61:
    //         return false;
    //     case 67:
    //         return false;
    //     case 71:
    //         return false;
    //     case 70:
    //         return false;
    //     default:
    //         return true;
    // }
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
    let o = copy_game[Object.keys(copy_game)[44 + 1]][chest.action / 2 - 1]["info"]
    return o[Object.keys(o)[2]][0];
}


let cooldowns = {
    Autofarm: Date['now'](),
    PathFinder: Date['now']()
};


function autofarm(time = 1) {
    if (time) requestAnimationFrame(autofarm);

    if (!script.user.alive) return;

    function _0x2c4b97(_0x2965fb, _0x5723f3, _0x30ace0) {
        return _0x2965fb && _0x5723f3 ? _0x30ace0 ? Math['atan2'](_0x5723f3['r']['y'] - _0x2965fb['r']['y'], _0x5723f3['r']['x'] - _0x2965fb['r']['x']) : Math['atan2'](_0x5723f3['y'] - _0x2965fb['y'], _0x5723f3['x'] - _0x2965fb['x']) : null;
    }
    let _0x456623 = Object.keys(client)[0x7a + 1], player = myplayer();
    if (Settings.Autofarm.e) {
        if (Date['now']() - cooldowns.Autofarm > 0x32) {
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
            plants = [...unit()[0x3], ...unit()[0x1f], ...unit()[0x25], ...unit()[0x27], ...unit()[0x28], ...unit()[0x2b], ...unit()[0x2c], ...unit()[0x36], ...unit()[0x37]]
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
                        if (inventoryHas(0x36)[0x0]) {
                            player['right'] !== 0x36 && send([packets['equip'], 0x36]);;
                        } else {
                            if (inventoryHas(0x35)[0x0]) {
                                player['right'] !== 0x35 && send([packets['equip'], 0x35]);;
                            }
                        };
                        _0x2a1577['type'] = 0x2;
                        break;
                    case 0x10:
                    case 0x11:
                    case 0x12:
                    case 0x13:
                        if (Settings.Autofarm['water']) {
                            if (inventoryHas(0x31)[0x0]) {
                                if (player['right'] !== 0x31) send([packets['equip'], 0x31]);
                                _0x2a1577['type'] = 0x1;
                            };
                        } else {
                            if (inventoryHas(0x36)[0x0]) {
                                player['right'] !== 0x36 && send([packets['equip'], 0x36]);;
                            } else {
                                if (inventoryHas(0x35)[0x0]) {
                                    player['right'] !== 0x35 && send([packets['equip'], 0x35]);;
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
                client[_0x456623](_0x1d01db);
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
                client[_0x456623](_0x265b45);
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

    let movment = Object.keys(client)[0x7a + 1];
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
    if (inventoryHas(223)[0]) {
        if (player[Object.keys(player)[61]] !== 223) send([packets['equip'], 223]);
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
    client[movment](res);
}

function HoldWeapon(_, $) {
    switch (_) {
        case 34:
        case 18:
        case 33:
        case 15:
        case 14:
        case 13:
        case 12:
        case 16:
        case 17:
            return 2;
        case 57:
        case 5:
        case 6:
        case 30:
        case 62:
        case 9:
        case 0:
        case 63:
        case 19:
            return 1;
        case 64:
        case 65:
        case 66:
        case 67:
        case 68:
        case 70:
        case 69:
            return 3;
        case 94:
        case 95:
        case 96:
        case 97:
        case 98:
        case 90:
        case 99:
            return 6;
        case 45:
            if ($) return 4;
        case -1:
            if ($) return 5;
    }
    return 0;
}


function aimbot() {
    requestAnimationFrame(aimbot);
    if (!script.user.alive) return;
    if (!Settings.AMB.off) Settings.textalert.e = false;
    if (Settings.TurnOffScript.e) return;

    let myPlayer = myplayer();
    const maxDist = 450000;
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
        log(PlayerList);

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
                myRange = myPlayer[fly] ? 140 : 125;
                break;
            case 5:
                myRange = myPlayer.clothe == 85 || myPlayer.clothe == 83 ? (myPlayer[fly] ? 120.8 : 97.6) : null;
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
                        log('protect p', protectionList[ent[Object.keys(ent)[63]]][0]);
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


function blizzard() {

    let blizzard1;
    let sandstorm
    let tempset;
    let counter = 0;

    // for (let prop1 in user) {
    //     counter++;

    //     if (counter === 37 + 1) {
    //         autofeed = user[prop1]
    //     }
    //     if (counter === 47 + 1) {
    //         sandstorm = user[prop1]
    //     }

    //     if (counter === 48 + 1) {

    //         let innerCounter = 0;

    //         log('user', Object.keys(user), user)

    //         for (let prop2 in user[prop1]) {
    //             innerCounter++;
    //             if (innerCounter === 2) {
    //                 blizzard1 = user[prop1];
    //                 unsafeWindow.blizz1 = blizzard1
    //                 tempset = [prop2]
    //             }
    //         }
    //         break;
    //     }
    // }

    requestAnimationFrame(blizzard)
    if (Settings.TurnOffScript.e) return;
    var use = -8;

    const canvas = document.getElementById("game_canvas");
    const ctx = canvas.getContext("2d");

    // if (script.user.alive && blizzard1[tempset]) { //27
    //     ctx.save();
    //     ctx.drawImage(
    //         BlizzardImage,
    //         canvas.width * 0.9,
    //         use + 100
    //     );
    //     use += 70;
    // }
    // if (script.user.alive && sandstorm[tempset]) { //26
    //     ctx.save();
    //     ctx.drawImage(
    //         SandstormImage,
    //         canvas.width * 0.9,
    //         use + 100
    //     );
    //     use += 70;
    // }
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
const foodItems = [138, 110, 117, 192, 189, 205, 207, 209, 243, 244,]
let ice = [142, 200];
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



const whuteListXray = [108, 109, 110, 111, 112, 114, 119, 121, 202, 307, 413, 415, 416, 676, 693]
const fogs = [244, 1041]
XraySprites = {}
NoXraySprites = {}
let mypid = -1;



function loadRoof() {
    for (let k = 0; k < unsafeWindow.sprite[853].length; k++) {
        if (!unsafeWindow.sprite[853][k]) continue;
        if (!unsafeWindow.sprite[853][k].length) continue;
        for (let l = 0; l < unsafeWindow.sprite[853][k].length; l++) {
            const originalImg = unsafeWindow.sprite[853][k][l];

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

            unsafeWindow.sprite[853][k][l] = newImg;

        }
    }
    log('load Roofs')
}

function loadFog() {
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
    AmethystSpikeAlly.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-amethyst-spike-ally.png"
    DiamondSpikeAlly = new Image;
    DiamondSpikeAlly.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-diamond-spike-ally.png"
    GoldSpikeAlly = new Image;
    GoldSpikeAlly.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-gold-spike-ally.png"
    StoneSpikeAlly = new Image;
    StoneSpikeAlly.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-stone-spike-ally.png"
    WoodSpikeAlly = new Image;
    WoodSpikeAlly.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-wood-spike-ally.png"

    dayWoodDoorAlly = new Image;
    dayWoodDoorAlly.src = "https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/day-wood-door-ally.png?raw=true"
    dayStoneDoorAlly = new Image;
    dayStoneDoorAlly.src = "https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/day-stone-door-ally.png?raw=true"
    dayGoldDoorAlly = new Image;
    dayGoldDoorAlly.src = "https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/day-gold-door-ally.png?raw=true"
    dayDiamondDoorAlly = new Image;
    dayDiamondDoorAlly.src = "https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/day-diamond-door-ally.png?raw=true"
    dayAmethystDoorAlly = new Image;
    dayAmethystDoorAlly.src = "https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/day-amethyst-door-ally.png?raw=true"
    dayReiditeDoorAlly = new Image;
    dayReiditeDoorAlly.src = "https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/day-reidite-door-ally.png?raw=true"
    dayWoodDoorSpikeAlly = new Image;
    dayWoodDoorSpikeAlly.src = "https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/day-wood-spike-door-ally.png?raw=true"
    dayStoneDoorSpikeAlly = new Image;
    dayStoneDoorSpikeAlly.src = "https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/day-stone-spike-door-ally.png?raw=true"
    dayGoldDoorSpikeAlly = new Image;
    dayGoldDoorSpikeAlly.src = "https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/day-gold-spike-door-ally.png?raw=true"
    dayDiamondDoorSpikeAlly = new Image;
    dayDiamondDoorSpikeAlly.src = "https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/day-diamond-spike-door-ally.png?raw=true"
    dayAmethystDoorSpikeAlly = new Image;
    dayAmethystDoorSpikeAlly.src = "https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/day-amethyst-spike-door-ally.png?raw=true"
    dayReiditeDoorSpikeAlly = new Image;
    dayReiditeDoorSpikeAlly.src = "https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/day-reidite-spike-door-ally.png?raw=true"


    ReiditeSpikeEnemy = new Image;
    ReiditeSpikeEnemy.src = 'https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/d-r-s-e.png?raw=true'
    AmethystSpikeEnemy = new Image;
    AmethystSpikeEnemy.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-amethyst-spike-enemy.png"
    DiamondSpikeEnemy = new Image;
    DiamondSpikeEnemy.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-diamond-spike-enemy.png"
    GoldSpikeEnemy = new Image;
    GoldSpikeEnemy.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-gold-spike-enemy.png"
    StoneSpikeEnemy = new Image;
    StoneSpikeEnemy.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-stone-spike-enemy.png"
    WoodSpikeEnemy = new Image;
    WoodSpikeEnemy.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-wood-spike-enemy.png"

    dayWoodDoorEnemy = new Image;
    dayWoodDoorEnemy.src = "https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/day-wood-door-enemy.png?raw=true"
    dayStoneDoorEnemy = new Image;
    dayStoneDoorEnemy.src = "https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/day-stone-door-enemy.png?raw=true"
    dayGoldDoorEnemy = new Image;
    dayGoldDoorEnemy.src = "https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/day-gold-door-enemy.png?raw=true"
    dayDiamondDoorEnemy = new Image;
    dayDiamondDoorEnemy.src = "https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/day-diamond-door-enemy.png?raw=true"
    dayAmethystDoorEnemy = new Image;
    dayAmethystDoorEnemy.src = "https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/day-amethyst-door-enemy.png?raw=true"
    dayReiditeDoorEnemy = new Image;
    dayReiditeDoorEnemy.src = "https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/day-reidite-door-enemy.png?raw=true"
    dayWoodDoorSpikeEnemy = new Image;
    dayWoodDoorSpikeEnemy.src = "https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/day-wood-spike-door-enemy.png?raw=true"
    dayStoneDoorSpikeEnemy = new Image;
    dayStoneDoorSpikeEnemy.src = "https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/day-stone-spike-door-enemy.png?raw=true"
    dayGoldDoorSpikeEnemy = new Image;
    dayGoldDoorSpikeEnemy.src = "https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/day-gold-spike-door-enemy.png?raw=true"
    dayDiamondDoorSpikeEnemy = new Image;
    dayDiamondDoorSpikeEnemy.src = "https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/day-diamond-spike-door-enemy.png?raw=true"
    dayAmethystDoorSpikeEnemy = new Image;
    dayAmethystDoorSpikeEnemy.src = "https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/day-amethyst-spike-door-enemy.png?raw=true"
    dayReiditeDoorSpikeEnemy = new Image;
    dayReiditeDoorSpikeEnemy.src = "https://github.com/PolkovnikovPavel/starve_io_Multihack/blob/master/img/day-reidite-spike-door-enemy.png?raw=true"



    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMOPQRSTUVWXYZ_0123456789";

    for (let e in unsafeWindow) {
        if (!Array.isArray(unsafeWindow[e]) && chars.includes(e[0])) continue;
        if (unsafeWindow[e].length > 800 && unsafeWindow[e].length < 1500) {
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


const srsImg = 'abbccc'
function colors() {
    loadSpikes();
    // return

    if (true) {
        let ITEMS = {
            CHEST: 11,
            SPIKE: 5,
            STONE_SPIKE: 12,
            GOLD_SPIKE: 13,
            DIAMOND_SPIKE: 14,
            AMETHYST_SPIKE: 20,
            REIDITE_SPIKE: 52,
            WOOD_DOOR: 10,
            STONE_DOOR: 15,
            GOLD_DOOR: 16,
            DIAMOND_DOOR: 17,
            AMETHYST_DOOR: 21,
            REIDITE_DOOR: 51,
            WOOD_DOOR_SPIKE: 45,
            STONE_DOOR_SPIKE: 46,
            GOLD_DOOR_SPIKE: 47,
            DIAMOND_DOOR_SPIKE: 48,
            AMETHYST_DOOR_SPIKE: 49,
            REIDITE_DOOR_SPIKE: 53,
        }

        let push = Array.prototype.push
        Array.prototype.push = function (p) {
            if (p) {
                let a = Object.keys(p);
                5 == a.length && a.includes("draw") && a.includes("in_button") && 32 !== p.id && 130 !== p.id && 127 !== p.id && 4 !== p.id && 25 !== p.id && 34 !== p.id && 87 !== p.id && (unsafeWindow.inventory = this);
            }
            if (p && null != p.type && null != p.id && p.x && p.y) {
                // log(p)
                try {
                    unsafeWindow.wow = Object.keys(p)[13];
                    const pid = p[Object.keys(p)[1]];
                    p.ally = mypid === pid || isAlly(pid);

                    switch ((0 === p.type && pid(p) === unsafeWindow.playerID && (unsafeWindow.player = p), p.type)) {
                        case ITEMS.SPIKE: {
                            let l = p[wow]; // draw
                            p[wow] = function (a) {
                                log([p, this, arguments, a]);
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
                            log('r', this, arguments)
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


function updater(time = 1) {
    if (time) {
        requestAnimationFrame(updater)
    }


    if (Settings.TurnOffScript.e) return;

    unsafeWindow.ctx = document.getElementById("game_canvas").getContext("2d");

    if (!script.user.alive & script.user.alive != user[Object.keys(user)[10]]) {
        startTimer = new Date;
    }

    script.user.alive = user[Object.keys(user)[10]];

    // draw(id_tings, unsafeWindow.ctx);


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

        // log('game', Object.keys(game), game);
        // log('world', Object.keys(world), world);
        // log('user', Object.keys(user), user);
        // log('client', Object.keys(client), client);


        let gauges = user[Object.keys(user)[50 + 1]]
        script.world.units = world[Object.keys(world)[4 + 1]]
        script.world.fast_units = world[Object.keys(world)[9 + 1]]
        script.user.id = user.id;
        script.user.uid = user[Object.keys(user)[19]]
        script.user.gauges.health = Math.floor(gauges[Object.keys(gauges)[1]] * 200)
        script.user.gauges.hungry = Math.floor(gauges[Object.keys(gauges)[2]] * 100)
        script.user.gauges.cold = Math.floor(gauges.c * 100) + Math.floor(100 - (gauges[Object.keys(gauges)[5]] * 100))
        script.user.gauges.water = Math.floor(gauges[Object.keys(gauges)[3]] * 100)

        script.user.cam.x = user[Object.keys(user)[28]].x
        script.user.cam.y = user[Object.keys(user)[28]].y
        script.user.team = user[Object.keys(user)[21]]
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
            if (Settings.spectator.e && Settings.spectator.player) {
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
        units = unit()
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
                script.lastHealTime = performance.now();
            }
            if (food < script.lastHungry) {
                script.lastTimer = performance.now();
            }

            let healTimer = Math.round(10 - (timeNow - script.lastHealTime) / 1000);
            let otherTimer = Math.round(5 - (timeNow - script.lastTimer) / 1000);
            if (!isNaN(healTimer)) {
                if (healTimer > 10 || healTimer < 0) script.lastHealTime = performance.now();
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

        if (Settings.showNames || Settings.showScore) {
            ctx.strokeStyle = "black";
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            for (let i = 0; i < players.length; i++) {
                const pid = players[i][Object.keys(players[i])[1]]
                if (pid === script.user.id) continue;
                if (Settings.showScore) {
                    score = players[i][Object.keys(players[i])[13]]
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
                    let nikcname = players[i][Object.keys(players[i])[13]]
                    nikcname = nikcname[Object.keys(nikcname)[0]]
                    ctx.strokeText(nikcname, script.user.cam.x + players[i].x - 1, script.user.cam.y + players[i].y - 70);
                    ctx.fillText(nikcname, script.user.cam.x + players[i].x - 1, script.user.cam.y + players[i].y - 70);
                }
            };
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
                mobs = script.world.units[76];
                for (let i = 0; i < mobs.length; i++) {
                    ctx.strokeStyle = "#000000";
                    ctx.beginPath();
                    ctx.moveTo(script.user.cam.x + myPlayer.x, script.user.cam.y + myPlayer.y);
                    ctx.lineTo(script.user.cam.x + mobs[i].x, script.user.cam.y + mobs[i].y);
                    ctx.stroke();
                };
            }
            if (Settings.KrakenTracers) {
                mobs = script.world.units[66];
                for (let i = 0; i < mobs.length; i++) {
                    ctx.strokeStyle = "#440b8a";
                    ctx.beginPath();
                    ctx.moveTo(script.user.cam.x + myPlayer.x, script.user.cam.y + myPlayer.y);
                    ctx.lineTo(script.user.cam.x + mobs[i].x, script.user.cam.y + mobs[i].y);
                    ctx.stroke();
                };
            }
            if (Settings.SpiderTracers) {
                mobs = script.world.units[61];
                for (let i = 0; i < mobs.length; i++) {
                    ctx.strokeStyle = "#ffffff";
                    ctx.beginPath();
                    ctx.moveTo(script.user.cam.x + myPlayer.x, script.user.cam.y + myPlayer.y);
                    ctx.lineTo(script.user.cam.x + mobs[i].x, script.user.cam.y + mobs[i].y);
                    ctx.stroke();
                };
            }
            if (Settings.WolfTracers) {
                mobs = script.world.units[60];
                for (let i = 0; i < mobs.length; i++) {
                    ctx.strokeStyle = "#8a0b5e";
                    ctx.beginPath();
                    ctx.moveTo(script.user.cam.x + myPlayer.x, script.user.cam.y + myPlayer.y);
                    ctx.lineTo(script.user.cam.x + mobs[i].x, script.user.cam.y + mobs[i].y);
                    ctx.stroke();
                };
            }
            if (Settings.RabbitTracers) {
                mobs = script.world.units[80];
                for (let i = 0; i < mobs.length; i++) {
                    ctx.strokeStyle = "pink";
                    ctx.beginPath();
                    ctx.moveTo(script.user.cam.x + myPlayer.x, script.user.cam.y + myPlayer.y);
                    ctx.lineTo(script.user.cam.x + mobs[i].x, script.user.cam.y + mobs[i].y);
                    ctx.stroke();
                };
            }
            if (Settings.FishTracers) {
                mobs = script.world.units[65];
                for (let i = 0; i < mobs.length; i++) {
                    ctx.strokeStyle = "#f77d72";
                    ctx.beginPath();
                    ctx.moveTo(script.user.cam.x + myPlayer.x, script.user.cam.y + myPlayer.y);
                    ctx.lineTo(script.user.cam.x + mobs[i].x, script.user.cam.y + mobs[i].y);
                    ctx.stroke();
                };
            }
            if (Settings.VultureTracers) {
                mobs = script.world.units[75];
                for (let i = 0; i < mobs.length; i++) {
                    ctx.strokeStyle = "#42423c";
                    ctx.beginPath();
                    ctx.moveTo(script.user.cam.x + myPlayer.x, script.user.cam.y + myPlayer.y);
                    ctx.lineTo(script.user.cam.x + mobs[i].x, script.user.cam.y + mobs[i].y);
                    ctx.stroke();
                };
            }
            if (Settings.BabyDragonTracers) {
                mobs = script.world.units[72];
                for (let i = 0; i < mobs.length; i++) {
                    ctx.strokeStyle = "#fff";
                    ctx.beginPath();
                    ctx.moveTo(script.user.cam.x + myPlayer.x, script.user.cam.y + myPlayer.y);
                    ctx.lineTo(script.user.cam.x + mobs[i].x, script.user.cam.y + mobs[i].y);
                    ctx.stroke();
                };
            }
            if (Settings.BabyLavaDragonTracers) {
                mobs = script.world.units[73];
                for (let i = 0; i < mobs.length; i++) {
                    ctx.strokeStyle = "#eb6200";
                    ctx.beginPath();
                    ctx.moveTo(script.user.cam.x + myPlayer.x, script.user.cam.y + myPlayer.y);
                    ctx.lineTo(script.user.cam.x + mobs[i].x, script.user.cam.y + mobs[i].y);
                    ctx.stroke();
                };
            }
        }

        if (Settings.toteminfo) {
            let totems = script.world.units[29];
            for (let i = 0; i < totems.length; i++) {
                ctx.strokeStyle = "black";
                ctx.lineWidth = 7;
                ctx.fillStyle = "white";
                ctx.strokeText(totems[i].info >= 16 ? charTotem + totems[i].info % 16 : charTotem + totems[i].info, script.user.cam.x + totems[i].x - 20, script.user.cam.y + totems[i].y - 20);
                ctx.fillText(totems[i].info >= 16 ? charTotem + totems[i].info % 16 : charTotem + totems[i].info, script.user.cam.x + totems[i].x - 20, script.user.cam.y + totems[i].y - 20);

                ctx.strokeText(totems[i].info >= 16 ? "Lock" : "Open", script.user.cam.x + totems[i].x - 20, script.user.cam.y + totems[i].y + 5);
                ctx.fillText(totems[i].info >= 16 ? "Lock" : "Open", script.user.cam.x + totems[i].x - 20, script.user.cam.y + totems[i].y + 5);
            };
        }
        ctx.lineWidth = 8;
        if (Settings.boxinfo) {
            timeNow = Date.now();
            deathBoxs = units[82];
            for (let i = 0; i < deathBoxs.length; i++) {
                const box = deathBoxs[i];
                log(box.info, isDeathBox(box.info));
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
                    if (activeUnits[82][box.id]) hp = activeUnits[82][box.id].hp;
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
            lootBoxs = units[86];
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
                if (img.localName == 'img') {
                    if (img[Object.keys(img)[0]] == 0) {
                        img.src = img.baseURI + img[Object.keys(img)[3]]
                    }
                }
                if (img) ctx.drawImage(img, chest.x + script.user.cam.x - 32, chest.y + script.user.cam.y - 32, 60, 65);
                ctx.strokeStyle = "red";
                ctx.strokeStyle = chest.ally ? "#30ab36" : "red";
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
                const spikeType = extractor_ids[i];
                const extractors = units[spikeType];
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

            mils = units[32];
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

            ovens = units[34];
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
        ctx.restore();
    } else {
        let lootboxsinfo = {};
        let deathboxinfo = {};
    }
}


function loadSpectator() {
    requestAnimationFrame(loadSpectator);
    if (client[Object.keys(client)[0]]) {
        if (!client[Object.keys(client)[0]]["current"]) {
            client[Object.keys(client)[0]]["current"] = true;
            client[Object.keys(client)[0]].send = new Proxy(client[Object.keys(client)[0]].send, {
                apply: function (target, thisArg, args) {
                    // log('b', args[0])

                    if (args[0][0] == 11 && Settings.spectator.e && !Settings.PathFinder.e && !Settings.Autofarm.e) {
                        return
                    }

                    if (typeof args[0] == 'string') {
                        const obj = JSON.parse(args[0]);
                        if (obj[0] == 28) {
                            mp = script.world.fast_units[script.user.uid];
                            if (mp) {
                                Settings.antiKick.dx = Math.round(obj[1] - mp.x)
                                Settings.antiKick.dy = Math.round(obj[2] - mp.y)
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
            const userCam = user[Object.keys(user)[28]];
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
    let mp = script.world.fast_units[script.user.uid];
    timeNow = Date.now();

    if (timeNow - Settings.antiKick.timeout > 200) {
        send([28, mp.x + Settings.antiKick.dx, mp.y + Settings.antiKick.dy]);
        Settings.antiKick.timeout = timeNow;
    }
    updater(0)
    autofarm(0)
}


function mainscript() {
    if (Settings.TurnOffScript.e) return;

    PathFinder();


    if (Settings.showHpPlayer || Settings.showHp) calculateHp(script.world.units);

    if (Settings.dropSword.e) {
        let mp = myplayer()
        type = HoldWeapon(mp.right, false);
        if (type) send([packets.dropall, mp.right])
    }

    if (Settings.AutoBreadPut.e) {
        var mils = units[32];
        for (let i = 0; i < mils.length; ++i) {
            if (getdist(script.myPlayer, mils[i]) <= 300) {
                const pid = mils[i][Object.keys(mils[i])[1]];
                send([packets.millPut, 10, pid, mils[i].id]);
            }
        }
        var ovens = units[34];
        for (let i = 0; i < ovens.length; ++i) {
            if (getdist(script.myPlayer, ovens[i]) <= 300) {
                const pid = ovens[i][Object.keys(ovens[i])[1]];
                send([packets.breadPutBatter, 5, pid, ovens[i].id]);
                send([packets.breadPutWood, 31, pid, ovens[i].id]);
            }
        }
    }
    if (Settings.AutoBreadTake.e || Settings.AutoSteal.e) {
        var mils = units[32];
        for (let i = 0; i < mils.length; ++i) {
            if (getdist(script.myPlayer, mils[i]) <= 300) {
                const pid = mils[i][Object.keys(mils[i])[1]];
                send([packets.millTake, pid, mils[i].id]);
            }
        }
        var ovens = units[34];
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
        const tt = units[29];
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
            if (script.myPlayer.right != 28) send([packets.equip, 28]);
            send([packets.craft, Settings.AutoCraft.lastcraft]);
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
                    CurrentSpike = 219;
                    break;
                case "Amethyst Spike":
                    CurrentSpike = 123;
                    break;
                case "Diamond Spike":
                    CurrentSpike = 170; //
                    break;
                case "Gold Spike":
                    CurrentSpike = 169; //
                    break;
                case "Stone Spike":
                    CurrentSpike = 168; //
                    break;
                case "Wood Wall":
                    CurrentSpike = 162;
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
            send([packets.placeBuild, 125, (angle) % 255, 0]);
        }
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


function recycle() {

    let rec = Object.keys(client)[116];
    client[rec] = (id) => {
        Settings.AutoRecycle.lastrecycle = id
        send([packets.recycle, id]);
    };

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
    setTimeout(() => { divHigh.dispatchEvent(mouseUpEvent); }, 0)
}



function main() {
    colors()
    autoBook()
    blizzard()
    updater()
    recycle()
    aimbot()
    autofarm()
    setTimeout(loadFog, 100)
    setTimeout(loadRoof, 150)
    setTimeout(loadXray, 300)
    // autoresp()   // not work
    loadSpectator()

    // SwordInChest()   // not work

    setInterval(() => {
        mainscript()
    }, 130);

    setInterval(() => {
        antiKick()
    }, 100);

    setInterval(() => {
        resetGraphics()
    }, 1000 * 60 * 5);   // 5 min.
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


