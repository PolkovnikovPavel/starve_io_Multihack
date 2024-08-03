// ==UserScript==
// @name         addon for AxiosCheats
// @namespace    http://tampermonkey.net/
// @version      2024-05-20
// @description  лишь дополнение которое убирает все недостатки
// @author       setorg
// @match        https://starve.io/*
// @run-at       document-start
// @grant        unsafeWindow
// ==/UserScript==



/* workerTimers */ ! function (e, t) { "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).fastUniqueNumbers = {}) }(this, function (e) { "use strict"; var t, r = void 0 === Number.MAX_SAFE_INTEGER ? 9007199254740991 : Number.MAX_SAFE_INTEGER, n = new WeakMap, i = function (e, t) { return function (n) { var i = t.get(n), o = void 0 === i ? n.size : i < 1073741824 ? i + 1 : 0; if (!n.has(o)) return e(n, o); if (n.size < 536870912) { for (; n.has(o);) o = Math.floor(1073741824 * Math.random()); return e(n, o) } if (n.size > r) throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!"); for (; n.has(o);) o = Math.floor(Math.random() * r); return e(n, o) } }((t = n, function (e, r) { return t.set(e, r), r }), n), o = function (e) { return function (t) { var r = e(t); return t.add(r), r } }(i); e.addUniqueNumber = o, e.generateUniqueNumber = i, Object.defineProperty(e, "__esModule", { value: !0 }) }), function (e, t) { "object" == typeof exports && "undefined" != typeof module ? t(exports, require("fast-unique-numbers")) : "function" == typeof define && define.amd ? define(["exports", "fast-unique-numbers"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).workerTimersBroker = {}, e.fastUniqueNumbers) }(this, function (e, t) { "use strict"; e.load = function (e) { var r = new Map([[0, function () { }]]), n = new Map([[0, function () { }]]), i = new Map, o = new Worker(e); o.addEventListener("message", function (e) { var t = e.data; if (function (e) { return void 0 !== e.method && "call" === e.method }(t)) { var o = t.params, a = o.timerId, s = o.timerType; if ("interval" === s) { var u = r.get(a); if ("number" == typeof u) { var d = i.get(u); if (void 0 === d || d.timerId !== a || d.timerType !== s) throw new Error("The timer is in an undefined state.") } else { if (void 0 === u) throw new Error("The timer is in an undefined state."); u() } } else if ("timeout" === s) { var f = n.get(a); if ("number" == typeof f) { var l = i.get(f); if (void 0 === l || l.timerId !== a || l.timerType !== s) throw new Error("The timer is in an undefined state.") } else { if (void 0 === f) throw new Error("The timer is in an undefined state."); f(), n.delete(a) } } } else { if (! function (e) { return null === e.error && "number" == typeof e.id }(t)) { var m = t.error.message; throw new Error(m) } var c = t.id, p = i.get(c); if (void 0 === p) throw new Error("The timer is in an undefined state."); var v = p.timerId, h = p.timerType; i.delete(c), "interval" === h ? r.delete(v) : n.delete(v) } }); return { clearInterval: function (e) { var n = t.generateUniqueNumber(i); i.set(n, { timerId: e, timerType: "interval" }), r.set(e, n), o.postMessage({ id: n, method: "clear", params: { timerId: e, timerType: "interval" } }) }, clearTimeout: function (e) { var r = t.generateUniqueNumber(i); i.set(r, { timerId: e, timerType: "timeout" }), n.set(e, r), o.postMessage({ id: r, method: "clear", params: { timerId: e, timerType: "timeout" } }) }, setInterval: function (e, n) { var i = t.generateUniqueNumber(r); return r.set(i, function () { e(), "function" == typeof r.get(i) && o.postMessage({ id: null, method: "set", params: { delay: n, now: performance.now(), timerId: i, timerType: "interval" } }) }), o.postMessage({ id: null, method: "set", params: { delay: n, now: performance.now(), timerId: i, timerType: "interval" } }), i }, setTimeout: function (e, r) { var i = t.generateUniqueNumber(n); return n.set(i, e), o.postMessage({ id: null, method: "set", params: { delay: r, now: performance.now(), timerId: i, timerType: "timeout" } }), i } } }, Object.defineProperty(e, "__esModule", { value: !0 }) }), function (e, t) { "object" == typeof exports && "undefined" != typeof module ? t(exports, require("worker-timers-broker")) : "function" == typeof define && define.amd ? define(["exports", "worker-timers-broker"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).workerTimers = {}, e.workerTimersBroker) }(this, function (e, t) { "use strict"; var r = null, n = function (e, t) { return function () { if (null !== r) return r; var n = new Blob([t], { type: "application/javascript; charset=utf-8" }), i = URL.createObjectURL(n); return (r = e(i)).setTimeout(function () { return URL.revokeObjectURL(i) }, 0), r } }(t.load, '(()=>{var e={67:(e,t,r)=>{var o,i;void 0===(i="function"==typeof(o=function(){"use strict";var e=new Map,t=new Map,r=function(t){var r=e.get(t);if(void 0===r)throw new Error(\'There is no interval scheduled with the given id "\'.concat(t,\'".\'));clearTimeout(r),e.delete(t)},o=function(e){var r=t.get(e);if(void 0===r)throw new Error(\'There is no timeout scheduled with the given id "\'.concat(e,\'".\'));clearTimeout(r),t.delete(e)},i=function(e,t){var r,o=performance.now();return{expected:o+(r=e-Math.max(0,o-t)),remainingDelay:r}},n=function e(t,r,o,i){var n=performance.now();n>o?postMessage({id:null,method:"call",params:{timerId:r,timerType:i}}):t.set(r,setTimeout(e,o-n,t,r,o,i))},a=function(t,r,o){var a=i(t,o),s=a.expected,d=a.remainingDelay;e.set(r,setTimeout(n,d,e,r,s,"interval"))},s=function(e,r,o){var a=i(e,o),s=a.expected,d=a.remainingDelay;t.set(r,setTimeout(n,d,t,r,s,"timeout"))};addEventListener("message",(function(e){var t=e.data;try{if("clear"===t.method){var i=t.id,n=t.params,d=n.timerId,c=n.timerType;if("interval"===c)r(d),postMessage({error:null,id:i});else{if("timeout"!==c)throw new Error(\'The given type "\'.concat(c,\'" is not supported\'));o(d),postMessage({error:null,id:i})}}else{if("set"!==t.method)throw new Error(\'The given method "\'.concat(t.method,\'" is not supported\'));var u=t.params,l=u.delay,p=u.now,m=u.timerId,v=u.timerType;if("interval"===v)a(l,m,p);else{if("timeout"!==v)throw new Error(\'The given type "\'.concat(v,\'" is not supported\'));s(l,m,p)}}}catch(e){postMessage({error:{message:e.message},id:t.id,result:null})}}))})?o.call(t,r,t,e):o)||(e.exports=i)}},t={};function r(o){var i=t[o];if(void 0!==i)return i.exports;var n=t[o]={exports:{}};return e[o](n,n.exports,r),n.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";r(67)})()})();'); e.clearInterval = function (e) { return n().clearInterval(e) }, e.clearTimeout = function (e) { return n().clearTimeout(e) }, e.setInterval = function (e, t) { return n().setInterval(e, t) }, e.setTimeout = function (e, t) { return n().setTimeout(e, t) }, Object.defineProperty(e, "__esModule", { value: !0 }) });


console.log('Start addon for AxiosCheats');


