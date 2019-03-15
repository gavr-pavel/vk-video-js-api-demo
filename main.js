window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.demo_section').forEach(initDemo);

  function initDemo(container) {
    const iframe = container.querySelector('iframe');
    const player = VK.VideoPlayer(iframe);

    const inputSeek = container.querySelector('.input_seek');
    const inputVolume = container.querySelector('.input_volume');
    const buttonPlay = container.querySelector('.button_play');
    const buttonPause = container.querySelector('.button_pause');
    const buttonMute = container.querySelector('.button_mute');
    const buttonUnmute = container.querySelector('.button_unmute');

    inputSeek.addEventListener('change', () => {
      player.seek(inputSeek.value / 100 * player.getDuration());
    });

    inputSeek.addEventListener('mousedown', () => {
      const wasPlaying = player.getState() === VK.VideoPlayer.States.PLAYING;
      player.pause();
      window.addEventListener('mouseup', function onDragEnd() {
        if (wasPlaying) {
          player.play();
        }
        window.removeEventListener('mouseup', onDragEnd);
      });
    });

    inputVolume.addEventListener('input', () => {
      player.setVolume(inputVolume.value / 100);
    });

    buttonPlay.addEventListener('click', () => {
      player.play();
    });

    buttonPause.addEventListener('click', () => {
      player.pause();
    });

    buttonMute.addEventListener('click', () => {
      player.mute();
    });

    buttonUnmute.addEventListener('click', () => {
      player.unmute();
    });

    player.on(VK.VideoPlayer.Events.TIMEUPDATE, (playerState) => {
      inputSeek.value = playerState.time / playerState.duration * 100;
    });

    player.on(VK.VideoPlayer.Events.VOLUMECHANGE, (playerState) => {
      inputVolume.value = playerState.volume * 100;
    });
  }
});
