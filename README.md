# Canvas Recorder for React Three Fiber

A TypeScript utility for recording canvas animations, particularly designed for (but not limited to) React Three Fiber applications and ThreeJS.

## Features

- Record HTML Canvas elements as video
- Configurable FPS, duration, and video format
- Automatic download of recordings
- Simple API with minimal setup

## Installation

```bash
# Using npm
npm install threejs-recorder

# Using yarn
yarn add threejs-recorder

# Using pnpm
pnpm add threejs-recorder
```

## Usage

```typescript
import CanvasRecorder from 'threejs-recorder';

// Get your canvas element
const canvas = document.querySelector('canvas');

// Create recorder with default options
const recorder = new CanvasRecorder(canvas, {});

// Start recording (will automatically stop after the specified duration)
recorder.start();

// Or with custom options
const recorderWithOptions = new CanvasRecorder(canvas, {
  fps: 30,
  duration: 10, // seconds
  filename: 'my-animation',
  mimeType: 'video/webm;codecs=vp9'
});

recorderWithOptions.start();

// Manual download (automatically called when recording stops)
// recorder.download();
```

## API

### `CanvasRecorder`

Main class for recording canvas elements.

#### Constructor

```typescript
new CanvasRecorder(canvas: HTMLCanvasElement, options: CanvasRecorderOptions)
```

#### Methods

- `start()`: Begin recording the canvas. Recording will automatically stop after the specified duration.
- `download()`: Download the recorded video. This is automatically called when recording stops.

### Options

The `CanvasRecorderOptions` interface accepts the following parameters:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `fps` | number | 60 | Frames per second for recording |
| `duration` | number | 5 | Duration of recording in seconds |
| `mimeType` | string | 'video/webm;codecs=vp9' | Video format |
| `filename` | string | 'r3f-scene' | Output filename (without extension) |
| `dataRequestPerSecond` | number | 1 | How frequently to request data from the MediaRecorder |

## Browser Compatibility

This utility relies on the MediaRecorder API and `canvas.captureStream()` which are supported in most modern browsers. Please check browser compatibility before using in production.

## License

MIT 