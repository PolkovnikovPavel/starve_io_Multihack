// ==UserScript==
// @name         Multihack by setorg V6
// @namespace    http://tampermonkey.net/
// @version      2024-05-20
// @description  Всё что нужно для реального пацана
// @author       setorg
// @match        https://starve.io/*
// @run-at       document-start
// @grant        unsafeWindow
// ==/UserScript==
/* workerTimers */ ! function (e, t) { "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).fastUniqueNumbers = {}) }(this, function (e) { "use strict"; var t, r = void 0 === Number.MAX_SAFE_INTEGER ? 9007199254740991 : Number.MAX_SAFE_INTEGER, n = new WeakMap, i = function (e, t) { return function (n) { var i = t.get(n), o = void 0 === i ? n.size : i < 1073741824 ? i + 1 : 0; if (!n.has(o)) return e(n, o); if (n.size < 536870912) { for (; n.has(o);) o = Math.floor(1073741824 * Math.random()); return e(n, o) } if (n.size > r) throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!"); for (; n.has(o);) o = Math.floor(Math.random() * r); return e(n, o) } }((t = n, function (e, r) { return t.set(e, r), r }), n), o = function (e) { return function (t) { var r = e(t); return t.add(r), r } }(i); e.addUniqueNumber = o, e.generateUniqueNumber = i, Object.defineProperty(e, "__esModule", { value: !0 }) }), function (e, t) { "object" == typeof exports && "undefined" != typeof module ? t(exports, require("fast-unique-numbers")) : "function" == typeof define && define.amd ? define(["exports", "fast-unique-numbers"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).workerTimersBroker = {}, e.fastUniqueNumbers) }(this, function (e, t) { "use strict"; e.load = function (e) { var r = new Map([[0, function () { }]]), n = new Map([[0, function () { }]]), i = new Map, o = new Worker(e); o.addEventListener("message", function (e) { var t = e.data; if (function (e) { return void 0 !== e.method && "call" === e.method }(t)) { var o = t.params, a = o.timerId, s = o.timerType; if ("interval" === s) { var u = r.get(a); if ("number" == typeof u) { var d = i.get(u); if (void 0 === d || d.timerId !== a || d.timerType !== s) throw new Error("The timer is in an undefined state.") } else { if (void 0 === u) throw new Error("The timer is in an undefined state."); u() } } else if ("timeout" === s) { var f = n.get(a); if ("number" == typeof f) { var l = i.get(f); if (void 0 === l || l.timerId !== a || l.timerType !== s) throw new Error("The timer is in an undefined state.") } else { if (void 0 === f) throw new Error("The timer is in an undefined state."); f(), n.delete(a) } } } else { if (! function (e) { return null === e.error && "number" == typeof e.id }(t)) { var m = t.error.message; throw new Error(m) } var c = t.id, p = i.get(c); if (void 0 === p) throw new Error("The timer is in an undefined state."); var v = p.timerId, h = p.timerType; i.delete(c), "interval" === h ? r.delete(v) : n.delete(v) } }); return { clearInterval: function (e) { var n = t.generateUniqueNumber(i); i.set(n, { timerId: e, timerType: "interval" }), r.set(e, n), o.postMessage({ id: n, method: "clear", params: { timerId: e, timerType: "interval" } }) }, clearTimeout: function (e) { var r = t.generateUniqueNumber(i); i.set(r, { timerId: e, timerType: "timeout" }), n.set(e, r), o.postMessage({ id: r, method: "clear", params: { timerId: e, timerType: "timeout" } }) }, setInterval: function (e, n) { var i = t.generateUniqueNumber(r); return r.set(i, function () { e(), "function" == typeof r.get(i) && o.postMessage({ id: null, method: "set", params: { delay: n, now: performance.now(), timerId: i, timerType: "interval" } }) }), o.postMessage({ id: null, method: "set", params: { delay: n, now: performance.now(), timerId: i, timerType: "interval" } }), i }, setTimeout: function (e, r) { var i = t.generateUniqueNumber(n); return n.set(i, e), o.postMessage({ id: null, method: "set", params: { delay: r, now: performance.now(), timerId: i, timerType: "timeout" } }), i } } }, Object.defineProperty(e, "__esModule", { value: !0 }) }), function (e, t) { "object" == typeof exports && "undefined" != typeof module ? t(exports, require("worker-timers-broker")) : "function" == typeof define && define.amd ? define(["exports", "worker-timers-broker"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).workerTimers = {}, e.workerTimersBroker) }(this, function (e, t) { "use strict"; var r = null, n = function (e, t) { return function () { if (null !== r) return r; var n = new Blob([t], { type: "application/javascript; charset=utf-8" }), i = URL.createObjectURL(n); return (r = e(i)).setTimeout(function () { return URL.revokeObjectURL(i) }, 0), r } }(t.load, '(()=>{var e={67:(e,t,r)=>{var o,i;void 0===(i="function"==typeof(o=function(){"use strict";var e=new Map,t=new Map,r=function(t){var r=e.get(t);if(void 0===r)throw new Error(\'There is no interval scheduled with the given id "\'.concat(t,\'".\'));clearTimeout(r),e.delete(t)},o=function(e){var r=t.get(e);if(void 0===r)throw new Error(\'There is no timeout scheduled with the given id "\'.concat(e,\'".\'));clearTimeout(r),t.delete(e)},i=function(e,t){var r,o=performance.now();return{expected:o+(r=e-Math.max(0,o-t)),remainingDelay:r}},n=function e(t,r,o,i){var n=performance.now();n>o?postMessage({id:null,method:"call",params:{timerId:r,timerType:i}}):t.set(r,setTimeout(e,o-n,t,r,o,i))},a=function(t,r,o){var a=i(t,o),s=a.expected,d=a.remainingDelay;e.set(r,setTimeout(n,d,e,r,s,"interval"))},s=function(e,r,o){var a=i(e,o),s=a.expected,d=a.remainingDelay;t.set(r,setTimeout(n,d,t,r,s,"timeout"))};addEventListener("message",(function(e){var t=e.data;try{if("clear"===t.method){var i=t.id,n=t.params,d=n.timerId,c=n.timerType;if("interval"===c)r(d),postMessage({error:null,id:i});else{if("timeout"!==c)throw new Error(\'The given type "\'.concat(c,\'" is not supported\'));o(d),postMessage({error:null,id:i})}}else{if("set"!==t.method)throw new Error(\'The given method "\'.concat(t.method,\'" is not supported\'));var u=t.params,l=u.delay,p=u.now,m=u.timerId,v=u.timerType;if("interval"===v)a(l,m,p);else{if("timeout"!==v)throw new Error(\'The given type "\'.concat(v,\'" is not supported\'));s(l,m,p)}}}catch(e){postMessage({error:{message:e.message},id:t.id,result:null})}}))})?o.call(t,r,t,e):o)||(e.exports=i)}},t={};function r(o){var i=t[o];if(void 0!==i)return i.exports;var n=t[o]={exports:{}};return e[o](n,n.exports,r),n.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";r(67)})()})();'); e.clearInterval = function (e) { return n().clearInterval(e) }, e.clearTimeout = function (e) { return n().clearTimeout(e) }, e.setInterval = function (e, t) { return n().setInterval(e, t) }, e.setTimeout = function (e, t) { return n().setTimeout(e, t) }, Object.defineProperty(e, "__esModule", { value: !0 }) });

