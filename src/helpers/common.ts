import crypto from 'crypto'
export function guid(): string {
    const hex = '0123456789ABCDEF'

    let buffer = new Uint8Array(16)

    buffer = crypto.randomBytes(16)

    buffer[6] = 0x40 | (buffer[6] & 0xF)
    buffer[8] = 0x80 | (buffer[8] & 0xF)

    const segments = []

    for (let i = 0; i < 16; ++i) {
        segments.push(hex[(buffer[i] >> 4 & 0xF)])
        segments.push(hex[(buffer[i] >> 0 & 0xF)])

        if (i == 3 || i == 5 || i == 7 || i == 9) {
            segments.push('-')
        }
    }

    return segments.join('')
}