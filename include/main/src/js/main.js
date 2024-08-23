/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/common.css":
/*!****************************!*\
  !*** ./src/css/common.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://2023_china_main/./src/css/common.css?");

/***/ }),

/***/ "./src/css/index.css":
/*!***************************!*\
  !*** ./src/css/index.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://2023_china_main/./src/css/index.css?");

/***/ }),

/***/ "./src/css/reset.css":
/*!***************************!*\
  !*** ./src/css/reset.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://2023_china_main/./src/css/reset.css?");

/***/ }),

/***/ "./src/js/common.js":
/*!**************************!*\
  !*** ./src/js/common.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./src/js/index.js\");\n/* harmony import */ var _css_common_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/common.css */ \"./src/css/common.css\");\n/* harmony import */ var _css_index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../css/index.css */ \"./src/css/index.css\");\n/* harmony import */ var _css_reset_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../css/reset.css */ \"./src/css/reset.css\");\n\r\n\r\n\r\n\r\n\r\nvar scale_ratio = 1;\r\n\r\nwindow.addEventListener(\"load\", function () {\r\n    console.log(\"load\");\r\n    (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.initPage)();\r\n    setRootScale();\r\n    window.addEventListener(\"resize\", function (e) {\r\n        setRootScale();\r\n    });\r\n    setLocalStorage(\"HTML\");\r\n    // close loading\r\n    closeLoading();\r\n});\r\n\r\nvar broadcaster = (function () {\r\n    var listeners = {};\r\n\r\n    return {\r\n        on: function (eventName, handler, context) {\r\n            var array = listeners[eventName];\r\n            if (array === undefined) {\r\n                array = listeners[eventName] = [];\r\n            }\r\n            array.push({ handler: handler, context: context });\r\n        },\r\n\r\n        off: function (eventName, handler, context) {\r\n            var array = listeners[eventName];\r\n            if (array === undefined) {\r\n                return;\r\n            }\r\n            for (var i = 0; i < array.length; ++i) {\r\n                var listener = array[i];\r\n                if (listener[\"handler\"] === handler && listener[\"context\"] === context) {\r\n                    array.splice(i, 1);\r\n                    return;\r\n                }\r\n            }\r\n        },\r\n\r\n        trigger: function (eventName, data) {\r\n            var array = listeners[eventName];\r\n            if (array === undefined) {\r\n                return;\r\n            }\r\n            for (var i = 0; i < array.length; ++i) {\r\n                var listener = array[i];\r\n                listener[\"handler\"].call(listener[\"context\"], data);\r\n            }\r\n        }\r\n    };\r\n}());\r\n\r\n/* 리사이징 */\r\nfunction setRootScale() {\r\n    var root = document.querySelector('#wrap');\r\n    var ratioX = window.innerWidth / 1280;\r\n    var ratioY = window.innerHeight / 720;\r\n    var ratio = ratioX > ratioY ? ratioY : ratioX;\r\n    scale_ratio = ratio;\r\n    var newLeftPos = Math.abs(Math.floor((1280 * ratio - window.innerWidth) / 2));\r\n    var newTopPos = Math.abs(Math.floor((720 * ratio - window.innerHeight) / 2));\r\n    root.setAttribute(\r\n        \"style\",\r\n        \"left: \" +\r\n        newLeftPos +\r\n        \"px;\" +\r\n        \"top: \" +\r\n        newTopPos +\r\n        \"px;\" +\r\n        \"transform: scale(\" +\r\n        ratio +\r\n        \",\" +\r\n        ratio +\r\n        \"); -webkit-transform: scale(\" +\r\n        ratio +\r\n        \",\" +\r\n        ratio +\r\n        \"); -ms-transform: scale(\" +\r\n        ratio +\r\n        \",\" +\r\n        ratio +\r\n        \");\"\r\n    );\r\n    root.style.visibility = \"visible\";\r\n    broadcaster.trigger(\"RESIZE_WINDOW\", { windowRatio: ratio });\r\n}\r\n\r\nfunction closeLoading() {\r\n    if (window.jj) {\r\n        var opener = window.jj.opener();\r\n        if (opener && opener.closeSplash) opener.closeSplash(window);\r\n    }\r\n}\r\n\r\nfunction setLocalStorage(mode) {\r\n    try {\r\n        window.localStorage.setItem(\"FORTEACHERCD_MODE\", mode);\r\n    } catch (e) {\r\n        console.log(\"err : \", e);\r\n    }\r\n}\n\n//# sourceURL=webpack://2023_china_main/./src/js/common.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initPage: () => (/* binding */ initPage)\n/* harmony export */ });\nconst $ = (selector) => document.querySelector(selector)\nconst $All = (selector) => document.querySelectorAll(selector)\n\nvar lessonNow = 0;\nvar subject = 0;\nvar chapterBtnListArr = [];\n\nvar classBtn = $(\".class_btn\");\nvar archiveBtn = $(\".archive_btn\");\nvar progressBtn = $(\".progress_btn\");\nvar helpBtn = $(\".help_btn\");\nvar chapterCloseBtn = $(\".chapter_close_btn\");\nvar digitalBtn = $(\".digital_btn\");\nvar chapterPopup = $('#chapter_popup');\nvar chapterListBox = $('.chapter_list_box');\nvar chapterNum = $(\".chapter_num\");\nvar chapterTitle = $(\".chapter_title\");\nvar chapterNaviLeftBtn = $(\".chapter_navi_left\");\nvar chapterNaviRightBtn = $(\".chapter_navi_right\");\n\nconst lessonNum = $All('.lesson_num');\nconst lessonTitle = $All('.lesson_title');\nconst lessonBtnList = $All('.lesson_btn:nth-child(n)');\nconst ebookBtn = $All(\".lesson_btn .ebook_btn\");\nconst chapterSprite = $All(\".chapter_sprite\");\nconst chapterBtnList = $All('.chapter_list_btn:nth-child(n)');\nconst chapterNavidotList = $All('.chapter_navi_dot');\n\nfunction initPage() {\n  console.log(\"initPage\");\n  if (!window.Progress) { } else { window.Progress.initiate(); }\n  var urlSplit = window.location.search.split(/=/, 2);\n  subject = urlSplit[1];\n\n  var setSubject = subject.split(/_/, 2);\n  document.querySelector(\"body\").setAttribute('subject', setSubject[1]);\n  document.querySelector(\"#wrap\").setAttribute('cardNumber', window.MATH.main[subject].cardNumber);\n\n\n  $(\"#wrap\").classList.add(\"grade_\" + window.MATH.main[subject].grade);\n  $(\".title\").innerHTML = \"수학 \" + window.MATH.main[subject].grade;\n\n  for (let i = 0; i < window.MATH.main[subject].mathLessons.length; i++) {\n    var num = lessonNum[i];\n    var title = lessonTitle[i];\n    num.innerText = window.MATH.main[subject].mathLessons[i].lesson;\n    title.innerText = window.MATH.main[subject].mathLessons[i].title;\n    chapterNavidotList[i].setAttribute(\"data-chapter\", window.MATH.main[subject].mathLessons[i].lesson.toString());\n  }\n\n  archiveBtn.addEventListener(\"mouseover\", function (e) { e.target.classList.add(\"hover\"); });\n  archiveBtn.addEventListener(\"mouseout\", function (e) { e.target.classList.remove(\"hover\"); });\n  helpBtn.addEventListener(\"mouseover\", function (e) { e.target.classList.add(\"hover\"); });\n  helpBtn.addEventListener(\"mouseout\", function (e) { e.target.classList.remove(\"hover\"); });\n  classBtn.addEventListener(\"click\", function () { window.MY_CLASS_MAKER.openMyClassMaker(); })\n  archiveBtn.addEventListener(\"click\", function () { archiveBtnClick(); })\n  progressBtn.addEventListener(\"click\", function () { window.Progress.open(); })\n  helpBtn.addEventListener(\"click\", function () { helpBtnClick(); })\n  chapterNaviLeftBtn.addEventListener(\"click\", function (e) { chapterNaviLeftBtnClick(e); })\n  chapterNaviRightBtn.addEventListener(\"click\", function (e) { chapterNaviRightBtnClick(e); })\n  digitalBtn.addEventListener(\"click\", function () { window.open(window.MATH.main[subject].btnUrl[0].digitalTool); })\n  chapterCloseBtn.addEventListener(\"click\", function () { chapterCloseBtnClick(); })\n\n  chapterNavidotList.forEach((dot, index) => {\n    dot.addEventListener(\"click\", function (e) {\n      e.stopPropagation();\n      chapterNaviDotBtnClick(e, index);\n    });\n    dot.addEventListener(\"mouseover\", function (e) { e.target.classList.add(\"hover\"); });\n    dot.addEventListener(\"mouseout\", function (e) { e.target.classList.remove(\"hover\"); });\n  })\n\n  ebookBtn.forEach((item) => {\n    item.addEventListener(\"click\", function (e) {\n      e.stopPropagation();\n      ebookBtnClick(item);\n    });\n    item.addEventListener(\"mouseover\", function (e) { e.target.classList.add(\"hover\"); });\n    item.addEventListener(\"mouseout\", function (e) { e.target.classList.remove(\"hover\"); });\n  })\n\n  lessonBtnList.forEach((item, index) => {\n    var leng = lessonBtnList.length;\n    var flip = document.cookie;\n    if (!(flip == (\"flip=1\"))) introFlipAni(item, index, leng);\n    item.addEventListener(\"mouseover\", function (e) { e.target.style.animationName = 'sprite_ani'; e.target.classList.add(\"on\"); });\n    item.addEventListener(\"mouseout\", function (e) { e.target.style.animationName = ''; e.target.classList.remove(\"on\"); });\n  })\n\n  for (let i = 0; i < lessonBtnList.length; i++) { lessonBtnList[i].addEventListener(\"click\", function (e) { lessonBtnListClick(e, i); }) }\n} //initPage end\n\n// function\nfunction introFlipAni(e, i, leng) {\n  e.classList.add(\"point-none\");\n\n  // 한번에 전부\n  e.style.transform = \"rotateY(180deg)\";\n  setTimeout(() => {\n    e.style.transform = \"rotateY(0deg)\";\n    setTimeout(() => { e.classList.remove(\"point-none\"); }, 750);\n  }, 650);\n\n  if (i == (leng - 1)) document.cookie = \"flip=1; max-age=60000\";\n}\n\nfunction lessonBtnListClick(e, index) {\n  console.log(\"lessonBtnListClick\", index);\n  lessonNow = index;\n  var btn = e.target.parentNode;\n  lessonBtnList.forEach((item, i) => {\n    item.classList.add('point-none');\n    setTimeout(() => {\n      item.classList.remove('point-none');\n    }, 500);\n    if (!(i == index)) if (item.classList.contains('flipOn')) item.style.transform = \"rotateY(0deg)\";\n  });\n  btn.classList.add('flipOn');\n  lessonFilp(e);\n}\n\nfunction chapterNaviLeftBtnClick(e) {\n  if (!(lessonNow == 0)) {\n    lessonNow--;\n    lessonChange(e, lessonNow);\n  }\n}\n\nfunction chapterNaviRightBtnClick(e) {\n  if (!(lessonNow == (window.MATH.main[subject].mathLessons.length - 1))) {\n    lessonNow++;\n    lessonChange(e, lessonNow);\n  }\n}\n\nfunction chapterNaviDotBtnClick(e, index) {\n  lessonNow = index;\n  chapterNavidotList.forEach(dot => {\n    dot.classList.remove(\"on\");\n  });\n  chapterNavidotList[index].classList.add(\"on\");\n  lessonChange(e, index);\n}\n\nfunction ebookBtnClick(e) {\n  var dataLesson = e.parentNode.parentNode.getAttribute(\"data-lesson\");\n  lessonNow = dataLesson;\n  chapterPopup.classList.remove(\"hide\");\n  lessonChange(e, lessonNow);\n  lessonBtnList.forEach(e => { lessonFilpReset(e) });\n}\n\nfunction chapterBtnListClick(e) {\n  var tg = e.target;\n  var chapterNow = tg.getAttribute('chapter-list-index');\n  var eBookMath = window.MATH.main[subject].mathLessons[lessonNow].corners[chapterNow].eBook;\n  openLink(eBookMath);\n}\n\nfunction chapterCloseBtnClick() { chapterPopup.classList.add(\"hide\"); }\nfunction archiveBtnClick(e) {\n  var url = \"../archive/index.html\";\n  window.location = url;\n  // window.open(url, '_blank');\n}\nfunction helpBtnClick(e) { console.log(\"helpBtn Click\"); }\n\nfunction openLink(url = '#', type = '_self') {\n  if (window.jj && window.jj.link) window.jj.link.html(url, type, { maximize: type === '_blank' });\n  else window.open(url, type);\n}\n\nfunction lessonFilp(event) {\n  let item = event.currentTarget;\n  if (item.style.transform == \"rotateY(180deg)\") item.style.transform = \"rotateY(0deg)\";\n  else item.style.transform = \"rotateY(180deg)\";\n}\n\nfunction lessonFilpReset(event) {\n  if (event.style.transform == \"rotateY(180deg)\") event.style.transform = \"rotateY(0deg)\";\n  else event.style.transform = \"rotateY(0deg)\";\n}\n\nfunction lessonChange(e, lessonNow) {\n  console.log(' !!!!! lessonNow = ', lessonNow);\n\n  chapterBtnListArr = [];\n  chapterListBox.innerHTML = \"\";\n  let newElement = \"\";\n  var unitLenMath = window.MATH.main[subject].mathLessons[lessonNow].unit.length;\n  if (unitLenMath > 10) chapterListBox.classList.add('ten');\n  else chapterListBox.classList.remove('ten');\n  for (let i = 0; i < unitLenMath; i++) {\n    var len = window.MATH.main[subject].mathLessons[lessonNow].unit[i].length;\n    if (len > 29) {\n      newElement +=\n      '<div class=\"chapter_list_btn btn twoline\" chapter-list-index=\"'+ i +'\">'\n      + '<div class=\"list_num\">' + window.MATH.main[subject].mathLessons[lessonNow].chasi[i] + '</div>'\n      + '<div class=\"list_text\">' + window.MATH.main[subject].mathLessons[lessonNow].unit[i] + '</div>'\n      + '</div>';\n    } else {\n      newElement +=\n        '<div class=\"chapter_list_btn btn\" chapter-list-index=\"'+ i +'\">'\n        + '<div class=\"list_num\">' + window.MATH.main[subject].mathLessons[lessonNow].chasi[i] + '</div>'\n        + '<div class=\"list_text\">' + window.MATH.main[subject].mathLessons[lessonNow].unit[i] + '</div>'\n        + '</div>';\n    }\n  }\n\n  chapterListBox.innerHTML += newElement;\n  chapterBtnListArr = chapterListBox.childNodes;\n  chapterBtnListArr.forEach.call(chapterBtnListArr, function (e) {\n    e.addEventListener(\"click\", chapterBtnListClick, false);\n    e.addEventListener(\"mouseenter\", function (e) { e.target.classList.add(\"hover\"); });\n    e.addEventListener(\"mouseleave\", function (e) { e.target.classList.remove(\"hover\"); });\n  });\n\n  chapterNavidotList.forEach(e => { e.classList.remove(\"on\"); });\n  chapterNavidotList[lessonNow].classList.add(\"on\");\n  if (lessonNow == 0 || lessonNow == (chapterNavidotList.length - 1)) {\n    chapterNum.innerText = '';\n  } else {\n    chapterNum.innerText = window.MATH.main[subject].mathLessons[lessonNow].lesson;\n  }\n  chapterTitle.innerText = window.MATH.main[subject].mathLessons[lessonNow].title;\n\n  chapterSprite.forEach((e) => {\n    e.style.animationName = ''\n    e.classList.remove(\"on\");\n    chapterSprite[lessonNow].style.animationName = ''\n    e.offsetHeight;\n  })\n  chapterSprite[lessonNow].style.animationName = 'sprite_ani'\n  chapterSprite[lessonNow].classList.add(\"on\");\n}\n\n//# sourceURL=webpack://2023_china_main/./src/js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/common.js");
/******/ 	
/******/ })()
;