// STARTボタンを押したら Azure Functions 呼び出し
startBtn.addEventListener('click', () => {
  
  let name = encodeURI("テストユーザー");
  let url = "https://sftc-test01-func.azurewebsites.net/api/HttpTrigger1?code=lsvk9FmJ/mTl0JhccAWaErJyFD5qH9FZcrHYYrP3s9DkYnFKqmGJAg==&name=" + name;
  onJsonConsole("「" + url + "」にアクセスします…");
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      onJsonConsole(data);
    })
    .catch(error => {
      onJsonConsole("Azure Functions 呼び出しに失敗しました");
  });
