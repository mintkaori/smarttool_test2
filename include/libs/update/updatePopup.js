import { QS, CE, showDom, hideDom, deepClone } from '../utils/index.js';
import { JikjiBinder } from '../utils/jikjiBinder.js';
import UpdateManager from './updateManager.js';
import { updatePopupLiteral } from './updatePopup.literal.js';

const CLASSNAME_UPDATE_POPUP = 'update-popup';
const CLASSNAME_UPDATE_POPUP_CONTAINER = `${CLASSNAME_UPDATE_POPUP}-container`;
const CLASSNAME_UPDATE_POPUP_BACKGROUND = `${CLASSNAME_UPDATE_POPUP}-background`;
const CLASSNAME_UPDATE_POPUP_CONTENT = `${CLASSNAME_UPDATE_POPUP}-content`;
// const CLASSNAME_CONTENT_CLOSE_BUTTON = `${CLASSNAME_UPDATE_POPUP_CONTENT}__close`;
const CLASSNAME_CONTENT_TITLE = `${CLASSNAME_UPDATE_POPUP_CONTENT}__title`;
const CLASSNAME_CONTENT_PROGRESS = `${CLASSNAME_UPDATE_POPUP_CONTENT}__progress`;
const CLASSNAME_CONTENT_UPDATE_INFO = `${CLASSNAME_UPDATE_POPUP_CONTENT}__update-info`;
const CLASSNAME_CONTENT_BUTTON_BOX = `${CLASSNAME_UPDATE_POPUP_CONTENT}__button-box`;
const CLASSNAME_CONTENT_BUTTON = `${CLASSNAME_UPDATE_POPUP_CONTENT}__button`;

const CLASSNAME_BUTTON_UPDATE = 'update';
const CLASSNAME_BUTTON_CANCEL = 'cancel';
const CLASSNAME_BUTTON_CONFIRM = 'confirm';

const CLASSNAME_TITLE_MESSAGE_ONLY = 'message-only';

let instance; // singleton

class DownloadZipInfo {
  constructor(id, updateVersion, path) {
    this.id = id;
    this.updateVersion = updateVersion;
    this.path = path;
  }
}

export default class UpdatePopup {
  constructor() {
    if (instance) return instance;

    console.log('UpdatePopup constructor!');
    this.containerElement = undefined;
    this.titleElement = undefined;
    this.progressBox = undefined;
    this.progress = undefined;
    this.updateText = undefined;
    this.cancelButton = undefined;
    this.confirmButton = undefined;
    this.updateButton = undefined;

    this.pendingCancelDownload = false;
    this.cancelDownloadToken = undefined;

    this.type = undefined;
    /* ex) {
    "url": "http://localhost:8080/dev/cdupdate/EB/2015/EB2015Dev/contents/",
    "isDownload": false,
    "id": "lesson01",
    "updateVersionList": [
        {
            "number": "1.0.1",
            "date": "2021-09-02",
            "desc": "2021-09-02 업데이트\n - 콘텐츠 오류 수정\n - 자료 교체"
        },
        {
            "number": "1.0.2",
            "date": "2021-09-03",
            "desc": "2021-09-03 업데이트\n - 콘텐츠 오류 수정\n - 자료 교체"
        }
    ]
    } */
    this.updateInfo = undefined; // 업데이트시 업데이트 정보
    this.updateDownloadZipInfoList = [];
    this.manager = new UpdateManager();

    this.callbackUpdateDone = undefined;
    instance = this;
  }

