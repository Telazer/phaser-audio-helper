import Phaser from "phaser";

export type AudioType =
  | Phaser.Sound.WebAudioSound
  | Phaser.Sound.HTML5AudioSound
  | Phaser.Sound.NoAudioSound;

export type AudioConfig = {
  volume: number;
};

export interface SoundConfig {
  volume: number;
}

export interface SoundData {
  source: AudioType;
  config: SoundConfig;
}

export interface AudioItem {
  key: string;
  source: string;
  volume: number;
}

export default class AudioHelper {
  private static isInitialized = false;
  private static scene: Phaser.Scene;

  private static sounds: Partial<Record<string, SoundData>>;
  private static soundConfig: Partial<Record<string, SoundConfig>>;
  private static soundVolume = 0.1;

  private static musics: Partial<Record<string, SoundData>>;
  private static musicConfig: Partial<Record<string, SoundConfig>>;
  private static musicVolume = 1;

  public static async loadSfx(
    scene: Phaser.Scene,
    audios: AudioItem[]
  ): Promise<void> {
    this.scene = scene;
    this.init();

    audios.forEach((audio) => {
      scene.load.audio(audio.key, audio.source);
      this.soundConfig[audio.key] = { volume: audio.volume };
    });

    await new Promise<void>((resolve) => {
      scene.load.once("complete", () => {
        audios.forEach((audio) => {
          this.sounds[audio.key] = {
            source: this.scene.sound.add(audio.key),
            config: this.soundConfig[audio.key]!,
          };
        });
        resolve();
      });
      scene.load.start();
    });
  }

  public static async loadMusic(
    scene: Phaser.Scene,
    musics: AudioItem[]
  ): Promise<void> {
    this.scene = scene;
    this.init();

    musics.forEach((music) => {
      scene.load.audio(music.key, music.source);
      this.musicConfig[music.key] = { volume: music.volume };
    });

    await new Promise<void>((resolve) => {
      scene.load.once("complete", () => {
        musics.forEach((music) => {
          this.musics[music.key] = {
            source: this.scene.sound.add(music.key),
            config: this.musicConfig[music.key]!,
          };
        });
        resolve();
      });
      scene.load.start();
    });
  }

  public static setSoundVolume(volume: number) {
    this.soundVolume = volume;
    Object.keys(this.sounds).forEach((key) => {
      this.sounds?.[key]?.source?.setVolume(this.calcSfxVolume(key));
    });
  }

  public static setMusicVolume(volume: number) {
    this.musicVolume = volume;
    Object.keys(this.musics).forEach((key) => {
      this.musics?.[key]?.source?.setVolume(this.calcMusicVolume(key));
    });
  }

  public static play(key: string) {
    const sfx = this.sounds?.[key];
    const music = this.musics?.[key];

    if (sfx?.source) {
      sfx.source.setVolume(this.calcSfxVolume(key));
      sfx.source.play();
    } else if (music?.source) {
      music.source.setVolume(this.calcMusicVolume(key));
      music.source.play({ loop: true });
    }
  }

  public static stop(key: string) {
    this.sounds?.[key]?.source?.stop();
    this.musics?.[key]?.source?.stop();
  }

  public static playRate(key: string, rate: number) {
    const randomPlaybackRate = 1 - rate + (Math.random() * 3 - 1) * rate;
    this.sounds?.[key]?.source?.setRate(randomPlaybackRate);
    this.sounds?.[key]?.source?.play();
  }

  public static playRandom(keys: string[]) {
    const index = Math.floor((Math.random() - 0.01) * keys.length);
    this.play(keys[index] ?? keys[0]);
  }

  public static playSequence(keys: string[], delay = 200, randomOffset = 0) {
    let index = 0;
    const playNext = () => {
      if (index >= keys.length) return;
      this.play(keys[index++]);
      const offset = Math.random() * randomOffset * 2;
      const totalDelay = delay - randomOffset + offset;
      this.scene.time.delayedCall(randomOffset ? totalDelay : delay, playNext);
    };
    playNext();
  }

  private static init() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    this.sounds = {};
    this.soundConfig = {};
    this.musics = {};
    this.musicConfig = {};
  }

  private static calcSfxVolume(key: string) {
    const configVolume = this.sounds?.[key]?.config?.volume ?? 1;
    return configVolume * this.soundVolume;
  }

  private static calcMusicVolume(key: string) {
    const configVolume = this.musics?.[key]?.config?.volume ?? 1;
    return configVolume * this.musicVolume;
  }
}