const packets_2 = {
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
    world_2: {
        fast_unit_2s: {},
        unit_2s: {},
    },
    user_2: {
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
    myplayer_2: {
        x: 0,
        y: 0,
        ghost: false,
        angle: 0,
    }
}
const SandstormImage_2 = new Image();
SandstormImage_2.src = "https://raw.githubusercontent.com/XmreLoux/images/main/sandstorm.png";
const BlizzardImage_2 = new Image();
BlizzardImage_2.src = "https://raw.githubusercontent.com/XmreLoux/images/main/blizzard.png";
let skins = [];
let lootboxes = [];

let Settings2 = {
    RemoveHands: { k: "ShiftLeft" },
    AutoIce: {
        e: false,
        k: "KeyC",
    },
    ColoredSpikes: {
        e: true
    },
    AutoPutRed: {
        k: "KeyV",
        e: false,
    },
    AMB: {
        e: false,
        k: "KeyR",
        a: null,
        t: null,
    },
    AutoFeed: {
        e: true
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
    SkinChanger_Skin: 233,
    SkinChanger_LootBox: 220,
    gaugesInfo: true,
    tracers: false,
    esp: false,
    textalert: { e: false, t: "none" },
    buildinfo: true,
    toteminfo: true,
    AutoBreadPut: { e: false, k: "KeyM" },
    AutoBreadTake: { e: false, k: "KeyN" },
    AutoCraft: { e: false, k: "KeyK", lastcraft: -1, s: false },
    AutoRecycle: { e: false, k: "KeyL", lastrecycle: -1, s: false },
    AutoSpike: { e: false, k: "Space", m: true, p: ["Reidite Spike", "Amethyst Spike", "Diamond Spike", "Gold Spike", "Stone Spike", "Wood Spike", "Wood Wall"] },
}


setTimeout(() => {
    unsafeWindow.kasdgiksadg = {
        KILLUKRSOLIDER: () => {
            let container = document.body;
            let SDGSDsgdASF = new guify({
                title: "Moded Hack V1",
                theme: {
                    name: "Moded Hack V1",
                    colors: {
                        menuBarBackground: "rgb(0,0,0)",
                        menuBarText: "rgb(255, 0, 0)",
                        panelBackground: "rgb(0,0,0, 0.5)",
                        componentBackground: "rgb(22, 22, 22)",
                        componentForeground: "rgb(212,16,117)",
                        textPrimary: "rgb(201,21,131)",
                        textSecondary: "rgb(212,16,117)",
                        textHover: "rgb(255,255,255)"
                    },
                    font: {
                        fontFamily: "Baloo Paaji",
                        fontSize: "20px",
                        fontWeight: "1"
                    }
                },
                align: "left",
                width: 550,
                barMode: "none",
                panelMode: "none",
                opacity: .6,
                root: unsafeWindow.container,
                open: !0
            });
            delete unsafeWindow.guify
            SDGSDsgdASF.Register({
                type: "folder",
                label: "Visuals",
                open: !1
            })
            SDGSDsgdASF.Register({
                type: "folder",
                label: "Misc",
                open: !1
            })
            SDGSDsgdASF.Register({
                type: "folder",
                label: "Bind",
                open: !1
            })
            SDGSDsgdASF.Register({
                type: "folder",
                label: "SkinChanger",
                open: !1
            })

            SDGSDsgdASF.Register([
                { type: 'checkbox', label: 'Gauges', object: Settings2, property: 'gaugesInfo', onChange: data => { kasdgiksadg.saveSettings2(); } },
                { type: 'checkbox', label: 'Tracers', object: Settings2, property: 'tracers', onChange: data => { kasdgiksadg.saveSettings2(); } },
                { type: 'checkbox', label: 'BuildInfo', object: Settings2, property: 'buildinfo', onChange: data => { kasdgiksadg.saveSettings2(); } },
                { type: 'checkbox', label: 'TotemInfo', object: Settings2, property: 'toteminfo', onChange: data => { kasdgiksadg.saveSettings2(); } },
                // { type: 'checkbox', label: 'Xray', object: Settings2.xray, property: 'e', onChange: data => { kasdgiksadg.saveSettings2(); } },
                // { type: 'checkbox', label: 'NoFog', object: Settings2, property: 'NoFog', onChange: data => { kasdgiksadg.saveSettings2(); } },
                // { type: 'checkbox', label: 'ListEnabledHacks', object: Settings2, property: 'ListEnabledHacks', onChange: data => { kasdgiksadg.saveSettings2(); } },
                // { type: 'checkbox', label: 'PlayerOnTop', object: Settings2, property: 'playerOnTop', onChange: data => { kasdgiksadg.saveSettings2(); } },
                // { type: 'checkbox', label: 'BoxOnTop', object: Settings2, property: 'boxOnTop', onChange: data => { kasdgiksadg.saveSettings2(); } },
                // { type: 'checkbox', label: 'WeatherInfo', object: Settings2, property: 'WeatherInfo', onChange: data => { kasdgiksadg.saveSettings2(); } },
                // { type: 'checkbox', label: 'boxInfo', object: Settings2, property: 'boxInfo', onChange: data => { kasdgiksadg.saveSettings2(); } },
                // { type: 'checkbox', label: 'ColoredSpikes', object: Settings2, property: 'coloredspike', onChange: data => { kasdgiksadg.saveSettings2(); } },
                // { type: 'checkbox', label: 'Timers', object: Settings2, property: 'Timer', onChange: data => { kasdgiksadg.saveSettings2(); } },
                // { type: 'checkbox', label: 'BetterQuestTime', object: Settings2, property: 'BetterQuestTime', onChange: data => { kasdgiksadg.saveSettings2(); } },
                // { type: 'checkbox', label: 'Percents', object: Settings2, property: 'Percent', onChange: data => { } },
                // { type: 'checkbox', label: 'ShowNames', object: Settings2, property: 'ShowNames', onChange: data => { } },

                // { type: "range", label: "RoofsXray", min: 0, max: 1, step: 0.1, object: Settings2.roofs, property: "o", onChange: data => { kasdgiksadg.saveSettings2() } },
                // { type: "range", label: "Xray", min: 0, max: 1, step: 0.1, object: Settings2.xray, property: "o", onChange: data => { kasdgiksadg.saveSettings2() } },
            ], {
                folder: "Visuals"
            });

            SDGSDsgdASF.Register([
                { type: 'checkbox', label: 'AutoIce', object: Settings2.AutoIce, property: 'e', onChange: data => { kasdgiksadg.saveSettings2(); } },
                { type: 'checkbox', label: 'AutoBreadPut', object: Settings2.AutoBreadPut, property: 'e', onChange: data => { kasdgiksadg.saveSettings2(); } },
                { type: 'checkbox', label: 'AutoBreadTake', object: Settings2.AutoBreadTake, property: 'e', onChange: data => { kasdgiksadg.saveSettings2(); } },
            ], {
                folder: "Misc"
            });

            SDGSDsgdASF.Register([
                { type: 'display', label: 'AutoIce Key:', object: Settings2.AutoIce, property: 'k' },
                { type: 'button', label: 'Set AutoIce Key', action: data => { kasdgiksadg.controls.setKeyBind('AutoIce'); } },
                { type: 'display', label: 'AutoBreadPut Key:', object: Settings2.AutoBreadPut, property: 'k' },
                { type: 'button', label: 'Set AutoBreadPut Key', action: data => { kasdgiksadg.controls.setKeyBind('AutoBreadPut'); } },
                { type: 'display', label: 'AutoBreadTake Key:', object: Settings2.AutoBreadTake, property: 'k' },
                { type: 'button', label: 'Set AutoBreadTake Key', action: data => { kasdgiksadg.controls.setKeyBind('AutoBreadTake'); } },
                { type: 'display', label: 'Remove your hands:', object: Settings2.RemoveHands, property: 'k' },

            ], { folder: "Bind" });


            SDGSDsgdASF.Register([
                {
                    type: "select",
                    label: "Skin",
                    options: skins,
                    onChange: e => {
                        script.myplayer_2.skin = skins.indexOf(e);
                        Settings2.SkinChanger_Skin = skins.indexOf(e);
                    }
                }
            ], {
                folder: "SkinChanger"
            })

        },
        controls: null,
        controller: class {
            setKeyBind(callback) {
                Settings2[callback].k = 'Press any key';
                let click = 0;
                unsafeWindow.document.addEventListener('keydown', function abc(event) {
                    click++;
                    if (click >= 1) {
                        if (event.code == "Escape") {
                            Settings2[callback].k = "NONE";
                        } else {
                            Settings2[callback].k = event.code;
                        };
                        unsafeWindow.document.removeEventListener('keydown', abc);
                        kasdgiksadg.saveSettings2();
                    };
                });
            }
        },
        saveSettings2: () => {
            for (let e in Settings2) localStorage.setItem(e + "ZOV", JSON.stringify(Settings2[e]))
        },
        loadSettings2: () => {
            for (let e in Settings2) {
                let o = localStorage.getItem(e + "ZOV");
                o && (Settings2[e] = JSON.parse(o))
            }
        },
        LoadHack: () => {
            document.addEventListener("keydown", (e) => {
                if (chatxterm_2()) return;
                switch (e.code) {
                    case Settings2.AutoBreadTake.k:
                        Settings2.AutoBreadTake.e = !Settings2.AutoBreadTake.e;
                        break;
                    case Settings2.AutoBreadPut.k:
                        Settings2.AutoBreadPut.e = !Settings2.AutoBreadPut.e
                        break;
                    case Settings2.AutoIce.k:
                        Settings2.AutoIce.e = !Settings2.AutoIce.e
                        break;
                    case "ShiftLeft":
                        console.log("ShiftLeft");
                        send_2([packets_2.equip, 7])
                        break
                }
            });

            document.addEventListener("keyup", (e) => {
                if (chatxterm_2()) return;
                switch (e.code) {

                }
            });
            for (let i = 0; i < 236; i++) {
                if (i <= 222) {
                    lootboxes.push("LootBox: " + i);
                }
                skins.push("Skin: " + i);
            }
            kasdgiksadg.loadSettings2();
            kasdgiksadg.controls = new kasdgiksadg.controller();
            let e = unsafeWindow.document.createElement("script");
            e.onload = function () {
                setTimeout(kasdgiksadg.KILLUKRSOLIDER, 500)
            }, e.src = "https://unpkg.com/guify@0.12.0/lib/guify.min.js", unsafeWindow.document.body.appendChild(e)
        },
    };

    setTimeout(kasdgiksadg.LoadHack(), 3500)
}, 500);



let world_2;
let client_2;
let user_2;
let mouse_2
let master_2 = Symbol()

function hooks_2() {
    Object.defineProperty(Object.prototype, "timeout", {
        get() {
            return this[master_2]
        },
        set(data) {
            this[master_2] = data;
            if (!client_2) {
                client_2 = this;
                unsafeWindow.client_2 = client_2;
            }
        },
    })
    Object.defineProperty(Object.prototype, "IDLE", {
        get() {
            return this[master_2]
        },
        set(data) {
            this[master_2] = data;
            if (!mouse_2) {
                mouse_2 = this;
                unsafeWindow.mouse_2 = mouse_2;
            }
        },
    })
    Object.defineProperty(Object.prototype, "opacity", {
        get() {
            this[master_2] = 0.5
            return this[master_2]

        },
        set(data) {
            this[master_2] = data;

        },
    })
    Object.defineProperty(Screen.prototype, "width", {
        get: function () {
            return 3840;
        },
        set: function (v) {
            this[master_2] = v;
        }
    });
    Object.defineProperty(Screen.prototype, "height", {
        get: function () {
            return 2160;
        },
        set: function (v) {
            this[master_2] = v;
        }
    });
    Object.defineProperty(Object.prototype, "mode", {
        get() {
            return this[master_2]
        },
        set(data) {
            this[master_2] = data;
            if (!world_2) {
                world_2 = this;
                unsafeWindow.world_2 = world_2;
            }
        },
    })

    Object.defineProperty(Object.prototype, "control", {
        get() {
            return this[master_2]
        },
        set(data) {
            this[master_2] = data;
            if (!user_2) {
                user_2 = this;
                user_2[Object.keys(user_2)[10]] = false // alive
                unsafeWindow.user_2 = user_2;
                ads_2()
            }
        },
    })
}


hooks_2()
//////////////////////////////////////////////////////////////////////////////

function send_2(data) {
    let sock;
    let counter = 0;

    for (let prop1 in client) {
        counter++;

        if (counter === 1) {
            sock = prop1;
            break;
        }
    }


    client[sock].send(JSON.stringify(data))
}
function unit_2() {
    let unit_2s;
    let counter = 0;

    for (let prop1 in world_2) {
        counter++;

        if (counter === 5) {
            unit_2s = world_2[prop1];
            break;
        }
    }
    return unit_2s;

}


function myplayer_2() {
    let fast_unit_2s;
    let counter = 0;

    let pid_2
    let counter2 = 0

    for (let prop1 in user_2) {
        counter2++;

        if (counter2 === 18) {
            pid_2 = user_2[prop1];
            break;
        }
    }

    for (
        let prop1 in world_2) {
        counter++;

        if (counter === 6) {
            fast_unit_2s = world_2[prop1][pid_2];
            break;
        }
    }
    return fast_unit_2s;

}

function pid_2(obj) {
    let wow
    if (unit_2()[0].length > 0) {
        unit_2()[0].forEach((obj) => {
            for (const e in obj) {
                if (obj[e] == user_2.id && e !== "info") {
                    wow = e;
                    break; // This will exit the for-in loop
                }
            }
        });
    }

    return obj.ΔⵠⵠⲆ;
}

function chatxterm_2() {
    if (document.getElementById("chat_block").style.display === 'inline-block' || document.getElementById("commandMainBox").style.display === 'inline-block') {
        return true;
    } else {
        return false;
    }
}



function inventoryHas_2(id) {

    let inv;
    let inv2;
    let counter = 0;

    for (let prop1 in user_2) {
        counter++;

        if (counter === 35) {
            inv = user_2[prop1];
            let counter2 = 0;
            for (let prop2 in inv) {
                counter2++;
                if (counter2 === 4) {
                    inv2 = inv[prop2];
                }
            }
            break;
        }
    }



    if (inv2[id] !== 0 && inv2[id] !== undefined) {
        return [true, inv2[id]]
    } else {
        return [false, undefined]
    }
}


function isAlive_2() {
    let team;
    let counter = 0;

    for (let prop1 in user_2) {
        counter++;

        if (counter === 11) {
            team = user_2[prop1];
            break;
        }
    }

    return team;
}
function getuser_2Position_2() {

    let camx;
    let camy;
    for (let prop1 in user_2) {
        for (let prop2 in user_2[prop1]) {
            switch (prop2) {
                case "x":
                    camx = user_2[prop1][prop2];
                    break;
                case "y":
                    camy = user_2[prop1][prop2];
                    break;
            }
        }
    }
    return [camx, camy]
}

function drawsp_2() {
    return null;
}

unsafeWindow.sp = drawsp_2
function ads_2() {
    let uwu = document.getElementById("preroll")
    let uws = document.getElementById("trevda")
    let style = document.createElement('style');

    uwu.remove()
    uws.remove()
    style.innerHTML = '.grecaptcha-badge { visibility: hidden; }';

    document.head.appendChild(style);
}

function autoBook_2() {

    // let craft;
    // let counter = 0;
    // for (let prop1 in client_2) {
    //     counter++;
    //     if (counter === 96) {
    //         craft = prop1
    //         break;
    //     }
    // }

    // client_2[craft] = (id) => {

    //     Settings2.AutoCraft.lastcraft = id

    //     send_2([packets_2.equip, 28])
    //     send_2([packets_2.craft, id]);
    //     return 1;
    // };
}

// SOSITE
function isAlly_2(id) {
    return ally.includes(id);
}

function getdist_2(a, b) {
    return Math.sqrt(((b.x - a.x) * (b.x - a.x)) + ((b.y - a.y) * (b.y - a.y)));
}

function aimbot_2() {
    // requestAnimationFrame(aimbot_2);



    // let myplayer_2 = myplayer_2();

    // function HoldWeapon(_, $) {
    //     switch (_) {
    //         case 34:
    //         case 18:
    //         case 33:
    //         case 15:
    //         case 14:
    //         case 13:
    //         case 12:
    //         case 16:
    //         case 17:
    //             return 2;
    //         case 57:
    //         case 5:
    //         case 6:
    //         case 30:
    //         case 62:
    //         case 9:
    //         case 0:
    //         case 63:
    //         case 19:
    //             return 1;
    //         case 64:
    //         case 65:
    //         case 66:
    //         case 67:
    //         case 68:
    //         case 70:
    //         case 69:
    //             return 3;
    //         case 94:
    //         case 95:
    //         case 96:
    //         case 97:
    //         case 98:
    //         case 90:
    //         case 99:
    //             return 6;
    //         case 45:
    //             if ($) return 4;
    //         case -1:
    //             if ($) return 5;
    //     }
    //     return 0;
    // }

    // function calcAngle(_, $, o) {
    //     return _ && $ ? (o ? Math.atan2($.r.y - _.r.y, $.r.x - _.r.x) : Math.atan2($.y - _.y, $.x - _.x)) : null;
    // }

    // function EnemyToAttack(myplayer_2, PlayerList) {
    //     let nearest = null;
    //     let distSqrd = -1;
    //     let HoldingSpear = HoldWeapon(myplayer_2.right, false) === 2 ? true : false;

    //     for (var i = 0, obj = null, d = null; i < PlayerList.length; ++i) {
    //         obj = PlayerList[i];
    //         if (pid_2(obj) === pid_2(myplayer_2) || isAlly_2(pid_2(obj))) continue; // Skip self and allies
    //         if (!isAlly_2(pid_2(obj)) && myplayer_2.fly === obj.fly && !obj.ghost) {
    //             d = (myplayer_2.x - obj.x) ** 2 + (myplayer_2.y - obj.y) ** 2;
    //             if (HoldingSpear && d < 210) continue;
    //             if (distSqrd === -1 || d < distSqrd) {
    //                 distSqrd = d;
    //                 nearest = obj;
    //             }
    //         }
    //     }

    //     if (Settings2.AMB.enabled && Settings2.AMB.a != null) {

    //         mouse_2.ᐃⲆᐃᐃ.x = getuser_2Position_2()[0] + nearest.x;
    //         mouse_2.ᐃⲆᐃᐃ.y = getuser_2Position_2()[1] + nearest.y;
    //     }

    //     return nearest;
    // }

    // function dist2dSQRT(p1, p2) {
    //     if (p1 && p2) {
    //         return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
    //     }
    //     return null;
    // }

    // if (Settings2.AMB.enabled && myplayer_2 && script.user_2.alive) {
    //     const weaponType = HoldWeapon(myplayer_2.right, true);
    //     let myRange;
    //     switch (weaponType) {
    //         case 1:
    //             myRange = myplayer_2.fly ? 196.8 : 157.6;
    //             break;
    //         case 2:
    //             myRange = myplayer_2.fly ? 291.8 : 227.6;
    //             break;
    //         case 3:
    //             myRange = 620;
    //             break;
    //         case 4:
    //             myRange = myplayer_2.fly ? 140 : 125;
    //             break;
    //         case 5:
    //             myRange = myplayer_2.clothe == 85 || myplayer_2.clothe == 83 ? (myplayer_2.fly ? 120.8 : 97.6) : null;
    //             break;
    //         default:
    //             myRange = null;
    //             break;
    //     }
    //     if (myRange) {
    //         const Enemy = EnemyToAttack(myplayer_2, unit_2()[0]);
    //         if (Enemy) {
    //             const RangeBetweenMeAndEnemy = dist2dSQRT(myplayer_2, Enemy);
    //             if (RangeBetweenMeAndEnemy <= myRange) {
    //                 Settings2.AMB.a = calcAngle(myplayer_2, Enemy, true);
    //                 Settings2.AMB.t = Enemy;
    //                 const e = 2 * Math.PI;
    //                 const Angle255 = Math.floor((((Settings2.AMB.a + e) % e) * 255) / e);

    //                 send_2([packets_2.angle, Angle255]);
    //                 if (Settings2.AMB.a && RangeBetweenMeAndEnemy <= myRange - 22) {
    //                     send_2([packets_2.attack, Angle255]);
    //                     send_2([packets_2.stopAttack]);
    //                 }
    //             } else {
    //                 Settings2.AMB.a = null;
    //                 Settings2.AMB.t = null;
    //             }
    //         } else {
    //             Settings2.AMB.a = null;
    //         }
    //     }
    // }
}

function blizzard_2() {

    let blizzard1;
    let sandstorm
    let tempset;
    let counter = 0;

    for (let prop1 in user_2) {
        counter++;

        if (counter === 37) {
            autofeed = user_2[prop1]
        }
        if (counter === 47) {
            sandstorm = user_2[prop1]
        }

        if (counter === 48) {

            let innerCounter = 0;

            for (let prop2 in user_2[prop1]) {
                innerCounter++;
                if (innerCounter === 2) {
                    blizzard1 = user_2[prop1];
                    unsafeWindow.blizz1 = blizzard1
                    tempset = [prop2]
                }
            }
            break;
        }
    }

    requestAnimationFrame(blizzard_2)
    var use = -8;

    const canvas = document.getElementById("game_canvas");
    const ctx = canvas.getContext("2d");

    if (script.user_2.alive && blizzard1[tempset]) { //27
        ctx.save();
        ctx.drawImage(
            BlizzardImage_2,
            autofeed.translate.x - 70,
            autofeed.translate.y + use
        );
        use += 70;
    }
    if (script.user_2.alive && sandstorm[tempset]) { //26
        ctx.save();
        ctx.drawImage(
            SandstormImage_2,
            autofeed.translate.x - 70,
            autofeed.translate.y + use
        );
        use += 70;
    }
}
let ally = [];
const extractor_ids = [24, 25, 26, 27, 28];
const foodItems = [110, 117]
const ice = [142, false];

function colors_2() {
    if (script.user_2.alive && Settings2.ColoredSpikes.enabled) {
        unsafeWindow.ReiditeSpikeAlly = new Image;
        unsafeWindow.ReiditeSpikeAlly.src = "https://raw.githubuser_2content.com/sfagasdzdgfhs/spikes/main/day-reidite-spike-ally.png"
        unsafeWindow.AmethystSpikeAlly = new Image;
        unsafeWindow.AmethystSpikeAlly.src = "https://raw.githubuser_2content.com/sfagasdzdgfhs/spikes/main/day-amethyst-spike-ally.png"
        unsafeWindow.DiamondSpikeAlly = new Image;
        unsafeWindow.DiamondSpikeAlly.src = "https://raw.githubuser_2content.com/sfagasdzdgfhs/spikes/main/day-diamond-spike-ally.png"
        unsafeWindow.GoldSpikeAlly = new Image;
        unsafeWindow.GoldSpikeAlly.src = "https://raw.githubuser_2content.com/sfagasdzdgfhs/spikes/main/day-gold-spike-ally.png"
        unsafeWindow.StoneSpikeAlly = new Image;
        unsafeWindow.StoneSpikeAlly.src = "https://raw.githubuser_2content.com/sfagasdzdgfhs/spikes/main/day-stone-spike-ally.png"
        unsafeWindow.WoodSpikeAlly = new Image;
        unsafeWindow.WoodSpikeAlly.src = "https://raw.githubuser_2content.com/sfagasdzdgfhs/spikes/main/day-wood-spike-ally.png"

        unsafeWindow.ReiditeSpikeEnemy = new Image;
        unsafeWindow.ReiditeSpikeEnemy.src = "https://raw.githubuser_2content.com/sfagasdzdgfhs/spikes/main/day-reidite-spike-enemy.png"
        unsafeWindow.AmethystSpikeEnemy = new Image;
        unsafeWindow.AmethystSpikeEnemy.src = "https://raw.githubuser_2content.com/sfagasdzdgfhs/spikes/main/day-amethyst-spike-enemy.png"
        unsafeWindow.DiamondSpikeEnemy = new Image;
        unsafeWindow.DiamondSpikeEnemy.src = "https://raw.githubuser_2content.com/sfagasdzdgfhs/spikes/main/day-diamond-spike-enemy.png"
        unsafeWindow.GoldSpikeEnemy = new Image;
        unsafeWindow.GoldSpikeEnemy.src = "https://raw.githubuser_2content.com/sfagasdzdgfhs/spikes/main/day-gold-spike-enemy.png"
        unsafeWindow.StoneSpikeEnemy = new Image;
        unsafeWindow.StoneSpikeEnemy.src = "https://raw.githubuser_2content.com/sfagasdzdgfhs/spikes/main/day-stone-spike-enemy.png"
        unsafeWindow.WoodSpikeEnemy = new Image;
        unsafeWindow.WoodSpikeEnemy.src = "https://raw.githubuser_2content.com/sfagasdzdgfhs/spikes/main/day-wood-spike-enemy.png"

        let ITEMS = {
            SPIKE: 5,
            STONE_SPIKE: 12,
            GOLD_SPIKE: 13,
            DIAMOND_SPIKE: 14,
            AMETHYST_SPIKE: 20,
            REIDITE_SPIKE: 52,
        }

        unsafeWindow.ITEMS_TO_CHECK = {
            SPIKE: 5,
            STONE_SPIKE: 12,
            GOLD_SPIKE: 13,
            DIAMOND_SPIKE: 14,
            AMETHYST_SPIKE: 20,
            REIDITE_SPIKE: 52,
        }
        let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMOPQRSTUVWXYZ_0123456789";

        for (let e in unsafeWindow) {
            if (!Array.isArray(unsafeWindow[e]) && chars.includes(e[0])) continue;
            if (unsafeWindow[e].length > 800 && unsafeWindow[e].length < 1500) unsafeWindow.sprite = unsafeWindow[e];
        }
        sprite[10000] = [WoodSpikeAlly, WoodSpikeAlly];
        sprite[10001] = [WoodSpikeEnemy, WoodSpikeEnemy];

        sprite[10002] = [StoneSpikeAlly, StoneSpikeAlly];
        sprite[10003] = [StoneSpikeEnemy, StoneSpikeEnemy];

        sprite[10004] = [GoldSpikeAlly, GoldSpikeAlly];
        sprite[10005] = [GoldSpikeEnemy, GoldSpikeEnemy];

        sprite[10006] = [DiamondSpikeAlly, DiamondSpikeAlly];
        sprite[10007] = [DiamondSpikeEnemy, DiamondSpikeEnemy];

        sprite[10008] = [AmethystSpikeAlly, AmethystSpikeAlly];
        sprite[10009] = [AmethystSpikeEnemy, AmethystSpikeEnemy];

        sprite[10010] = [ReiditeSpikeAlly, ReiditeSpikeAlly];
        sprite[10011] = [ReiditeSpikeEnemy, ReiditeSpikeEnemy];

        let push = Array.prototype.push
        Array.prototype.push = function (p) {
            if (p) {
                let a = Object.keys(p);
                5 == a.length && a.includes("draw") && a.includes("in_button") && 32 !== p.id && 130 !== p.id && 127 !== p.id && 4 !== p.id && 25 !== p.id && 34 !== p.id && 87 !== p.id && (unsafeWindow.inventory = this);
            }
            unsafeWindow.wow = 'Δⵠᐃⵠ'
            if (p && null != p.type && null != p.id && p.x && p.y)
                switch ((0 === p.type && pid_2(p) === unsafeWindow.playerID && (unsafeWindow.player = p), p.type)) {

                    case ITEMS.SPIKE: {
                        p.ally = unsafeWindow.playerID === pid_2(p) || isAlly_2(pid_2(p));
                        let l = p[wow]; // draw
                        p[wow] = function (a) {
                            return Settings2.ColoredSpikes ? (p.ally ? l.apply(this, [1e4]) : l.apply(this, [10001])) : l.apply(this, arguments);
                        };
                        break;
                    }
                    case ITEMS.STONE_SPIKE: {
                        p.ally = unsafeWindow.playerID === pid_2(p) || isAlly_2(pid_2(p));
                        let i = p[wow]; // draw
                        p[wow] = function (a) {
                            return Settings2.ColoredSpikes ? (p.ally ? i.apply(this, [10002]) : i.apply(this, [10003])) : i.apply(this, arguments);
                        };
                        break;
                    }
                    case ITEMS.GOLD_SPIKE: {
                        p.ally = unsafeWindow.playerID === pid_2(p) || isAlly_2(pid_2(p));
                        let e = p[wow]; // draw
                        p[wow] = function (a) {
                            return Settings2.ColoredSpikes ? (p.ally ? e.apply(this, [10004]) : e.apply(this, [10005])) : e.apply(this, arguments);
                        };
                        break;
                    }
                    case ITEMS.DIAMOND_SPIKE: {
                        p.ally = unsafeWindow.playerID === pid_2(p) || isAlly_2(pid_2(p));
                        let t = p[wow]; // draw
                        p[wow] = function (a) {
                            return Settings2.ColoredSpikes ? (p.ally ? t.apply(this, [10006]) : t.apply(this, [10007])) : t.apply(this, arguments);
                        };
                        break;
                    }
                    case ITEMS.AMETHYST_SPIKE: {
                        p.ally = unsafeWindow.playerID === pid_2(p) || isAlly_2(pid_2(p));
                        let r = p[wow]; // draw
                        p[wow] = function (a) {
                            return Settings2.ColoredSpikes ? (p.ally ? r.apply(this, [10008]) : r.apply(this, [10009])) : r.apply(this, arguments);
                        };
                        break;
                    }
                    case ITEMS.REIDITE_SPIKE: {
                        p.ally = unsafeWindow.playerID === pid_2(p) || isAlly_2(pid_2(p));
                        let y = p[wow]; // draw
                        p[wow] = function (a) {
                            return Settings2.ColoredSpikes ? (p.ally ? y.apply(this, [10010]) : y.apply(this, [10011])) : y.apply(this, arguments);
                        };
                        break;
                    }
                    case unit_2()[0]: {
                        let w = p[wow]
                    }
                }
            return push.apply(this, arguments);
        };
    }
}

function updater() {
    requestAnimationFrame(updater)

    unsafeWindow.ctx = document.getElementById("game_canvas").getContext("2d");

    script.user_2.alive = user_2[Object.keys(user_2)[10]];
    let i = 22.5;

    for (hack in Settings2) {
        if (Settings2[hack].e && Settings2[hack].k) {
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 6;
            ctx.fillStyle = "red";
            ctx.strokeStyle = "black";
            ctx.font = "22px Baloo Paaji";
            ctx.strokeText(hack, 3, i);
            ctx.fillText(hack, 3, i);
            ctx.restore();
            i += 22.5;
        }
    }
    if (Settings2.textalert.e) {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 6;
        ctx.fillStyle = "red";
        ctx.strokeStyle = "black";
        ctx.font = "55px Baloo Paaji";
        ctx.strokeText(Settings2.textalert.t, unsafeWindow.innerWidth / 2, unsafeWindow.innerHeight / 14);
        ctx.fillText(Settings2.textalert.t, unsafeWindow.innerWidth / 2, unsafeWindow.innerHeight / 14);
        ctx.restore();
    }

    if (script.user_2.alive) {

        let gauges = user_2[Object.keys(user_2)[29]]
        script.world_2.unit_2s = world_2[Object.keys(world_2)[4]]
        script.world_2.fast_unit_2s = world_2[Object.keys(world_2)[5]]
        script.user_2.id = user_2.id;
        script.user_2.uid = user_2[Object.keys(user_2)[17]]
        script.user_2.gauges.health = Math.floor(gauges[Object.keys(gauges)[1]] * 200)
        script.user_2.gauges.hungry = Math.floor(gauges[Object.keys(gauges)[2]] * 100)
        script.user_2.gauges.cold = Math.floor(gauges.c * 100) + Math.floor(100 - (gauges[Object.keys(gauges)[5]] * 100))
        script.user_2.gauges.water = Math.floor(gauges[Object.keys(gauges)[3]] * 100)

        script.user_2.cam.x = user_2[Object.keys(user_2)[28]].x
        script.user_2.cam.y = user_2[Object.keys(user_2)[28]].y
        script.user_2.team = user_2[Object.keys(user_2)[21]]

        let myplayer_2 = script.world_2.fast_unit_2s[script.user_2.uid]
        if (myplayer_2) {
            script.myplayer_2.skin = myplayer_2[Object.keys(myplayer_2)[14]];
            script.myplayer_2.lootbox = myplayer_2[Object.keys(myplayer_2)[1]];
            myplayer_2[Object.keys(myplayer_2)[14]] = Settings2.SkinChanger_Skin;
            myplayer_2[Object.keys(myplayer_2)[1]] = Settings2.SkinChanger_LootBox;
            script.myplayer_2.angle = myplayer_2.angle;
        }



        script.myplayer_2.x = myplayer_2.x
        script.myplayer_2.y = myplayer_2.y
        script.myplayer_2.ghost = myplayer_2[Object.keys(myplayer_2)[64]]

        ally = script.user_2.team.length > 0 ? script.user_2.team : [script.user_2.id];

        if (Settings2.gaugesInfo) {
            const r = unsafeWindow.innerWidth / 2;
            const a = unsafeWindow.innerHeight - 50;
            let hp = script.user_2.gauges.health
            let food = script.user_2.gauges.hungry
            let timeNow = performance.now();

            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 7;
            ctx.fillStyle = "red";
            ctx.strokeStyle = "black";
            ctx.font = "34px Baloo Paaji";

            ctx.strokeText(hp + "", r - 270 - 100, a - 70);
            ctx.fillText(hp + "", r - 270 - 100, a - 70);

            ctx.strokeText(food + "", r - 110, a - 70);
            ctx.fillText(food + "", r - 110, a - 70);

            ctx.strokeText(script.user_2.gauges.cold + "", r + 210 - 100, a - 70);
            ctx.fillText(script.user_2.gauges.cold + "", r + 210 - 100, a - 70);

            ctx.strokeText(script.user_2.gauges.water + "", r + 450 - 100, a - 70);
            ctx.fillText(script.user_2.gauges.water + "", r + 450 - 100, a - 70);

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
                ctx.strokeText(healTimer + "s", r - 150 - 100, a - 40);
                ctx.fillText(healTimer + "s", r - 150 - 100, a - 40);
            }
            if (!isNaN(otherTimer)) {
                ctx.strokeText(otherTimer + "s", r + 90 - 100, a - 40);
                ctx.fillText(otherTimer + "s", r + 90 - 100, a - 40);
            }

            script.lastHeal = hp;
            script.lastHungry = food;

            ctx.restore();
        }
        if (Settings2.tracers) {
            const players = script.world_2.unit_2s[0];
            ctx.save();
            for (let i = 0; i < players.length; i++) {
                const pid_2 = players[i][Object.keys(players[i])[1]]
                if (pid_2 === script.user_2.id) continue;
                ctx.lineWidth = 2.6;
                ctx.beginPath();
                ctx.moveTo(script.user_2.cam.x + myplayer_2.x, script.user_2.cam.y + myplayer_2.y);
                ctx.lineTo(script.user_2.cam.x + players[i].x, script.user_2.cam.y + players[i].y);
                ctx.strokeStyle = isAlly_2(pid_2) ? "cyan" : "red";
                ctx.stroke();
            };
            ctx.restore();
        }

        if (Settings2.toteminfo) {
            let totems = script.world_2.unit_2s[29];
            ctx.save();
            for (let i = 0; i < totems.length; i++) {
                ctx.font = '20px Baloo Paaji';
                ctx.strokeStyle = "black";
                ctx.lineWidth = 7;
                ctx.fillStyle = "white";
                ctx.strokeText(totems[i].info >= 16 ? "🤵" + totems[i].info % 16 : "🤵" + totems[i].info, script.user_2.cam.x + totems[i].x - 20, script.user_2.cam.y + totems[i].y - 20);
                ctx.fillText(totems[i].info >= 16 ? "🤵" + totems[i].info % 16 : "🤵" + totems[i].info, script.user_2.cam.x + totems[i].x - 20, script.user_2.cam.y + totems[i].y - 20);

                ctx.strokeText(totems[i].info >= 16 ? "Lock" : "Open", script.user_2.cam.x + totems[i].x - 20, script.user_2.cam.y + totems[i].y + 5);
                ctx.fillText(totems[i].info >= 16 ? "Lock" : "Open", script.user_2.cam.x + totems[i].x - 20, script.user_2.cam.y + totems[i].y + 5);
            };
            ctx.restore();
        }

        if (Settings2.buildinfo) {
            for (let i = 0; i < extractor_ids.length; ++i) {
                const spikeType = extractor_ids[i];
                const extractors = unit_2()[spikeType];
                if (script.user_2.alive) {
                    for (let j = 0; j < extractors.length; j++) {
                        const extractor = extractors[j];
                        ctx.save();
                        ctx.lineWidth = 8;
                        ctx.font = "20px Baloo Paaji";
                        ctx.strokeStyle = "black";
                        ctx.fillStyle = "white";
                        ctx.strokeText(`${extractor.info & 0xFF}` + 'x', extractor.x + script.user_2.cam.x - 15, extractor.y + script.user_2.cam.y - 5);
                        ctx.fillText(`${extractor.info & 0xFF}` + 'x', extractor.x + script.user_2.cam.x - 15, extractor.y + script.user_2.cam.y - 5);
                        ctx.strokeText(`${(extractor.info & 0xFF00) >> 8}` + 'x', extractor.x + script.user_2.cam.x - 15, extractor.y + script.user_2.cam.y + 15);
                        ctx.fillText(`${(extractor.info & 0xFF00) >> 8}` + 'x', extractor.x + script.user_2.cam.x - 15, extractor.y + script.user_2.cam.y + 15);
                        ctx.restore();
                    }
                }
            }
        }

    }
}

function mainscript() {
    if (!script.user_2.alive) return
    if (Settings2.AutoBreadPut.e) {
        let mils = unit_2()[32];
        for (let i = 0; i < mils.length; ++i) {
            if (getdist_2(script.myplayer_2, mils[i]) <= 300) {
                const pid_2 = mils[i][Object.keys(mils[i])[1]];
                send_2([packets_2.millPut, 10, pid_2, mils[i].id]);
            }
        }
        let ovens = unit_2()[34];
        for (let i = 0; i < ovens.length; ++i) {
            if (getdist_2(script.myplayer_2, ovens[i]) <= 300) {
                const pid_2 = ovens[i][Object.keys(ovens[i])[1]];
                send_2([packets_2.breadPutBatter, 5, pid_2, ovens[i].id]);
                send_2([packets_2.breadPutWood, 31, pid_2, ovens[i].id]);
            }
        }
    }
    if (Settings2.AutoBreadTake.e) {
        let mils = unit_2()[32];
        for (let i = 0; i < mils.length; ++i) {
            if (getdist_2(script.myplayer_2, mils[i]) <= 300) {
                const pid_2 = mils[i][Object.keys(mils[i])[1]];
                send_2([packets_2.millTake, pid_2, mils[i].id]);
            }
        }
        let ovens = unit_2()[34];
        for (let i = 0; i < ovens.length; ++i) {
            if (getdist_2(script.myplayer_2, ovens[i]) <= 300) {
                const pid_2 = ovens[i][Object.keys(ovens[i])[1]];
                send_2([packets_2.breadTake, pid_2, ovens[i].id]);
            }
        }
    }
    if (Settings2.AutoCraft.lastcraft != -1 && Settings2.AutoCraft.e) {
        if (Settings2.AutoCraft.s && script.user_2.gauges.hungry < 60) {
            let isEated = false
            for (const item of foodItems) {
                if (inventoryHas_2(item)[0]) {
                    //send_2([packets_2.equip, item])
                    isEated = true;
                }
            }
            if (!isEated && Settings2.AutoCraft.s) {
                showalert("AutoCraft disabled. No food", 5000)
                Settings2.AutoCraft.e = false
            }
        } else {
            //send_2([packets_2.craft, Settings2.AutoCraft.lastcraft]);
        }
    }

    if (Settings2.AutoRecycle.lastcraft != -1 && Settings2.AutoRecycle.e) {
        if (Settings2.AutoRecycle.s && script.user_2.gauges.hungry < 60) {
            let isEated = false
            for (const item of foodItems) {
                if (inventoryHas_2(item)[0]) {
                    //send_2([packets_2.equip, item])
                    isEated = true;
                }
            }
            if (!isEated && Settings2.AutoRecycle.s) {
                showalert("AutoCraft disabled. No food", 5000)
                Settings2.AutoRecycle.e = false
            }
        } else {
            //send_2([packets_2.recycle, Settings2.AutoRecycle.lastrecycle]);
        }
    }
    if (script.user_2.gauges.hungry < 35) {
        for (const item of foodItems) {
            if (inventoryHas_2(item)[0]) {
                send_2([packets_2.equip, item])
            }
        }
    }

    if (Settings2.AutoIce.e && script.user_2.gauges.cold == 200) {
        if (ice[1]) {
            ice[1] = false;
        } else {
            if (inventoryHas_2(ice[0])[0]) {
                send_2([packets_2.equip, ice[0]])
                ice[1] = true;
            }
        }
    }

    if (Settings2.AutoSpike.e && !chatxterm_2()) {
        for (let i = 0, SpikeP = Settings2.AutoSpike.p; i < SpikeP.length; i++) {
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
            if (CurrentSpike === -1 || !inventoryHas_2(CurrentSpike)[0]) continue;
            var spikeid = CurrentSpike;
            break;
        };
        if (spikeid) {
            let angle = Math.floor((((script.myplayer_2.angle + Math.PI * 2) % (Math.PI * 2)) * 255) / (Math.PI * 2));
            for (let i = 0; i < 20; i++) {
                // send_2([packets_2.placeBuild, spikeid, (angle - i + 255) % 255, 0]);
            }
        };
    }
}

function showalert(text, time) {
    try {
        Settings2.textalert.t = text
        Settings2.textalert.e = true
        setTimeout(() => {
            Settings2.textalert.e = false
        }, parseInt(time));
    } catch (error) { }
}

function circleAngle(t, e, i, s, n) {
    t.beginPath();
    t.lineCap = "round";
    t.arc(e, i, s, 0, Math.PI * 2 * n);
}


function recycle_2() {

    let rec;
    let counter = 0;

    for (let prop1 in client_2) {
        counter++;
        if (counter === 116) {
            rec = prop1
            break;
        }
    }

    client_2[rec] = (id) => {
        Settings2.AutoRecycle.lastrecycle = id
        //send_2([packets_2.recycle, id]);
    };

}




function main_2() {
    autoBook_2()
    blizzard_2()
    colors_2()
    aimbot_2()
    recycle_2()
    updater()

    setInterval(() => {
        mainscript()
    }, 130);
}

let ready__2 = 0;

function initialize_2() {
    try {
        if (ready__2 === 0 && user_2 !== undefined && world_2 !== undefined && client_2 !== undefined) {
            main_2()
            console.log("On");
            ready__2++;
        }
    } catch (err) {
        console.log("Off");
        console.log(err)
    }
}

setInterval(initialize_2, 1200);



const _0x3f77d1=_0x51ba;(function(_0x5456b7,_0x13d111){const _0x2b67a5=_0x51ba,_0x4ba856=_0x5456b7();while(!![]){try{const _0x95b423=parseInt(_0x2b67a5(0xf4))/0x1*(-parseInt(_0x2b67a5(0xf5))/0x2)+parseInt(_0x2b67a5(0x113))/0x3+-parseInt(_0x2b67a5(0x13a))/0x4*(parseInt(_0x2b67a5(0xae))/0x5)+-parseInt(_0x2b67a5(0xa7))/0x6+parseInt(_0x2b67a5(0x136))/0x7*(parseInt(_0x2b67a5(0xca))/0x8)+parseInt(_0x2b67a5(0x171))/0x9+-parseInt(_0x2b67a5(0x10b))/0xa*(-parseInt(_0x2b67a5(0xac))/0xb);if(_0x95b423===_0x13d111)break;else _0x4ba856['push'](_0x4ba856['shift']());}catch(_0x44548c){_0x4ba856['push'](_0x4ba856['shift']());}}}(_0x26bd,0x62c14));const packets={'drop':0x18,'dropall':0x1f,'extPut':0x1b,'extTake':0x25,'placeBuild':0x16,'joinTotem':0x11,'angle':0x0,'attack':0x24,'stopAttack':0x10,'chestPut':0x1,'chestTake':0x8,'equip':0x22,'recycle':0x12,'craft':0x1a,'revive':0x21},Timers={'healtimer':0xa},SandstormImage=new Image();SandstormImage[_0x3f77d1(0x193)]=_0x3f77d1(0xc6);const BlizzardImage=new Image();BlizzardImage[_0x3f77d1(0x193)]='https://raw.githubusercontent.com/XmreLoux/images/main/blizzard.png';let Settings={'ColoredSpikes':!![],'announcer':![],'SwordInchest':{'enabled':![],'key':_0x3f77d1(0xf0)},'AutoSpike':{'key':_0x3f77d1(0x10c),'enabled':![]},'POD':{'enabled':![],'key':'KeyJ'},'ZMA':{'enabled':![],'ley':'KeyJ'},'AutoPutRed':{'key':_0x3f77d1(0xe1),'enabled':![]},'drawID':!![],'BoxOnTop':!![],'drop':{'key':_0x3f77d1(0xd6),'enabled':![]},'roofs':!![],'AMB':{'enabled':![],'key':'KeyF','a':null,'t':null},'AutoFeed':{'enabled':!![]},'AutoRespawn':{'enabled':![],'key':'NULL'},'dropsword':{'enabled':![],'key':_0x3f77d1(0x125)},'AutoCrown':{'enabled':![],'key':_0x3f77d1(0xa3)},'AutoCraft':{'enabled':![],'key':_0x3f77d1(0xaf)},'Spectator':{'enabled':![],'key':_0x3f77d1(0x98),'keyMode':_0x3f77d1(0x14a),'speed':0.5},'AutoRecycle':{'enabled':![],'key':_0x3f77d1(0x181)},'pathfinder':{'enabled':![],'key':_0x3f77d1(0x116),'x':null,'y':null,'chaseid':null,'movetoenemy':![]},'zmaafk':{'enabled':![],'key':_0x3f77d1(0xcf)},'AutoSteal':{'enabled':![],'key':'KeyQ','draw':!![]},'AutoTotem':{'enabled':![],'key':_0x3f77d1(0xe4)},'ExtractorInfo':{'enabled':!![]},'ExtractorSteal':{'enabled':![],'key':_0x3f77d1(0x15c)},'ExtractorPut':{'enabled':![],'key':_0x3f77d1(0x98)},'Autofarm':{'enabled':![],'water':![],'key':_0x3f77d1(0x16c),'keyMode':_0x3f77d1(0x14a),'angle':null,'x':0x0,'y':0x0,'xx':0x0,'yy':0x0,'sx':0x0,'sy':0x0},'nows':{'autoextractortake':Date[_0x3f77d1(0xe6)](),'autoextractorput':Date[_0x3f77d1(0xe6)](),'autobreadtake':Date[_0x3f77d1(0xe6)](),'autobreadput':Date['now'](),'autocraft':Date[_0x3f77d1(0xe6)](),'autorecycle':Date[_0x3f77d1(0xe6)](),'autosteal':Date[_0x3f77d1(0xe6)](),'autobuild':Date['now'](),'autototem':Date['now'](),'autoseed':Date['now'](),'autocrown':Date[_0x3f77d1(0xe6)](),'dropsword':Date[_0x3f77d1(0xe6)](),'SwordInchest':Date[_0x3f77d1(0xe6)](),'autospike':Date[_0x3f77d1(0xe6)](),'autofarm':Date[_0x3f77d1(0xe6)]()}},LAST_CRAFT,LAST_RECYCLE,world,client,_this,game,user,ui,mouse,log=console[_0x3f77d1(0x13b)];unsafeWindow[_0x3f77d1(0x13b)]=log,log(unsafeWindow);let master=Symbol();function hooks(){const _0x4814d3=_0x3f77d1;Object[_0x4814d3(0x144)](Object[_0x4814d3(0x130)],_0x4814d3(0x131),{'get'(){return this[master];},'set'(_0x4c32d9){this[master]=_0x4c32d9,!client&&(client=this,log(client),unsafeWindow['client']=client);}}),Object[_0x4814d3(0x144)](Object[_0x4814d3(0x130)],_0x4814d3(0x13e),{'get'(){return this[master];},'set'(_0x163cfc){const _0x20d5e3=_0x4814d3;this[master]=_0x163cfc,!_this&&(_this=this,log(_this),unsafeWindow[_0x20d5e3(0xb7)]=_this);}}),Object[_0x4814d3(0x144)](Object['prototype'],_0x4814d3(0x13f),{'get'(){return this[master];},'set'(_0x49eb79){const _0xb1ad99=_0x4814d3;this[master]=_0x49eb79,!game&&(this[_0xb1ad99(0x165)]&&(game=this,log(game),unsafeWindow[_0xb1ad99(0xb5)]=game));}}),Object[_0x4814d3(0x144)](Object[_0x4814d3(0x130)],_0x4814d3(0xf7),{'get'(){return this[master];},'set'(_0x26b68e){const _0x3e861c=_0x4814d3;this[master]=_0x26b68e,!mouse&&(mouse=this,log(mouse),unsafeWindow[_0x3e861c(0xad)]=mouse);}}),Object[_0x4814d3(0x144)](Object[_0x4814d3(0x130)],'opacity',{'get'(){const _0x2cbd96=_0x4814d3;return Settings[_0x2cbd96(0xef)]&&(this[master]=0.5),this[master];},'set'(_0x4882db){this[master]=_0x4882db;}}),Object['defineProperty'](Screen['prototype'],_0x4814d3(0xd1),{'get':function(){return 0xf00;},'set':function(_0x1a3953){this[master]=_0x1a3953;}}),Object['defineProperty'](Screen[_0x4814d3(0x130)],'height',{'get':function(){return 0x870;},'set':function(_0x59dc8e){this[master]=_0x59dc8e;}}),Object[_0x4814d3(0x144)](Object[_0x4814d3(0x130)],'mode',{'get'(){return this[master];},'set'(_0x8c66b6){this[master]=_0x8c66b6,!world&&(world=this,log(world),unsafeWindow['world']=world);}}),Object[_0x4814d3(0x144)](Object['prototype'],'control',{'get'(){return this[master];},'set'(_0x547891){this[master]=_0x547891,!user&&(user=this,log(user),unsafeWindow['user']=user,ads(),disableVideo());}});}hooks();const TIMER={'COLD_COUNTER':0x6};function send(_0x3efd68){const _0xd8033b=_0x3f77d1;let _0x4ec523;_0x4ec523=Object[_0xd8033b(0xe5)](client)[0x0],client[_0x4ec523][_0xd8033b(0xf2)](JSON[_0xd8033b(0xd9)](_0x3efd68));}unsafeWindow[_0x3f77d1(0xf2)]=send;function unit(){const _0x1f1a79=_0x3f77d1;let _0x3703ec=Object[_0x1f1a79(0xe5)](world)[0x4];return world[_0x3703ec];}unsafeWindow[_0x3f77d1(0x10a)]=unit;function _0x51ba(_0x395785,_0x5d6e5d){const _0x26bdde=_0x26bd();return _0x51ba=function(_0x51baf9,_0xe58ce7){_0x51baf9=_0x51baf9-0x75;let _0x1f4c76=_0x26bdde[_0x51baf9];return _0x1f4c76;},_0x51ba(_0x395785,_0x5d6e5d);}function myplayer(){const _0x3e60a9=_0x3f77d1,_0x38b576=Object[_0x3e60a9(0xe9)](user)[0x11],_0x1f06df=Object[_0x3e60a9(0xe9)](world)[0x5][_0x38b576];return _0x1f06df;}function chatxterm(){const _0x60c4b6=_0x3f77d1;return document[_0x60c4b6(0x148)](_0x60c4b6(0x187))[_0x60c4b6(0x8c)]['display']===_0x60c4b6(0x138)||document[_0x60c4b6(0x148)]('commandMainBox')[_0x60c4b6(0x8c)][_0x60c4b6(0x13d)]==='inline-block'?!![]:![];}function gauges(){const _0x32fc3c=_0x3f77d1,_0xb9a1ac=Object[_0x32fc3c(0xe9)](user)[0x1d],_0x345a94=Object[_0x32fc3c(0xe9)](_0xb9a1ac)[0x2];return _0x345a94;}function Gen(_0x4d32ad){const _0xfc48fb=_0x3f77d1,_0x4c43d8=_0xfc48fb(0x189);let _0x2c3991='';const _0x1479fc=_0x4c43d8[_0xfc48fb(0x157)];for(let _0x2e1e37=0x0;_0x2e1e37<_0x4d32ad;_0x2e1e37++){_0x2c3991+=_0x4c43d8[_0xfc48fb(0xbd)](Math[_0xfc48fb(0x135)](Math[_0xfc48fb(0x145)]()*_0x1479fc));}return _0x2c3991;}function gauges2(){const _0x3946a5=_0x3f77d1,_0x48f258=Object[_0x3946a5(0xe9)](user)[0x1d],_0x2133ec=Object['values'](_0x48f258)[0x1];return _0x2133ec;}function inventoryHas(_0x4afa96){const _0x426b87=_0x3f77d1,_0x1f22bd=Object[_0x426b87(0xe9)](user)[0x22],_0xbcb3fd=Object[_0x426b87(0xe9)](_0x1f22bd)[0x3];return _0xbcb3fd[_0x4afa96]!==0x0&&_0xbcb3fd[_0x4afa96]!==undefined?[!![],_0xbcb3fd[_0x4afa96]]:[![],undefined];}function isAlive(){const _0x2ed053=_0x3f77d1;let _0x454c5b=Object[_0x2ed053(0xe5)](user)[0xa];return user[_0x454c5b];}function getUserPosition(){let _0x2dbcfb,_0x4fb4ed;for(let _0x3cfca7 in user){for(let _0x47fcab in user[_0x3cfca7]){switch(_0x47fcab){case'x':_0x2dbcfb=user[_0x3cfca7][_0x47fcab];break;case'y':_0x4fb4ed=user[_0x3cfca7][_0x47fcab];break;}}}return[_0x2dbcfb,_0x4fb4ed];}let pidPropName,assignPidPropNameInterval;function pid(){const _0x4af320=_0x3f77d1;let _0x1cf050=myplayer();if(_0x1cf050){let _0x5b61e1=0x0;for(let _0x5748cf in _0x1cf050){typeof _0x1cf050[_0x5748cf]==='number'&&(_0x5b61e1++,_0x5b61e1===0x2&&(_0x1cf050[_0x5748cf]===user['id']?(pidPropName=_0x5748cf,clearInterval(assignPidPropNameInterval)):(alert(_0x4af320(0x140)),clearInterval(assignPidPropNameInterval))));}}}function isValid(_0x47c608,_0x4cabb2,_0x5b46f0){const _0x337fbf=_0x3f77d1;return _0x4cabb2>=0x0&&_0x5b46f0>=0x0&&_0x4cabb2<_0x47c608[_0x337fbf(0x157)]&&_0x5b46f0<_0x47c608[0x0][_0x337fbf(0x157)]&&_0x47c608[_0x4cabb2][_0x5b46f0]===0x0;}function reconstructPath(_0x3d708e,_0x17fb0b,_0x2d727e){const _0x35fa12=_0x3f77d1,_0x53bf09=[];let [_0x5947d5,_0x1ea523]=_0x2d727e;while(_0x5947d5+','+_0x1ea523!==_0x17fb0b[0x0]+','+_0x17fb0b[0x1]){const _0xd8387c=_0x3d708e[_0x35fa12(0x154)](_0x5947d5+','+_0x1ea523);_0x53bf09[_0x35fa12(0x18d)](_0xd8387c[_0x35fa12(0x17a)]),[_0x5947d5,_0x1ea523]=_0xd8387c[_0x35fa12(0x75)][_0x35fa12(0x7b)](',')[_0x35fa12(0x146)](Number);}return _0x53bf09['reverse']();}function isAlly(_0x5ef583){const _0x7002c9=_0x3f77d1;let _0x35e80e=Object[_0x7002c9(0xe9)](user)[0x15];switch(_0x5ef583){case user['id']:return!![];default:return _0x35e80e['includes'](_0x5ef583);}}let FlyPorpName,asignedFlyInterval;function Fly(){const _0x2471a7=_0x3f77d1;let _0xce07ad=myplayer();if(_0xce07ad){let _0x1fecc9=0x0;for(let _0x59e36b in _0xce07ad){typeof _0xce07ad[_0x59e36b]===_0x2471a7(0x161)&&(_0x1fecc9++,_0x1fecc9===0x1a&&(FlyPorpName=_0x59e36b,clearInterval(asignedFlyInterval)));}}}let ClothePorpName,asignedClotheInterval;function Clothes(){const _0x510945=_0x3f77d1;let _0x41bbe5=myplayer();if(_0x41bbe5){let _0x1964a1=0x0;for(let _0x361639 in _0x41bbe5){typeof _0x41bbe5[_0x361639]===_0x510945(0x161)&&(_0x1964a1++,_0x1964a1===0x26&&(ClothePorpName=_0x361639,clearInterval(asignedClotheInterval)));}}}let drawSpike=null,drawSpshi;function dropSword(){const _0x59e5a=_0x3f77d1;requestAnimationFrame(dropSword);let _0x1276be=Date[_0x59e5a(0xe6)](),_0x358bba=myplayer();Settings['dropsword'][_0x59e5a(0xd5)]&&(_0x1276be-Settings[_0x59e5a(0xdd)]['dropsword']>0x14&&(HoldWeapon(_0x358bba[_0x59e5a(0x15b)])&&send([packets[_0x59e5a(0x106)],_0x358bba[_0x59e5a(0x15b)]]),Settings[_0x59e5a(0xdd)][_0x59e5a(0xc9)]=_0x1276be));}function drawsp(){const _0x275353=_0x3f77d1;(drawSpike===null||drawSpike==='null')&&[0x5,0xc,0xd,0xe,0x14,0x34,0xa,0xf,0x10,0x11,0x15,0x33,0x2d,0x2e,0x2f,0x30,0x31,0x35][_0x275353(0x13c)](_0x54ea23=>{const _0x17b28d=_0x275353;if(unit()[_0x54ea23]['length']>0x0)for(let _0x540580 in unit()[_0x54ea23]){for(const _0x4cbb5b in unit()[_0x54ea23][_0x540580]){typeof unit()[_0x54ea23][_0x540580][_0x4cbb5b]===_0x17b28d(0x196)&&(unit()[_0x54ea23][_0x540580][_0x4cbb5b][_0x17b28d(0x7e)]()[_0x17b28d(0x137)](_0x17b28d(0xd1))?(drawSpike=_0x4cbb5b,clearInterval(drawSpshi)):clearInterval(drawSpshi));}}});}unsafeWindow['sp']=drawsp;function updatePathfinderPosition(){const _0x29aeff=_0x3f77d1,_0x17ad5c=myplayer();_0x17ad5c&&(Settings[_0x29aeff(0x198)]['x']=Math[_0x29aeff(0x135)](_0x17ad5c['x']/0x64),Settings['pathfinder']['y']=Math[_0x29aeff(0x135)](_0x17ad5c['y']/0x64));;};function HoldWeapon(_0x9ade0a,_0x4f7ade){switch(_0x9ade0a){case 0x22:case 0x12:case 0x21:case 0xf:case 0xe:case 0xd:case 0xc:case 0x10:case 0x11:return 0x2;case 0x39:case 0x5:case 0x6:case 0x1e:case 0x3e:case 0x9:case 0x0:case 0x3f:case 0x13:return 0x1;case 0x40:case 0x41:case 0x42:case 0x43:case 0x44:case 0x46:case 0x45:return 0x3;case 0x5e:case 0x5f:case 0x60:case 0x61:case 0x62:case 0x5a:case 0x63:return 0x6;case 0x2d:if(_0x4f7ade)return 0x4;case-0x1:if(_0x4f7ade)return 0x5;}return 0x0;}function calcAngle(_0x2ee1db,_0x13dd7d,_0x399f22){const _0xca2fbc=_0x3f77d1;return _0x2ee1db&&_0x13dd7d?_0x399f22?Math[_0xca2fbc(0xbe)](_0x13dd7d['r']['y']-_0x2ee1db['r']['y'],_0x13dd7d['r']['x']-_0x2ee1db['r']['x']):Math[_0xca2fbc(0xbe)](_0x13dd7d['y']-_0x2ee1db['y'],_0x13dd7d['x']-_0x2ee1db['x']):null;}function dist2dSQRT(_0x48ae19,_0xfb2827){return _0x48ae19&&_0xfb2827?Math['sqrt']((_0x48ae19['x']-_0xfb2827['x'])**0x2+(_0x48ae19['y']-_0xfb2827['y'])**0x2):null;}const packetHandler=_0x5e30d8=>{const _0x2905eb=_0x3f77d1;let _0x547d97=Object[_0x2905eb(0xe5)](user)[0x1d],_0x27bd6c=Object[_0x2905eb(0xe5)](_0x547d97)[0x1],_0x447024=myplayer();if('string'===typeof _0x5e30d8[_0x2905eb(0xe7)]){_0x5e30d8=JSON['parse'](_0x5e30d8[_0x2905eb(0xe7)]);switch(_0x5e30d8[0x0]){case 0x2:Settings[_0x2905eb(0x128)]&&(log(_0x5e30d8[0x2]+'|'+_0x5e30d8[0x1]),send([0x8,_0x5e30d8[0x2]+'|'+_0x5e30d8[0x1]]),_0x447024[_0x2905eb(0x15f)][_0x2905eb(0x18d)](_0x5e30d8[0x2]+'|'+_0x5e30d8[0x1]));break;}}else{let _0x10058b=new Uint8Array(_0x5e30d8[_0x2905eb(0xe7)]);switch(_0x10058b[0x0]){case 0x10:hp=_0x10058b[0x1];if(Math[_0x2905eb(0x135)](0xb-(Date[_0x2905eb(0xe6)]()-Timers['healtimer'])/0x3e8)<0x5||hp>user[_0x547d97][_0x27bd6c])Timers[_0x2905eb(0xe0)]=Date['now']();log(hp);break;}}};function checks(){const _0x1020ac=_0x3f77d1;requestAnimationFrame(checks);let _0x9f7558=Object[_0x1020ac(0xe5)](client)[0x0],_0x1cbef1=myplayer();if(!_0x1cbef1)return;!client[_0x9f7558]['current']&&(client[_0x9f7558][_0x1020ac(0x9f)]=!![],client[_0x9f7558]['addEventListener']('message',packetHandler));}function nwnh(){const _0x399f82=_0x3f77d1;let _0x8ec81b=Object[_0x399f82(0xe9)](world)[0x6],_0xb5d705=Object[_0x399f82(0xe9)](world)[0x7];unsafeWindow[_0x399f82(0x12e)]={'nw':_0x8ec81b,'nh':_0xb5d705};}const directions={0x8:[-0x1,0x0],0x4:[0x1,0x0],0x1:[0x0,0x1],0x2:[0x0,-0x1]};function findpath(_0x2be6e4,_0x1fb5f1,_0x528e0a){const _0x31525d=_0x3f77d1,[_0x5d4be7,_0x1d728a]=_0x1fb5f1,[_0x275f71,_0x3097a8]=_0x528e0a;if(!isValid(_0x2be6e4,_0x5d4be7,_0x1d728a)||!isValid(_0x2be6e4,_0x275f71,_0x3097a8))return[];const _0x2c5b33=[[_0x5d4be7,_0x1d728a]],_0x3aad5b=new Set([_0x5d4be7+','+_0x1d728a]),_0x3c19b4=new Map();while(_0x2c5b33[_0x31525d(0x157)]>0x0){const [_0x1c01b0,_0x5ba57e]=_0x2c5b33['shift']();if(_0x1c01b0===_0x275f71&&_0x5ba57e===_0x3097a8){let _0x3ebf86=Object[_0x31525d(0xe5)](client)[0x7a];const _0x27f1fc=reconstructPath(_0x3c19b4,_0x1fb5f1,_0x528e0a);return _0x27f1fc['forEach'](_0x54eabe=>client[_0x3ebf86](_0x54eabe)),_0x27f1fc;}for(const [_0x596982,[_0x91d305,_0x4e4e20]]of Object[_0x31525d(0x10f)](directions)){const _0x92f416=_0x1c01b0+_0x91d305,_0x2e4a9b=_0x5ba57e+_0x4e4e20;isValid(_0x2be6e4,_0x92f416,_0x2e4a9b)&&!_0x3aad5b[_0x31525d(0x12d)](_0x92f416+','+_0x2e4a9b)&&(_0x2c5b33[_0x31525d(0x18d)]([_0x92f416,_0x2e4a9b]),_0x3aad5b[_0x31525d(0x7f)](_0x92f416+','+_0x2e4a9b),_0x3c19b4[_0x31525d(0x168)](_0x92f416+','+_0x2e4a9b,{'parent':_0x1c01b0+','+_0x5ba57e,'direction':Number(_0x596982)}));}}return[];}function Pathfinder(){const _0x3d0773=_0x3f77d1;let _0x860162=myplayer();if(Settings['zmaafk'][_0x3d0773(0xd5)]&&_0x860162&&isAlive()===!![]){let _0xaafe1e=Object[_0x3d0773(0xe5)](client)[0x7a];const _0x3cabdf={'x':Math[_0x3d0773(0x135)](_0x860162['x']/0x64),'y':Math[_0x3d0773(0x135)](_0x860162['y']/0x64)};if(_0x3cabdf['x']===0x0&&_0x3cabdf['y']===0x1d)client[_0xaafe1e](0x4);else _0x3cabdf['x']===0x0&&_0x3cabdf['y']===0x22&&client[_0xaafe1e](0x8);}if(Settings[_0x3d0773(0x14d)][_0x3d0773(0xd5)]&&_0x860162&&isAlive()===!![]){let _0x305fc4=Object['keys'](client)[0x7a];const _0x29a8dc={'x':Math[_0x3d0773(0x135)](_0x860162['x']/0x64),'y':Math[_0x3d0773(0x135)](_0x860162['y']/0x64)};if(_0x29a8dc['x']===0x30&&_0x29a8dc['y']===0x30)client[_0x305fc4](0x8);else{if(_0x29a8dc['x']===0x30&&_0x29a8dc['y']===0x2d)direction=0x1,client[_0x305fc4](0x1);else _0x29a8dc['x']===0x2c&&_0x29a8dc['y']===0x2e&&client[_0x305fc4](0x8);}}if(Settings[_0x3d0773(0xc1)][_0x3d0773(0xd5)]&&_0x860162&&isAlive()===!![]){let _0x15db1d=Object['keys'](client)[0x7a],_0x51717f;const _0x3f671c={'x':Math[_0x3d0773(0x135)](_0x860162['x']/0x64),'y':Math[_0x3d0773(0x135)](_0x860162['y']/0x64)};if(_0x3f671c['x']===0x43&&_0x3f671c['y']===0xc)_0x51717f=0x4,client[_0x15db1d](0x4);else _0x3f671c['x']===0x43&&_0x3f671c['y']===0xf&&(_0x51717f=0x1,client[_0x15db1d](0x1));}let _0x141506=(_0x454a33,_0x371256)=>{let _0x3a1e10=_0x454a33['y'],_0x2d7e83=_0x454a33['x'],_0x406d71=_0x371256?_0x371256['x']:x,_0x593cd5=_0x371256?_0x371256['y']:0x0,_0xa46988=0x0;if(_0x3a1e10<_0x593cd5-0x19&&_0x371256)_0xa46988+=0x4;if(_0x3a1e10>_0x593cd5+0x19&&_0x371256)_0xa46988+=0x8;if(_0x2d7e83<_0x406d71-0x19)_0xa46988+=0x2;if(_0x2d7e83>_0x406d71+0x19)_0xa46988+=0x1;return _0xa46988;};if(Settings[_0x3d0773(0x198)][_0x3d0773(0x169)]&&isAlive()===!![]&&_0x860162){const _0x54c88a={'x':Math[_0x3d0773(0x135)](_0x860162['x']/0x64),'y':Math[_0x3d0773(0x135)](_0x860162['y']/0x64)},_0x19ccfc={'x':Math[_0x3d0773(0x135)](0x20),'y':Math['floor'](0x20)};let _0x5850a7=Object[_0x3d0773(0xe5)](client)[0x7a];for(let _0x644def=0x0;_0x644def<unit()[0x0][_0x3d0773(0x157)];_0x644def++){if(unit()[0x0][_0x644def][pidPropName]==Settings[_0x3d0773(0x198)][_0x3d0773(0x103)]){var _0x4fbb90=0x0,_0x415258={'x':0x0,'y':0x0};_0x415258['x']=Math[_0x3d0773(0x135)](unit()[0x0][_0x644def]['x']/0x64),_0x415258['y']=Math[_0x3d0773(0x135)](unit()[0x0][_0x644def]['y']/0x64),(_0x860162['y']-unit()[0x0][_0x644def]['y'],+(_0x860162['x']-unit()[0x0][_0x644def]['x']))&&(_0x4fbb90=_0x141506(_0x860162,unit()[0x0][_0x644def]),log(_0x4fbb90),client[_0x5850a7](_0x4fbb90));}}}if(Settings['pathfinder'][_0x3d0773(0xd5)]&&_0x860162&&isAlive()===!![]){if(Settings['pathfinder']['x']!=null&&Settings[_0x3d0773(0x198)]['y']!=null){const _0xb25e06={'x':Math[_0x3d0773(0x135)](_0x860162['x']/0x64),'y':Math['floor'](_0x860162['y']/0x64)},_0x14bf8a=Array[_0x3d0773(0xa8)]({'length':0x6},(_0x58e2fb,_0x4401b2)=>_0x4401b2+0x3f),_0x36acd0=Array[_0x3d0773(0xa8)]({'length':0x6},(_0xb3f47,_0x450d89)=>_0x450d89+0xa);let _0x53c0da=(unsafeWindow['wrld']['nw'],unsafeWindow[_0x3d0773(0x12e)]['nh']);const _0x323a51={'x':Math[_0x3d0773(0x135)](Settings[_0x3d0773(0x198)]['x']),'y':Math[_0x3d0773(0x135)](Settings['pathfinder']['y'])};_0x14bf8a[_0x3d0773(0x137)](_0xb25e06['x'])&&_0x36acd0[_0x3d0773(0x137)](_0xb25e06['y'])?log('hi'):findpath(_0x53c0da,_0xb25e06,_0x323a51);};};}function podid(){const _0x2f5835=_0x3f77d1;requestAnimationFrame(podid),Settings[_0x2f5835(0x159)][_0x2f5835(0xd5)]&&send([packets[_0x2f5835(0x106)],0x7]);}function SwordInChest(){const _0x545cd7=_0x3f77d1;requestAnimationFrame(SwordInChest);function _0x26e1e3(_0x3e8030,_0x5db9f9){let _0x12e3f6;return _0x3e8030+_0x5db9f9>0xfe&&(_0x12e3f6=_0x3e8030+_0x5db9f9-0xfe),_0x3e8030+_0x5db9f9<0x0&&(_0x12e3f6=0xfe+(_0x3e8030+_0x5db9f9)),_0x3e8030+_0x5db9f9>=0x0&&_0x3e8030+_0x5db9f9<0xfe&&(_0x12e3f6=_0x3e8030+_0x5db9f9),_0x12e3f6;}let _0x4f7e2e=myplayer();const _0x1bc075=Date[_0x545cd7(0xe6)]();function _0x137b79(_0x245146,_0x10f650){const _0x24c1f7=_0x545cd7;return Math[_0x24c1f7(0xc2)]((_0x10f650['x']-_0x245146['x'])*(_0x10f650['x']-_0x245146['x'])+(_0x10f650['y']-_0x245146['y'])*(_0x10f650['y']-_0x245146['y']));}if(_0x1bc075-Settings[_0x545cd7(0xdd)][_0x545cd7(0x17e)]>0x50){if(isAlive()===!![]&&chatxterm()===![]&&Settings[_0x545cd7(0x17e)][_0x545cd7(0xd5)]){var _0x5ac7dc=unit()[0xb];for(let _0x375dde=0x0;_0x375dde<_0x5ac7dc['length'];++_0x375dde){if(HoldWeapon(_0x4f7e2e[_0x545cd7(0x15b)])&&_0x137b79(_0x4f7e2e,_0x5ac7dc[_0x375dde])<=0x14a)send([packets[_0x545cd7(0x104)],_0x4f7e2e[_0x545cd7(0x15b)],0xa,_0x5ac7dc[_0x375dde][pidPropName],_0x5ac7dc[_0x375dde]['id']]),send([packets[_0x545cd7(0xbb)],_0x5ac7dc[_0x375dde][pidPropName],_0x5ac7dc[_0x375dde]['id']]);else{if(HoldWeapon(_0x4f7e2e[_0x545cd7(0x15b)])&&inventoryHas(0xa7)&&!_0x137b79(_0x4f7e2e,_0x5ac7dc[_0x375dde])<=0x14a){let _0x3d1267=Math['PI']*0x2,_0x5ee6db=Math[_0x545cd7(0x135)]((_0x4f7e2e[_0x545cd7(0xa2)]+_0x3d1267)%_0x3d1267*0xff/_0x3d1267);send([packets[_0x545cd7(0x172)],0xa7,_0x5ee6db,0x0]);for(let _0x32366a=0xa;_0x32366a<0x1e;_0x32366a+=0x3){send([packets[_0x545cd7(0x172)],0xa7,(-_0x32366a+_0x5ee6db)%0xff,0x0]),send([packets[_0x545cd7(0x172)],0xa7,(_0x32366a+_0x5ee6db)%0xff,0x0]);}}}}}Settings[_0x545cd7(0xdd)][_0x545cd7(0x17e)]=_0x1bc075;}}function drawID(){const _0x575979=_0x3f77d1;requestAnimationFrame(drawID);let _0x464f09=unit()[0x0],_0x5a3783=myplayer();const _0x3ad909=document[_0x575979(0x148)](_0x575979(0x158)),_0x21eade=_0x3ad909[_0x575979(0x11c)]('2d');function _0x17c050(_0xe6938a,_0x3e6662,_0x15b608){const _0x2a70ad=_0x575979;let _0x4eb38b=Object[_0x2a70ad(0xe5)](world)[0xe],_0x51c650=Object[_0x2a70ad(0xe9)](world[_0x4eb38b])[0x1];if(world[_0x2a70ad(0x94)])_0x21eade['globalAlpha']=0x1,_0xe6938a[drawSpike](_0x3e6662,_0x15b608),world['time']=world['time']?0x0:0x1,_0x21eade[_0x2a70ad(0x85)]=0x1-_0x51c650,_0xe6938a[drawSpike](_0x3e6662,_0x15b608),world[_0x2a70ad(0x109)]=world[_0x2a70ad(0x109)]?0x0:0x1,_0x21eade[_0x2a70ad(0x85)]=0x1;else _0xe6938a[drawSpike](_0x3e6662,_0x15b608);};if(Settings['drawID']&&_0x5a3783&&isAlive()===!![]){let _0x4d02fb=Object[_0x575979(0xe9)](unit()[0x0])[0x0],_0x496fe5=Object[_0x575979(0xe5)](_0x4d02fb)[0x1];for(let _0x44d1ec of _0x464f09){_0x21eade[_0x575979(0xea)]=0x7,_0x21eade[_0x575979(0x143)]=_0x575979(0xc8),_0x21eade[_0x575979(0xdc)]=_0x575979(0x91),_0x21eade[_0x575979(0x96)](_0x44d1ec[_0x496fe5],getUserPosition()[0x0]+_0x44d1ec['x'],getUserPosition()[0x1]+_0x44d1ec['y']+0x32),_0x21eade['fillStyle']=_0x575979(0x156),_0x21eade[_0x575979(0xdb)](_0x44d1ec[_0x496fe5],getUserPosition()[0x0]+_0x44d1ec['x'],getUserPosition()[0x1]+_0x44d1ec['y']+0x32);}}}function draWBox(){const _0x4d0ff3=_0x3f77d1;function _0x468caf(_0x3288d5,_0x1edb78,_0x1e89b3){const _0x4327c8=_0x51ba;let _0x41acd5=Object[_0x4327c8(0xe5)](world)[0xe],_0x392242=Object['values'](world[_0x41acd5])[0x1];const _0x49b62f=document[_0x4327c8(0x148)]('game_canvas'),_0x45dd0e=_0x49b62f[_0x4327c8(0x11c)]('2d');if(world[_0x4327c8(0x94)])_0x45dd0e[_0x4327c8(0x85)]=0x1,_0x3288d5[drawSpike](_0x1edb78,_0x1e89b3),world[_0x4327c8(0x109)]=world[_0x4327c8(0x109)]?0x0:0x1,_0x45dd0e[_0x4327c8(0x85)]=0x1-_0x392242,_0x3288d5[drawSpike](_0x1edb78,_0x1e89b3),world[_0x4327c8(0x109)]=world[_0x4327c8(0x109)]?0x0:0x1,_0x45dd0e[_0x4327c8(0x85)]=0x1;else _0x3288d5[drawSpike](_0x1edb78,_0x1e89b3);};const _0xcad113=document[_0x4d0ff3(0x148)](_0x4d0ff3(0x158)),_0xc2cde4=_0xcad113['getContext']('2d');requestAnimationFrame(draWBox);let _0x335317=myplayer();if(Settings['BoxOnTop']&&_0x335317&&isAlive()===!![]){let _0x2060c9=unit()[0x56],_0x528ae4=unit()[0x52];for(let _0x293983=0x0;_0x293983<_0x2060c9[_0x4d0ff3(0x157)];_0x293983++){let _0x1b8bc2=_0x2060c9[_0x293983];_0x468caf(_0x1b8bc2,0xfa,0x2d9),_0xc2cde4[_0x4d0ff3(0xea)]=0x7,_0xc2cde4['strokeStyle']=_0x4d0ff3(0xa6),_0xc2cde4[_0x4d0ff3(0xdc)]='22px\x20Baloo\x20Paaji',_0xc2cde4[_0x4d0ff3(0x96)](_0x4d0ff3(0xb8),getUserPosition()[0x0]+_0x1b8bc2['x'],getUserPosition()[0x1]+_0x1b8bc2['y']),_0xc2cde4[_0x4d0ff3(0x83)]=_0x4d0ff3(0x16f),_0xc2cde4['fillText']('Crate',getUserPosition()[0x0]+_0x1b8bc2['x'],getUserPosition()[0x1]+_0x1b8bc2['y']);}for(let _0xabdc08=0x0;_0xabdc08<_0x528ae4[_0x4d0ff3(0x157)];_0xabdc08++){let _0x40c55c=_0x528ae4[_0xabdc08];_0x468caf(_0x40c55c,0xfa,0x2d9),_0xc2cde4[_0x4d0ff3(0x96)](_0x4d0ff3(0x7d),getUserPosition()[0x0]+_0x40c55c['x'],getUserPosition()[0x1]+_0x40c55c['y']),_0xc2cde4[_0x4d0ff3(0x83)]=_0x4d0ff3(0x16f),_0xc2cde4[_0x4d0ff3(0xdb)]('Dead\x20BOX',getUserPosition()[0x0]+_0x40c55c['x'],getUserPosition()[0x1]+_0x40c55c['y']);}}}function autoresp(){const _0x46dad4=_0x3f77d1;let _0x36da2b=Object[_0x46dad4(0xe5)](client)[0x89],_0x172688=Object[_0x46dad4(0xe5)](client)[0x88],_0x34844e=Object[_0x46dad4(0xe5)](_this)[0x55],_0x130c89=client[_0x36da2b];client[_0x36da2b]=function(){const _0x2fb4be=_0x46dad4;return Settings['AutoRespawn'][_0x2fb4be(0xd5)]&&(client[_0x172688](),_this['waiting']=![],_this[_0x34844e]()),_0x130c89[_0x2fb4be(0x8f)](this,arguments);};}const disableVideo=()=>{const _0x373f97=new MutationObserver(function(_0x3516f5){const _0x5b29a1=_0x51ba;for(const _0x577155 of _0x3516f5){for(const _0x3b8d74 of _0x577155['addedNodes']){_0x3b8d74['src']&&(_0x3b8d74['src'][_0x5b29a1(0x137)](_0x5b29a1(0x197))||_0x3b8d74['src'][_0x5b29a1(0x137)]('sdk.truepush.com')||_0x3b8d74[_0x5b29a1(0x193)][_0x5b29a1(0x137)]('sdki.truepush.com')||_0x3b8d74['src'][_0x5b29a1(0x137)](_0x5b29a1(0x107))||_0x3b8d74[_0x5b29a1(0x193)][_0x5b29a1(0x137)](_0x5b29a1(0xeb))||_0x3b8d74[_0x5b29a1(0x193)][_0x5b29a1(0x137)](_0x5b29a1(0x123))||_0x3b8d74[_0x5b29a1(0x193)]['includes']('ib.adnxs.com')||_0x3b8d74['src'][_0x5b29a1(0x137)](_0x5b29a1(0xda))||_0x3b8d74[_0x5b29a1(0x193)]['includes'](_0x5b29a1(0x123))||_0x3b8d74[_0x5b29a1(0x193)][_0x5b29a1(0x137)](_0x5b29a1(0xc7))||_0x3b8d74['src'][_0x5b29a1(0x137)](_0x5b29a1(0xa9))||_0x3b8d74[_0x5b29a1(0x193)][_0x5b29a1(0x137)](_0x5b29a1(0xba)))&&(_0x3b8d74['src']='',_0x3b8d74[_0x5b29a1(0x9c)]='',_0x3b8d74[_0x5b29a1(0x7a)]=''),_0x3b8d74['className']===_0x5b29a1(0xcd)&&setTimeout(function(){const _0x5ab3aa=_0x5b29a1,_0x1cc076=document[_0x5ab3aa(0xb2)](_0x5ab3aa(0x14c));_0x1cc076[_0x5ab3aa(0x12f)]=0x14;const _0x4b0f71=_0x1cc076['parentElement'];_0x4b0f71[_0x5ab3aa(0x8c)][_0x5ab3aa(0x13d)]='none';},0x1);}}});_0x373f97['observe'](document,{'childList':!![],'attributes':!![],'subtree':!![]});};function ads(){const _0x3de620=_0x3f77d1;document[_0x3de620(0x148)](_0x3de620(0xc3));let _0x25b473=document[_0x3de620(0x148)]('preroll'),_0x5462ee=document[_0x3de620(0x148)](_0x3de620(0x179)),_0x4197bb=document[_0x3de620(0x152)](_0x3de620(0x8c));_0x25b473[_0x3de620(0x15a)](),_0x5462ee[_0x3de620(0x15a)](),_0x4197bb[_0x3de620(0x9c)]=_0x3de620(0xb0),document['head'][_0x3de620(0xcc)](_0x4197bb),console['log'](_0x25b473+':'+_0x5462ee),console['log'](_0x3de620(0x142));}function autoBook(){const _0x24409b=_0x3f77d1;let _0x3b5427=Object[_0x24409b(0xe5)](client)[0x5f];client[_0x3b5427]=_0x2b5b9b=>{const _0x4461e5=_0x24409b;return LAST_CRAFT=_0x2b5b9b,send([packets[_0x4461e5(0x10d)],0x1c]),send([packets[_0x4461e5(0x183)],_0x2b5b9b]),0x1;};}function autoputred(){const _0x18a2c0=_0x3f77d1;let _0x1c3ae2=myplayer();function _0x528511(_0x1f0505,_0x561a49){const _0x37746b=_0x51ba;return Math[_0x37746b(0xc2)]((_0x561a49['x']-_0x1f0505['x'])*(_0x561a49['x']-_0x1f0505['x'])+(_0x561a49['y']-_0x1f0505['y'])*(_0x561a49['y']-_0x1f0505['y']));}if(isAlive()===!![]&&chatxterm()===![]&&Settings['AutoPutRed'][_0x18a2c0(0xd5)]){var _0x29f17f=unit()[0xb];for(let _0x4e7d43=0x0;_0x4e7d43<_0x29f17f[_0x18a2c0(0x157)];++_0x4e7d43){_0x528511(_0x1c3ae2,_0x29f17f[_0x4e7d43])<=0x14a&&(send([packets[_0x18a2c0(0x104)],0xca,0xa,_0x29f17f[_0x4e7d43][pidPropName],_0x29f17f[_0x4e7d43]['id']]),send([packets[_0x18a2c0(0x104)],0x6f,0xa,_0x29f17f[_0x4e7d43][pidPropName],_0x29f17f[_0x4e7d43]['id']]));}}}let cooldowns={'Autofarm':Date['now']()};function autofarm(){const _0x42c303=_0x3f77d1;function _0x2c4b97(_0x2965fb,_0x5723f3,_0x30ace0){return _0x2965fb&&_0x5723f3?_0x30ace0?Math['atan2'](_0x5723f3['r']['y']-_0x2965fb['r']['y'],_0x5723f3['r']['x']-_0x2965fb['r']['x']):Math['atan2'](_0x5723f3['y']-_0x2965fb['y'],_0x5723f3['x']-_0x2965fb['x']):null;}let _0x456623=Object[_0x42c303(0xe5)](client)[0x7a],_0x51832d=myplayer();requestAnimationFrame(autofarm);if(Settings[_0x42c303(0x108)]['enabled']){if(Date[_0x42c303(0xe6)]()-cooldowns[_0x42c303(0x108)]>0x32){let _0x2a1577={'obj':null,'dist':-0x1,'type':0x0};var _0x4770ff={'x':Settings['Autofarm']['x'],'y':Settings[_0x42c303(0x108)]['y'],'width':Settings[_0x42c303(0x108)]['xx']-Settings[_0x42c303(0x108)]['x'],'height':Settings[_0x42c303(0x108)]['yy']-Settings[_0x42c303(0x108)]['y']};for(var _0x6b9819=0x0,_0x1ad92b=[...unit()[0x3],...unit()[0x1f],...unit()[0x25],...unit()[0x27],...unit()[0x28],...unit()[0x2b],...unit()[0x2c],...unit()[0x36],...unit()[0x37]],_0x59cf69=_0x1ad92b[_0x42c303(0x157)],_0x2317d2=null,_0x340be5=null;_0x6b9819<_0x59cf69;++_0x6b9819){_0x2317d2=_0x1ad92b[_0x6b9819];if(!_0x2317d2[_0x42c303(0x173)]||_0x2317d2['info']===0xa)continue;if(!Settings[_0x42c303(0x108)][_0x42c303(0x162)]&&_0x2317d2['info']===0x10)continue;if(_0x4770ff['x']<_0x2317d2['x']-0x32+0x64&&_0x4770ff['x']+_0x4770ff['width']>_0x2317d2['x']-0x32&&_0x4770ff['y']<_0x2317d2['y']-0x32+0x64&&_0x4770ff['y']+_0x4770ff[_0x42c303(0xc5)]>_0x2317d2['y']-0x32){let _0x4d83c2=Object['keys'](mouse)[0x4];Settings['Autofarm'][_0x42c303(0xd5)]&&Settings[_0x42c303(0x108)]['angle']!=null&&(mouse[_0x4d83c2]['x']=getUserPosition()[0x0]+_0x2317d2['x'],mouse[_0x4d83c2]['y']=getUserPosition()[0x1]+_0x2317d2['y']);_0x340be5=(_0x51832d['x']-_0x2317d2['x'])**0x2+(_0x51832d['y']-_0x2317d2['y'])**0x2;(_0x2a1577[_0x42c303(0x11f)]===-0x1||_0x340be5<_0x2a1577[_0x42c303(0x11f)])&&(_0x2a1577[_0x42c303(0x11f)]=_0x340be5,_0x2a1577['obj']=_0x2317d2);;};};function _0x1d908b(_0xff379f,_0x13231b){const _0x555f43=_0x42c303;if(_0xff379f&&_0x13231b)return Math[_0x555f43(0xc2)]((_0xff379f['x']-_0x13231b['x'])**0x2+(_0xff379f['y']-_0x13231b['y'])**0x2);;return null;};if(_0x2a1577[_0x42c303(0xf1)]){_0x2a1577[_0x42c303(0x11f)]=_0x1d908b(_0x51832d,_0x2a1577[_0x42c303(0xf1)]);switch(_0x2a1577['obj'][_0x42c303(0x173)]){case 0x1:case 0x2:case 0x3:log(_0x42c303(0xe8));if(inventoryHas(0x36)[0x0]){_0x51832d[_0x42c303(0x15b)]!==0x36&&send([packets[_0x42c303(0x10d)],0x36]);;}else{if(inventoryHas(0x35)[0x0]){_0x51832d[_0x42c303(0x15b)]!==0x35&&send([packets[_0x42c303(0x10d)],0x35]);;}};_0x2a1577[_0x42c303(0xd2)]=0x2;break;case 0x10:case 0x11:case 0x12:case 0x13:if(Settings['Autofarm'][_0x42c303(0x162)]){if(inventoryHas(0x31)[0x0]){if(_0x51832d[_0x42c303(0x15b)]!==0x31)send([packets[_0x42c303(0x10d)],0x31]);_0x2a1577['type']=0x1;};}else{if(inventoryHas(0x36)[0x0]){_0x51832d['right']!==0x36&&send([packets['equip'],0x36]);;}else{if(inventoryHas(0x35)[0x0]){_0x51832d[_0x42c303(0x15b)]!==0x35&&send([packets['equip'],0x35]);;}};_0x2a1577[_0x42c303(0xd2)]=0x2;};break;};let _0x4eca81={'x':_0x51832d['x']-_0x2a1577['obj']['x'],'y':_0x51832d['y']-_0x2a1577[_0x42c303(0xf1)]['y']},_0x57c2ec={'x':Math[_0x42c303(0xfa)](_0x51832d['x']-_0x2a1577[_0x42c303(0xf1)]['x']),'y':Math[_0x42c303(0xfa)](_0x51832d['y']-_0x2a1577[_0x42c303(0xf1)]['y'])},_0x1d01db=0x0;if(_0x57c2ec['x']>0x3c){if(_0x4eca81['x']>0x32)_0x1d01db+=0x1;if(_0x4eca81['x']<0x32)_0x1d01db+=0x2;};if(_0x57c2ec['y']>0x3c){if(_0x4eca81['y']>0x32)_0x1d01db+=0x8;if(_0x4eca81['y']<0x32)_0x1d01db+=0x4;};client[_0x456623](_0x1d01db);if(_0x57c2ec['x']<(_0x2a1577[_0x42c303(0xd2)]===0x1?0x78:0x12c)&&_0x57c2ec['y']<(_0x2a1577[_0x42c303(0xd2)]===0x1?0x78:0x12c)){Settings['Autofarm'][_0x42c303(0xa2)]=_0x2c4b97(_0x51832d,_0x2a1577[_0x42c303(0xf1)],!![]);let _0x2ad285=0x2*Math['PI'],_0x42fb54=Math[_0x42c303(0x135)]((Settings['Autofarm'][_0x42c303(0xa2)]+_0x2ad285)%_0x2ad285*0xff/_0x2ad285);Settings[_0x42c303(0x108)]['angle']&&(send([packets[_0x42c303(0x182)],_0x42fb54]),send([packets[_0x42c303(0x139)]]));;};}else{let _0x897afa={'x':_0x51832d['x']-Settings[_0x42c303(0x108)]['sx'],'y':_0x51832d['y']-Settings[_0x42c303(0x108)]['sy']},_0x52a51a={'x':Math[_0x42c303(0xfa)](_0x51832d['x']-Settings['Autofarm']['sx']),'y':Math[_0x42c303(0xfa)](_0x51832d['y']-Settings[_0x42c303(0x108)]['sy'])},_0x265b45=0x0;if(_0x52a51a['x']>0x3c){if(_0x897afa['x']>0x0)_0x265b45+=0x1;if(_0x897afa['x']<0x0)_0x265b45+=0x2;};if(_0x52a51a['y']>0x3c){if(_0x897afa['y']>0x0)_0x265b45+=0x8;if(_0x897afa['y']<0x0)_0x265b45+=0x4;};client[_0x456623](_0x265b45);}cooldowns[_0x42c303(0x108)]=Date[_0x42c303(0xe6)]();}}}function aimbot(){const _0x5ee099=_0x3f77d1;requestAnimationFrame(aimbot);let _0xc9ae20=myplayer();function _0x56e9d3(_0x361bb5,_0x1b1801){const _0x1abfc5=_0x51ba;let _0x269d43=null,_0x4bd09f=-0x1,_0x47c400=HoldWeapon(_0x361bb5[_0x1abfc5(0x15b)],![])===0x2?!![]:![];for(var _0x3a5735=0x0,_0x33dd84=null,_0x5c1d78=null;_0x3a5735<_0x1b1801[_0x1abfc5(0x157)];++_0x3a5735){_0x33dd84=_0x1b1801[_0x3a5735];if(_0x33dd84[pidPropName]===_0x361bb5[pidPropName]||isAlly(_0x33dd84[pidPropName]))continue;if(!isAlly(_0x33dd84[pidPropName])&&_0x361bb5[FlyPorpName]===_0x33dd84[FlyPorpName]&&!_0x33dd84[_0x1abfc5(0x99)]){_0x5c1d78=(_0x361bb5['x']-_0x33dd84['x'])**0x2+(_0x361bb5['y']-_0x33dd84['y'])**0x2;if(_0x47c400&&_0x5c1d78<0xd2)continue;(_0x4bd09f===-0x1||_0x5c1d78<_0x4bd09f)&&(_0x4bd09f=_0x5c1d78,_0x269d43=_0x33dd84);}}let _0x4c79a3=Object[_0x1abfc5(0xe5)](mouse)[0x4];return Settings[_0x1abfc5(0xb6)][_0x1abfc5(0xd5)]&&Settings[_0x1abfc5(0xb6)]['a']!=null&&(mouse[_0x4c79a3]['x']=getUserPosition()[0x0]+_0x269d43['x'],mouse[_0x4c79a3]['y']=getUserPosition()[0x1]+_0x269d43['y']),_0x269d43;}if(Settings['AMB'][_0x5ee099(0xd5)]&&_0xc9ae20&&isAlive()===!![]){const _0x3204ff=HoldWeapon(_0xc9ae20['right'],!![]);let _0x1a5386;switch(_0x3204ff){case 0x1:_0x1a5386=_0xc9ae20[FlyPorpName]?196.8:157.6;break;case 0x2:_0x1a5386=_0xc9ae20[FlyPorpName]?291.8:227.6;break;case 0x3:_0x1a5386=0x26c;break;case 0x4:_0x1a5386=_0xc9ae20[FlyPorpName]?0x8c:0x7d;break;case 0x5:_0x1a5386=_0xc9ae20[_0x5ee099(0xde)]==0x55||_0xc9ae20[_0x5ee099(0xde)]==0x53?_0xc9ae20[FlyPorpName]?120.8:97.6:null;break;default:_0x1a5386=null;break;}if(_0x1a5386){const _0x219d78=_0x56e9d3(_0xc9ae20,unit()[0x0]);if(_0x219d78){const _0x2cd6c3=dist2dSQRT(_0xc9ae20,_0x219d78);if(_0x2cd6c3<=_0x1a5386){Settings[_0x5ee099(0xb6)]['a']=calcAngle(_0xc9ae20,_0x219d78,!![]),Settings[_0x5ee099(0xb6)]['t']=_0x219d78;const _0x1caed2=0x2*Math['PI'],_0x4c6cd8=Math['floor']((Settings[_0x5ee099(0xb6)]['a']+_0x1caed2)%_0x1caed2*0xff/_0x1caed2);send([packets[_0x5ee099(0xa2)],_0x4c6cd8]),Settings[_0x5ee099(0xb6)]['a']&&_0x2cd6c3<=_0x1a5386-0x16&&_0xc9ae20['right']!==0x2d&&(send([packets[_0x5ee099(0x182)],_0x4c6cd8]),send([packets[_0x5ee099(0x139)]]));}else Settings[_0x5ee099(0xb6)]['a']=null,Settings[_0x5ee099(0xb6)]['t']=null;}else Settings[_0x5ee099(0xb6)]['a']=null;}}}function autoCraft(){const _0x3af780=_0x3f77d1;let _0x51e889;function _0x57d996(){const _0xc1870d=_0x51ba;if(LAST_CRAFT!==undefined&&gauges()<0.6&&!window[_0xc1870d(0x155)]){unsafeWindow[_0xc1870d(0x155)]=!![];const _0x5d15fd=[0x6e,0x75];for(const _0x5401af of _0x5d15fd){inventoryHas(_0x5401af)[0x0]&&send([packets[_0xc1870d(0x10d)],_0x5401af]);}setTimeout(()=>{unsafeWindow['AutoEatWait']=![];},0x1f4);}else send([packets[_0xc1870d(0x183)],LAST_CRAFT]);}document[_0x3af780(0xd0)](_0x3af780(0x18a),function(_0x53599c){const _0x314f88=_0x3af780;_0x53599c['code']===Settings[_0x314f88(0x15e)][_0x314f88(0x80)]&&(Settings[_0x314f88(0x15e)][_0x314f88(0xd5)]==![]&&chatxterm()===![]?(_0x57d996(),_0x51e889=setInterval(_0x57d996,0x14),Settings['AutoCraft'][_0x314f88(0xd5)]=!![]):Settings[_0x314f88(0x15e)]['enabled']==!![]&&(clearInterval(_0x51e889),Settings[_0x314f88(0x15e)][_0x314f88(0xd5)]=![]));});}function autoRecycle(){const _0x35ef34=_0x3f77d1;let _0x4b158d;function _0x204999(){const _0x2725ea=_0x51ba;if(isAlive()===!![]&&LAST_RECYCLE!==undefined&&gauges()<0.6&&!window['AutoEatWait']){unsafeWindow[_0x2725ea(0x155)]=!![];const _0x2ebc97=[0x6e,0x75];for(const _0x53cb20 of _0x2ebc97){inventoryHas(_0x53cb20)[0x0]&&send([packets[_0x2725ea(0x10d)],_0x53cb20]);}setTimeout(()=>{const _0x1aae70=_0x2725ea;unsafeWindow[_0x1aae70(0x155)]=![];},0x1f4);}else send([packets[_0x2725ea(0x110)],LAST_RECYCLE]);}document[_0x35ef34(0xd0)](_0x35ef34(0x18a),function(_0x466cc6){const _0x24cbc8=_0x35ef34;_0x466cc6[_0x24cbc8(0x195)]===Settings[_0x24cbc8(0x11a)]['key']&&(Settings[_0x24cbc8(0x11a)][_0x24cbc8(0xd5)]==![]&&chatxterm()===![]?(_0x204999(),_0x4b158d=setInterval(_0x204999,0x14),Settings[_0x24cbc8(0x11a)]['enabled']=!![]):Settings[_0x24cbc8(0x11a)][_0x24cbc8(0xd5)]==!![]&&(clearInterval(_0x4b158d),Settings[_0x24cbc8(0x11a)][_0x24cbc8(0xd5)]=![]));});}Timers[_0x3f77d1(0xe0)]=Date[_0x3f77d1(0xe6)]();function healTimer(){const _0x45cdac=_0x3f77d1;requestAnimationFrame(healTimer);const _0xc7a77d=document['getElementById']('game_canvas'),_0x23c056=_0xc7a77d[_0x45cdac(0x11c)]('2d');if(isAlive()===!![]){let _0x28ad66=Object[_0x45cdac(0xe9)](user)[0x24];const _0x2a2744=Math[_0x45cdac(0x135)](0xb-(Date[_0x45cdac(0xe6)]()-Timers[_0x45cdac(0xe0)])/0x3e8)+'s';_0x23c056[_0x45cdac(0x199)](),_0x23c056[_0x45cdac(0x16d)](),_0x23c056[_0x45cdac(0xea)]=0x7,_0x23c056[_0x45cdac(0x83)]=_0x45cdac(0xc8),_0x23c056[_0x45cdac(0x143)]='black',_0x23c056[_0x45cdac(0xdc)]=_0x45cdac(0x86),_0x23c056[_0x45cdac(0x96)](Math[_0x45cdac(0x135)](0xb-(Date[_0x45cdac(0xe6)]()-Timers['healtimer'])/0x3e8)+'s',_0x28ad66[_0x45cdac(0x18b)]['x']-_0x23c056[_0x45cdac(0x8d)](_0x2a2744)[_0x45cdac(0xd1)]/0x2,_0x28ad66[_0x45cdac(0x18b)]['y']+0x22),_0x23c056[_0x45cdac(0xdb)](Math[_0x45cdac(0x135)](0xb-(Date[_0x45cdac(0xe6)]()-Timers[_0x45cdac(0xe0)])/0x3e8)+'s',_0x28ad66[_0x45cdac(0x18b)]['x']-_0x23c056[_0x45cdac(0x8d)](_0x2a2744)[_0x45cdac(0xd1)]/0x2,_0x28ad66[_0x45cdac(0x18b)]['y']+0x22),_0x23c056[_0x45cdac(0xf9)]();}}function Autoeat(){const _0x3a6990=_0x3f77d1;requestAnimationFrame(Autoeat);if(isAlive()===!![]&&gauges()<0.6&&!window[_0x3a6990(0x155)]){unsafeWindow[_0x3a6990(0x155)]=!![];const _0xaa3259=[0x6e,0x75];for(const _0x23e196 of _0xaa3259){inventoryHas(_0x23e196)&&send([packets['equip'],_0x23e196]);}setTimeout(()=>{const _0x196450=_0x3a6990;unsafeWindow[_0x196450(0x155)]=![];},0x1f4);}}function blizzard(){const _0x5cb3e3=_0x3f77d1;requestAnimationFrame(blizzard);let _0x3ce7ff=Object[_0x5cb3e3(0xe5)](user)[0x2f],_0x5c290f=Object[_0x5cb3e3(0xe5)](user)[0x2e],_0x16a625=Object['keys'](_0x5c290f)[0x1],_0x3f7731=Object[_0x5cb3e3(0xe9)](user)[0x24];var _0x4fd52e=-0x8;const _0x58ae38=document[_0x5cb3e3(0x148)]('game_canvas'),_0x112da0=_0x58ae38['getContext']('2d');isAlive()===!![]&&user[_0x3ce7ff][_0x16a625]&&(_0x112da0[_0x5cb3e3(0x199)](),_0x112da0[_0x5cb3e3(0x79)](BlizzardImage,_0x3f7731['translate']['x'],_0x3f7731[_0x5cb3e3(0x18b)]['y']+_0x4fd52e),_0x4fd52e+=0x46),isAlive()===!![]&&user[_0x5c290f][_0x16a625]&&(_0x112da0['save'](),_0x112da0[_0x5cb3e3(0x79)](SandstormImage,_0x3f7731[_0x5cb3e3(0x18b)]['x'],_0x3f7731[_0x5cb3e3(0x18b)]['y']+_0x4fd52e),_0x4fd52e+=0x46);}function colors(){const _0x450c57=_0x3f77d1;if(isAlive()===!![]&&Settings[_0x450c57(0xa4)]){unsafeWindow[_0x450c57(0x149)]=new Image(),unsafeWindow[_0x450c57(0x149)]['src']=_0x450c57(0x17d),unsafeWindow[_0x450c57(0x8a)]=new Image(),unsafeWindow[_0x450c57(0x8a)][_0x450c57(0x193)]=_0x450c57(0xd8),unsafeWindow['DiamondSpikeAlly']=new Image(),unsafeWindow[_0x450c57(0x101)][_0x450c57(0x193)]='https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-diamond-spike-ally.png',unsafeWindow['GoldSpikeAlly']=new Image(),unsafeWindow[_0x450c57(0x84)][_0x450c57(0x193)]=_0x450c57(0xee),unsafeWindow['StoneSpikeAlly']=new Image(),unsafeWindow['StoneSpikeAlly'][_0x450c57(0x193)]='https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-stone-spike-ally.png',unsafeWindow[_0x450c57(0x7c)]=new Image(),unsafeWindow[_0x450c57(0x7c)][_0x450c57(0x193)]=_0x450c57(0xc0),unsafeWindow['ReiditeSpikeEnemy']=new Image(),unsafeWindow[_0x450c57(0x77)]['src']='https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-reidite-spike-enemy.png',unsafeWindow[_0x450c57(0x124)]=new Image(),unsafeWindow[_0x450c57(0x124)][_0x450c57(0x193)]=_0x450c57(0x78),unsafeWindow[_0x450c57(0x16b)]=new Image(),unsafeWindow['DiamondSpikeEnemy'][_0x450c57(0x193)]=_0x450c57(0x9a),unsafeWindow[_0x450c57(0x18e)]=new Image(),unsafeWindow[_0x450c57(0x18e)]['src']=_0x450c57(0xec),unsafeWindow[_0x450c57(0x89)]=new Image(),unsafeWindow['StoneSpikeEnemy'][_0x450c57(0x193)]=_0x450c57(0xfe),unsafeWindow[_0x450c57(0x16a)]=new Image(),unsafeWindow[_0x450c57(0x16a)][_0x450c57(0x193)]=_0x450c57(0x127);let _0x346bd8={'SPIKE':0x5,'STONE_SPIKE':0xc,'GOLD_SPIKE':0xd,'DIAMOND_SPIKE':0xe,'AMETHYST_SPIKE':0x14,'REIDITE_SPIKE':0x34};unsafeWindow[_0x450c57(0x121)]={'SPIKE':0x5,'STONE_SPIKE':0xc,'GOLD_SPIKE':0xd,'DIAMOND_SPIKE':0xe,'AMETHYST_SPIKE':0x14,'REIDITE_SPIKE':0x34};let _0x2358a9=_0x450c57(0x151);for(let _0x503500 in unsafeWindow){if(!Array['isArray'](unsafeWindow[_0x503500])&&_0x2358a9['includes'](_0x503500[0x0]))continue;if(unsafeWindow[_0x503500][_0x450c57(0x157)]>0x320&&unsafeWindow[_0x503500]['length']<0x5dc)unsafeWindow[_0x450c57(0x129)]=unsafeWindow[_0x503500];}sprite[0x2710]=[WoodSpikeAlly,WoodSpikeAlly],sprite[0x2711]=[WoodSpikeEnemy,WoodSpikeEnemy],sprite[0x2712]=[StoneSpikeAlly,StoneSpikeAlly],sprite[0x2713]=[StoneSpikeEnemy,StoneSpikeEnemy],sprite[0x2714]=[GoldSpikeAlly,GoldSpikeAlly],sprite[0x2715]=[GoldSpikeEnemy,GoldSpikeEnemy],sprite[0x2716]=[DiamondSpikeAlly,DiamondSpikeAlly],sprite[0x2717]=[DiamondSpikeEnemy,DiamondSpikeEnemy],sprite[0x2718]=[AmethystSpikeAlly,AmethystSpikeAlly],sprite[0x2719]=[AmethystSpikeEnemy,AmethystSpikeEnemy],sprite[0x271a]=[ReiditeSpikeAlly,ReiditeSpikeAlly],sprite[0x271b]=[ReiditeSpikeEnemy,ReiditeSpikeEnemy];let _0x160806=Array[_0x450c57(0x130)][_0x450c57(0x18d)];Array[_0x450c57(0x130)][_0x450c57(0x18d)]=function(_0x5cfe8b){const _0x3e2c9c=_0x450c57;if(_0x5cfe8b){let _0x5ae22b=Object['keys'](_0x5cfe8b);0x5==_0x5ae22b[_0x3e2c9c(0x157)]&&_0x5ae22b['includes'](_0x3e2c9c(0xf6))&&_0x5ae22b[_0x3e2c9c(0x137)](_0x3e2c9c(0x18f))&&0x20!==_0x5cfe8b['id']&&0x82!==_0x5cfe8b['id']&&0x7f!==_0x5cfe8b['id']&&0x4!==_0x5cfe8b['id']&&0x19!==_0x5cfe8b['id']&&0x22!==_0x5cfe8b['id']&&0x57!==_0x5cfe8b['id']&&(unsafeWindow[_0x3e2c9c(0xb4)]=this);}unsafeWindow[_0x3e2c9c(0x11e)]=[drawSpike];if(_0x5cfe8b&&null!=_0x5cfe8b[_0x3e2c9c(0xd2)]&&null!=_0x5cfe8b['id']&&_0x5cfe8b['x']&&_0x5cfe8b['y'])switch(0x0===_0x5cfe8b[_0x3e2c9c(0xd2)]&&pidPropName===unsafeWindow[_0x3e2c9c(0x18c)]&&(unsafeWindow['player']=_0x5cfe8b),_0x5cfe8b[_0x3e2c9c(0xd2)]){case _0x346bd8[_0x3e2c9c(0x76)]:{_0x5cfe8b[_0x3e2c9c(0xf3)]=unsafeWindow[_0x3e2c9c(0x18c)]===_0x5cfe8b[pidPropName]||isAlly(_0x5cfe8b[pidPropName]);let _0x356ada=_0x5cfe8b[wow];_0x5cfe8b[wow]=function(_0x10c08d){const _0x1fd830=_0x3e2c9c;return Settings[_0x1fd830(0xa4)]?_0x5cfe8b['ally']?_0x356ada['apply'](this,[0x2710]):_0x356ada['apply'](this,[0x2711]):_0x356ada['apply'](this,arguments);};break;}case _0x346bd8['STONE_SPIKE']:{_0x5cfe8b[_0x3e2c9c(0xf3)]=unsafeWindow[_0x3e2c9c(0x18c)]===_0x5cfe8b[pidPropName]||isAlly(_0x5cfe8b[pidPropName]);let _0x460eef=_0x5cfe8b[wow];_0x5cfe8b[wow]=function(_0x10ac27){const _0x1d9e2b=_0x3e2c9c;return Settings['ColoredSpikes']?_0x5cfe8b[_0x1d9e2b(0xf3)]?_0x460eef['apply'](this,[0x2712]):_0x460eef['apply'](this,[0x2713]):_0x460eef[_0x1d9e2b(0x8f)](this,arguments);};break;}case _0x346bd8[_0x3e2c9c(0x92)]:{_0x5cfe8b[_0x3e2c9c(0xf3)]=unsafeWindow['playerID']===_0x5cfe8b[pidPropName]||isAlly(_0x5cfe8b[pidPropName]);let _0x29c457=_0x5cfe8b[wow];_0x5cfe8b[wow]=function(_0x54c3af){const _0x3ccb9e=_0x3e2c9c;return Settings[_0x3ccb9e(0xa4)]?_0x5cfe8b[_0x3ccb9e(0xf3)]?_0x29c457[_0x3ccb9e(0x8f)](this,[0x2714]):_0x29c457[_0x3ccb9e(0x8f)](this,[0x2715]):_0x29c457[_0x3ccb9e(0x8f)](this,arguments);};break;}case _0x346bd8[_0x3e2c9c(0x177)]:{_0x5cfe8b[_0x3e2c9c(0xf3)]=unsafeWindow[_0x3e2c9c(0x18c)]===_0x5cfe8b[pidPropName]||isAlly(_0x5cfe8b[pidPropName]);let _0x95e2e=_0x5cfe8b[wow];_0x5cfe8b[wow]=function(_0x119143){const _0x3ea02d=_0x3e2c9c;return Settings[_0x3ea02d(0xa4)]?_0x5cfe8b['ally']?_0x95e2e[_0x3ea02d(0x8f)](this,[0x2716]):_0x95e2e[_0x3ea02d(0x8f)](this,[0x2717]):_0x95e2e[_0x3ea02d(0x8f)](this,arguments);};break;}case _0x346bd8[_0x3e2c9c(0x14e)]:{_0x5cfe8b[_0x3e2c9c(0xf3)]=unsafeWindow['playerID']===_0x5cfe8b[pidPropName]||isAlly(_0x5cfe8b[pidPropName]);let _0x528e48=_0x5cfe8b[wow];_0x5cfe8b[wow]=function(_0x500bea){const _0x46038a=_0x3e2c9c;return Settings[_0x46038a(0xa4)]?_0x5cfe8b[_0x46038a(0xf3)]?_0x528e48[_0x46038a(0x8f)](this,[0x2718]):_0x528e48[_0x46038a(0x8f)](this,[0x2719]):_0x528e48[_0x46038a(0x8f)](this,arguments);};break;}case _0x346bd8[_0x3e2c9c(0x19a)]:{_0x5cfe8b['ally']=unsafeWindow['playerID']===_0x5cfe8b[pidPropName]||isAlly(_0x5cfe8b[pidPropName]);let _0x20dc08=_0x5cfe8b[wow];_0x5cfe8b[wow]=function(_0x967f6a){const _0x4059f0=_0x3e2c9c;return Settings[_0x4059f0(0xa4)]?_0x5cfe8b[_0x4059f0(0xf3)]?_0x20dc08[_0x4059f0(0x8f)](this,[0x271a]):_0x20dc08[_0x4059f0(0x8f)](this,[0x271b]):_0x20dc08[_0x4059f0(0x8f)](this,arguments);};break;}case unit()[0x0]:{console[_0x3e2c9c(0x13b)](_0x5cfe8b);let _0xbe59af=_0x5cfe8b[wow];console[_0x3e2c9c(0x13b)](_0xbe59af);}}return _0x160806[_0x3e2c9c(0x8f)](this,arguments);};}}function checkgame(){const _0x40c832=_0x3f77d1;requestAnimationFrame(checkgame);const _0x1c2be1=document[_0x40c832(0x148)](_0x40c832(0x158)),_0x37080=_0x1c2be1['getContext']('2d');if(game[_0x40c832(0x165)]===undefined){const _0x5a1e32=document['getElementById'](_0x40c832(0x158)),_0x3c1c41=_0x5a1e32[_0x40c832(0x11c)]('2d');_0x3c1c41[_0x40c832(0x199)](),_0x3c1c41[_0x40c832(0x16d)](),_0x3c1c41['lineWidth']=0x6,_0x3c1c41[_0x40c832(0x83)]='red',_0x3c1c41['strokeStyle']='black',_0x3c1c41[_0x40c832(0xdc)]=_0x40c832(0x91),_0x3c1c41[_0x40c832(0x96)](_0x40c832(0xab),0x3,0x1f4),_0x3c1c41[_0x40c832(0xdb)](_0x40c832(0xab),0x3,0x1f4),_0x3c1c41['restore']();}}function Visuals(){const _0x3da829=_0x3f77d1;requestAnimationFrame(Visuals);try{unsafeWindow[_0x3da829(0x88)]=document[_0x3da829(0x148)](_0x3da829(0x158))[_0x3da829(0x11c)]('2d');}catch(_0x3bf967){return;}let _0xdaf39=22.5;for(hack in Settings){Settings[hack][_0x3da829(0xd5)]&&Settings[hack]['key']&&(ctx['save'](),ctx[_0x3da829(0x16d)](),ctx[_0x3da829(0xea)]=0x6,ctx[_0x3da829(0x83)]=_0x3da829(0xc8),ctx[_0x3da829(0x143)]=_0x3da829(0xa6),ctx[_0x3da829(0xdc)]=_0x3da829(0x91),ctx['strokeText'](hack,0x3,_0xdaf39),ctx[_0x3da829(0xdb)](hack,0x3,_0xdaf39),ctx['restore'](),_0xdaf39+=22.5);}}function extractorsInfo(){const _0x469fb6=_0x3f77d1,_0x5e15da=document[_0x469fb6(0xb2)]('canvas')[_0x469fb6(0x11c)]('2d');function _0x2fa21a(){requestAnimationFrame(_0x2fa21a);const _0x5c0621=myplayer();function _0x6bad2a(){const _0x456874=_0x51ba,_0x3c8833=[0x18,0x19,0x1a,0x1b,0x1c];for(let _0x496bae=0x0;_0x496bae<_0x3c8833[_0x456874(0x157)];++_0x496bae){const _0x270c63=_0x3c8833[_0x496bae],_0x52fc8e=unit()[_0x270c63];if(isAlive()===!![]){for(let _0x5555cc=0x0;_0x5555cc<_0x52fc8e[_0x456874(0x157)];_0x5555cc++){const _0x33066c=_0x52fc8e[_0x5555cc];_0x5e15da[_0x456874(0x199)](),_0x5e15da[_0x456874(0xea)]=0x8,_0x5e15da[_0x456874(0xdc)]=_0x456874(0x122),_0x5e15da[_0x456874(0x143)]=_0x456874(0x184),_0x5e15da[_0x456874(0x83)]=(_0x33066c[_0x456874(0x173)]&0xff)>0x0?'lime':_0x456874(0x16f),_0x5e15da[_0x456874(0x96)](''+(_0x33066c[_0x456874(0x173)]&0xff),_0x33066c['x']-0x14+getUserPosition()[0x0],_0x33066c['y']+getUserPosition()[0x1]),_0x5e15da['fillText'](''+(_0x33066c[_0x456874(0x173)]&0xff),_0x33066c['x']-0x14+getUserPosition()[0x0],_0x33066c['y']+getUserPosition()[0x1]),_0x5e15da[_0x456874(0xf9)]();}for(let _0x200fa4=0x0;_0x200fa4<_0x52fc8e[_0x456874(0x157)];++_0x200fa4){const _0x87f7f6=_0x52fc8e[_0x200fa4];_0x5e15da[_0x456874(0x199)](),_0x5e15da[_0x456874(0xea)]=0x8,_0x5e15da[_0x456874(0xdc)]=_0x456874(0x122),_0x5e15da[_0x456874(0x143)]=_0x456874(0x184),_0x5e15da['fillStyle']=_0x87f7f6[_0x456874(0x173)]>>0x8>0x0?_0x456874(0xff):_0x456874(0x16f),_0x5e15da[_0x456874(0x96)](''+((_0x87f7f6[_0x456874(0x173)]&0xff00)>>0x8),_0x87f7f6['x']-0x14+getUserPosition()[0x0],_0x87f7f6['y']+0x14+getUserPosition()[0x1]),_0x5e15da['fillText'](''+((_0x87f7f6[_0x456874(0x173)]&0xff00)>>0x8),_0x87f7f6['x']-0x14+getUserPosition()[0x0],_0x87f7f6['y']+0x14+getUserPosition()[0x1]),_0x5e15da[_0x456874(0xf9)]();}}}}_0x6bad2a();}_0x2fa21a();}function extractors(){const _0x1b9b52=_0x3f77d1;requestAnimationFrame(extractors);const _0x2d10ae=Date['now']();function _0x45f410(_0x1a93be,_0x4f0fc6){const _0x29ad00=_0x51ba;return Math[_0x29ad00(0xc2)]((_0x4f0fc6['x']-_0x1a93be['x'])*(_0x4f0fc6['x']-_0x1a93be['x'])+(_0x4f0fc6['y']-_0x1a93be['y'])*(_0x4f0fc6['y']-_0x1a93be['y']));}let _0x5b4c26=myplayer();if(_0x2d10ae-Settings['nows'][_0x1b9b52(0x114)]>0x64){const _0x17f9b9=[0x18,0x19,0x1a,0x1b,0x1c,0x1d];_0x17f9b9[_0x1b9b52(0x13c)](_0x1a8985=>{const _0x1ba273=_0x1b9b52;var _0x48664a=unit()[_0x1a8985];if(isAlive()===!![]&&chatxterm()===![]&&Settings[_0x1ba273(0x150)][_0x1ba273(0xd5)])for(let _0x1d4c0d=0x0;_0x1d4c0d<_0x48664a[_0x1ba273(0x157)];++_0x1d4c0d){_0x45f410(_0x5b4c26,_0x48664a[_0x1d4c0d])<=0x14a&&send([packets['extTake'],_0x48664a[_0x1d4c0d][pidPropName],_0x48664a[_0x1d4c0d]['id'],_0x1a8985]);}}),Settings[_0x1b9b52(0xdd)][_0x1b9b52(0x114)]=_0x2d10ae;}}function extractorsPut(){const _0xf8a929=_0x3f77d1;requestAnimationFrame(extractorsPut);const _0x2a96f1=Date[_0xf8a929(0xe6)]();function _0x15b653(_0x14cebc,_0x1b1296){const _0x467c6b=_0xf8a929;return Math[_0x467c6b(0xc2)]((_0x1b1296['x']-_0x14cebc['x'])*(_0x1b1296['x']-_0x14cebc['x'])+(_0x1b1296['y']-_0x14cebc['y'])*(_0x1b1296['y']-_0x14cebc['y']));}let _0x5ca7e0=myplayer();if(_0x2a96f1-Settings[_0xf8a929(0xdd)]['autoextractorput']>0x64){const _0x4d6241=[0x18,0x19,0x1a,0x1b,0x1c,0x1d];_0x4d6241[_0xf8a929(0x13c)](_0x2d0711=>{const _0x3d869a=_0xf8a929;var _0x2a9850=unit()[_0x2d0711];if(isAlive()===!![]&&chatxterm()===![]&&Settings[_0x3d869a(0x190)]['enabled'])for(let _0x2551b2=0x0;_0x2551b2<_0x2a9850['length'];++_0x2551b2){_0x15b653(_0x5ca7e0,_0x2a9850[_0x2551b2])<=0x14a&&send([packets[_0x3d869a(0x192)],0x44,_0x2a9850[_0x2551b2][pidPropName],_0x2a9850[_0x2551b2]['id'],_0x2d0711]);}}),Settings[_0xf8a929(0xdd)][_0xf8a929(0x188)]=_0x2a96f1;}}function autoSteal1(){const _0x33fa5c=_0x3f77d1;let _0x3e0b89=myplayer();function _0x524083(_0x1a2870,_0x2c06fe){const _0xc70610=_0x51ba;return Math[_0xc70610(0xc2)]((_0x2c06fe['x']-_0x1a2870['x'])*(_0x2c06fe['x']-_0x1a2870['x'])+(_0x2c06fe['y']-_0x1a2870['y'])*(_0x2c06fe['y']-_0x1a2870['y']));}if(isAlive()===!![]&&chatxterm()===![]&&Settings[_0x33fa5c(0xb9)][_0x33fa5c(0xd5)]){var _0x5e78d9=unit()[0xb];for(let _0xe1619=0x0;_0xe1619<_0x5e78d9[_0x33fa5c(0x157)];++_0xe1619){_0x524083(_0x3e0b89,_0x5e78d9[_0xe1619])<=0x14a&&send([packets['chestTake'],_0x5e78d9[_0xe1619][pidPropName],_0x5e78d9[_0xe1619]['id']]);}}}function ctxDrawImage(_0x9eaf14,_0x333e4a,_0x42fc47,_0x2339e4,_0x4a55e9,_0x392d9a,_0x435320,_0x24d250,_0x1be875,_0x509e33){const _0xde9124=_0x3f77d1;if(_0x333e4a['tryLoad']===undefined||_0x333e4a[_0xde9124(0x12c)]()===0x1){if(_0x509e33!==undefined)_0x9eaf14['drawImage'](_0x333e4a,_0x42fc47,_0x2339e4,Math[_0xde9124(0xfb)](0x1,_0x4a55e9),Math[_0xde9124(0xfb)](0x1,_0x392d9a),_0x435320,_0x24d250,_0x1be875,_0x509e33);else{if(_0x392d9a!==undefined)_0x9eaf14[_0xde9124(0x79)](_0x333e4a,_0x42fc47,_0x2339e4,_0x4a55e9,_0x392d9a);else _0x9eaf14[_0xde9124(0x79)](_0x333e4a,_0x42fc47,_0x2339e4);}}}function drawinchest(){const _0x2f30b4=_0x3f77d1;requestAnimationFrame(drawinchest);const _0x3a8014=document[_0x2f30b4(0x148)](_0x2f30b4(0x158))[_0x2f30b4(0x11c)]('2d');let _0xa97a5a=Object[_0x2f30b4(0xe5)](game)[0x2c],_0x27405a=unit()[0xb];for(let _0x5df26e of _0x27405a){let _0x5b6958=Object['keys'](game)[0x2c],_0x453401=_0x5df26e[_0x2f30b4(0x8e)]/0x2-0x1,_0x643a60=game[_0x5b6958][_0x453401]?.[_0x2f30b4(0x173)],_0x33094c,_0x39c370;_0x5df26e[_0x2f30b4(0x8e)]&&(_0x39c370=Object[_0x2f30b4(0xe5)](_0x643a60)[0x2],_0x33094c=_0x643a60[_0x39c370][0x0],_0x3a8014[_0x2f30b4(0x199)](),_0x3a8014[_0x2f30b4(0x85)]=0.9,ctxDrawImage(_0x3a8014,_0x33094c,getUserPosition()[0x0]+_0x5df26e['x']-0x19,getUserPosition()[0x1]+_0x5df26e['y']-0x19,0x43,0x34),_0x3a8014[_0x2f30b4(0x85)]=0x1,_0x3a8014['font']='20px\x20Baloo\x20Paaji',_0x3a8014['strokeStyle']=_0x2f30b4(0xa6),_0x3a8014[_0x2f30b4(0xea)]=0x7,_0x3a8014[_0x2f30b4(0x96)]('x'+_0x5df26e[_0x2f30b4(0x173)],getUserPosition()[0x0]+_0x5df26e['x']-0xc,getUserPosition()[0x1]+_0x5df26e['y']+0x23),_0x3a8014[_0x2f30b4(0x83)]=_0x2f30b4(0x16f),_0x3a8014[_0x2f30b4(0xdb)]('x'+_0x5df26e[_0x2f30b4(0x173)],getUserPosition()[0x0]+_0x5df26e['x']-0xc,getUserPosition()[0x1]+_0x5df26e['y']+0x23),_0x3a8014[_0x2f30b4(0xf9)]());}}function tot(){const _0x248a7a=_0x3f77d1;function _0x19fbe4(_0x3a1485,_0x1757a0){const _0x586861=_0x51ba;return Math[_0x586861(0xc2)]((_0x1757a0['x']-_0x3a1485['x'])*(_0x1757a0['x']-_0x3a1485['x'])+(_0x1757a0['y']-_0x3a1485['y'])*(_0x1757a0['y']-_0x3a1485['y']));}const _0x274b2f=myplayer(),_0x2fc952=document[_0x248a7a(0xb2)](_0x248a7a(0x132))[_0x248a7a(0x11c)]('2d');requestAnimationFrame(tot);const _0x4d19e7=unit()[0x1d];if(_0x4d19e7===undefined||_0x4d19e7[_0x248a7a(0x157)]===undefined||_0x4d19e7['length']===0x0)return;;function _0x5b7587(){const _0x5bdc84=_0x248a7a;for(let _0x86b579=0x0;_0x86b579<_0x4d19e7[_0x5bdc84(0x157)];++_0x86b579){const {x:_0x2adbfa,y:_0x5a06b4,info:_0x57da4f}=_0x4d19e7[_0x86b579];let _0x16d7ca=unit()[0x1d][_0x86b579];_0x2fc952[_0x5bdc84(0x199)](),_0x2fc952[_0x5bdc84(0xea)]=0x8,_0x2fc952[_0x5bdc84(0xdc)]=_0x5bdc84(0x122),_0x2fc952[_0x5bdc84(0x143)]='#000',_0x2fc952['fillStyle']=_0x16d7ca[_0x5bdc84(0x173)]>=0x10?'red':'lime';;_0x2fc952[_0x5bdc84(0x96)](_0x57da4f>=0x10?'🔒':'🔓',_0x2adbfa-0x14+getUserPosition()[0x0],_0x5a06b4+getUserPosition()[0x1]),_0x2fc952[_0x5bdc84(0xdb)](_0x57da4f>=0x10?'🔒':'🔓',_0x2adbfa-0x14+getUserPosition()[0x0],_0x5a06b4+getUserPosition()[0x1]);const _0x5af11b=_0x16d7ca[_0x5bdc84(0x173)]>=0x10?_0x5bdc84(0x8b)+_0x16d7ca[_0x5bdc84(0x173)]%0x10:_0x5bdc84(0x8b)+_0x16d7ca[_0x5bdc84(0x173)];_0x2fc952[_0x5bdc84(0xdc)]=_0x5bdc84(0xcb),_0x2fc952['strokeStyle']=_0x5bdc84(0xa6),_0x2fc952[_0x5bdc84(0x83)]=_0x5bdc84(0x16f),_0x2fc952[_0x5bdc84(0xdb)](_0x5af11b,_0x16d7ca['x']-0x14+getUserPosition()[0x0],_0x16d7ca['y']+getUserPosition()[0x1]-0x1e),_0x2fc952[_0x5bdc84(0xf9)](),_0x2fc952[_0x5bdc84(0xf9)]();}}if(isAlive()===!![]&&chatxterm()===![]&&Settings['AutoTotem'][_0x248a7a(0xd5)])for(let _0x3b1173=0x0;_0x3b1173<_0x4d19e7[_0x248a7a(0x157)];++_0x3b1173){_0x19fbe4(_0x274b2f,_0x4d19e7[_0x3b1173])<=0x12c&&send([packets[_0x248a7a(0x133)],_0x4d19e7[_0x3b1173][pidPropName],_0x4d19e7[_0x3b1173]['id']]);}_0x5b7587();}function Autosh(){const _0x56c58a=_0x3f77d1;let _0x38b53a=Object[_0x56c58a(0xe5)](client)[0x77],_0x6d56f9=Object[_0x56c58a(0xe5)](client)[0x67],_0x4b37ef=Object[_0x56c58a(0xe5)](user)[0x1d],_0x1b8275=client[_0x38b53a],_0x44049f=client[_0x6d56f9],_0x318c41=user[_0x4b37ef];client[_0x38b53a]=function(){const _0x1c1356=_0x56c58a;return Settings[_0x1c1356(0x10e)][_0x1c1356(0x182)]=![],_0x1b8275['apply'](this,arguments);},client[_0x6d56f9]=function(){const _0x374598=_0x56c58a;return Settings[_0x374598(0x10e)]['enabled']&&(send([packets[_0x374598(0x10d)],0x4f]),send([packets[_0x374598(0x10d)],Settings[_0x374598(0x10e)]['last']])),_0x44049f['apply'](this,arguments);};}function getBestHammer(){if(inventoryHas(0x27))return 0x27;if(inventoryHas(0x26))return 0x26;if(inventoryHas(0x25))return 0x25;if(inventoryHas(0x24))return 0x24;if(inventoryHas(0x23))return 0x23;return 0x7;}function _0x26bd(){const _0x3a5093=['querySelector','SHOWID','inventory','game','AMB','_this','Crate','AutoSteal','script.4dex.io','chestTake','Box\x20Info\x20and\x20on\x20top','charAt','atan2','AutoExtractor\x20Put','https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-wood-spike-ally.png','ZMA','sqrt','ssIFrame_google','Pathfinder\x20Y','height','https://raw.githubusercontent.com/XmreLoux/images/main/sandstorm.png','pagead2.googlesyndication.com','red','dropsword','8YvIgFI','16px\x20Baloo\x20Paaji','appendChild','wg-ad-container','Pathfinder\x20X','keyQ','addEventListener','width','type','DropSword\x20Put\x20k:','AutoSpike\x20k:','enabled','KeyN','Utils','https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-amethyst-spike-ally.png','stringify','targeting.unrulymedia.com','fillText','font','nows','clothe','Autocrown','healtimer','KeyC','zmaafk','keyup','KeyH','keys','now','data','uwu','values','lineWidth','amazon-adsystem.com','https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-gold-spike-enemy.png','20px','https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-gold-spike-ally.png','roofs','KeyE','obj','send','ally','535ZWhRzp','412OjtwuJ','draw','IDLE','Binds','restore','abs','max','parse','Off','https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-stone-spike-enemy.png','yellow','Set\x20AutoExtractor\x20Take\x20k','DiamondSpikeAlly','initUI','chaseid','chestPut','AutoTotem\x20k:','dropall','adinplay','Autofarm','time','unit','15850KNUtdZ','Space','equip','AutoCrown','entries','recycle','black\x20','container','1021191BTsQIp','autoextractortake','AutoWater','Numpad1','PathFinder','Go\x20Back\x20To\x20Lobby','drawID','AutoRecycle','Press\x20any\x20key','getContext','#00000099','wow','dist','LoadHack','ITEMS_TO_CHECK','26px\x20Baloo\x20Paaji','www.google-analytics.com','AmethystSpikeEnemy','KeyV','AutoExtractor\x20Put\x20k:','https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-wood-spike-enemy.png','announcer','sprite','AutoCraft\x20k:','Baloo\x20Paaji','tryLoad','has','wrld','currentTime','prototype','timeout','canvas','joinTotem','button','floor','5649000OSojYi','includes','inline-block','stopAttack','1209140CAVuih','log','forEach','display','mapping','options','[ERROR]\x20FAILED\x20TO\x20HOOK\x20PID','ZMA\x20VERIFY','removed','strokeStyle','defineProperty','random','map','saveSettings','getElementById','ReiditeSpikeAlly','press','Set\x20AutoExtractor\x20Put\x20k','.wg-ad-player','POD','AMETHYST_SPIKE','last','ExtractorSteal','abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMOPQRSTUVWXYZ_0123456789','createElement','Visuals','get','AutoEatWait','blue','length','game_canvas','drop','remove','right','KeyI','Top\x20left\x20of\x20farm','AutoCraft','text','AutoRecycle\x20k:','number','water','Pathfinder','POD\x20VERIFY','sign','Set\x20AutoTotem\x20k','setItem','set','movetoenemy','WoodSpikeEnemy','DiamondSpikeEnemy','NONE','beginPath','ZMA\x20AFK\x20BYP\x20','white','Roofs\x20Opacity','1001493dtEhgF','placeBuild','info','Register','folder','AutoTotem','DIAMOND_SPIKE','setKeyBind','trevda','direction','Kanima','loadSettings','https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-reidite-spike-ally.png','SwordInchest','AutoSpike','ChaseID','KeyL','attack','craft','#000','Set\x20Pathfinder\x20Key','removeEventListener','chat_block','autoextractorput','ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz','keydown','translate','playerID','push','GoldSpikeEnemy','in_button','ExtractorPut','AutoExtractor\x20Take','extPut','src','controller','code','function','server.cmpstar.net','pathfinder','save','REIDITE_SPIKE','parent','SPIKE','ReiditeSpikeEnemy','https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-amethyst-spike-enemy.png','drawImage','textContent','split','WoodSpikeAlly','Dead\x20BOX','toString','add','key','Set\x20AutoCraft\x20k','range','fillStyle','GoldSpikeAlly','globalAlpha','34px\x20Baloo\x20Paaji','BoxOnTop','ctx','StoneSpikeEnemy','AmethystSpikeAlly','People\x20in\x20totem:\x20','style','measureText','action','apply','none','22px\x20Baloo\x20Paaji','GOLD_SPIKE','Set\x20AutoRecycle\x20k','transition','revive','strokeText','#de00ff','KeyP','ghost','https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-diamond-spike-enemy.png','controls','innerHTML','checkbox','AutoSteal\x20k:','current','x.x','Set\x20AutoSteaL\x20k','angle','KeyZ','ColoredSpikes','announcer\x20bot','black','2868804ZWTOVJ','from','doubleclick.net','AutoExtractor\x20Take\x20k:','chest\x20infos\x20not\x20gona\x20work.\x20refresh\x20page','253gdCdwP','mouse','5rEpXaY','KeyK','.grecaptcha-badge\x20{\x20visibility:\x20hidden;\x20}','AutoPutRed'];_0x26bd=function(){return _0x3a5093;};return _0x26bd();}function AutoCrown(){const _0x119bb4=_0x3f77d1,_0x1fd973={'DISTANCE':(_0x2e3935,_0x234609)=>{const _0x4c6e19=_0x51ba;return Math[_0x4c6e19(0xc2)]((_0x2e3935['x']-_0x234609['x'])**0x2+(_0x2e3935['y']-_0x234609['y'])**0x2);}};function _0x2e3ea1(_0x27f67c,_0x461628){const _0x264498=_0x51ba;return Math[_0x264498(0xc2)]((_0x461628['x']-_0x27f67c['x'])*(_0x461628['x']-_0x27f67c['x'])+(_0x461628['y']-_0x27f67c['y'])*(_0x461628['y']-_0x27f67c['y']));}requestAnimationFrame(AutoCrown);let _0x47e5e2=Object[_0x119bb4(0xe5)](client)[0x77],_0x532228=Object['keys'](client)[0x67],_0x2a45b3=Object['keys'](user)[0x8],_0x5b9183=myplayer();if(_0x5b9183&&!user[_0x2a45b3]['enabled'])Settings[_0x119bb4(0x10e)][_0x119bb4(0x14f)]=_0x5b9183[_0x119bb4(0x15b)];if(!Settings[_0x119bb4(0x10e)][_0x119bb4(0xd5)])return;if(!inventoryHas(0x4f))return;if(!user[_0x2a45b3][_0x119bb4(0xd5)])return;let _0x1ae887=unit()[0x16];if(_0x1ae887[_0x119bb4(0x157)]<0x1)return;let _0x5a3b5b=_0x5b9183;_0x1ae887[_0x119bb4(0x13c)](_0x54b2a1=>{const _0x12c6d6=_0x119bb4;_0x2e3ea1(_0x54b2a1,_0x5b9183)<=0x190&&send([packets[_0x12c6d6(0x95)],_0x54b2a1[pidPropName],_0x54b2a1['id']]);});}function recycle(){const _0x430657=_0x3f77d1;let _0xe449fb=Object[_0x430657(0xe5)](client)[0x73];client[_0xe449fb]=_0x4b54b5=>{LAST_RECYCLE=_0x4b54b5,send([packets['recycle'],_0x4b54b5]);};}let readys={'AutoSpike':!![],'SwordInChest':!![],'AutoFarm':!![],'AutoWall':!![],'AutoCraft':!![]};function auto(){const _0x4de0e3=_0x3f77d1;requestAnimationFrame(auto);if(chatxterm()===![]){let _0x50e8e0=undefined;if(inventoryHas(0xdb)[0x0])_0x50e8e0=0xdb;else{if(inventoryHas(0x7b)[0x0])_0x50e8e0=0x7b;else{if(inventoryHas(0xaa)[0x0])_0x50e8e0=0xaa;else{if(inventoryHas(0xa9)[0x0])_0x50e8e0=0xa9;else{if(inventoryHas(0xa8)[0x0])_0x50e8e0=0xa8;else{if(inventoryHas(0xa2)[0x0])_0x50e8e0=0xa2;else inventoryHas(0x71)[0x0]&&(_0x50e8e0=0x71);}}}}}if(Settings[_0x4de0e3(0x17f)]['enabled']&&isAlive()===!![]&&_0x50e8e0!==undefined&&readys[_0x4de0e3(0x17f)]){readys[_0x4de0e3(0x17f)]=![],setTimeout(_0x3ef492=>readys[_0x4de0e3(0x17f)]=!![],0x32);let _0x1c6d7c=Math['PI']*0x2,_0x39f5fc=myplayer(),_0x33b3a6=_0x39f5fc[_0x4de0e3(0xa2)];if(Settings[_0x4de0e3(0xb6)]['a']&&Settings[_0x4de0e3(0xb6)][_0x4de0e3(0xd5)]&&HoldWeapon(_0x39f5fc[_0x4de0e3(0x15b)]))_0x33b3a6=Settings[_0x4de0e3(0xb6)]['a'];unsafeWindow['wp']=_0x39f5fc;let _0x253d99=Math[_0x4de0e3(0x135)]((_0x33b3a6+_0x1c6d7c)%_0x1c6d7c*0xff/_0x1c6d7c);send([packets[_0x4de0e3(0x172)],_0x50e8e0,_0x253d99,0x0]);for(let _0x19f902=0xa;_0x19f902<0x1e;_0x19f902+=0x3){send([packets[_0x4de0e3(0x172)],_0x50e8e0,(_0x19f902+_0x253d99)%0xff,0x0]),send([packets[_0x4de0e3(0x172)],_0x50e8e0,(-_0x19f902+_0x253d99)%0xff,0x0]);}}}}const Utils={'initUI':()=>{const _0xe1f83a=_0x3f77d1;let _0x2cac41=new guify({'title':_0xe1f83a(0xa0),'theme':{'name':_0xe1f83a(0x17b),'colors':{'panelBackground':_0xe1f83a(0x11d),'componentBackground':_0xe1f83a(0xa6),'componentForeground':_0xe1f83a(0x97),'textPrimary':'#de00ff','textSecondary':_0xe1f83a(0x97),'textHover':_0xe1f83a(0x111)},'font':{'fontFamily':_0xe1f83a(0x12b),'fontSize':_0xe1f83a(0xed),'fontWeight':'1'}},'align':_0xe1f83a(0x15b),'width':0x226,'barMode':_0xe1f83a(0x90),'panelMode':_0xe1f83a(0x90),'root':unsafeWindow[_0xe1f83a(0x112)],'open':!0x1});_0x2cac41[_0xe1f83a(0x174)]({'type':_0xe1f83a(0x175),'label':_0xe1f83a(0x153),'open':!0x1}),_0x2cac41['Register']({'type':'folder','label':'Misc','open':!0x1}),_0x2cac41[_0xe1f83a(0x174)]({'type':'folder','label':_0xe1f83a(0xf8),'open':!0x1}),_0x2cac41[_0xe1f83a(0x174)]({'type':'folder','label':_0xe1f83a(0x108),'open':!0x1}),_0x2cac41[_0xe1f83a(0x174)]({'type':'folder','label':_0xe1f83a(0x117),'open':!0x1}),_0x2cac41[_0xe1f83a(0x174)]([{'type':_0xe1f83a(0x9d),'label':_0xe1f83a(0xa4),'object':Settings,'property':_0xe1f83a(0xa4),'onChange':_0x15adb1=>{const _0x59c268=_0xe1f83a;Utils[_0x59c268(0x147)]();}},{'type':'checkbox','label':_0xe1f83a(0x170),'object':Settings,'property':_0xe1f83a(0xef),'onChange':_0x1674d8=>{const _0x805688=_0xe1f83a;Utils[_0x805688(0x147)]();}},{'type':_0xe1f83a(0x9d),'label':_0xe1f83a(0xbc),'object':Settings,'property':_0xe1f83a(0x87),'onChange':_0x22b1a4=>{const _0x45f18f=_0xe1f83a;Utils[_0x45f18f(0x147)]();}},{'type':'checkbox','label':_0xe1f83a(0xb3),'object':Settings,'property':_0xe1f83a(0x119),'onChange':_0x265e65=>{Utils['saveSettings']();}}],{'folder':_0xe1f83a(0x153)}),_0x2cac41[_0xe1f83a(0x174)]([{'type':_0xe1f83a(0x9d),'label':_0xe1f83a(0x191),'object':Settings[_0xe1f83a(0x150)],'property':_0xe1f83a(0xd5),'onChange':_0x5b9186=>{const _0x47e2f8=_0xe1f83a;Utils[_0x47e2f8(0x147)]();}},{'type':_0xe1f83a(0x9d),'label':'AutoRespawn','object':Settings['AutoRespawn'],'property':_0xe1f83a(0xd5),'onChange':_0x5b652d=>{const _0x5b0be4=_0xe1f83a;Utils[_0x5b0be4(0x147)]();}},{'type':_0xe1f83a(0x9d),'label':_0xe1f83a(0xdf),'object':Settings['AutoCrown'],'property':'enabled','onChange':_0x2cc40f=>{const _0x19174c=_0xe1f83a;Utils[_0x19174c(0x147)]();}},{'type':_0xe1f83a(0x9d),'label':_0xe1f83a(0xbf),'object':Settings[_0xe1f83a(0x190)],'property':'enabled','onChange':_0x492858=>{const _0x1bdacc=_0xe1f83a;Utils[_0x1bdacc(0x147)]();}},{'type':_0xe1f83a(0x9d),'label':_0xe1f83a(0x176),'object':Settings['AutoTotem'],'property':_0xe1f83a(0xd5),'onChange':_0x8b0f3d=>{Utils['saveSettings']();}},{'type':_0xe1f83a(0x9d),'label':_0xe1f83a(0xb6),'object':Settings[_0xe1f83a(0xb6)],'property':_0xe1f83a(0xd5),'onChange':_0x5b70a6=>{const _0xc9bd7a=_0xe1f83a;Utils[_0xc9bd7a(0x147)]();}},{'type':_0xe1f83a(0x9d),'label':_0xe1f83a(0xa5),'object':Settings,'property':_0xe1f83a(0x128),'onChange':_0x329a94=>{Utils['saveSettings']();}}],{'folder':'Misc'}),_0x2cac41[_0xe1f83a(0x174)]([{'type':_0xe1f83a(0x134),'label':_0xe1f83a(0x14b),'action':_0x254ef5=>{const _0x4cc555=_0xe1f83a;Utils[_0x4cc555(0x9b)][_0x4cc555(0x178)](_0x4cc555(0x190));}},{'type':'display','label':_0xe1f83a(0x126),'object':Settings[_0xe1f83a(0x190)],'property':_0xe1f83a(0x80)},{'type':_0xe1f83a(0x134),'label':_0xe1f83a(0x100),'action':_0x118bf0=>{const _0x111385=_0xe1f83a;Utils[_0x111385(0x9b)][_0x111385(0x178)](_0x111385(0x150));}},{'type':_0xe1f83a(0x13d),'label':_0xe1f83a(0xaa),'object':Settings[_0xe1f83a(0x150)],'property':'key'},{'type':_0xe1f83a(0x134),'label':_0xe1f83a(0x166),'action':_0x44e189=>{const _0x1b2cc8=_0xe1f83a;Utils[_0x1b2cc8(0x9b)][_0x1b2cc8(0x178)](_0x1b2cc8(0x176));}},{'type':_0xe1f83a(0x13d),'label':_0xe1f83a(0x105),'object':Settings['AutoTotem'],'property':_0xe1f83a(0x80)},{'type':_0xe1f83a(0x134),'label':'Set\x20AutoSpike\x20k','action':_0x5a4801=>{const _0x567e3e=_0xe1f83a;Utils[_0x567e3e(0x9b)][_0x567e3e(0x178)](_0x567e3e(0x17f));}},{'type':'display','label':_0xe1f83a(0xd4),'object':Settings[_0xe1f83a(0x17f)],'property':_0xe1f83a(0x80)},{'type':_0xe1f83a(0x134),'label':_0xe1f83a(0x81),'action':_0x266dc8=>{const _0x303b43=_0xe1f83a;Utils['controls'][_0x303b43(0x178)](_0x303b43(0x15e));}},{'type':_0xe1f83a(0x13d),'label':_0xe1f83a(0x12a),'object':Settings[_0xe1f83a(0x15e)],'property':'key'},{'type':_0xe1f83a(0x134),'label':_0xe1f83a(0x81),'action':_0x21855d=>{const _0x213751=_0xe1f83a;Utils['controls'][_0x213751(0x178)](_0x213751(0x15e));}},{'type':'display','label':_0xe1f83a(0x160),'object':Settings['AutoRecycle'],'property':'key'},{'type':_0xe1f83a(0x134),'label':_0xe1f83a(0x93),'action':_0x5cba7e=>{const _0x42f5cd=_0xe1f83a;Utils['controls'][_0x42f5cd(0x178)](_0x42f5cd(0x11a));}},{'type':_0xe1f83a(0x13d),'label':_0xe1f83a(0xd3),'object':Settings[_0xe1f83a(0xc9)],'property':_0xe1f83a(0x80)},{'type':_0xe1f83a(0x134),'label':'Set\x20DropSword\x20k','action':_0x3d932e=>{const _0x9aea2e=_0xe1f83a;Utils[_0x9aea2e(0x9b)]['setKeyBind']('dropsword');}},{'type':_0xe1f83a(0x13d),'label':_0xe1f83a(0x9e),'object':Settings[_0xe1f83a(0xb9)],'property':_0xe1f83a(0x80)},{'type':_0xe1f83a(0x134),'label':_0xe1f83a(0xa1),'action':_0x26d255=>{const _0xcac6a=_0xe1f83a;Utils[_0xcac6a(0x9b)][_0xcac6a(0x178)](_0xcac6a(0xb9));}}],{'folder':_0xe1f83a(0xf8)}),_0x2cac41['Register']([{'type':_0xe1f83a(0x9d),'label':'Start\x20Autofarm','object':Settings[_0xe1f83a(0x108)],'property':_0xe1f83a(0xd5),'onChange':_0x21144a=>{const _0x38056d=_0xe1f83a;Utils[_0x38056d(0x147)]();}},{'type':'checkbox','label':_0xe1f83a(0x115),'object':Settings[_0xe1f83a(0x108)],'property':_0xe1f83a(0x162),'onChange':_0x2a59b6=>{const _0x32b8e0=_0xe1f83a;Utils[_0x32b8e0(0x147)]();}},{'type':_0xe1f83a(0x134),'label':_0xe1f83a(0x15d),'action':_0x210da8=>{const _0x2cea80=_0xe1f83a;let _0x5be06d=myplayer();_0x5be06d&&(Settings[_0x2cea80(0x108)]['x']=_0x5be06d['x'],Settings[_0x2cea80(0x108)]['y']=_0x5be06d['y']);}},{'type':_0xe1f83a(0x134),'label':'Bottom\x20right\x20of\x20farm','action':_0xb90897=>{const _0x4e157c=_0xe1f83a;let _0x527715=myplayer();_0x527715&&(Settings[_0x4e157c(0x108)]['xx']=_0x527715['x'],Settings[_0x4e157c(0x108)]['yy']=_0x527715['y']);}},{'type':'button','label':'Safe\x20Point','action':_0x2cf2cb=>{const _0x468427=_0xe1f83a;let _0x2c3f54=myplayer();_0x2c3f54&&(Settings[_0x468427(0x108)]['sx']=_0x2c3f54['x'],Settings['Autofarm']['sy']=_0x2c3f54['y']);}},{'type':'display','label':'X','object':Settings['Autofarm'],'property':'x'},{'type':_0xe1f83a(0x13d),'label':'Y','object':Settings[_0xe1f83a(0x108)],'property':'y'},{'type':_0xe1f83a(0x13d),'label':'X1','object':Settings[_0xe1f83a(0x108)],'property':'xx'},{'type':'display','label':'Y1','object':Settings['Autofarm'],'property':'yy'},{'type':_0xe1f83a(0x13d),'label':'SX','object':Settings[_0xe1f83a(0x108)],'property':'sx'},{'type':_0xe1f83a(0x13d),'label':'SY','object':Settings[_0xe1f83a(0x108)],'property':'sy'}],{'folder':_0xe1f83a(0x108)}),_0x2cac41['Register']([{'type':'checkbox','label':'Pathfinder\x20Enabled','folder':'Pathfinder','object':Settings[_0xe1f83a(0x198)],'property':_0xe1f83a(0xd5),'onChange'(){const _0x4d30f9=_0xe1f83a;Utils['saveSettings']&&Utils[_0x4d30f9(0x147)]();}},{'type':_0xe1f83a(0x9d),'label':'Chase\x20Enemy','object':Settings['pathfinder'],'property':_0xe1f83a(0x169),'onChange':_0x318628=>{const _0x5a2f27=_0xe1f83a;Utils[_0x5a2f27(0x147)]();}},{'type':_0xe1f83a(0x9d),'label':_0xe1f83a(0x164),'object':Settings[_0xe1f83a(0x14d)],'property':_0xe1f83a(0xd5),'onChange':_0xea7a06=>{const _0x11e98e=_0xe1f83a;Utils[_0x11e98e(0x147)]();}},{'type':_0xe1f83a(0x9d),'label':_0xe1f83a(0x141),'object':Settings[_0xe1f83a(0xc1)],'property':'enabled','onChange':_0x66d8c9=>{const _0x39ebad=_0xe1f83a;Utils[_0x39ebad(0x147)]();}},{'type':_0xe1f83a(0x9d),'label':_0xe1f83a(0x16e),'object':Settings[_0xe1f83a(0xe2)],'property':'enabled','onChange':_0x4f56de=>{const _0x232074=_0xe1f83a;Utils[_0x232074(0x147)]();}},{'type':_0xe1f83a(0x82),'label':_0xe1f83a(0x180),'min':0x0,'max':0x64,'step':0x1,'object':Settings[_0xe1f83a(0x198)],'property':_0xe1f83a(0x103),'onChange'(_0xfc0e8b){const _0x41366f=_0xe1f83a;Utils[_0x41366f(0x147)]();}},{'type':_0xe1f83a(0x13d),'label':'Pathfinder\x20Key','folder':'Pathfinder','object':Settings['pathfinder'],'property':_0xe1f83a(0x80)},{'type':_0xe1f83a(0x134),'label':_0xe1f83a(0x185),'folder':_0xe1f83a(0x163),'action'(){const _0xb9edab=_0xe1f83a;Utils[_0xb9edab(0x9b)][_0xb9edab(0x178)](_0xb9edab(0x198));}},{'type':'display','label':_0xe1f83a(0xce),'folder':'Pathfinder','object':Settings[_0xe1f83a(0x198)],'property':'x'},{'type':_0xe1f83a(0x13d),'label':_0xe1f83a(0xc4),'folder':_0xe1f83a(0x163),'object':Settings['pathfinder'],'property':'y'},{'type':_0xe1f83a(0x134),'label':'Set\x20Current\x20Player\x20Position','folder':'Pathfinder','action'(){updatePathfinderPosition&&updatePathfinderPosition();}},{'type':'button','label':_0xe1f83a(0x118),'folder':_0xe1f83a(0x163),'action'(){const _0x1440bb=_0xe1f83a;let _0x18e1bc=Object[_0x1440bb(0xe5)](client)[0x88];client[_0x18e1bc]();}},{'type':_0xe1f83a(0x134),'label':'Random\x20Token_ID','folder':'Pathfinder','action'(){const _0x5ec709=_0xe1f83a;let _0x2bc3d8=Object[_0x5ec709(0xe5)](user)[0xe];user[_0x2bc3d8]=Gen(0x5);}}],{'folder':_0xe1f83a(0x117)});},'controls':null,'controller':class{[_0x3f77d1(0x178)](_0x2a95be){const _0x47376f=_0x3f77d1;Settings[_0x2a95be]['key']=_0x47376f(0x11b);let _0x14c830=0x0;document[_0x47376f(0xd0)](_0x47376f(0x18a),function _0x33f927(_0x28ca1f){const _0x1f4c4d=_0x47376f;_0x14c830++,_0x14c830>=0x1&&(_0x28ca1f[_0x1f4c4d(0x195)]=='Escape'?Settings[_0x2a95be][_0x1f4c4d(0x80)]=_0x1f4c4d(0x16c):Settings[_0x2a95be][_0x1f4c4d(0x80)]=_0x28ca1f['code'],document[_0x1f4c4d(0x186)](_0x1f4c4d(0x18a),_0x33f927),Utils[_0x1f4c4d(0x147)]());});}},'saveSettings':()=>{const _0x45389e=_0x3f77d1;for(let _0x1a9ecf in Settings){localStorage[_0x45389e(0x167)](_0x1a9ecf+'ZMX',JSON[_0x45389e(0xd9)](Settings[_0x1a9ecf]));}},'loadSettings':()=>{const _0x415f96=_0x3f77d1;for(let _0x18c633 in Settings){let _0x45f770=localStorage['getItem'](_0x18c633);if(_0x45f770)Settings[_0x18c633]=JSON[_0x415f96(0xfc)](_0x45f770);}},'LoadHack':()=>{const _0x215bc7=_0x3f77d1;Utils[_0x215bc7(0x17c)](),Utils[_0x215bc7(0x9b)]=new Utils[(_0x215bc7(0x194))](),Utils[_0x215bc7(0x102)](),Utils[_0x215bc7(0x147)]();}};unsafeWindow[_0x3f77d1(0xd7)]=Utils;let autoputredsinterval,awutostealInterval;document[_0x3f77d1(0xd0)](_0x3f77d1(0x18a),_0x3f91ee=>{const _0x34ba33=_0x3f77d1;switch(chatxterm()===![]&&_0x3f91ee[_0x34ba33(0x195)]){case Settings['AutoSpike']['key']:Settings[_0x34ba33(0x17f)]['enabled']=!![];break;case Settings[_0x34ba33(0x159)][_0x34ba33(0x80)]:Settings[_0x34ba33(0x159)][_0x34ba33(0xd5)]=!![];break;case Settings['SwordInchest'][_0x34ba33(0x80)]:Settings['SwordInchest']['enabled']=!![];break;case Settings[_0x34ba33(0xb1)]['key']:Settings['AutoPutRed'][_0x34ba33(0xd5)]===![]&&(extractorsPut(),autoputredsinterval=setInterval(autoputred,0x64));Settings['AutoPutRed']['enabled']=!![];break;case Settings['AMB'][_0x34ba33(0x80)]:Settings['AMB'][_0x34ba33(0xd5)]=!Settings[_0x34ba33(0xb6)][_0x34ba33(0xd5)];break;case Settings['AutoSteal'][_0x34ba33(0x80)]:Settings['AutoSteal'][_0x34ba33(0xd5)]===![]&&(autoSteal1(),awutostealInterval=setInterval(autoSteal1,0x64));Settings['AutoSteal'][_0x34ba33(0xd5)]=!![];break;case Settings[_0x34ba33(0x176)]['key']:Settings[_0x34ba33(0x176)][_0x34ba33(0xd5)]=!![];break;case Settings['dropsword']['key']:Settings['dropsword'][_0x34ba33(0xd5)]=!![];break;}}),document['addEventListener'](_0x3f77d1(0xe3),_0x55cf17=>{const _0x1af0c5=_0x3f77d1;switch(chatxterm()===![]&&_0x55cf17['code']){case Settings['AutoSpike']['key']:Settings['AutoSpike']['enabled']=![];break;case Settings[_0x1af0c5(0x159)][_0x1af0c5(0x80)]:Settings[_0x1af0c5(0x159)]['enabled']=![];break;case Settings[_0x1af0c5(0x17e)][_0x1af0c5(0x80)]:Settings[_0x1af0c5(0x17e)][_0x1af0c5(0xd5)]=![];break;case Settings['AutoPutRed'][_0x1af0c5(0x80)]:clearInterval(autoputredsinterval),Settings[_0x1af0c5(0xb1)][_0x1af0c5(0xd5)]=![];break;case Settings['AutoSteal']['key']:clearInterval(awutostealInterval),Settings[_0x1af0c5(0xb9)][_0x1af0c5(0xd5)]=![];break;case Settings['AutoTotem'][_0x1af0c5(0x80)]:Settings['AutoTotem'][_0x1af0c5(0xd5)]=![];break;case Settings[_0x1af0c5(0xc9)][_0x1af0c5(0x80)]:Settings['dropsword'][_0x1af0c5(0xd5)]=![];break;}});function intervals(){drawSpshi=setInterval(drawsp,0x64),assignPidPropNameInterval=setInterval(pid,0x64),asignedFlyInterval=setInterval(Fly,0x64),asignedClotheInterval=setInterval(Clothes,0x64);}function main(){auto(),autoCraft(),autoBook(),autoRecycle(),AutoCrown(),setInterval(Pathfinder,0xc8),blizzard(),colors(),aimbot(),extractors(),extractorsPut(),extractorsInfo(),drawinchest(),SwordInChest(),recycle(),tot(),Autosh(),autofarm(),Visuals(),checks(),healTimer(),autoresp(),checkgame(),drawID(),draWBox(),dropSword(),nwnh(),autoputred(),podid();}let ready_=0x0;function initialize(){const _0x376936=_0x3f77d1;try{ready_===0x0&&user!==undefined&&world['w']!==undefined&&client!==undefined&&(intervals(),Utils[_0x376936(0x120)](),main(),unsafeWindow['mp']=myplayer(),log('On'),ready_++);}catch(_0x456b8f){log(_0x376936(0xfd)),log(_0x456b8f);}}setInterval(initialize,0xc8);