const packets = {
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

const disableVideo = () => {
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

let Settings = {
    RemoveHands: { k: "ShiftLeft" },
    MainColor: 'rgb(16, 212, 68)',
    TextColor: "rgb(21, 201, 68)",
    BackgroundColor: "rgb(22, 22, 22)",
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
    VultureTracers: false,
    BabyDragonTracers: false,
    BabyLavaDragonTracers: true,
    esp: false,
    textalert: { e: false, t: "none" },
    buildinfo: true,
    ChestInfo: true,
    ChestInfo2: true,
    DropInChest: { id: 109, count: 255 },
    boxinfo: true,
    toteminfo: true,
    showNames: true,
    showFly: true,
    ColoredSpikes: false,
    AutoBridge: false,
    AutoSpikeMode2: false,
    AutoBreadPut: { e: false, k: "KeyM" },
    AutoBreadTake: { e: false, k: "KeyN" },
    AutoExtractorPut: { e: false, k: "KeyP" },
    AutoExtractorTake: { e: false, k: "KeyO" },
    AutoCraft: { e: false, k: "KeyK", lastcraft: -1, s: false },
    AutoRecycle: { e: false, k: "KeyL", lastrecycle: -1, s: false },
    AutoSpike: { e: false, k: "Space", m: true, p: ["Reidite Spike", "Amethyst Spike", "Diamond Spike", "Gold Spike", "Stone Spike", "Wood Spike", "Wood Wall"] },
}
XrayCtx = CanvasRenderingContext2D.prototype.drawImage;


setTimeout(() => {
    unsafeWindow.kasdgiksadg = {
        KILLUKRSOLIDER: () => {
            let container = document.body;
            let SDGSDsgdASF = new guify({
                title: "Multihack by setorg V6",
                theme: {
                    name: "Multihack by setorg V6",
                    colors: {
                        menuBarBackground: "rgb(0,0,0)",
                        menuBarText: "rgb(0, 255, 0)",
                        panelBackground: "rgb(0,0,0, 0.5)",
                        componentBackground: Settings.BackgroundColor,
                        componentForeground: Settings.MainColor,
                        textPrimary: Settings.TextColor,
                        textSecondary: Settings.MainColor,
                        textHover: "rgb(255,255,255)"
                    },
                    font: {
                        fontFamily: "Baloo Paaji",
                        fontSize: "20px",
                        fontWeight: "1"
                    }
                },
                align: "right",
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
                label: "AutoSpike",
                open: !1
            })
            SDGSDsgdASF.Register({
                type: "folder",
                label: "AutoCraft & AutoRecycle",
                open: !1
            })
            SDGSDsgdASF.Register({
                type: "folder",
                label: "Bind",
                open: !1
            })
            SDGSDsgdASF.Register({
                type: "folder",
                label: "Tracers",
                open: !1
            })
            SDGSDsgdASF.Register({
                type: "folder",
                label: "Drop in chest",
                open: !1
            })
            SDGSDsgdASF.Register({
                type: "folder",
                label: "* cosmetics hack *",
                open: !1
            }, {
                folder: "Visuals"
            })

            SDGSDsgdASF.Register([
                { type: 'checkbox', label: 'Gauges', object: Settings, property: 'gaugesInfo', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'Tracers', object: Settings, property: 'tracers', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'BuildInfo', object: Settings, property: 'buildinfo', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'ChestInfo', object: Settings, property: 'ChestInfo', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'TotemInfo', object: Settings, property: 'toteminfo', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'BoxInfo', object: Settings, property: 'boxinfo', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'ShowNames', object: Settings, property: 'showNames', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'showFly', object: Settings, property: 'showFly', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'ColoredSpikes', object: Settings, property: 'ColoredSpikes', onChange: data => { kasdgiksadg.saveSettings(); } },
                // { type: 'checkbox', label: 'Xray', object: Settings.xray, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } },
                // { type: 'checkbox', label: 'NoFog', object: Settings, property: 'NoFog', onChange: data => { kasdgiksadg.saveSettings(); } },
                // { type: 'checkbox', label: 'ListEnabledHacks', object: Settings, property: 'ListEnabledHacks', onChange: data => { kasdgiksadg.saveSettings(); } },
                // { type: 'checkbox', label: 'PlayerOnTop', object: Settings, property: 'playerOnTop', onChange: data => { kasdgiksadg.saveSettings(); } },
                // { type: 'checkbox', label: 'BoxOnTop', object: Settings, property: 'boxOnTop', onChange: data => { kasdgiksadg.saveSettings(); } },
                // { type: 'checkbox', label: 'WeatherInfo', object: Settings, property: 'WeatherInfo', onChange: data => { kasdgiksadg.saveSettings(); } },
                // { type: 'checkbox', label: 'boxInfo', object: Settings, property: 'boxInfo', onChange: data => { kasdgiksadg.saveSettings(); } },
                // { type: 'checkbox', label: 'ColoredSpikes', object: Settings, property: 'coloredspike', onChange: data => { kasdgiksadg.saveSettings(); } },
                // { type: 'checkbox', label: 'Timers', object: Settings, property: 'Timer', onChange: data => { kasdgiksadg.saveSettings(); } },
                // { type: 'checkbox', label: 'BetterQuestTime', object: Settings, property: 'BetterQuestTime', onChange: data => { kasdgiksadg.saveSettings(); } },
                // { type: 'checkbox', label: 'Percents', object: Settings, property: 'Percent', onChange: data => { } },
                // { type: 'checkbox', label: 'ShowNames', object: Settings, property: 'ShowNames', onChange: data => { } },

                // { type: "range", label: "RoofsXray", min: 0, max: 1, step: 0.1, object: Settings.roofs, property: "o", onChange: data => { kasdgiksadg.saveSettings() } },
                // { type: "range", label: "Xray", min: 0, max: 1, step: 0.1, object: Settings.xray, property: "o", onChange: data => { kasdgiksadg.saveSettings() } },
            ], {
                folder: "Visuals"
            });


            SDGSDsgdASF.Register([
                { type: 'checkbox', label: 'AutoFeed', object: Settings.AutoFeed2, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'range', label: 'AutoFeed Value', min: 0, max: 99, step: 1, object: Settings.AutoFeed2, property: 'a', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'AutoSteal', object: Settings.AutoSteal, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'AutoExtractorPut', object: Settings.AutoExtractorPut, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'AutoExtractorTake', object: Settings.AutoExtractorTake, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'display', label: '' },
                { type: 'checkbox', label: 'Aimbot', object: Settings.AMB, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'Aimbot mode V2', object: Settings, property: 'AMB_V2', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'Aim rotation', object: Settings, property: 'AMB_rotation', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'display', label: '' },
                { type: 'checkbox', label: 'AutoIce', object: Settings.AutoIce, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'AutoBreadPut', object: Settings.AutoBreadPut, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'AutoBreadTake', object: Settings.AutoBreadTake, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } },
            ], {
                folder: "Misc"
            });

            SDGSDsgdASF.Register([
                { type: 'checkbox', label: 'AutoCraft', object: Settings.AutoCraft, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'SafeMode', object: Settings.AutoCraft, property: 's', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'display', label: 'AutoCraft Key:', object: Settings.AutoCraft, property: 'k' },
                { type: 'button', label: 'Set AutoCraft Key', action: data => { kasdgiksadg.controls.setKeyBind('AutoCraft'); } },
                { type: 'display', label: 'CraftId: ', object: Settings.AutoCraft, property: 'lastcraft' },
                { type: 'display', label: '' },
                { type: 'checkbox', label: 'AutoRecycle', object: Settings.AutoRecycle, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'SafeMode', object: Settings.AutoRecycle, property: 's', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'display', label: 'AutoRecycle Key:', object: Settings.AutoRecycle, property: 'k' },
                { type: 'button', label: 'Set AutoRecycle Key', action: data => { kasdgiksadg.controls.setKeyBind('AutoRecycle'); } },
                { type: 'display', label: 'RecycleId: ', object: Settings.AutoRecycle, property: 'lastrecycle' },
            ], {
                folder: "AutoCraft & AutoRecycle"
            });

            SDGSDsgdASF.Register([
                { type: 'display', label: 'AutoSteal Key:', object: Settings.AutoSteal, property: 'k' },
                { type: 'button', label: 'Set AutoSteal Key', action: data => { kasdgiksadg.controls.setKeyBind('AutoSteal'); } },
                { type: 'display', label: 'AutoExtractorPut Key:', object: Settings.AutoExtractorPut, property: 'k' },
                { type: 'button', label: 'Set AutoExtractorPut Key', action: data => { kasdgiksadg.controls.setKeyBind('AutoExtractorPut'); } },
                { type: 'display', label: 'AutoExtractorTake Key:', object: Settings.AutoExtractorTake, property: 'k' },
                { type: 'button', label: 'Set AutoExtractorTake Key', action: data => { kasdgiksadg.controls.setKeyBind('AutoExtractorTake'); } },
                { type: 'display', label: 'Aimbot Key:', object: Settings.AMB, property: 'k' },
                { type: 'button', label: 'Set Aimbot Key', action: data => { kasdgiksadg.controls.setKeyBind('AMB'); } },
                { type: 'display', label: 'AutoIce Key:', object: Settings.AutoIce, property: 'k' },
                { type: 'button', label: 'Set AutoIce Key', action: data => { kasdgiksadg.controls.setKeyBind('AutoIce'); } },
                { type: 'display', label: 'AutoBreadPut Key:', object: Settings.AutoBreadPut, property: 'k' },
                { type: 'button', label: 'Set AutoBreadPut Key', action: data => { kasdgiksadg.controls.setKeyBind('AutoBreadPut'); } },
                { type: 'display', label: 'AutoBreadTake Key:', object: Settings.AutoBreadTake, property: 'k' },
                { type: 'button', label: 'Set AutoBreadTake Key', action: data => { kasdgiksadg.controls.setKeyBind('AutoBreadTake'); } },
                { type: 'display', label: 'Remove your hands:', object: Settings.RemoveHands, property: 'k' },
                // { type: 'display', label: 'AutoSteal Key:', object: Settings.AutoSteal, property: 'k' },
                // { type: 'button', label: 'Set AutoSteal Key', action: data => { kasdgiksadg.controls.setKeyBind('AutoSteal'); } },
                // { type: 'display', label: 'Spectator Key:', object: Settings.spectator, property: 'k' },
                // { type: 'button', label: 'Set Spectator Key', action: data => { kasdgiksadg.controls.setKeyBind('spectator'); } },
                // { type: 'display', label: 'DropSword Key:', object: Settings.DropSword, property: 'k' },
                // { type: 'button', label: 'Set DropSword Key', action: data => { kasdgiksadg.controls.setKeyBind('DropSword'); } },
            ], { folder: "Bind" });

            SDGSDsgdASF.Register([
                { type: 'checkbox', label: 'AutoBridge', object: Settings, property: 'AutoBridge', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'G Spike mode', object: Settings, property: 'AutoSpikeMode2', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'button', label: 'Set AutoSpike Key', action: data => { kasdgiksadg.controls.setKeyBind('AutoSpike'); } },
                { type: 'display', label: 'AutoSpike Key:', object: Settings.AutoSpike, property: 'k' },
                { type: 'select', label: '1', object: Settings.AutoSpike.p, property: "0", options: ['Reidite Spike', 'Amethyst Spike', 'Diamond Spike', 'Gold Spike', 'Stone Spike', 'Wood Spike', 'Wood Wall', "Resurrection", "Nothing"], onChange: (data) => { kasdgiksadg.saveSettings(); } },
                { type: 'select', label: '2', object: Settings.AutoSpike.p, property: "1", options: ['Reidite Spike', 'Amethyst Spike', 'Diamond Spike', 'Gold Spike', 'Stone Spike', 'Wood Spike', 'Wood Wall', "Resurrection", "Nothing"], onChange: (data) => { kasdgiksadg.saveSettings(); } },
                { type: 'select', label: '3', object: Settings.AutoSpike.p, property: "2", options: ['Reidite Spike', 'Amethyst Spike', 'Diamond Spike', 'Gold Spike', 'Stone Spike', 'Wood Spike', 'Wood Wall', "Resurrection", "Nothing"], onChange: (data) => { kasdgiksadg.saveSettings(); } },
                { type: 'select', label: '4', object: Settings.AutoSpike.p, property: "3", options: ['Reidite Spike', 'Amethyst Spike', 'Diamond Spike', 'Gold Spike', 'Stone Spike', 'Wood Spike', 'Wood Wall', "Resurrection", "Nothing"], onChange: (data) => { kasdgiksadg.saveSettings(); } },
                { type: 'select', label: '5', object: Settings.AutoSpike.p, property: "4", options: ['Reidite Spike', 'Amethyst Spike', 'Diamond Spike', 'Gold Spike', 'Stone Spike', 'Wood Spike', 'Wood Wall', "Resurrection", "Nothing"], onChange: (data) => { kasdgiksadg.saveSettings(); } },
                { type: 'select', label: '6', object: Settings.AutoSpike.p, property: "5", options: ['Reidite Spike', 'Amethyst Spike', 'Diamond Spike', 'Gold Spike', 'Stone Spike', 'Wood Spike', 'Wood Wall', "Resurrection", "Nothing"], onChange: (data) => { kasdgiksadg.saveSettings(); } },
                { type: 'select', label: '7', object: Settings.AutoSpike.p, property: "6", options: ['Reidite Spike', 'Amethyst Spike', 'Diamond Spike', 'Gold Spike', 'Stone Spike', 'Wood Spike', 'Wood Wall', "Resurrection", "Nothing"], onChange: (data) => { kasdgiksadg.saveSettings(); } },
            ], { folder: "AutoSpike" });

            SDGSDsgdASF.Register([
                { type: 'checkbox', label: 'PlayerTracers', object: Settings, property: 'PlayerTracers', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'SandwormTracers', object: Settings, property: 'SandwormTracers', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'KrakenTracers', object: Settings, property: 'KrakenTracers', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'SpiderTracers', object: Settings, property: 'SpiderTracers', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'WolfTracers', object: Settings, property: 'WolfTracers', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'RabbitTracers', object: Settings, property: 'RabbitTracers', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'VultureTracers', object: Settings, property: 'VultureTracers', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'BabyDragonTracers', object: Settings, property: 'BabyDragonTracers', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'checkbox', label: 'BabyLavaDragonTracers', object: Settings, property: 'BabyLavaDragonTracers', onChange: data => { kasdgiksadg.saveSettings(); } },
            ], {
                folder: "Tracers"
            });

            SDGSDsgdASF.Register([
                { type: 'checkbox', label: 'Show Items ID', object: Settings, property: 'ChestInfo2', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'range', label: 'Item ID', min: 1, max: 250, step: 1, object: Settings.DropInChest, property: 'id', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'range', label: 'Count', min: 1, max: 1000, step: 1, object: Settings.DropInChest, property: 'count', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'button', label: 'Drop', action: data => { DropInChest(); } },
            ], {
                folder: "Drop in chest"
            });

            SDGSDsgdASF.Register([
                { type: 'color', label: 'Main color', object: Settings, property: 'MainColor', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'color', label: 'Text Color', object: Settings, property: 'TextColor', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'color', label: 'Background Color', object: Settings, property: 'BackgroundColor', onChange: data => { kasdgiksadg.saveSettings(); } },
                { type: 'button', label: 'Reset', action: data => { resetColors(); } },
            ], { folder: "* cosmetics hack *" });

            // SDGSDsgdASF.Register([
            //     { type: 'checkbox', label: 'AutoBook', object: Settings, property: 'AutoBook', onChange: data => { kasdgiksadg.saveSettings(); } },
            //     { type: 'checkbox', label: 'AutoSteal', object: Settings.AutoSteal, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } },
            //     { type: 'checkbox', label: 'Spectator', object: Settings.spectator, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } },
            //     { type: 'checkbox', label: 'Aimbot', object: Settings.aimbot, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } },
            //     { type: 'checkbox', label: 'AutoRespawn', object: Settings, property: 'AutoRespawn', onChange: data => { kasdgiksadg.saveSettings(); } },

            //     { type: "range", label: "SpectatorSpeed", min: 10, max: 200, step: 5, object: Settings.spectator, property: "s", onChange: data => { kasdgiksadg.saveSettings() } },
            // ], { folder: "Misc" });
            // SDGSDsgdASF.Register([
            //     { type: 'checkbox', label: 'AutoCraft', object: Settings.AutoCraft, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } },
            //     { type: 'display', label: 'AutoCraft Key:', object: Settings.AutoCraft, property: 'k' },
            //     { type: 'button', label: 'Set AutoCraft Key', action: data => { kasdgiksadg.controls.setKeyBind('AutoCraft'); } },
            //     { type: 'display', label: 'CraftId: ', object: Settings.AutoCraft, property: 'last' },
            //     { type: 'display', label: '' },
            //     { type: 'checkbox', label: 'AutoRecycle', object: Settings.AutoRecycle, property: 'e', onChange: data => { kasdgiksadg.saveSettings(); } },
            //     { type: 'display', label: 'AutoRecycle Key:', object: Settings.AutoRecycle, property: 'k' },
            //     { type: 'button', label: 'Set AutoRecycle Key', action: data => { kasdgiksadg.controls.setKeyBind('AutoRecycle'); } },
            //     { type: 'display', label: 'RecycleId: ', object: Settings.AutoRecycle, property: 'last' },
            // ], { folder: "AutoCraft&Recycle" });

            /*
            SDGSDsgdASF.Register([
                {
                    type: "select",
                    label: "Skin",
                    options: skins,
                    onChange: e => {
                        script.myPlayer.skin = skins.indexOf(e);
                        Settings.SkinChanger_Skin = skins.indexOf(e);
                    }
                }
            ], {
                folder: "SkinChanger"
            })
            */

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
                o && (Settings[e] = JSON.parse(o))
            }
        },
        LoadHack: () => {
            document.addEventListener("keydown", (e) => {
                if (chatxterm()) return;
                switch (e.code) {
                    case Settings.AutoSpike.k:
                        Settings.AutoSpike.e = true;
                        break;
                    case Settings.AutoSteal.k:
                        Settings.AutoSteal.e = true;
                        break;
                    case Settings.Xray.k:
                        Settings.Xray.e = true;
                        break;
                    case Settings.AutoExtractorPut.k:
                        Settings.AutoExtractorPut.e = !Settings.AutoExtractorPut.e
                        break;
                    case Settings.AutoExtractorTake.k:
                        Settings.AutoExtractorTake.e = !Settings.AutoExtractorTake.e
                        break;
                    case Settings.AMB.k:
                        Settings.AMB.e = !Settings.AMB.e
                        Settings.AMB.off = false;
                        break;
                    case Settings.AutoBreadTake.k:
                        Settings.AutoBreadTake.e = !Settings.AutoBreadTake.e;
                        break;
                    case Settings.AutoBreadPut.k:
                        Settings.AutoBreadPut.e = !Settings.AutoBreadPut.e
                        break;
                    case Settings.AutoIce.k:
                        Settings.AutoIce.e = !Settings.AutoIce.e
                        break;
                    case "ShiftLeft":
                        console.log("ShiftLeft");
                        send([packets.equip, 7])
                        Settings.AMB.off = true;
                        break
                }
            });

            document.addEventListener("keyup", (e) => {
                if (chatxterm()) return;
                switch (e.code) {
                    case Settings.AutoSpike.k:
                        Settings.AutoSpike.e = false;
                        break;
                    case Settings.AutoSteal.k:
                        Settings.AutoSteal.e = false;
                        break;
                    case Settings.Xray.k:
                        Settings.Xray.e = false;
                        break;
                    case Settings.AutoCraft.k:
                        Settings.AutoCraft.e = !Settings.AutoCraft.e;
                        break;
                    case Settings.AutoRecycle.k:
                        Settings.AutoRecycle.e = !Settings.AutoRecycle.e;
                        break;

                }
            });
            for (let i = 0; i < 236; i++) {
                if (i <= 222) {
                    lootboxes.push("LootBox: " + i);
                }
                skins.push("Skin: " + i);
            }
            kasdgiksadg.loadSettings();
            Settings.Xray.e = false;
            kasdgiksadg.controls = new kasdgiksadg.controller();
            let e = unsafeWindow.document.createElement("script");
            e.onload = function () {
                setTimeout(kasdgiksadg.KILLUKRSOLIDER, 500)
            }, e.src = "https://unpkg.com/guify@0.12.0/lib/guify.min.js", unsafeWindow.document.body.appendChild(e)
        },
    };

    setTimeout(kasdgiksadg.LoadHack(), 3500)
}, 500);



