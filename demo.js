// ==UserScript==
// @name         Demo Multihack V3
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

function hooks() {
    Object.defineProperty(Object.prototype, "timeout", {
        get() {
            return this._myProperty;
        },
        set(data) {
            this._myProperty = data;
            if (!client) {
                client = this;
                console.log('client', client);
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
                console.log('mouse', mouse);
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
                console.log('game', game);
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
                console.log('world', this);
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
                console.log('user', user);
                unsafeWindow.user = user;
                user[Object.keys(user)[10]] = false; // alive
                ads();
                disableVideo();
            }
        },
        configurable: true,
    });
}
hooks()


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
        e: false,
        type5: true,
        type6: false,
        o: 0.9,
    },
    FPSBoost: { e: true },
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
        k: "None",
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
    PathFinder: {
        e: false,
        k: "None",
        x: 0,
        y: 0,
        autoRestart: false,
        autoDrop: true,
        dist: 150

    },
    Autofarm: {
        e: false,
        k: "None",
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
        k: "None",
    },
    AutoPutRed: {
        k: "KeyV",
        e: false,
    },
    Xray: {
        e: false,
        k: "None",
        a: 0.5,
        ready: false,
    },
    AMB: {
        e: false,
        k: "None",
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
        a: 45,
    },
    AutoFeed2: {
        e: true,
        a: 45,
    },
    AutoSteal: {
        e: false,
        k: "None",
    },
    AutoTotem: {
        e: false,
        k: "None"
    },
    AutoAttack: {
        e: false,
        k: "None"
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
    gaugesInfo: false,
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
    fps: { e: false, last: 0, count: 0, fps: 0 },
    buildinfo: true,
    ChestInfo: true,
    ChestInfo2: true,
    DropInChest: { id: 109, count: 255 },
    boxinfo: true,
    toteminfo: true,
    showNames: true,
    showFly: false,
    showScore: true,
    showMyHp: true,
    ColoredSpikes: false,
    AutoBridge: false,
    autoRespawn: false,
    AutoSpikeMode2: false,
    AutoBreadPut: { e: false, k: "None" },
    AutoBreadTake: { e: false, k: "None" },
    AutoExtractorPut: { e: false, k: "None" },
    AutoExtractorTake: { e: false, k: "None" },
    AutoCraft: { e: false, k: "KeyK", lastcraft: -1, s: false },
    AutoRecycle: { e: false, k: "KeyL", lastrecycle: -1, s: false },
    AutoSpike: { e: false, k: "None", m: true, p: ["Reidite Spike", "Amethyst Spike", "Diamond Spike", "Gold Spike", "Stone Spike", "Wood Spike", "Wood Wall"] },
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
            clearInterval(scriptId);
            console.log(sdpfin, Object.keys(world).length, Object.keys(client).length);
            if (!sdpfin || Object.keys(world).length < 30 || !client || Object.keys(client).length < 30) {
                Settings.textalert.t = 'Error loading script';
                Settings.textalert.e = true;
                return;
            };
            Settings.textalert.e = false;

            setNewUI();

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
                    case Settings.SwordInchest.k:
                        Settings.SwordInchest.e = true;
                        flag = true;
                        break;
                    case Settings.dropSword.k:
                        Settings.dropSword.e = true;
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
                        console.log(Settings.RemoveHands.k);
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
                    case Settings.SwordInchest.k:
                        Settings.SwordInchest.e = false;
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
                if (this.data.disabled) {
                    obj.innerText = '❌'
                }
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
        if (field.data.disabled) return;
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

    const root = new TreeNode('Angelic Cheats (DEMO)', null, script_menu);
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


    Visuals.addChild(new Field({ disabled: true, type: 'checkbox', label: 'FPS', object: Settings.fps, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ disabled: true, type: 'checkbox', label: 'Gauges', object: Settings, property: 'gaugesInfo', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'BuildInfo', object: Settings, property: 'buildinfo', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'ChestInfo', object: Settings, property: 'ChestInfo', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'TotemInfo', object: Settings, property: 'toteminfo', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'BoxInfo', object: Settings, property: 'boxinfo', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'ShowNames', object: Settings, property: 'showNames', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'showScore', object: Settings, property: 'showScore', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ disabled: true, type: 'checkbox', label: 'show HP', object: Settings, property: 'showHp', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ disabled: true, type: 'checkbox', label: 'show player HP', object: Settings, property: 'showHpPlayer', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ type: 'checkbox', label: 'show my HP', object: Settings, property: 'showMyHp', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Visuals.addChild(new Field({ disabled: true, type: 'checkbox', label: 'ColoredSpikes', object: Settings, property: 'ColoredSpikes', onChange: data => { kasdgiksadg.saveSettings(); } }));
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
    Misc.addChild(new Field({ disabled: true, type: 'checkbox', label: 'FPS Boost', object: Settings.FPSBoost, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ type: 'checkbox', label: 'AutoFood', object: Settings.AutoFeed2, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ type: 'range', label: 'AutoFood Value', min: 0, max: 99, step: 1, object: Settings.AutoFeed2, property: 'a', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ disabled: true, type: 'checkbox', label: 'AutoSteal', object: Settings.AutoSteal, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    // Misc.addChild(new Field({ type: 'checkbox', label: 'SwordInchest', object: Settings.SwordInchest, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ disabled: true, type: 'checkbox', label: 'autoRespawn', object: Settings, property: 'autoRespawn', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ disabled: true, type: 'checkbox', label: 'AutoIce', object: Settings.AutoIce, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ disabled: true, type: 'checkbox', label: 'AutoTotem', object: Settings.AutoTotem, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ disabled: true, type: 'checkbox', label: 'AutoAttack', object: Settings.AutoAttack, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ disabled: true, type: 'checkbox', label: 'AutoBreadPut', object: Settings.AutoBreadPut, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ disabled: true, type: 'checkbox', label: 'AutoBreadTake', object: Settings.AutoBreadTake, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ disabled: true, type: 'checkbox', label: 'AutoExtractorPut', object: Settings.AutoExtractorPut, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ disabled: true, type: 'checkbox', label: 'AutoExtractorTake', object: Settings.AutoExtractorTake, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ disabled: true, type: 'checkbox', label: 'Spectator', object: Settings.spectator, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ type: "range", label: "SpectatorSpeed", min: 5, max: 50, step: 1, object: Settings.spectator, property: "s", onChange: data => { kasdgiksadg.saveSettings() } }));

    Aimbot.addChild(new Field({ disabled: true, type: 'checkbox', label: 'Aimbot', object: Settings.AMB, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Aimbot.addChild(new Field({ disabled: true, type: 'checkbox', label: 'Aimbot mode V2', object: Settings, property: 'AMB_V2', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Aimbot.addChild(new Field({ disabled: true, type: 'checkbox', label: 'Aim rotation', object: Settings, property: 'AMB_rotation', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Aimbot.addChild(new Field({ disabled: true, type: 'setkey', label: 'Set Aimbot Key', property: 'k', object: Settings.AMB, action: data => { kasdgiksadg.controls.setKeyBind('AMB'); } }));


    AutoFarm.addChild(new Field({ disabled: true, type: 'checkbox', label: 'Start Autofarm', object: Settings.Autofarm, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    AutoFarm.addChild(new Field({ disabled: true, type: 'checkbox', label: 'Auto water', object: Settings.Autofarm, property: 'water', onChange: data => { kasdgiksadg.saveSettings(); } }));
    AutoFarm.addChild(new Field({ type: 'button', label: 'Top left of farm', label2: 'set pos', action: data => { mp = myplayer(); mp && (Settings.Autofarm['x'] = mp.x, Settings.Autofarm['y'] = mp.y); OpenedNode.node.openFolder(OpenedNode.node); } }));
    AutoFarm.addChild(new Field({ type: 'button', label: 'Bottom right of farm', label2: 'set pos', action: data => { mp = myplayer(); mp && (Settings.Autofarm['xx'] = mp.x, Settings.Autofarm['yy'] = mp.y); OpenedNode.node.openFolder(OpenedNode.node); } }));
    AutoFarm.addChild(new Field({ type: 'button', label: 'Safe Point', label2: 'set pos', action: data => { mp = myplayer(); mp && (Settings.Autofarm['sx'] = mp.x, Settings.Autofarm['sy'] = mp.y); OpenedNode.node.openFolder(OpenedNode.node); } }));
    AutoFarm.addChild(new Field({ type: 'display', label: 'X:', object: Settings.Autofarm, property: 'x' }));
    AutoFarm.addChild(new Field({ type: 'display', label: 'Y:', object: Settings.Autofarm, property: 'y' }));
    AutoFarm.addChild(new Field({ type: 'display', label: 'X1:', object: Settings.Autofarm, property: 'xx' }));
    AutoFarm.addChild(new Field({ type: 'display', label: 'Y1:', object: Settings.Autofarm, property: 'yy' }));
    AutoFarm.addChild(new Field({ type: 'display', label: 'SX:', object: Settings.Autofarm, property: 'sx' }));
    AutoFarm.addChild(new Field({ type: 'display', label: 'SY:', object: Settings.Autofarm, property: 'sy' }));
    AutoFarm.addChild(new Field({ disabled: true, type: 'setkey', label: 'Set AutoFarm Key', property: 'k', object: Settings.Autofarm, action: data => { kasdgiksadg.controls.setKeyBind('Autofarm'); } }));

    AutoSpike.addChild(new Field({ disabled: true, type: 'checkbox', label: 'AutoBridge', object: Settings, property: 'AutoBridge', onChange: data => { kasdgiksadg.saveSettings(); } }));
    AutoSpike.addChild(new Field({ disabled: true, type: 'checkbox', label: 'G Spike mode', object: Settings, property: 'AutoSpikeMode2', onChange: data => { kasdgiksadg.saveSettings(); } }));
    AutoSpike.addChild(new Field({ disabled: true, type: 'setkey', label: 'Set AutoSpike Key', property: 'k', object: Settings.AutoSpike, action: data => { kasdgiksadg.controls.setKeyBind('AutoSpike'); } }));

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

    PathFinder.addChild(new Field({ disabled: true, type: 'checkbox', label: 'Path Finder', object: Settings.PathFinder, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    PathFinder.addChild(new Field({ disabled: true, type: 'setkey', label: 'Set PathFinder Key', property: 'k', object: Settings.PathFinder, action: data => { kasdgiksadg.controls.setKeyBind('PathFinder'); } }));
    PathFinder.addChild(new Field({ type: 'checkbox', label: 'Auto Drop', object: Settings.PathFinder, property: 'autoDrop', onChange: data => { kasdgiksadg.saveSettings(); } }));
    PathFinder.addChild(new Field({ type: 'checkbox', label: 'Auto Restart', object: Settings.PathFinder, property: 'autoRestart', onChange: data => { kasdgiksadg.saveSettings(); } }));
    PathFinder.addChild(new Field({ type: 'range', label: 'set X', min: 0, max: 250, step: 1, object: Settings.PathFinder, property: 'x', onChange: data => { kasdgiksadg.saveSettings(); FTextX.obj.textContent = Settings.PathFinder.x; } }));
    PathFinder.addChild(new Field({ type: 'range', label: 'set Y', min: 0, max: 250, step: 1, object: Settings.PathFinder, property: 'y', onChange: data => { kasdgiksadg.saveSettings(); FTextY.obj.textContent = Settings.PathFinder.y; } }));
    PathFinder.addChild(new Field({ type: 'range', label: 'Min Dist', min: 50, max: 250, step: 1, object: Settings.PathFinder, property: 'dist', onChange: data => { kasdgiksadg.saveSettings(); } }));
    PathFinder.addChild(new Field({ type: 'button', label: 'Set current Pos', label2: 'set', action: data => { mp = myplayer(); mp && (Settings.PathFinder.x = Math.floor(mp.x / 100), Settings.PathFinder.y = Math.floor(mp.y / 100)); OpenedNode.node.openFolder(OpenedNode.node); } }));
    PathFinder.addChild(FTextX);
    PathFinder.addChild(FTextY);

    Drop_in_Chest.addChild(new Field({ type: 'checkbox', label: 'Show Items ID', object: Settings, property: 'ChestInfo2', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Drop_in_Chest.addChild(new Field({ type: 'range', label: 'Item ID', min: 1, max: 250, step: 1, object: Settings.DropInChest, property: 'id', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Drop_in_Chest.addChild(new Field({ type: 'range', label: 'Count', min: 1, max: 1000, step: 1, object: Settings.DropInChest, property: 'count', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Drop_in_Chest.addChild(new Field({ disabled: true, type: 'button', label: 'Drop', label2: '❌', action: data => { } }));

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

    // Bind.addChild(new Field({ type: 'setkey', label: 'Set SwordInchest ', property: 'k', object: Settings.SwordInchest, action: data => { kasdgiksadg.controls.setKeyBind('SwordInchest'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'DropSword Key', property: 'k', object: Settings.dropSword, action: data => { kasdgiksadg.controls.setKeyBind('dropSword'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'Enable/disable script', property: 'k', object: Settings.TurnOffScript, action: data => { kasdgiksadg.controls.setKeyBind('TurnOffScript'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'Remove hands', property: 'k', object: Settings.RemoveHands, action: data => { kasdgiksadg.controls.setKeyBind('RemoveHands'); } }));
    Bind.addChild(new Field({ disabled: true, type: 'setkey', label: 'AutoSteal Key', property: 'k', object: Settings.AutoSteal, action: data => { kasdgiksadg.controls.setKeyBind('AutoSteal'); } }));
    Bind.addChild(new Field({ disabled: true, type: 'setkey', label: 'AutoExtractorPut', property: 'k', object: Settings.AutoExtractorPut, action: data => { kasdgiksadg.controls.setKeyBind('AutoExtractorPut'); } }));
    Bind.addChild(new Field({ disabled: true, type: 'setkey', label: 'AutoExtractorTake', property: 'k', object: Settings.AutoExtractorTake, action: data => { kasdgiksadg.controls.setKeyBind('AutoExtractorTake'); } }));
    Bind.addChild(new Field({ disabled: true, type: 'setkey', label: 'AutoTotem Key', property: 'k', object: Settings.AutoTotem, action: data => { kasdgiksadg.controls.setKeyBind('AutoTotem'); } }));
    Bind.addChild(new Field({ disabled: true, type: 'setkey', label: 'AutoAttack Key', property: 'k', object: Settings.AutoAttack, action: data => { kasdgiksadg.controls.setKeyBind('AutoAttack'); } }));
    Bind.addChild(new Field({ disabled: true, type: 'setkey', label: 'AutoIce Key', property: 'k', object: Settings.AutoIce, action: data => { kasdgiksadg.controls.setKeyBind('AutoIce'); } }));
    Bind.addChild(new Field({ disabled: true, type: 'setkey', label: 'AutoFarm Key', property: 'k', object: Settings.Autofarm, action: data => { kasdgiksadg.controls.setKeyBind('Autofarm'); } }));
    Bind.addChild(new Field({ disabled: true, type: 'setkey', label: 'Aimbot Key', property: 'k', object: Settings.AMB, action: data => { kasdgiksadg.controls.setKeyBind('AMB'); } }));
    Bind.addChild(new Field({ disabled: true, type: 'setkey', label: 'AutoBreadPut Key', property: 'k', object: Settings.AutoBreadPut, action: data => { kasdgiksadg.controls.setKeyBind('AutoBreadPut'); } }));
    Bind.addChild(new Field({ disabled: true, type: 'setkey', label: 'AutoBreadTake Key', property: 'k', object: Settings.AutoBreadTake, action: data => { kasdgiksadg.controls.setKeyBind('AutoBreadTake'); } }));
    Bind.addChild(new Field({ disabled: true, type: 'setkey', label: 'Xray Key', property: 'k', object: Settings.Xray, action: data => { kasdgiksadg.controls.setKeyBind('Xray'); } }));
    Bind.addChild(new Field({ disabled: true, type: 'setkey', label: 'Spectator Key', property: 'k', object: Settings.spectator, action: data => { kasdgiksadg.controls.setKeyBind('spectator'); } }));

    Map.addChild(new Field({ disabled: true, type: 'checkbox', label: 'Show map', object: Settings.miniMap, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); OpenedNode.styleSheet.textContent = getUIStyle(); } }));
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
        content: "DEMO SCRIPT";
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
    return script.world.units;
}


function myplayer() {
    let fast_units = script.world.fast_units[script.user.uid];
    return fast_units;

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

    sdpfin = true;

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
    if (!Settings.miniMap.e) {
        log('NO MAP');
    }
}

function inventoryHas(id) {
    let inv;
    let inv2;

    inv = user[Object.keys(user)[35]]
    inv2 = inv[Object.keys(inv)[3]]

    if (inv2[id] !== 0 && inv2[id] !== undefined) {
        return [true, inv2[id]]
    } else {
        return [false, undefined]
    }
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
    OpenedNode.script_menu_button1.style.display = ''
    OpenedNode.script_menu_button2.style.display = 'none'

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
}

// SOSITE !!!
function isAlly(id) {
    return ally.includes(id);
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


function blizzard() {

    let blizzard1;
    let autofeed;
    let sandstorm
    let tempset;
    let counter = 0;

    for (let prop1 in user) {
        counter++;

        if (counter === 37 + 1) {
            autofeed = user[prop1]
        }
        if (counter === 47 + 1) {
            sandstorm = user[prop1]
        }

        if (counter === 48 + 1) {

            let innerCounter = 0;

            for (let prop2 in user[prop1]) {
                innerCounter++;
                if (innerCounter === 2) {
                    blizzard1 = user[prop1];
                    unsafeWindow.blizz1 = blizzard1
                    tempset = [prop2]
                }
            }
            break;
        }
    }

    requestAnimationFrame(blizzard)
    if (Settings.TurnOffScript.e) return;
    var use = -8;

    const canvas = document.getElementById("game_canvas");
    const ctx = canvas.getContext("2d");

    if (script.user.alive && blizzard1[tempset]) { //27
        ctx.save();
        ctx.drawImage(
            BlizzardImage,
            autofeed.translate.x - 100,
            autofeed.translate.y + use - 80
        );
        use += 70;
    }
    if (script.user.alive && sandstorm[tempset]) { //26
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

        ctx.strokeText('FPS ' + Settings.fps.fps, autofeed.translate.x - 150, autofeed.translate.y + 100);
        ctx.fillText('FPS ' + Settings.fps.fps, autofeed.translate.x - 150, autofeed.translate.y + 100);
        ctx.restore();

    }

}

let ally = [];
const heartEmoji = "\u{1F9E1}";
const extractor_ids = [24, 25, 26, 27, 28];
const foodItems = [138, 110, 117, 192, 189, 205, 207, 209, 243, 244,]
let lastFood = [0, 0];
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


const fogs = [244, 1041]
XraySprites = {}
NoXraySprites = {}
let mypid = -1;



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

// Xray!!!


function loadSpikes() {

    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMOPQRSTUVWXYZ_0123456789";

    for (let e in unsafeWindow) {
        if (!Array.isArray(unsafeWindow[e]) && chars.includes(e[0])) continue;
        if (unsafeWindow[e].length > 800 && unsafeWindow[e].length < 1500) {
            unsafeWindow.sprite = unsafeWindow[e];
        }
    }
}


function colors() {
    if (!unsafeWindow.ReiditeSpikeAlly) {
        loadSpikes();
    };
    return
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
        let gauges = user[Object.keys(user)[29 + 1]]
        script.world.units = world[Object.keys(world)[4 + 1]]
        script.world.fast_units = world[Object.keys(world)[5 + 1]]
        script.user.id = user.id;
        script.user.uid = user[Object.keys(user)[17]]
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

        script.myPlayer.angle = myPlayer.angle;
        script.myPlayer.x = myPlayer.x
        script.myPlayer.y = myPlayer.y
        script.myPlayer.ghost = myPlayer[Object.keys(myPlayer)[64]]

        ally = script.user.team.length > 0 ? script.user.team : [script.user.id];
        units = unit()


        const players = script.world.units[0];

        if (Settings.showMyHp) {
            ctx.save();
            ctx.font = '22px Baloo Paaji';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            for (let i = 0; i < players.length; i++) {
                const pid = players[i][Object.keys(players[i])[1]]
                pl = players[i];
                let hp = 200;
                if (pid == mypid) {
                    hp = script.user.gauges.health;
                } else continue;

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
                    if (activeUnits[82][box.id]) hp = activeUnits[82][box.id].hp;
                    hp = count;
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
}


function mainscript() {
    if (Settings.TurnOffScript.e) return;


    if (Settings.dropSword.e) {
        let mp = myplayer()
        type = HoldWeapon(mp.right, false);
        if (type) send([packets.dropall, mp.right])
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


function recycle() {
    let rec = Object.keys(client)[116];
    client[rec] = (id) => {
        Settings.AutoRecycle.lastrecycle = id
        send([packets.recycle, id]);
    };
}



function main() {
    colors()
    autoBook()
    blizzard()
    updater()
    recycle()
    setTimeout(loadFog, 100)

    // SwordInChest()   // not work

    setInterval(() => {
        mainscript()
    }, 130);

    setInterval(() => {
        antiKick()
    }, 100);
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
