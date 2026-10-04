/// <reference types="node" />

import { TransformStream } from 'node:stream/web'

if (typeof globalThis.TransformStream === 'undefined') {
  Object.defineProperty(globalThis, 'TransformStream', {
    configurable: true,
    value: TransformStream,
    writable: true,
  })
}
