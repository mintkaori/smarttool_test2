export const CLASSNAME_SELECTED = 'Selected';
export const CLASSNAME_HIDDEN = 'Hidden';
export const CLASSNAME_DISABLED = 'Disabled';

export const QS = (query, parentNode = document) => {
  if (/#/g.test(query)) {
    return document.getElementById(query.slice(1));
  }

  return parentNode.querySelector(query);
};

export const QSALL = (__query, __parentNode = document) => {
  const nodeList = __parentNode.querySelectorAll(__query);
  const resultArray = [];

  for (let i = 0, len = nodeList.length; i < len; i += 1) {
    resultArray.push(nodeList[i]);
  }

  return resultArray;
};

const setElementNodeProperties = (__elementNode, __attributes) => {
  Object.getOwnPropertyNames(__attributes).forEach((__property) => {
    __elementNode.setAttribute(__property, __attributes[__property]);
  });
};

const setElementNodeStyles = (__elementNode, __styles) => {
  Object.getOwnPropertyNames(__styles).forEach((__property) => {
    // eslint-disable-next-line no-param-reassign
    __elementNode.style[__property] = __styles[__property];
  });
};

/**
 * create element node
 * @param {object} __options
 * @author peaceD
 */
export const CE = (__options) => {
  if (!__options) {
    throw new Error('__options 가 없습니다.');
  }

  const tagName = __options.tag || 'div';
  const parentNode = __options.parent || document.body;
  const id = __options.id || '';
  // eslint-disable-next-line no-nested-ternary
  const classNames = typeof __options.classNames === 'string' ? [__options.classNames] : __options.classNames ? __options.classNames : [];
  const attributes = __options.attributes || {};
  const text = __options.text || '';
  const styles = __options.styles || {};
  const insertBeforeReferenceNode = __options.before || false;

  const elementNode = document.createElement(tagName);

  if (id) {
    elementNode.id = id;
  }

  classNames.forEach((__className) => {
    elementNode.classList.add(__className);
  });

  setElementNodeProperties(elementNode, attributes);

  if (text) {
    elementNode.appendChild(document.createTextNode(text));
  }

  setElementNodeStyles(elementNode, styles);

  if (insertBeforeReferenceNode) {
    parentNode.insertBefore(elementNode, insertBeforeReferenceNode);
  } else {
    parentNode.appendChild(elementNode);
  }

  return elementNode;
};

export const hideDom = (dom) => dom.classList.add(CLASSNAME_HIDDEN);
export const showDom = (dom) => dom.classList.remove(CLASSNAME_HIDDEN);

/**
 * object strong copy
 * @param {*} obj 객체
 * @returns 복사된 객체
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const result = Array.isArray(obj) ? [] : {};

  for (let key of Object.keys(obj)) {
    result[key] = deepClone(obj[key]);
  }

  return result;
};
