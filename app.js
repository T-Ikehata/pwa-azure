// STARTボタンを押したら Azure Functions 呼び出し
const startBtn  = document.getElementById('js-startBtn');
const $userName  = $('#user-name');
startBtn.addEventListener('click', () => {
  
  let name = encodeURI($userName.val());
  let url = "https://sftc-test01-func.azurewebsites.net/api/HttpTrigger1?code=lsvk9FmJ/mTl0JhccAWaErJyFD5qH9FZcrHYYrP3s9DkYnFKqmGJAg==&name=" + name;
  onJsonConsole("「" + url + "」にアクセスします…");
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      onJsonConsole(data.msg);
    })
    .catch(error => {
      onJsonConsole("Azure Functions 呼び出しに失敗しました");
  });

});
