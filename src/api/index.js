const smallDataUrl =
  "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
const bigDataUrl =
  "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";

const getData = (url) => {
  return fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        alert("Кажется что-то пошло не так.  Status Code: " + response.status);
        return;
      }
      return response.json();
    })
    .catch((err) => {
      alert("Ошибка соединения :-S" + err);
    });
};

export const infoAPI = {
  getSmallData() {
    return getData(smallDataUrl);
  },
  getBigData() {
    return getData(bigDataUrl);
  },
};
