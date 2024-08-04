document.addEventListener('DOMContentLoaded', () => {
  const cube = document.getElementById('cube');
  const audio = document.getElementById('background-music');
  let isDragging = false;
  let isExpanded = false;
  const welcomePopup = document.getElementById('welcome-popup');
  const closePopupButton = document.getElementById('close-popup');
  let previousMouseX;
  let previousMouseY;
  let rotationX = 0;
  let rotationY = 0;
  const lyricsData = `
  [00:01.59]世间美好与你环环相扣 - 伯松
  [00:28.97]点点繁星 似余生挚友
  [00:32.6]爱你还未愈合的伤口
  [00:36.76]成为烈酒每日入喉
  [00:41.97]烈酒从未可口
  [00:45.72]眼泪汇成河流
  [00:49.0]你却不看心中缺口
  [00:53.54]留存从曾有的温柔  
  [00:57.44]此时已草长莺飞 爱你的人在路上
  [01:01.52]我只他风餐露宿 细雨在头上
  [01:05.32]茫茫人海 只为与你相遇
  [01:11.43]此时已明月当空 爱你的人抬头望
  [01:15.34]为你撑起船帆    渡你成风又波浪
  [01:19.63]共同感受  救赎热望
  [01:27.62]知道你心疼 还要感受
  [01:30.01]让最亮的星加上彩虹
  [01:33.4]当梅花已开 热爱到来
  [01:36.770004]世间美好 与你环环相扣
  [01:43.229996]此时已草长莺飞 爱你的人在路上
  [01:46.16]我只他风餐露宿 细雨在头上
  [01:49.83]茫茫人海 只为与你相遇
  [01:56.04]此时已明月当空 爱你的人抬头望
  [01:59.990005]为你撑起船帆    渡你成风又波浪
  [02:03.93]共同感受  救赎热望
  [02:10.05]此时已草长莺飞 爱你的人在路上
  [02:13.75]我只他风餐露宿 细雨在头上
  [02:17.48]茫茫人海 只为与你相遇
  [02:23.33]此时已明月当空 爱你的人抬头望
  [02:27.4]为你撑起船帆    渡你成风又波浪
  [02:31.20999]共同感受  救赎热望  
  `;
  
  // 解析歌词数据
  function parseLrc(text) {
      return text.trim().split('\n').map(line => {
          const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\](.*)/);
          if (match) {
              const [minutes, seconds, milliseconds] = match.slice(1, 4).map(Number);
              return {
                  time: minutes * 60 + seconds + milliseconds / 100,
                  text: match[4].trim()
              };
          }
          return null;
      }).filter(line => line !== null);
  }
  
  const lyrics = parseLrc(lyricsData);
  
  // 将歌词显示在页面底部
  function displayLyrics() {
      const lyricsContainer = document.getElementById('lyrics');
      lyricsContainer.innerHTML = lyrics.map(line => `<p>[${formatTime(line.time)}] ${line.text}</p>`).join('');
  }
  
  function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
      displayLyrics();
  });
      // 延迟 3 秒后自动播放音乐
  setTimeout(() => {
    audio.play().catch(error => {
      console.error("音频播放失败:", error);
    });
  }, 6000); // 3000 毫秒 = 3 秒

  cube.addEventListener('click', () => {
      isExpanded = !isExpanded;
      if (isExpanded) {
          cube.classList.add('expanded');
      } else {
          cube.classList.remove('expanded');
      }
  });

  cube.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
      if (!isExpanded) {
          cube.style.animation = 'none'; // 停止动画
      }
  });

  document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;
      rotationY += deltaX * 0.5;
      rotationX -= deltaY * 0.5;
      cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
  });

  document.addEventListener('mouseup', () => {
      isDragging = false;
      if (!isExpanded) {
          cube.style.animation = 'rotate 5s infinite linear'; // 恢复动画
      }
  });
  closePopupButton.addEventListener('click', () => {
    welcomePopup.style.display = 'none';
  });

  // 自动显示弹窗
  welcomePopup.style.display = 'flex';

});
