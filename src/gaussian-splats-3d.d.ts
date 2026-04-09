declare module '@mkkellogg/gaussian-splats-3d' {
  export class Viewer {
    constructor(options?: Record<string, unknown> & { renderer?: import('three').WebGLRenderer });
    addSplatScene(path: string, options?: Record<string, unknown>): Promise<void>;
    start(): void;
    stop(): void;
    dispose(): void;
  }
  export class DropInViewer {
    constructor(options?: Record<string, unknown>);
    addSplatScene(path: string, options?: Record<string, unknown>): Promise<void>;
  }
}
