// ==UserScript==
// @name         Multihack by setorg V12
// @namespace    http://tampermonkey.net/
// @version      2024-05-20
// @description  Всё что нужно для реального пацана
// @author       setorg
// @match        https://starve.io/*
// @run-at       document-start
// @grant        unsafeWindow
// ==/UserScript==
/* workerTimers */ ! function (e, t) { "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).fastUniqueNumbers = {}) }(this, function (e) { "use strict"; var t, r = void 0 === Number.MAX_SAFE_INTEGER ? 9007199254740991 : Number.MAX_SAFE_INTEGER, n = new WeakMap, i = function (e, t) { return function (n) { var i = t.get(n), o = void 0 === i ? n.size : i < 1073741824 ? i + 1 : 0; if (!n.has(o)) return e(n, o); if (n.size < 536870912) { for (; n.has(o);) o = Math.floor(1073741824 * Math.random()); return e(n, o) } if (n.size > r) throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!"); for (; n.has(o);) o = Math.floor(Math.random() * r); return e(n, o) } }((t = n, function (e, r) { return t.set(e, r), r }), n), o = function (e) { return function (t) { var r = e(t); return t.add(r), r } }(i); e.addUniqueNumber = o, e.generateUniqueNumber = i, Object.defineProperty(e, "__esModule", { value: !0 }) }), function (e, t) { "object" == typeof exports && "undefined" != typeof module ? t(exports, require("fast-unique-numbers")) : "function" == typeof define && define.amd ? define(["exports", "fast-unique-numbers"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).workerTimersBroker = {}, e.fastUniqueNumbers) }(this, function (e, t) { "use strict"; e.load = function (e) { var r = new Map([[0, function () { }]]), n = new Map([[0, function () { }]]), i = new Map, o = new Worker(e); o.addEventListener("message", function (e) { var t = e.data; if (function (e) { return void 0 !== e.method && "call" === e.method }(t)) { var o = t.params, a = o.timerId, s = o.timerType; if ("interval" === s) { var u = r.get(a); if ("number" == typeof u) { var d = i.get(u); if (void 0 === d || d.timerId !== a || d.timerType !== s) throw new Error("The timer is in an undefined state.") } else { if (void 0 === u) throw new Error("The timer is in an undefined state."); u() } } else if ("timeout" === s) { var f = n.get(a); if ("number" == typeof f) { var l = i.get(f); if (void 0 === l || l.timerId !== a || l.timerType !== s) throw new Error("The timer is in an undefined state.") } else { if (void 0 === f) throw new Error("The timer is in an undefined state."); f(), n.delete(a) } } } else { if (! function (e) { return null === e.error && "number" == typeof e.id }(t)) { var m = t.error.message; throw new Error(m) } var c = t.id, p = i.get(c); if (void 0 === p) throw new Error("The timer is in an undefined state."); var v = p.timerId, h = p.timerType; i.delete(c), "interval" === h ? r.delete(v) : n.delete(v) } }); return { clearInterval: function (e) { var n = t.generateUniqueNumber(i); i.set(n, { timerId: e, timerType: "interval" }), r.set(e, n), o.postMessage({ id: n, method: "clear", params: { timerId: e, timerType: "interval" } }) }, clearTimeout: function (e) { var r = t.generateUniqueNumber(i); i.set(r, { timerId: e, timerType: "timeout" }), n.set(e, r), o.postMessage({ id: r, method: "clear", params: { timerId: e, timerType: "timeout" } }) }, setInterval: function (e, n) { var i = t.generateUniqueNumber(r); return r.set(i, function () { e(), "function" == typeof r.get(i) && o.postMessage({ id: null, method: "set", params: { delay: n, now: performance.now(), timerId: i, timerType: "interval" } }) }), o.postMessage({ id: null, method: "set", params: { delay: n, now: performance.now(), timerId: i, timerType: "interval" } }), i }, setTimeout: function (e, r) { var i = t.generateUniqueNumber(n); return n.set(i, e), o.postMessage({ id: null, method: "set", params: { delay: r, now: performance.now(), timerId: i, timerType: "timeout" } }), i } } }, Object.defineProperty(e, "__esModule", { value: !0 }) }), function (e, t) { "object" == typeof exports && "undefined" != typeof module ? t(exports, require("worker-timers-broker")) : "function" == typeof define && define.amd ? define(["exports", "worker-timers-broker"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).workerTimers = {}, e.workerTimersBroker) }(this, function (e, t) { "use strict"; var r = null, n = function (e, t) { return function () { if (null !== r) return r; var n = new Blob([t], { type: "application/javascript; charset=utf-8" }), i = URL.createObjectURL(n); return (r = e(i)).setTimeout(function () { return URL.revokeObjectURL(i) }, 0), r } }(t.load, '(()=>{var e={67:(e,t,r)=>{var o,i;void 0===(i="function"==typeof(o=function(){"use strict";var e=new Map,t=new Map,r=function(t){var r=e.get(t);if(void 0===r)throw new Error(\'There is no interval scheduled with the given id "\'.concat(t,\'".\'));clearTimeout(r),e.delete(t)},o=function(e){var r=t.get(e);if(void 0===r)throw new Error(\'There is no timeout scheduled with the given id "\'.concat(e,\'".\'));clearTimeout(r),t.delete(e)},i=function(e,t){var r,o=performance.now();return{expected:o+(r=e-Math.max(0,o-t)),remainingDelay:r}},n=function e(t,r,o,i){var n=performance.now();n>o?postMessage({id:null,method:"call",params:{timerId:r,timerType:i}}):t.set(r,setTimeout(e,o-n,t,r,o,i))},a=function(t,r,o){var a=i(t,o),s=a.expected,d=a.remainingDelay;e.set(r,setTimeout(n,d,e,r,s,"interval"))},s=function(e,r,o){var a=i(e,o),s=a.expected,d=a.remainingDelay;t.set(r,setTimeout(n,d,t,r,s,"timeout"))};addEventListener("message",(function(e){var t=e.data;try{if("clear"===t.method){var i=t.id,n=t.params,d=n.timerId,c=n.timerType;if("interval"===c)r(d),postMessage({error:null,id:i});else{if("timeout"!==c)throw new Error(\'The given type "\'.concat(c,\'" is not supported\'));o(d),postMessage({error:null,id:i})}}else{if("set"!==t.method)throw new Error(\'The given method "\'.concat(t.method,\'" is not supported\'));var u=t.params,l=u.delay,p=u.now,m=u.timerId,v=u.timerType;if("interval"===v)a(l,m,p);else{if("timeout"!==v)throw new Error(\'The given type "\'.concat(v,\'" is not supported\'));s(l,m,p)}}}catch(e){postMessage({error:{message:e.message},id:t.id,result:null})}}))})?o.call(t,r,t,e):o)||(e.exports=i)}},t={};function r(o){var i=t[o];if(void 0!==i)return i.exports;var n=t[o]={exports:{}};return e[o](n,n.exports,r),n.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";r(67)})()})();'); e.clearInterval = function (e) { return n().clearInterval(e) }, e.clearTimeout = function (e) { return n().clearTimeout(e) }, e.setInterval = function (e, t) { return n().setInterval(e, t) }, e.setTimeout = function (e, t) { return n().setTimeout(e, t) }, Object.defineProperty(e, "__esModule", { value: !0 }) });

