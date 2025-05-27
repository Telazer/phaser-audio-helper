# Telazer - Phaser Audio Helper

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/Telazer/phaser-audio-helper)

A TypeScript utility for [Phaser 3](https://phaser.io) that simplifies the loading, management, and playback of sound effects and music. With clear separation of keys and file paths, it offers an elegant API for managing game audio in a scalable way.

---

## Installation

```bash
npm install @telazer/phaser-audio-helper
```

---

## Key Features

- 🔊 Easy loading and playback of SFX and music
- 🗝️ Distinct `key` and `source` mapping
- 🎚️ Global volume control
- 🔁 Looping and sequence playback
- 🎲 Random playback utilities
- 🎛️ Supports playback rate variation

---

## Getting Started

Import `AudioHelper` into your Phaser scene. It’s best to load sounds in a boot or preload scene.

---

## Example Scene Integration

```ts
import { AudioHelper } from "@telazer/phaser-audio-helper";

export class InitScene extends Phaser.Scene {
  preload() {
    AudioHelper.loadSfx(this, [
      { key: "pop", source: "./assets/sounds/pop.mp3", volume: 1 },
    ]);
  }

  async create() {
    AudioHelper.play("pop");
  }
}
```

---

## Loading Audio

### Load SFX

```ts
await AudioHelper.loadSfx(this, [
  { key: "click", source: "./assets/sounds/click.mp3", volume: 0.8 },
  { key: "jump", source: "./assets/sounds/jump.wav", volume: 1.0 },
]);
```

### Load Music

```ts
await AudioHelper.loadMusic(this, [
  { key: "bg_music", source: "./assets/music/loop.mp3", volume: 1 },
]);
```

---

## Playback

### Play a Sound

```ts
AudioHelper.play("click");
```

### Play Music

```ts
AudioHelper.play("bg_music"); // Plays in loop mode
```

### Stop Sound or Music

```ts
AudioHelper.stop("click");
```

---

## Advanced Playback

### Set Global Volume

```ts
AudioHelper.setSoundVolume(0.5);
AudioHelper.setMusicVolume(0.8);
```

### Play with Randomized Rate

```ts
AudioHelper.playRate("jump", 0.1); // ±10% pitch variance
```

### Play a Random Sound

```ts
AudioHelper.playRandom(["hit_1", "hit_2", "hit_3"]);
```

### Play in Sequence

```ts
AudioHelper.playSequence(["step_1", "step_2", "step_3"], 150, 30); // ±30ms variance
```

---

## API Reference

| Method                                    | Description                         |
| ----------------------------------------- | ----------------------------------- |
| `loadSfx(scene, items)`                   | Load sound effects (`AudioItem[]`)  |
| `loadMusic(scene, items)`                 | Load music tracks (`AudioItem[]`)   |
| `play(key)`                               | Play a sound or music by key        |
| `stop(key)`                               | Stop a sound or music by key        |
| `setSoundVolume(volume)`                  | Set global volume for SFX           |
| `setMusicVolume(volume)`                  | Set global volume for music         |
| `playRate(key, rate)`                     | Play sound with random pitch offset |
| `playRandom(keys)`                        | Randomly play one from given keys   |
| `playSequence(keys, delay, randomOffset)` | Play keys in sequence with timing   |

---

## `AudioItem` Structure

```ts
interface AudioItem {
  key: string; // Internal reference key
  source: string; // Path to the audio file
  volume: number; // Individual volume multiplier (0–1)
}
```

---

## License

MIT License

Copyright (c) 2025 Telazer LLC.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rightsto use, copy, modify, merge, publish, distribute, sublicense, and/or sellcopies of the Software, and to permit persons to whom the Software isfurnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in allcopies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS ORIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THEAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHERLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THESOFTWARE.
