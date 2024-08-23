import { JikjiBinder } from '../utils/jikjiBinder.js';

const METADATA_FILE_NAME = 'contents_update.json';
const getRoot = () => {  
  return '/resource/';
}

let instance; // singleton
export default class UpdateMetadata {
  constructor() {
    if (instance) return instance;

    this._localUpdateObj = undefined;
    this._remoteUpdateObj = undefined;
    instance = this;
  }

  get localUpdateObj() {
    return this._localUpdateObj;
  }

  get remoteUpdateObj() {
    return this._remoteUpdateObj;
  }

  /**
   * 로컬 업데이트 정보를 읽어온다
   */
  readLocalJSON() {
    return new Promise(
      function (resolve, reject) {
        const url = getRoot() + METADATA_FILE_NAME;
        console.log('read local json:', url);
        axios
          .get(url)
          .then((response) => {
            this._localUpdateObj = response.data;
            resolve();
          })
          .catch(function (err) {
            reject(err);
          });
      }.bind(this)
    );
  }

  /**
   * 서버 업데이트 정보를 읽어온다
   */
  readRemoteJSON() {
    return new Promise(
      function (resolve, reject) {
        if (!this._localUpdateObj) {
          reject('로컬 contents_update.json 정보가 없음!');
          return;
        }
        const url = this._localUpdateObj.url + METADATA_FILE_NAME;
        console.log('read remote json:', url);
        axios
          .get(url)
          .then((response) => {
            this._remoteUpdateObj = response.data;
            resolve();
          })
          .catch(function (err) {
            reject(err);
          });
      }.bind(this)
    );
  }

  writeLocalJSONVersion(id, updateVersion) {
    if (!this._localUpdateObj) {
      console.log('로컬 contents_update.json 정보가 없음!');
      return;
    }

    this._localUpdateObj.contentList.forEach((value) => {
      if (id === value.id) {
        value.versionList.push(updateVersion);
      }
    });

    // 저장
    const localPath = getRoot() + METADATA_FILE_NAME;
    JikjiBinder.outputJson(localPath, this._localUpdateObj).catch((err) => {
      console.log('local json 쓰기 실패:', err);
    });
  }

  resetLocalJSON(index) {
    const localPath = getRoot() + METADATA_FILE_NAME;
    if (!this._localUpdateObj) {
      console.log('로컬 contents_update.json 정보가 없음!');
      return;
    }

    this._localUpdateObj.contentList.forEach((value) => {
      if (index === value.index) {
        value.versionList = [];
      }
    });

    JikjiBinder.outputJson(localPath, this._localUpdateObj).catch((err) => {
      console.log('local json 쓰기 실패:', err);
    });
  }
}
