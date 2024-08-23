import UpdateMetadata from './updateMetadata.js';

const updateMetadata = new UpdateMetadata();

let instance; // singleton
export default class UpdateManager {
  constructor() {
    if (instance) return instance;

    instance = this;
  }

  get localUpdateObj() {
    return updateMetadata.localUpdateObj;
  }

  get remoteUpdateObj() {
    return updateMetadata.remoteUpdateObj;
  }

  /**
   * 로컬 업데이트 정보와 서버 업데이트 정보를 불러온다
   */
  loadJSON() {
    return new Promise(
      function (resolve, reject) {
        let error;
        updateMetadata
          .readLocalJSON()
          .then(() => {
            updateMetadata
              .readRemoteJSON()
              .then(() => {
                resolve();
              })
              .catch((err) => {
                error = 'readRemoteJSON() err:' + err;
                reject(error);
              });
          })
          .catch((err) => {
            error = 'readLocalJSON() err:' + err;
            reject(error);
          });

        // await updateMetadata.readLocalJSON().catch((err) => {
        //   error = 'readLocalJSON() err:' + err;
        // });
        // await updateMetadata.readRemoteJSON().catch((err) => {
        //   error = 'readRemoteJSON() err:' + err;
        // });
        // error ? reject(error) : resolve();
      }.bind(this)
    );
  }

  /**
   * 업데이트가 필요한 버전 정보를 가져온다
   * @param {*} index 단원 index
   * @returns 업데이트 버전 정보
   */
  checkUpdate(index) {
    if (!this.localUpdateObj || !this.remoteUpdateObj) return undefined;

    const selectLocalContentList = this.localUpdateObj.contentList.filter((it) => it.index === index);
    const selectRemoteContentList = this.remoteUpdateObj.contentList.filter((it) => it.index === index);
    let selectLocalContent;
    let selectRemoteContent;
    if (selectLocalContentList.length > 0) selectLocalContent = selectLocalContentList[0];
    if (selectRemoteContentList.length > 0) selectRemoteContent = selectRemoteContentList[0];

    if (!selectLocalContent || !selectRemoteContent || !selectLocalContent.update) return undefined;

    // 로컬에 없는 버전 찾기
    const updateVersionList = selectRemoteContent.versionList.filter((remoteVersion) => {
      return !selectLocalContent.versionList.some((localVersion) => remoteVersion.number === localVersion.number);
    });

    /*
      url: "http://localhost:8080/dev/cdupdate/EB/2015/EB2015Dev/contents/",
      id: "lesson01",
      isDownload: true,
      updateVersionList: [{
        date: "2021-09-01"
        desc: undefined
        number: "1.0.0"
      }]
    */
    return {
      url: this.localUpdateObj.url,
      isDownload: selectLocalContent.versionList.length === 0,
      id: selectLocalContent.id,
      updateVersionList,
    };
  }

  /**
   * 다운받아야 하는 단원 인지 여부
   * @param {*} index 단원 index
   */
  getRequireDownload(index) {
    for (let i = 0; i < this.localUpdateObj.contentList.length; i++) {
      const content = this.localUpdateObj.contentList[i];
      if (content.index === index) {
        if (content.versionList.length > 0) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * 다운로드&압축 완료한 버전정보를 로컬json에 기록 랩핑
   * @param {*} id 단원 id
   * @param {*} updateVersion 버전정보
   */
  addLocalJSONVersion(id, updateVersion) {
    updateMetadata.writeLocalJSONVersion(id, updateVersion);
  }

  resetLocalJSON(index) {
    updateMetadata.resetLocalJSON(index);
  }
}