  initiate(parent) {
    this.containerElement = CE({
      parent,
      classNames: CLASSNAME_UPDATE_POPUP_CONTAINER,
    });
    CE({
      parent: this.containerElement,
      classNames: CLASSNAME_UPDATE_POPUP_BACKGROUND,
    });
    const contentElement = CE({
      parent: this.containerElement,
      classNames: CLASSNAME_UPDATE_POPUP_CONTENT,
    });
    // const closeButton = CE({
    //   parent: contentElement,
    //   classNames: CLASSNAME_CONTENT_CLOSE_BUTTON,
    // });
    this.titleElement = CE({
      parent: contentElement,
      classNames: CLASSNAME_CONTENT_TITLE,
    });

    // https://mygumi.tistory.com/293
    // <ul>
    //   <li>
    //    <span class="css-progressbar bar"/>
    //   </li>
    // </ul>
    // <progress class="progressTag" value="0" max="100"/>

    this.progressBox = CE({
      parent: contentElement,
      classNames: `${CLASSNAME_CONTENT_PROGRESS}-box`,
    });

    this.progress = CE({
      tag: 'progress',
      parent: this.progressBox,
      classNames: CLASSNAME_CONTENT_PROGRESS,
      attributes: {
        value: '0',
        max: '100',
      },
    });

    this.updateText = CE({
      parent: contentElement,
      classNames: CLASSNAME_CONTENT_UPDATE_INFO,
    });
    const buttonBoxElement = CE({
      parent: contentElement,
      classNames: CLASSNAME_CONTENT_BUTTON_BOX,
    });
    this.updateButton = CE({
      parent: buttonBoxElement,
      classNames: [CLASSNAME_CONTENT_BUTTON, CLASSNAME_BUTTON_UPDATE],
      text: '업데이트',
    });
    this.cancelButton = CE({
      parent: buttonBoxElement,
      classNames: [CLASSNAME_CONTENT_BUTTON, CLASSNAME_BUTTON_CANCEL],
      text: '취소',
    });
    this.confirmButton = CE({
      parent: buttonBoxElement,
      classNames: [CLASSNAME_CONTENT_BUTTON, CLASSNAME_BUTTON_CONFIRM],
      text: '확인',
    });

    // closeButton.addEventListener('click', this.onClose.bind(this), false);
    this.confirmButton.addEventListener('click', this.onClose.bind(this), false);
    this.cancelButton.addEventListener('click', this.onCancelDownload.bind(this), false);
    this.updateButton.addEventListener('click', this.onUpdate.bind(this), false);
    this.close();

    // this.setTitle('업데이트 내역');
    // this.setUpdateInfo({
    //   updateVersionList: [{
    //     desc: "2021-07-21 업데이트\n- 이북 내용 교체\n-콘텐츠오류수정"
    //   }, {
    //     desc:"2021-08-12 업데이트\n-구조오류수정"
    //   }]
    // });
    // this.setProgressLabel(0);
    // hideDom(this.updateButton);
    // // hideDom(this.cancelButton);
    // hideDom(this.confirmButton);
    // // hideDom(this.progress);
    // hideDom(this.updateText);
    // this.progress.value = 20;
  }

  onClose() {
    this.close();
  }

  onCancelDownload() {
    if (updatePopupLiteral.message.beginUpdate.type === this.type) {
      this.close();
    } else {
      this.pendingCancelDownload = true;
      this.cancelDownloadToken && this.cancelDownloadToken.abort();
      this.removeAllUpdateDownloadedFile();
    }
  }

  onUpdate() {
    this.setLayout(updatePopupLiteral.message.update);
    // 다운로드 취소 시 정보 복구를 위해 임시 정보를 사용
    let tempUpdateInfo = deepClone(this.updateInfo);
    this.downloadUpdateFile(tempUpdateInfo);
  }

  open(message) {
    this.progress.value = 0;
    this.setLayout(message);
    showDom(this.containerElement);
  }

  close() {
    hideDom(this.containerElement);
  }

  setTitle(text) {
    this.titleElement.textContent = text;
  }

  setUpdateInfo(updateInfo) {
    this.updateInfo = updateInfo;
    let text = '';
    for (let i = 0; i < updateInfo.updateVersionList.length; i++) {
      if (i > 0) text += '\n-----------------------------------------\n';
      const desc = updateInfo.updateVersionList[i].desc;
      text += desc;
    }
    this.updateText.textContent = text;
  }

  setProgressLabel(value) {
    this.progress.dataset.label = `${Math.round(value)}%`;
  }

  setCallbackUpdateDone(callback) {
    this.callbackUpdateDone = callback;
  }

  setLayout(message) {
    this.setTitle(message.text);
    this.titleElement.classList.remove(CLASSNAME_TITLE_MESSAGE_ONLY);
    this.type = message.type;
    switch (message.type) {
      case updatePopupLiteral.message.requireDownload.type:
      case updatePopupLiteral.message.failDownload.type:
        {
          hideDom(this.updateButton);
          hideDom(this.cancelButton);
          showDom(this.confirmButton);
          hideDom(this.progressBox);
          hideDom(this.updateText);
          this.titleElement.classList.add(CLASSNAME_TITLE_MESSAGE_ONLY);
        }
        break;
      case updatePopupLiteral.message.download.type:
        {
          hideDom(this.updateButton);
          showDom(this.cancelButton);
          hideDom(this.confirmButton);
          showDom(this.progressBox);
          hideDom(this.updateText);
        }
        break;
      case updatePopupLiteral.message.beginUpdate.type:
        {
          showDom(this.updateButton);
          showDom(this.cancelButton);
          hideDom(this.confirmButton);
          hideDom(this.progressBox);
          showDom(this.updateText);
        }
        break;
      case updatePopupLiteral.message.update.type:
        {
          hideDom(this.updateButton);
          showDom(this.cancelButton);
          hideDom(this.confirmButton);
          showDom(this.progressBox);
          hideDom(this.updateText);
        }
        break;
    }
  }