verifiKey = 'sq)dijf@*indf71!;ksd322'


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


const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy!z';
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


function hooks() {
    Object.defineProperty(Object.prototype, "timeout", {
        get() {
            return this[master]
        },
        set(data) {
            this[master] = data;
            if (!client) {
                client = this;
                console.log('client', client);
                unsafeWindow.client = client;
            }
        },
    })
    Object.defineProperty(Object.prototype, "IDLE", {
        get() {
            return this[master]
        },
        set(data) {
            this[master] = data;
            if (!mouse) {
                mouse = this;
                unsafeWindow.mouse = mouse;
            }
        },
    })
    Object.defineProperty(Object.prototype, "opacity", {
        get() {
            this[master] = 0.5
            return this[master]

        },
        set(data) {
            this[master] = data;

        },
    })
    Object.defineProperty(Object.prototype, "options", {
        get() {
            return this[master]
        },
        set(data) {
            this[master] = data, !game && (this["sign"] && (game = this, log('game', game), unsafeWindow["game"] = game));
        },
    })
    Object.defineProperty(Screen.prototype, "width", {
        get: function () {
            return 3840;
        },
        set: function (v) {
            this[master] = v;
        }
    });
    Object.defineProperty(Screen.prototype, "height", {
        get: function () {
            return 2160;
        },
        set: function (v) {
            this[master] = v;
        }
    });
    Object.defineProperty(Object.prototype, "mode", {
        get() {
            return this[master]
        },
        set(data) {
            this[master] = data;
            if (!world) {
                console.log('world', this);
                world = this;
                unsafeWindow.world = world;
            }
        },
    })
    Object.defineProperty(Object.prototype, 'mapping', {
        'get'() {
            return this[master];
        },
        'set'(_0x163cfc) {
            this[master] = _0x163cfc, !_this && (_this = this, log('mapping', _this));
        },
    })

    Object.defineProperty(Object.prototype, "control", {
        get() {
            return this[master]
        },
        set(data) {
            this[master] = data;
            if (!user) {
                user = this;
                console.log('user', user)
                user[Object.keys(user)[10]] = false // alive
                unsafeWindow.user = user;
                ads();
                disableVideo();
            }
        },
    })
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
sdpfin = true;
let scriptId;
let id_tings = 124;


let Settings = {
    RemoveHands: { k: "ShiftLeft" },
    MainColor: 'rgb(16, 212, 68)',
    TextColor: "rgb(21, 201, 68)",
    BackgroundColor: "rgb(22, 22, 22)",

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
    },
    AMB: {
        e: false,
        k: "KeyF",
        a: null,
        t: null,
        off: false,
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
        k: "KeyE",
    },
    AutoTotem: {
        e: false,
        k: "KeyH"
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
}


setTimeout(() => {
    let intId;
    unsafeWindow.kasdgiksadg = {
        KILLUKRSOLIDER: () => {
            // if (!world || !client) return
            clearInterval(scriptId);
            // console.log(sdpfin, Object.keys(world).length, Object.keys(client).length);
            // if (!sdpfin || Object.keys(world).length < 30 || !client || Object.keys(client).length < 30) {
            //     Settings.textalert.t = 'Error loading script';
            //     Settings.textalert.e = true;
            //     return;
            // };

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
                        log('keydown 1', event.code);
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
                o && (Settings[e] = JSON.parse(o))
            }
        },
        LoadHack: () => {
            log(unsafeWindow.document.body)
            if (!unsafeWindow.document.body) return
            log('id', intId)
            clearInterval(intId);

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
            Settings.Autofarm['x'] = 0; Settings.Autofarm['y'] = 0; Settings.Autofarm['xx'] = 0; Settings.Autofarm['yy'] = 0; Settings.Autofarm['sx'] = 0; Settings.Autofarm['sy'] = 0;

            kasdgiksadg.controls = new kasdgiksadg.controller();
            let e = unsafeWindow.document.createElement("script");
            e.onload = function () {
                scriptId = setInterval(kasdgiksadg.KILLUKRSOLIDER, 50)
            }, e.src = "https://unpkg.com/guify@0.12.0/lib/guify.min.js", unsafeWindow.document.body.appendChild(e)
        },
    };

    intId = setInterval(kasdgiksadg.LoadHack, 100)
}, 500);


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
                obj.style.position = 'static';


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

    rangeHandler(field, event) {
        switch (field.data.type) {
            case 'range':
                field.data.object[field.data.property] = field.rangeInput.value;
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
                Settings.OpenedNode.node.openFolder(Settings.OpenedNode.node);
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
        Settings.OpenedNode.node = node;
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
            if (Settings.OpenedNode.x > 0 & Settings.OpenedNode.y > 0) {
                div.style.left = Settings.OpenedNode.x + 'px'
                div.style.top = Settings.OpenedNode.y + 'px'
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
                    Settings.OpenedNode.node = this.parent;
                } else {
                    this.script_menu.style.display = 'none';
                    Settings.OpenedNode.e = false;
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


function setNewUI() {
    const script_menu = document.createElement('div');
    script_menu.id = 'main_menu_script'


    const root = new TreeNode('Script menu', null, script_menu);
    const Visuals = new TreeNode('Visual', root, script_menu);
    const Misc = new TreeNode('Misc', root, script_menu);
    const AutoSpike = new TreeNode('Auto Spike', root, script_menu);
    const AutoCraft_Recycle = new TreeNode('AutoCraft & AutoRecycle', root, script_menu);
    const AutoFarm = new TreeNode('Auto Farm', Misc, script_menu);
    const Bind = new TreeNode('Bind', root, script_menu);
    const Tracers = new TreeNode('Tracers', Visuals, script_menu);
    const PathFinder = new TreeNode('Path Finder', root, script_menu);
    const Drop_in_Chest = new TreeNode('Drop in chest', root, script_menu);
    const TokenSetter = new TreeNode('Token setter', root, script_menu);
    const Aimbot = new TreeNode('Aimbot', Misc, script_menu);


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
    Visuals.addChild(new Field({ type: "range", label: "Xray", min: 0, max: 1, step: 0.1, object: Settings.Xray, property: "a", onChange: data => { kasdgiksadg.saveSettings() } }));

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
    Misc.addChild(new Field({ type: 'checkbox', label: 'AutoFood', object: Settings.AutoFeed2, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ type: 'range', label: 'AutoFood Value', min: 0, max: 99, step: 1, object: Settings.AutoFeed2, property: 'a', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ type: 'checkbox', label: 'AutoSteal', object: Settings.AutoSteal, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ type: 'checkbox', label: 'autoRespawn', object: Settings, property: 'autoRespawn', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Misc.addChild(new Field({ type: 'checkbox', label: 'AutoIce', object: Settings.AutoIce, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
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
    AutoFarm.addChild(new Field({ type: 'button', label: 'Top left of farm', label2: 'set pos', action: data => { mp = myplayer(); mp && (Settings.Autofarm['x'] = mp.x, Settings.Autofarm['y'] = mp.y) } }));
    AutoFarm.addChild(new Field({ type: 'button', label: 'Bottom right of farm', label2: 'set pos', action: data => { mp = myplayer(); mp && (Settings.Autofarm['xx'] = mp.x, Settings.Autofarm['yy'] = mp.y) } }));
    AutoFarm.addChild(new Field({ type: 'button', label: 'Safe Point', label2: 'set pos', action: data => { mp = myplayer(); mp && (Settings.Autofarm['sx'] = mp.x, Settings.Autofarm['sy'] = mp.y) } }));
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

    AutoCraft_Recycle.addChild(new Field({ type: 'checkbox', label: 'AutoCraft', object: Settings.AutoCraft, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    AutoCraft_Recycle.addChild(new Field({ type: 'checkbox', label: 'SafeMode', object: Settings.AutoCraft, property: 's', onChange: data => { kasdgiksadg.saveSettings(); } }));
    AutoCraft_Recycle.addChild(new Field({ type: 'setkey', label: 'Set AutoCraft Key', property: 'k', object: Settings.AutoCraft, action: data => { kasdgiksadg.controls.setKeyBind('AutoCraft'); } }));
    AutoCraft_Recycle.addChild(new Field({ type: 'display', label: 'CraftId: ', object: Settings.AutoCraft, property: 'lastcraft' }));
    AutoCraft_Recycle.addChild(new Field({ type: 'display', label: '==================' }));
    AutoCraft_Recycle.addChild(new Field({ type: 'checkbox', label: 'AutoRecycle', object: Settings.AutoRecycle, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    AutoCraft_Recycle.addChild(new Field({ type: 'checkbox', label: 'SafeMode', object: Settings.AutoRecycle, property: 's', onChange: data => { kasdgiksadg.saveSettings(); } }));
    AutoCraft_Recycle.addChild(new Field({ type: 'setkey', label: 'Set AutoRecycle Key', property: 'k', object: Settings.AutoRecycle, action: data => { kasdgiksadg.controls.setKeyBind('AutoRecycle'); } }));
    AutoCraft_Recycle.addChild(new Field({ type: 'display', label: 'RecycleId: ', object: Settings.AutoRecycle, property: 'lastrecycle' }));

    PathFinder.addChild(new Field({ type: 'checkbox', label: 'Path Finder', object: Settings.PathFinder, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } }));
    PathFinder.addChild(new Field({ type: 'setkey', label: 'Set PathFinder Key', property: 'k', object: Settings.PathFinder, action: data => { kasdgiksadg.controls.setKeyBind('PathFinder'); } }));
    PathFinder.addChild(new Field({ type: 'checkbox', label: 'Auto Drop', object: Settings.PathFinder, property: 'autoDrop', onChange: data => { kasdgiksadg.saveSettings(); } }));
    PathFinder.addChild(new Field({ type: 'checkbox', label: 'Auto Restart', object: Settings.PathFinder, property: 'autoRestart', onChange: data => { kasdgiksadg.saveSettings(); } }));
    PathFinder.addChild(new Field({ type: 'range', label: 'set X', min: 0, max: 250, step: 1, object: Settings.PathFinder, property: 'x', onChange: data => { kasdgiksadg.saveSettings(); } }));
    PathFinder.addChild(new Field({ type: 'range', label: 'set Y', min: 0, max: 250, step: 1, object: Settings.PathFinder, property: 'y', onChange: data => { kasdgiksadg.saveSettings(); } }));
    PathFinder.addChild(new Field({ type: 'range', label: 'Min Dist', min: 50, max: 250, step: 1, object: Settings.PathFinder, property: 'dist', onChange: data => { kasdgiksadg.saveSettings(); } }));
    PathFinder.addChild(new Field({ type: 'button', label: 'Set current Pos', label2: 'set', action: data => { mp = myplayer(); mp && (Settings.PathFinder.x = Math.floor(mp.x / 100), Settings.PathFinder.y = Math.floor(mp.y / 100)) } }));
    PathFinder.addChild(new Field({ type: 'display', label: 'X:', object: Settings.PathFinder, property: 'x' }));
    PathFinder.addChild(new Field({ type: 'display', label: 'Y:', object: Settings.PathFinder, property: 'y' }));

    Drop_in_Chest.addChild(new Field({ type: 'checkbox', label: 'Show Items ID', object: Settings, property: 'ChestInfo2', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Drop_in_Chest.addChild(new Field({ type: 'range', label: 'Item ID', min: 1, max: 250, step: 1, object: Settings.DropInChest, property: 'id', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Drop_in_Chest.addChild(new Field({ type: 'range', label: 'Count', min: 1, max: 1000, step: 1, object: Settings.DropInChest, property: 'count', onChange: data => { kasdgiksadg.saveSettings(); } }));
    Drop_in_Chest.addChild(new Field({ type: 'button', label: 'Drop', action: data => { DropInChest(); } }));

    TokenSetter.addChild(new Field({ type: 'text', label: 'Set Token', object: user, property: Object.keys(user)[14], onChange: data => { kasdgiksadg.saveSettings(); } }));
    TokenSetter.addChild(new Field({ type: 'text', label: 'Set Token ID', object: user, property: Object.keys(user)[15], onChange: data => { kasdgiksadg.saveSettings(); } }));
    TokenSetter.addChild(new Field({ type: 'display', label: 'Token:', object: user, property: Object.keys(user)[14] }));
    TokenSetter.addChild(new Field({ type: 'display', label: 'Token ID:', object: user, property: Object.keys(user)[15] }));
    TokenSetter.addChild(new Field({ type: 'button', label: 'Go Back To Lobby', action: data => { client[Object.keys(client)[136]](); } }));
    TokenSetter.addChild(new Field({ type: 'button', label: 'Set Random Token', action: data => { user[Object.keys(user)[14]] = Gen(7); user[Object.keys(user)[15]] = Gen(5); } }));

    Bind.addChild(new Field({ type: 'setkey', label: 'Set AutoSteal Key', property: 'k', object: Settings.AutoSteal, action: data => { kasdgiksadg.controls.setKeyBind('AutoSteal'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'Set AutoExtractorPut Key', property: 'k', object: Settings.AutoExtractorPut, action: data => { kasdgiksadg.controls.setKeyBind('AutoExtractorPut'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'Set AutoExtractorTake Key', property: 'k', object: Settings.AutoExtractorTake, action: data => { kasdgiksadg.controls.setKeyBind('AutoExtractorTake'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'Set Aimbot Key', property: 'k', object: Settings.AMB, action: data => { kasdgiksadg.controls.setKeyBind('AMB'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'Set AutoIce Key', property: 'k', object: Settings.AutoIce, action: data => { kasdgiksadg.controls.setKeyBind('AutoIce'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'Set AutoBreadPut Key', property: 'k', object: Settings.AutoBreadPut, action: data => { kasdgiksadg.controls.setKeyBind('AutoBreadPut'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'Set AutoBreadTake Key', property: 'k', object: Settings.AutoBreadTake, action: data => { kasdgiksadg.controls.setKeyBind('AutoBreadTake'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'Set AutoFarm Key', property: 'k', object: Settings.Autofarm, action: data => { kasdgiksadg.controls.setKeyBind('Autofarm'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'Set Xray Key', property: 'k', object: Settings.Xray, action: data => { kasdgiksadg.controls.setKeyBind('Xray'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'Set DropSword Key', property: 'k', object: Settings.dropSword, action: data => { kasdgiksadg.controls.setKeyBind('dropSword'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'Set Off Script Key', property: 'k', object: Settings.TurnOffScript, action: data => { kasdgiksadg.controls.setKeyBind('TurnOffScript'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'Set Spectator Key', property: 'k', object: Settings.spectator, action: data => { kasdgiksadg.controls.setKeyBind('spectator'); } }));
    Bind.addChild(new Field({ type: 'setkey', label: 'Set Remove hands', property: 'k', object: Settings.RemoveHands, action: data => { kasdgiksadg.controls.setKeyBind('RemoveHands'); } }));


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

    script_menu_button2.style.width = script_menu_button1.style.width
    script_menu_button2.style.height = script_menu_button1.style.height
    script_menu_button2.style.position = script_menu_button1.style.position
    script_menu_button2.style.right = script_menu_button1.style.right
    script_menu_button2.style.top = script_menu_button1.style.top
    script_menu_button2.style.display = 'none';

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
            Settings.OpenedNode.e = true;
        } else {
            script_menu.style.display = 'none';
            Settings.OpenedNode.e = false;
        }
    });


    document.addEventListener('mousedown', function (event) {
        if (Settings.OpenedNode.e & event.button == 1) {
            const div = document.getElementById('script_menu');
            if (event.clientX < div.offsetLeft - div.offsetWidth / 2 || event.clientX > div.offsetLeft + div.offsetWidth / 2 || event.clientY < div.offsetTop - div.offsetHeight / 2 || event.clientY > div.offsetTop + div.offsetHeight / 2) {
                return
            }
            Settings.OpenedNode.isPressed = true;
            Settings.OpenedNode.x = div.offsetLeft
            Settings.OpenedNode.y = div.offsetTop
            Settings.OpenedNode.lastX = event.clientX
            Settings.OpenedNode.lastY = event.clientY
        }
    });

    document.addEventListener('mouseup', function (event) {
        if (event.button == 1) {
            Settings.OpenedNode.isPressed = false;
        }
    });
    document.addEventListener('mousemove', function (event) {
        if (Settings.OpenedNode.isPressed) {
            const div = document.getElementById('script_menu');
            Settings.OpenedNode.x += event.clientX - Settings.OpenedNode.lastX
            Settings.OpenedNode.y += event.clientY - Settings.OpenedNode.lastY
            Settings.OpenedNode.lastX = event.clientX
            Settings.OpenedNode.lastY = event.clientY

            div.style.left = Settings.OpenedNode.x + 'px'
            div.style.top = Settings.OpenedNode.y + 'px'
        }
    });


    document.getElementById('game_body').appendChild(script_menu_button1);
    document.getElementById('game_body').appendChild(script_menu_button2);
    Settings.OpenedNode.node = root;

    const scriptMenu = document.getElementById('script_menu');


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
        opacity: ${Settings.OpenedNode.a};
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

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

//////////////////////////////////////////////////////////////////////////////

function resetColors() {
    Settings.MainColor = 'rgb(16, 212, 68)',
        Settings.TextColor = "rgb(21, 201, 68)",
        Settings.BackgroundColor = "rgb(22, 22, 22)",
        kasdgiksadg.saveSettings();
}
