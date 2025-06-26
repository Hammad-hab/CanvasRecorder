interface CanvasRecorderOptions {
    fps?: number
    duration?: number
    mimeType?: string
    filename?: string
    dataRequestPerSecond?: number
}

class CanvasRecorder {
    private canvas: HTMLCanvasElement
    private mediaRecorder: MediaRecorder
    private recordedChunks: BlobPart[] = []
    private mimeType: string
    private stream: MediaStream
    private fps: number
    private duration: number
    private filename: string
    private dataRequestPerSecond: number
    
    constructor(canvas: HTMLCanvasElement, options: CanvasRecorderOptions) {
        this.fps = options.fps || 60
        this.duration = options.duration || 5
        this.mimeType = options.mimeType || 'video/webm;codecs=vp9'
        this.filename = `${options.filename || 'r3f-scene'}.${this.mimeType.split(';')[0].split('/')[1]}`
        this.canvas = canvas
        this.stream = this.canvas.captureStream(this.fps)
        this.mediaRecorder = new MediaRecorder(this.stream, {
            mimeType: this.mimeType
        })
        this.dataRequestPerSecond = options.dataRequestPerSecond || 1
    }

    public start() {
        console.log('Starting recording')
        this.mediaRecorder.start(this.dataRequestPerSecond)

        this.mediaRecorder.addEventListener('dataavailable', this.onDataAvailable.bind(this))
        this.mediaRecorder.addEventListener('stop', this.download.bind(this))

        setTimeout(() => {
                this.mediaRecorder.stop()
        }, this.duration * 1000)
    }


    public download() {
        console.log('Downloading recording')
        const blob = this.getBlob()
        if (!blob) return // no data was recorded

        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = this.filename
        a.click()
        URL.revokeObjectURL(url)
    }

    private getBlob() {
        return new Blob(this.recordedChunks, { type: this.mimeType })
    }

    private onDataAvailable(event: BlobEvent) {
        if (event.data && event.data.size > 0) {
            console.log('Data available', event.data.size)
            this.recordedChunks.push(event.data)
        }
    }

}

export default CanvasRecorder