  download(url, start, totalFileCount) {
    start = start || 0;
    totalFileCount = totalFileCount || 1;
    return new Promise(
      function (resolve, reject) {
        console.log('파일 다운로드 시작 : ', url);
        const dest = '/resource';
        JikjiBinder.urlDownload(
          url,
          dest,
          (requestObj) => {
            this.cancelDownloadToken = requestObj;
          },
          (state) => {
            console.log('파일 다운로드 중:', state);
            this.progress.value = start + state.percent * (100 / totalFileCount);
            this.setProgressLabel(this.progress.value);
          }
        )
          .then((destFile) => {
            console.log('파일 다운로드 완료:', destFile);
            this.cancelDownloadToken = undefined;
            // this.progress.value = 100;
            resolve(destFile);
          })
          .catch((err) => {
            console.log('파일 다운로드 실패:', err);
            this.cancelDownloadToken = undefined;
            this.setLayout(updatePopupLiteral.message.failDownload);
            reject(err);
          });
      }.bind(this)
    );
  }

  unzip(zipFile, start, totalFileCount) {
    start = start || 0;
    totalFileCount = totalFileCount || 1;
    hideDom(this.cancelButton); // 압축해제 취소 불가
    return new Promise(
      function (resolve, reject) {
        console.log('파일 압축해제 시작 : ', zipFile);
        this.setTitle(updatePopupLiteral.message.unzip.text);
        JikjiBinder.unzip(zipFile, (currentSize, totalSize) => {
          const percent = (currentSize / totalSize) * (100 / totalFileCount);
          // console.log('파일 압축해제 중:', start, percent);
          this.progress.value = start + percent;
          this.setProgressLabel(this.progress.value);
        })
          .then(() => {
            console.log('파일 압축해제 완료!');
            // this.progress.value = 100;
            resolve();
          })
          .catch((err) => {
            console.log('파일 압축해제 실패:', err);
            this.setLayout(updatePopupLiteral.message.failDownload);
            reject(err);
          });
      }.bind(this)
    );
  }

  /**
   * 업데이트 다운로드 취소 시 받아놓은 zip파일 삭제
   */
  removeAllUpdateDownloadedFile() {
    this.updateDownloadZipInfoList.forEach((value) => {
      JikjiBinder.removeFile(value.path);
    });
    this.updateDownloadZipInfoList = [];
  }

  /**
   * 버전에 따라 순차 다운로드
   */
  downloadUpdateFile(tempUpdateInfo) {
    const totalFileCount = this.updateInfo.updateVersionList.length;
    if (tempUpdateInfo.updateVersionList.length === 0) {
      this.unzipUpdateFile(totalFileCount);
      return;
    }
    const updateVersion = tempUpdateInfo.updateVersionList[0];
    const url = `${tempUpdateInfo.url}${tempUpdateInfo.id}_${updateVersion.number}.zip`;

    let start = 0;
    const downloadedCount = totalFileCount - tempUpdateInfo.updateVersionList.length;
    start = (downloadedCount / totalFileCount) * 100;

    this.download(url, start, totalFileCount)
      .then((destFile) => {
        const zipInfo = new DownloadZipInfo(tempUpdateInfo.id, updateVersion, destFile);
        this.updateDownloadZipInfoList.push(zipInfo);

        tempUpdateInfo.updateVersionList.splice(0, 1);
        if (this.pendingCancelDownload) {
          // 취소 버튼 눌렸는데 다운로드가 완료되었을 경우
          this.removeAllUpdateDownloadedFile();
          this.pendingCancelDownload = false;
          this.setLayout(updatePopupLiteral.message.failDownload);
        } else {
          this.downloadUpdateFile(tempUpdateInfo);
        }
      })
      .catch(() => {
        this.pendingCancelDownload = false;
      });
  }

  unzipUpdateFile(totalFileCount) {
    if (this.updateDownloadZipInfoList.length === 0) {
      this.callbackUpdateDone && this.callbackUpdateDone();
      return;
    }

    let start = 0;
    const unzipedCount = totalFileCount - this.updateDownloadZipInfoList.length;
    start = (unzipedCount / totalFileCount) * 100;
    // console.log('unzipedCount', unzipedCount);

    const zipInfo = this.updateDownloadZipInfoList[0];
    let updateVersion;
    this.updateInfo.updateVersionList.forEach((value) => {
      if (value.number === zipInfo.updateVersion.number) {
        updateVersion = value;
      }
    });

    // console.log('unzipUpdateFile', zipInfo, updateVersion);

    this.unzip(zipInfo.path, start, totalFileCount)
      .then(() => {
        // 업데이트 파일 갱신
        this.manager.addLocalJSONVersion(zipInfo.id, updateVersion);
        // 다운받은 정보 제거
        this.updateDownloadZipInfoList.splice(0, 1);
        this.updateInfo.updateVersionList.splice(0, 1);
        // 재귀 호출
        this.unzipUpdateFile(totalFileCount);
      })
      .catch(() => {
        this.updateDownloadZipInfoList = [];
      });
  }
}