// 客户端
function jsonp(url, callback) {
    debugger
    // 把传递的回调函数挂载到全局上
    let uniqueName = `jsonp${new Date().getTime()}`;
    // 套了一层 anonymous function
    // 目的让 返回的callback执行且删除创建的标签
    window[uniqueName] = data => {
      // 从服务器获取结果并让浏览器执行callback
      document.body.removeChild(script);
      delete window[uniqueName];
      callback && callback(data);
    }

    if (url.includes('?')) {
        url = url + `&callback=${uniqueName}`;
    } else {
        url = `${url}?callback=${uniqueName}`;
    }
    
    // 发送请求
    let script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
  }
  


  jsonp('https://matchweb.sports.qq.com/matchUnion/cateColumns?from=pc', result => {
      debugger
    console.log(result);
  });
  
  