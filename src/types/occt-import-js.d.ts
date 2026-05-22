declare module "occt-import-js" {
  interface OcctColor {
    r: number;
    g: number;
    b: number;
  }

  interface OcctMesh {
    name: string;
    indices: number[];
    vertices: number[];
    normals: number[];
    color: OcctColor | null;
  }

  interface OcctResult {
    success: boolean;
    meshes: OcctMesh[];
  }

  interface OcctInstance {
    ReadStepFile(data: Uint8Array, params: null): OcctResult;
  }

  interface InitOptions {
    locateFile?: (path: string) => string;
  }

  function init(options?: InitOptions): Promise<OcctInstance>;
  export default init;
}