let LAST_CRAFT;

let world;
let game;
let client;
let user;
let mouse
let _this;
let log = console.log
let LAST_RECYCLE
let master = Symbol()

function hooks() {
    Object.defineProperty(Object.prototype, "timeout", {
        get() {
            return this[master]
        },
        set(data) {
            this[master] = data;
            if (!client) {
                client = this;
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
            this[master] = data, !game && (this["sign"] && (game = this, log(game), unsafeWindow["game"] = game));
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
                world = this;
                unsafeWindow.world = world;
            }
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
                user[Object.keys(user)[10]] = false // alive
                unsafeWindow.user = user;
                ads();
                disableVideo();
            }
        },
    })
}


hooks()
//////////////////////////////////////////////////////////////////////////////

function send(data) {
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
function unit() {
    let units;
    let counter = 0;

    for (let prop1 in world) {
        counter++;

        if (counter === 5) {
            units = world[prop1];
            break;
        }
    }
    return units;

}


function myplayer() {
    let fast_units;
    let counter = 0;

    let pid
    let counter2 = 0

    for (let prop1 in user) {
        counter2++;

        if (counter2 === 18) {
            pid = user[prop1];
            break;
        }
    }

    for (
        let prop1 in world) {
        counter++;

        if (counter === 6) {
            fast_units = world[prop1][pid];
            break;
        }
    }
    return fast_units;

}

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

function chatxterm() {
    if (document.getElementById("chat_block").style.display === 'inline-block' || document.getElementById("commandMainBox").style.display === 'inline-block') {
        return true;
    } else {
        return false;
    }
}

function gauges() {
    let gauge;
    let gauge2;
    let counter = 0;

    for (let prop1 in user) {
        counter++;

        if (counter === 30) {


            gauge = user[prop1];
            let innerCounter = 0;

            for (let prop2 in gauge) {
                innerCounter++;
                if (innerCounter === 3) {
                    gauge2 = gauge[prop2];
                }
            }
            break;
        }
    }
    return gauge2;
}

function gauges2() {
    let gauge;
    let gauge2;
    let counter = 0;

    for (let prop1 in user) {
        counter++;

        if (counter === 30) {


            gauge = user[prop1];
            let innerCounter = 0;

            for (let prop2 in gauge) {
                innerCounter++;
                if (innerCounter === 2) {
                    gauge2 = gauge[prop2];
                }
            }
            break;
        }
    }
    return gauge2;
}

function inventoryHas(id) {

    let inv;
    let inv2;
    let counter = 0;

    for (let prop1 in user) {
        counter++;

        if (counter === 35) {
            inv = user[prop1];
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
    let team;
    let counter = 0;

    for (let prop1 in user) {
        counter++;

        if (counter === 11) {
            team = user[prop1];
            break;
        }
    }

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

function drawsp() {
    let drawSpike = null;

    if (drawSpike === null || drawSpike === "null") {
        [5, 12, 13, 14, 20, 52, 10, 15, 16, 17, 21, 51, 45, 46, 47, 48, 49, 53].forEach((id) => {
            if (unit()[id].length > 0) {
                for (let e in unit()[id]) {
                    for (const k in unit()[id][e]) {
                        if (typeof unit()[id][e][k] === "function") {
                            if (unit()[id][e][k].toString().includes("width")) {
                                drawSpike = k;
                                break; // Exit the loop once the key is found
                            }
                        }
                    }
                }
            }
        });
    }
    return drawSpike
}

unsafeWindow.sp = drawsp
function ads() {
    let uwu = document.getElementById("preroll")
    let uws = document.getElementById("trevda")
    let style = document.createElement('style');

    uwu.remove()
    uws.remove()
    style.innerHTML = '.grecaptcha-badge { visibility: hidden; }';

    document.head.appendChild(style);
}


function autoBook() {

    let craft;
    let counter = 0;
    for (let prop1 in client) {
        counter++;
        if (counter === 96) {
            craft = prop1
            break;
        }
    }

    client[craft] = (id) => {

        Settings.AutoCraft.lastcraft = id

        send([packets.equip, 28])
        send([packets.craft, id]);
        return 1;
    };
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
    return copy_game["ᐃⲆᐃ"][chest.action / 2 - 1]["info"]["ⵠΔ"][0];
}


function aimbot() {
    requestAnimationFrame(aimbot);
    if (!Settings.AMB.off) Settings.textalert.e = false;

    let myPlayer = myplayer();
    const maxDist = 450000;
    const outDist = 120000;
    const normDist = 50000;

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

    function calcAngle(_, $, o) {
        return _ && $ ? (o ? Math.atan2($.r.y - _.r.y, $.r.x - _.r.x) : Math.atan2($.y - _.y, $.x - _.x)) : null;
    }

    function EnemyToAttack(myPlayer, PlayerList) {
        let nearest = NearestEnemy(myPlayer, PlayerList);

        if (Settings.AMB_rotation && Settings.AMB.e && Settings.AMB.a != null) {
            mouse.ⵠΔΔⲆ.x = getUserPosition()[0] + nearest.x;
            mouse.ⵠΔΔⲆ.y = getUserPosition()[1] + nearest.y;
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
                myRange = myPlayer.clothe == 85 || myPlayer.clothe == 83 ? (myPlayer[fly] ? 120.8 : 97.6) : null;
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
                    mouse.ⵠΔΔⲆ.x = getUserPosition()[0] + Enemy.x;
                    mouse.ⵠΔΔⲆ.y = getUserPosition()[1] + Enemy.y;
                }
                ctx.save();
                ctx.font = "15px Baloo Paaji";
                ctx.fillStyle = "red";
                ctx.fillText(`⬤`, mouse.ⵠΔΔⲆ.x, mouse.ⵠΔΔⲆ.y);
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


function blizzard() {

    let blizzard1;
    let sandstorm
    let tempset;
    let counter = 0;

    for (let prop1 in user) {
        counter++;

        if (counter === 37) {
            autofeed = user[prop1]
        }
        if (counter === 47) {
            sandstorm = user[prop1]
        }

        if (counter === 48) {

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
}
let ally = [];
const extractor_ids = [24, 25, 26, 27, 28];
const foodItems = [138, 110, 117, 192, 189, 205, 207, 209, 143]
let ice = [142, 200];
let lastFood = [0, 0];
let enemyForAMB = { pid: null, d: 0 };
let lootboxsinfo = {};
let deathboxinfo = {};

/*
// Xray!!!
const originalDrawImage = CanvasRenderingContext2D.prototype.drawImage;

CanvasRenderingContext2D.prototype.drawImage = function (...args) {
    if (Settings.Xray.e) {
        this.globalAlpha = Settings.Xray.a;
        try {
            return originalDrawImage.apply(this, args);
        } finally {
            this.globalAlpha = 1;
        }
    }
    return originalDrawImage.apply(this, args);
};
*/


function loadSpikes() {
    unsafeWindow.ReiditeSpikeAlly = new Image;
    unsafeWindow.ReiditeSpikeAlly.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-reidite-spike-ally.png"
    unsafeWindow.AmethystSpikeAlly = new Image;
    unsafeWindow.AmethystSpikeAlly.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-amethyst-spike-ally.png"
    unsafeWindow.DiamondSpikeAlly = new Image;
    unsafeWindow.DiamondSpikeAlly.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-diamond-spike-ally.png"
    unsafeWindow.GoldSpikeAlly = new Image;
    unsafeWindow.GoldSpikeAlly.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-gold-spike-ally.png"
    unsafeWindow.StoneSpikeAlly = new Image;
    unsafeWindow.StoneSpikeAlly.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-stone-spike-ally.png"
    unsafeWindow.WoodSpikeAlly = new Image;
    unsafeWindow.WoodSpikeAlly.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-wood-spike-ally.png"

    unsafeWindow.ReiditeSpikeEnemy = new Image;
    unsafeWindow.ReiditeSpikeEnemy.src = 'https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-reidite-spike-enemy.png'
    unsafeWindow.AmethystSpikeEnemy = new Image;
    unsafeWindow.AmethystSpikeEnemy.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-amethyst-spike-enemy.png"
    unsafeWindow.DiamondSpikeEnemy = new Image;
    unsafeWindow.DiamondSpikeEnemy.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-diamond-spike-enemy.png"
    unsafeWindow.GoldSpikeEnemy = new Image;
    unsafeWindow.GoldSpikeEnemy.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-gold-spike-enemy.png"
    unsafeWindow.StoneSpikeEnemy = new Image;
    unsafeWindow.StoneSpikeEnemy.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-stone-spike-enemy.png"
    unsafeWindow.WoodSpikeEnemy = new Image;
    unsafeWindow.WoodSpikeEnemy.src = "https://raw.githubusercontent.com/sfagasdzdgfhs/spikes/main/day-wood-spike-enemy.png"
    console.log("Load Spikes successful");
}



function colors() {
    // requestAnimationFrame(colors)

    if (!unsafeWindow.ReiditeSpikeAlly) {
        loadSpikes();
    };


    if (script.user.alive && Settings.ColoredSpikes) {
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
            if (unsafeWindow[e].length > 800 && unsafeWindow[e].length < 1500) {
                unsafeWindow.sprite = unsafeWindow[e];
                console.log(e);
            }
        }
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

        unsafeWindow.sprite[10010] = [ReiditeSpikeAlly, ReiditeSpikeAlly];
        unsafeWindow.sprite[10011] = [ReiditeSpikeEnemy, ReiditeSpikeEnemy];

        let push = Array.prototype.push
        Array.prototype.push = function (p) {
            if (p) {
                let a = Object.keys(p);
                5 == a.length && a.includes("draw") && a.includes("in_button") && 32 !== p.id && 130 !== p.id && 127 !== p.id && 4 !== p.id && 25 !== p.id && 34 !== p.id && 87 !== p.id && (unsafeWindow.inventory = this);
            }
            unsafeWindow.wow = 'Δⵠᐃⵠ'
            if (p && null != p.type && null != p.id && p.x && p.y) {
                switch ((0 === p.type && pid(p) === unsafeWindow.playerID && (unsafeWindow.player = p), p.type)) {

                    case ITEMS.SPIKE: {
                        p.ally = unsafeWindow.playerID === pid(p) || isAlly(pid(p));
                        let l = p[wow]; // draw
                        p[wow] = function (a) {
                            return Settings.ColoredSpikes ? (p.ally ? l.apply(this, [1e4]) : l.apply(this, [10001])) : l.apply(this, arguments);
                        };
                        break;
                    }
                    case ITEMS.STONE_SPIKE: {
                        p.ally = unsafeWindow.playerID === pid(p) || isAlly(pid(p));
                        let i = p[wow]; // draw
                        p[wow] = function (a) {
                            return Settings.ColoredSpikes ? (p.ally ? i.apply(this, [10002]) : i.apply(this, [10003])) : i.apply(this, arguments);
                        };
                        break;
                    }
                    case ITEMS.GOLD_SPIKE: {
                        p.ally = unsafeWindow.playerID === pid(p) || isAlly(pid(p));
                        let e = p[wow]; // draw
                        p[wow] = function (a) {
                            return Settings.ColoredSpikes ? (p.ally ? e.apply(this, [10004]) : e.apply(this, [10005])) : e.apply(this, arguments);
                        };
                        break;
                    }
                    case ITEMS.DIAMOND_SPIKE: {
                        p.ally = unsafeWindow.playerID === pid(p) || isAlly(pid(p));
                        let t = p[wow]; // draw
                        p[wow] = function (a) {
                            return Settings.ColoredSpikes ? (p.ally ? t.apply(this, [10006]) : t.apply(this, [10007])) : t.apply(this, arguments);
                        };
                        break;
                    }
                    case ITEMS.AMETHYST_SPIKE: {
                        p.ally = unsafeWindow.playerID === pid(p) || isAlly(pid(p));
                        let r = p[wow]; // draw
                        p[wow] = function (a) {
                            return Settings.ColoredSpikes ? (p.ally ? r.apply(this, [10008]) : r.apply(this, [10009])) : r.apply(this, arguments);
                        };
                        break;
                    }
                    case ITEMS.REIDITE_SPIKE: {
                        p.ally = unsafeWindow.playerID === pid(p) || isAlly(pid(p));
                        let y = p[wow]; // draw
                        p[wow] = function (a) {
                            return Settings.ColoredSpikes ? (p.ally ? y.apply(this, [10010]) : y.apply(this, [10011])) : y.apply(this, arguments);
                        };
                        break;
                    }
                    case unit()[0]: {
                        let w = p[wow]
                    }
                }
            }
            return push.apply(this, arguments);
        };
    }
}

function updater() {
    requestAnimationFrame(updater)

    unsafeWindow.ctx = document.getElementById("game_canvas").getContext("2d");

    script.user.alive = user[Object.keys(user)[10]];

    let i = 22.5;
    for (hack in Settings) {
        if (Settings[hack].e && Settings[hack].k) {
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
    if (Settings.textalert.e) {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 6;
        ctx.fillStyle = "red";
        ctx.strokeStyle = "black";
        ctx.font = "55px Baloo Paaji";
        ctx.strokeText(Settings.textalert.t, unsafeWindow.innerWidth / 2, unsafeWindow.innerHeight / 14);
        ctx.fillText(Settings.textalert.t, unsafeWindow.innerWidth / 2, unsafeWindow.innerHeight / 14);
        ctx.restore();
    }

    if (script.user.alive) {

        let gauges = user[Object.keys(user)[29]]
        script.world.units = world[Object.keys(world)[4]]
        script.world.fast_units = world[Object.keys(world)[5]]
        script.user.id = user.id;
        script.user.uid = user[Object.keys(user)[17]]
        script.user.gauges.health = Math.floor(gauges[Object.keys(gauges)[1]] * 200)
        script.user.gauges.hungry = Math.floor(gauges[Object.keys(gauges)[2]] * 100)
        script.user.gauges.cold = Math.floor(gauges.c * 100) + Math.floor(100 - (gauges[Object.keys(gauges)[5]] * 100))
        script.user.gauges.water = Math.floor(gauges[Object.keys(gauges)[3]] * 100)

        script.user.cam.x = user[Object.keys(user)[28]].x
        script.user.cam.y = user[Object.keys(user)[28]].y
        script.user.team = user[Object.keys(user)[21]]

        let myPlayer = script.world.fast_units[script.user.uid];

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

        if (Settings.gaugesInfo) {
            const r = unsafeWindow.innerWidth / 2;
            const a = unsafeWindow.innerHeight - 50;
            let hp = script.user.gauges.health
            let food = script.user.gauges.hungry
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

            ctx.strokeText(script.user.gauges.cold + "", r + 210 - 100, a - 70);
            ctx.fillText(script.user.gauges.cold + "", r + 210 - 100, a - 70);

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

        const players = script.world.units[0];
        if (Settings.showFly) {
            ctx.save();
            for (let i = 0; i < players.length; i++) {
                if (players[i][fly]) {
                    ctx.font = '20px Baloo Paaji';
                    ctx.strokeStyle = "black";
                    ctx.fillStyle = '#3683ff';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.strokeText('Fly', script.user.cam.x + players[i].x, script.user.cam.y + players[i].y + 35);
                    ctx.fillText('Fly', script.user.cam.x + players[i].x, script.user.cam.y + players[i].y + 35);
                }

            }
            ctx.restore();
        }

        if (Settings.showNames) {
            ctx.save();
            for (let i = 0; i < players.length; i++) {
                const pid = players[i][Object.keys(players[i])[1]]
                if (pid === script.user.id) continue;
                let nikcname = players[i].ΔⵠⵠΔ.ⲆⵠΔⵠΔ;
                ctx.font = '20px Baloo Paaji';
                ctx.strokeStyle = "black";
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.strokeText(nikcname, script.user.cam.x + players[i].x - 1, script.user.cam.y + players[i].y - 70);
                ctx.fillText(nikcname, script.user.cam.x + players[i].x - 1, script.user.cam.y + players[i].y - 70);
            };
            ctx.restore();
        }

        if (Settings.tracers) {
            ctx.save();
            if (Settings.PlayerTracers) {
                for (let i = 0; i < players.length; i++) {
                    const pid = players[i][Object.keys(players[i])[1]]
                    if (pid === script.user.id) continue;
                    ctx.lineWidth = 2.6;
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
                    ctx.lineWidth = 2.6;
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
                    ctx.lineWidth = 2.6;
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
                    ctx.lineWidth = 2.6;
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
                    ctx.lineWidth = 2.6;
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
                    ctx.lineWidth = 2.6;
                    ctx.strokeStyle = "pink";
                    ctx.beginPath();
                    ctx.moveTo(script.user.cam.x + myPlayer.x, script.user.cam.y + myPlayer.y);
                    ctx.lineTo(script.user.cam.x + mobs[i].x, script.user.cam.y + mobs[i].y);
                    ctx.stroke();
                };
            }
            if (Settings.VultureTracers) {
                mobs = script.world.units[75];
                for (let i = 0; i < mobs.length; i++) {
                    ctx.lineWidth = 2.6;
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
                    ctx.lineWidth = 2.6;
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
                    ctx.lineWidth = 2.6;
                    ctx.strokeStyle = "#eb6200";
                    ctx.beginPath();
                    ctx.moveTo(script.user.cam.x + myPlayer.x, script.user.cam.y + myPlayer.y);
                    ctx.lineTo(script.user.cam.x + mobs[i].x, script.user.cam.y + mobs[i].y);
                    ctx.stroke();
                };
            }


            ctx.restore();
        }

        if (Settings.toteminfo) {
            let totems = script.world.units[29];
            ctx.save();
            for (let i = 0; i < totems.length; i++) {
                ctx.font = '20px Baloo Paaji';
                ctx.strokeStyle = "black";
                ctx.lineWidth = 7;
                ctx.fillStyle = "white";
                ctx.strokeText(totems[i].info >= 16 ? "🤵" + totems[i].info % 16 : "🤵" + totems[i].info, script.user.cam.x + totems[i].x - 20, script.user.cam.y + totems[i].y - 20);
                ctx.fillText(totems[i].info >= 16 ? "🤵" + totems[i].info % 16 : "🤵" + totems[i].info, script.user.cam.x + totems[i].x - 20, script.user.cam.y + totems[i].y - 20);

                ctx.strokeText(totems[i].info >= 16 ? "Lock" : "Open", script.user.cam.x + totems[i].x - 20, script.user.cam.y + totems[i].y + 5);
                ctx.fillText(totems[i].info >= 16 ? "Lock" : "Open", script.user.cam.x + totems[i].x - 20, script.user.cam.y + totems[i].y + 5);
            };
            ctx.restore();
        }


        if (Settings.ColoredSpikes) {
            if (!unsafeWindow.WoodSpikeAlly) loadSpikes();

            const mypid = myPlayer[Object.keys(myPlayer)[1]]
            ctx.save();
            ctx.lineWidth = 8;
            ctx.font = "40px Baloo Paaji";
            ctx.fillStyle = "black";

            units = unit()
            woodspikes = units[5];
            for (let i = 0; i < woodspikes.length; i++) {
                spike = woodspikes[i];
                spike.ally = mypid === spike.ΔᐃᐃⲆ || isAlly(spike.ΔᐃᐃⲆ);
                if (spike.ally) {
                    ctx.fillStyle = "green";
                } else {
                    ctx.fillStyle = "red";
                }
                ctx.fillText(`⬤`, spike.x + script.user.cam.x - 18, spike.y + script.user.cam.y + 15);
            }
            stonespikes = units[12];
            for (let i = 0; i < stonespikes.length; i++) {
                spike = stonespikes[i];
                spike.ally = mypid === spike.ΔᐃᐃⲆ || isAlly(spike.ΔᐃᐃⲆ);
                if (spike.ally) {
                    ctx.fillStyle = "green";
                } else {
                    ctx.fillStyle = "red";
                }
                ctx.fillText(`⬤`, spike.x + script.user.cam.x - 18, spike.y + script.user.cam.y + 15);
            }
            goldspikes = units[13];
            for (let i = 0; i < goldspikes.length; i++) {
                spike = goldspikes[i];
                spike.ally = mypid === spike.ΔᐃᐃⲆ || isAlly(spike.ΔᐃᐃⲆ);
                if (spike.ally) {
                    ctx.fillStyle = "green";
                } else {
                    ctx.fillStyle = "red";
                }
                ctx.fillText(`⬤`, spike.x + script.user.cam.x - 18, spike.y + script.user.cam.y + 15);
            }
            diamondspikes = units[14];
            for (let i = 0; i < diamondspikes.length; i++) {
                spike = diamondspikes[i];
                spike.ally = mypid === spike.ΔᐃᐃⲆ || isAlly(spike.ΔᐃᐃⲆ);
                if (spike.ally) {
                    ctx.fillStyle = "green";
                } else {
                    ctx.fillStyle = "red";
                }
                ctx.fillText(`⬤`, spike.x + script.user.cam.x - 18, spike.y + script.user.cam.y + 15);
            }
            amethystspikes = units[20];
            for (let i = 0; i < amethystspikes.length; i++) {
                spike = amethystspikes[i];
                spike.ally = mypid === spike.ΔᐃᐃⲆ || isAlly(spike.ΔᐃᐃⲆ);
                if (spike.ally) {
                    ctx.fillStyle = "green";
                } else {
                    ctx.fillStyle = "red";
                }
                ctx.fillText(`⬤`, spike.x + script.user.cam.x - 18, spike.y + script.user.cam.y + 15);
            }
            reiditespikes = units[52];
            for (let i = 0; i < reiditespikes.length; i++) {
                spike = reiditespikes[i];
                spike.ally = mypid === spike.ΔᐃᐃⲆ || isAlly(spike.ΔᐃᐃⲆ);
                if (spike.ally) {
                    ctx.fillStyle = "green";
                } else {
                    ctx.fillStyle = "red";
                }
                ctx.fillText(`⬤`, spike.x + script.user.cam.x - 18, spike.y + script.user.cam.y + 15);
            }
            ctx.restore();

        }

        if (Settings.boxinfo) {
            deathBoxs = units[82];
            for (let i = 0; i < deathBoxs.length; i++) {
                const box = deathBoxs[i];
                if (box.id in deathboxinfo) {
                    if (deathboxinfo[box.id][1] != box.action) {
                        if (box.action != 0) { deathboxinfo[box.id][0] += 1; }
                        deathboxinfo[box.id][1] = box.action;
                    }
                    deathboxinfo[box.id][2] = 0;
                } else {
                    deathboxinfo[box.id] = [0, 0, 0]
                }
                let count = deathboxinfo[box.id][0];
                ctx.save();
                ctx.lineWidth = 8;
                ctx.font = "20px Baloo Paaji";
                ctx.strokeStyle = "red";
                ctx.fillStyle = "black";
                ctx.strokeText(`Death box`, box.x + script.user.cam.x - 20, box.y + script.user.cam.y - 15);
                ctx.fillText(`Death box`, box.x + script.user.cam.x - 20, box.y + script.user.cam.y - 15);
                ctx.strokeText(`${box.info}`, box.x + script.user.cam.x - 10, box.y + script.user.cam.y + 5);
                ctx.fillText(`${box.info}`, box.x + script.user.cam.x - 10, box.y + script.user.cam.y + 5);
                ctx.strokeText(`${count}`, box.x + script.user.cam.x - 10, box.y + script.user.cam.y + 25);
                ctx.fillText(`${count}`, box.x + script.user.cam.x - 10, box.y + script.user.cam.y + 25);
                ctx.restore();
            }
            for (const id in deathboxinfo) {
                deathboxinfo[id][2] += 1
                if (deathboxinfo[id][2] > 1200) {
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
                    lootboxsinfo[box.id][2] = 0;
                } else {
                    lootboxsinfo[box.id] = [0, 0, 0]
                }
                let count = lootboxsinfo[box.id][0];
                ctx.save();
                ctx.lineWidth = 8;
                ctx.font = "20px Baloo Paaji";
                ctx.strokeStyle = "black";
                ctx.fillStyle = "white";
                ctx.strokeText(`loot`, box.x + script.user.cam.x - 20, box.y + script.user.cam.y - 5);
                ctx.fillText(`loot`, box.x + script.user.cam.x - 20, box.y + script.user.cam.y - 5);
                ctx.strokeText(`${count}`, box.x + script.user.cam.x - 10, box.y + script.user.cam.y + 10);
                ctx.fillText(`${count}`, box.x + script.user.cam.x - 10, box.y + script.user.cam.y + 10);
                ctx.restore();
            }
            for (const id in lootboxsinfo) {
                lootboxsinfo[id][2] += 1
                if (lootboxsinfo[id][2] > 600) {
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
                ctx.save();
                let img = getImgForChest(chest)
                if (img) ctx.drawImage(img, chest.x + script.user.cam.x - 32, chest.y + script.user.cam.y - 32, 60, 65);
                ctx.lineWidth = 8;
                ctx.font = "20px Baloo Paaji";
                ctx.strokeStyle = "red";
                ctx.fillStyle = "black";
                if (chest.lock) {
                    ctx.strokeText(`L`, chest.x + script.user.cam.x - 10, chest.y + script.user.cam.y - 25);
                    ctx.fillText(`L`, chest.x + script.user.cam.x - 10, chest.y + script.user.cam.y - 25);
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
                ctx.restore();
            }
        }

        /*
        if (Settings.Xray.e) {
            console.log('Xray');
            var canvas2 = document.getElementById('game_canvas');
            var ctx2 = canvas2.getContext('2d');
            ctx2.globalAlpha = 0.5;
        }
        */

        if (Settings.buildinfo) {
            for (let i = 0; i < extractor_ids.length; ++i) {
                const spikeType = extractor_ids[i];
                const extractors = units[spikeType];
                if (script.user.alive) {
                    for (let j = 0; j < extractors.length; j++) {
                        const extractor = extractors[j];
                        ctx.save();
                        ctx.lineWidth = 8;
                        ctx.font = "20px Baloo Paaji";
                        ctx.strokeStyle = "black";
                        ctx.fillStyle = "white";
                        ctx.strokeText(`${extractor.info & 0xFF}` + 'x', extractor.x + script.user.cam.x - 15, extractor.y + script.user.cam.y - 5);
                        ctx.fillText(`${extractor.info & 0xFF}` + 'x', extractor.x + script.user.cam.x - 15, extractor.y + script.user.cam.y - 5);
                        ctx.strokeText(`${(extractor.info & 0xFF00) >> 8}` + 'x', extractor.x + script.user.cam.x - 15, extractor.y + script.user.cam.y + 15);
                        ctx.fillText(`${(extractor.info & 0xFF00) >> 8}` + 'x', extractor.x + script.user.cam.x - 15, extractor.y + script.user.cam.y + 15);
                        ctx.restore();
                    }
                }
            }

            mils = units[32];
            for (let i = 0; i < mils.length; ++i) {
                const mill = mils[i];
                let x = mill.info;
                let b = parseInt(x / 256);
                x -= b * 256;

                ctx.save();
                ctx.lineWidth = 8;
                ctx.font = "20px Baloo Paaji";
                ctx.strokeStyle = "black";
                ctx.fillStyle = "white";
                ctx.strokeText(`${x}` + '🌾', mill.x + script.user.cam.x - 10, mill.y + script.user.cam.y - 10);
                ctx.fillText(`${x}` + '🌾', mill.x + script.user.cam.x - 10, mill.y + script.user.cam.y - 10);
                ctx.strokeText(`${b}` + '🥣', mill.x + script.user.cam.x - 10, mill.y + script.user.cam.y + 15);
                ctx.fillText(`${b}` + '🥣', mill.x + script.user.cam.x - 10, mill.y + script.user.cam.y + 15);
                mill
                ctx.restore();
            }

            ovens = units[34];
            for (let i = 0; i < ovens.length; ++i) {
                const oven = ovens[i];
                let x = oven.info;
                let b = parseInt(x / 1024);
                x -= b * 1024;
                let m = parseInt(x / 32);
                x -= m * 32;

                ctx.save();
                ctx.lineWidth = 8;
                ctx.font = "20px Baloo Paaji";
                ctx.strokeStyle = "black";
                ctx.fillStyle = "white";
                ctx.strokeText(`${x}` + '🥢', oven.x + script.user.cam.x - 10, oven.y + script.user.cam.y - 25);
                ctx.fillText(`${x}` + '🥢', oven.x + script.user.cam.x - 10, oven.y + script.user.cam.y - 25);
                ctx.strokeText(`${m}` + '🥣', oven.x + script.user.cam.x - 10, oven.y + script.user.cam.y - 5);
                ctx.fillText(`${m}` + '🥣', oven.x + script.user.cam.x - 10, oven.y + script.user.cam.y - 5);
                ctx.strokeText(`${b}` + '🍞', oven.x + script.user.cam.x - 10, oven.y + script.user.cam.y + 15);
                ctx.fillText(`${b}` + '🍞', oven.x + script.user.cam.x - 10, oven.y + script.user.cam.y + 15);

                ctx.restore();
            }

        }
    } else {
        let lootboxsinfo = {};
        let deathboxinfo = {};
    }
}

function mainscript() {
    if (!script.user.alive) return
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
    if (Settings.AutoSteal.e) {
        var chests = units[11];
        for (let i = 0; i < chests.length; ++i) {
            if (getdist(script.myPlayer, chests[i]) <= 300) {
                const pid = chests[i][Object.keys(chests[i])[1]]
                send([packets.chestTake, pid, chests[i].id]);
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

    let rec;
    let counter = 0;

    for (let prop1 in client) {
        counter++;
        if (counter === 116) {
            rec = prop1
            break;
        }
    }

    client[rec] = (id) => {
        Settings.AutoRecycle.lastrecycle = id
        send([packets.recycle, id]);
    };

}

let readys = {
    AutoSpike: true,
    AutoWall: true,
    AutoCraft: true,
};

let autoputredsinterval
let autoputreds = false

let placeSpikesInterval;
let pressed = false;

let autototemInterval;
let autototem = false;

let autoextractortakeInterval;
let autoextractortake = false;

let autoextractorputInterval;
let autoextractorput = false;

let awutostealInterval;
let awutosteal = false;



function main() {
    console.log(Settings);
    autoBook()
    blizzard()
    updater()
    colors()
    recycle()
    aimbot()

    setInterval(() => {
        mainscript()
    }, 130);
}

let ready_ = 0;

function initialize() {
    try {
        if (ready_ === 0 && user !== undefined && world !== undefined && client !== undefined) {
            main()
            log("On");
            ready_++;
        }
    } catch (err) {
        log("Off");
        log(err)
    }
}

setInterval(initialize, 1500);