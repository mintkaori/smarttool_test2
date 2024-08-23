const NOT_FOUND_BINDER = '바인더 환경에서만 동작합니다.';

export class JikjiBinder {
  /**
   * URL 다운로드
   * @param {*} url URL
   * @param {*} dest 다운로드 폴더
   * @param {*} onProgress 다운로드 진행 이벤트
   */
  static urlDownload(url, dest, onStart, onProgress) {
    return new Promise(function (resolve, reject) {
      if (window.jj) {
        window.jj.native.urlDownload(
          url,
          dest,
          (requestObj) => {
            onStart && onStart(requestObj);
          },
          (state) => {
            onProgress && onProgress(state);
          },
          (err, destFile) => {
            if (err) reject(err);
            else resolve(destFile);
          }
        );
      } else {
        reject(NOT_FOUND_BINDER);
      }
    });
  }

  /**
   * 다운로드 한 파일 압축 해제
   * @param {*} zipFile 압축파일
   * @param {*} onProgress 압축해제 진행 이벤트
   */
  static unzip(zipFile, onProgress) {
    return new Promise(function (resolve, reject) {
      if (window.jj) {
        window.jj.native.unzip(
          {
            source: zipFile,
            // dest: '/resource/zipFile1',
            sourceRemoved: true,
          },
          (currentSize, totalSize) => {
            onProgress && onProgress(currentSize, totalSize);
          },
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      } else {
        reject(NOT_FOUND_BINDER);
      }
    });
  }

  /**
   * JSON 파일 쓰기
   * @param {*} path 경로
   * @param {*} content json object
   */
  static outputJson(path, content) {
    return new Promise(function (resolve, reject) {
      if (window.jj) {
        window.jj.native.outputJson(path, content, (err) => {
          if (err) reject(err);
          else resolve();
        });
      } else {
        reject(NOT_FOUND_BINDER);
      }
    });
  }

  /**
   * 파일 삭제
   * @param {*} path 삭제할 파일 경로
   */
  static removeFile(path) {
    return new Promise(function (resolve, reject) {
      if (window.jj) {
        window.jj.native.removeFile(path, (err) => {
          if (err) reject(err);
          else resolve();
        });
      } else {
        reject(NOT_FOUND_BINDER);
      }
    });
  }
}
