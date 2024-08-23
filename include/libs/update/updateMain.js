import { QS } from '../utils/index.js';
import UpdateManager from './updateManager.js';
import UpdatePopup from './updatePopup.js';
import { updatePopupLiteral } from './updatePopup.literal.js';

// const updatePopup = new UpdatePopup();
// window.UPDATEPOPUP = window.UPDATEPOPUP || updatePopup;
const updateMain = (function() {
    const updateManager = new UpdateManager();
    const updatePopup = new UpdatePopup();
    /**
     * 다운로드 팝업
     * 팝업에 다운로드 버튼 없이 바로 다운로드
     */
    function showDownloadPopup(updateInfo, downloadButton) {
        const message = updatePopupLiteral.message.download;
        updatePopup.open(message);
        setTimeout(() => {
            const updateVersion = updateInfo.updateVersionList[0]; // {number: "1.0.0", date: "2021-09-01", desc: undefined}
            const url = `${updateInfo.url}${updateInfo.id}_${updateVersion.number}.zip`;
            updatePopup.download(url).then((destFile) => {
                if (destFile) {
                updatePopup.unzip(destFile).then(() => {
                    // 업데이트 파일 갱신
                    updatePopup.manager.addLocalJSONVersion(updateInfo.id, updateVersion);
                    updatePopup.close();
                    // 업데이트 정보 갱신
                    updateInfo.isDownload = false;
                    updateInfo.updateVersionList.splice(0, 1);
                    hideButton(downloadButton);
                });
                }
            });
        }, 10);
    }

    /**
     * 업데이트 시작 팝업
     * 팝업에 업데이트 버튼이 있으므로 팝업 클래스로 정보 위임
     */
    function showBeginUpdatePopup(updateInfo, updateButton) {
        const message = updatePopupLiteral.message.beginUpdate;
        updatePopup.open(message);
        updatePopup.setUpdateInfo(updateInfo);
        updatePopup.setCallbackUpdateDone(() => {
            alert('업데이트를 완료했습니다.');
            updatePopup.close();
            hideButton(updateButton);
        });
    }

    function hideButton(button) {
        if (button) {
            button.style.display = 'none';
        }
    }

    function addEvents() {
        const download = QS(".js-download");
        const update = QS(".js-update");

        if (download) {
            download.onclick = function() {
                const index = "1";
                const updateInfo = updatePopup.manager.checkUpdate(index);
                console.log('download updateInfo', updateInfo);
                if (!updateInfo) {
                    alert('다운로드 정보가 존재하지 않습니다.');
                }

                if (updateInfo.isDownload) {
                    showDownloadPopup(updateInfo, download);
                } else {
                    alert('이미 다운로드 받은 콘텐츠입니다.');
                }
            };
        }

        if (update) {
            update.onclick = function() {
                const index = "1";
                const updateInfo = updatePopup.manager.checkUpdate(index);
                console.log('update updateInfo', updateInfo);
                if (!updateInfo) {
                    alert('업데이트 정보가 존재하지 않습니다.');
                }

                if (updateInfo.isDownload) {
                    alert('다운로드를 받으세요.');
                }
                else if (updateInfo.updateVersionList.length > 0) {
                    showBeginUpdatePopup(updateInfo, update);
                } else {
                    alert('콘텐츠가 최신 버전입니다.');
                }
            };
        }
    }

    /**
     * 업데이트를 체크하여 다운로드,업데이트 버튼을 숨긴다
     */
    function checkUpdateButtons() {
        const download = QS(".js-download");
        const update = QS(".js-update");

        const index = "1";
        const updateInfo = updatePopup.manager.checkUpdate(index);

        if (!updateInfo) {
            hideButton(download);
            hideButton(update);
        } else {
            if (updateInfo.isDownload === false) {
                hideButton(download);
            }
            if (updateInfo.updateVersionList.length === 0) {
                hideButton(update);
            }
        }
    }

    /**
     * 업데이트 팝업 초기화 및 업데이트 정보 수신 
     * @param {*} callback 콜백
     */
    const initiate = function(container, callback) {
        addEvents();

        // 업데이트 팝업 초기화
        updatePopup.initiate(container);  
        // 업데이트 체크
        updatePopup.manager
        .loadJSON()
        .then(() => {
            console.log('local update obj:', updatePopup.manager.localUpdateObj);
            console.log('remote update obj:', updatePopup.manager.remoteUpdateObj);

            checkUpdateButtons();

            callback && callback();
        })
        .catch((err) => {
            console.error(err);
            callback && callback(err);
        });
    }

    return {
        initiate: initiate,
        updateManager: updateManager,
        updatePopup: updatePopup
    };
})();

window.UPDATEMAIN = window.UPDATEMAIN || updateMain;


/*
document.addEventListener("DOMContentLoaded", function () {
    const wrap = QS("#wrap");
    addEvents();

    // 업데이트 팝업 초기화
    updatePopup.initiate(wrap);  
    // 업데이트 체크
    updatePopup.manager
      .loadJSON()
      .then(() => {
        console.log('local update obj:', updatePopup.manager.localUpdateObj);
        console.log('remote update obj:', updatePopup.manager.remoteUpdateObj);

        checkUpdateButtons();
      })
      .catch((err) => {
        console.error(err);
    });      
});
*/