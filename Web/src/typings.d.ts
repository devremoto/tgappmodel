//declare let process: Process;
interface Process {
  env: Env;
}
interface Env {
  ApiName: string;
  ImgFolder: string;
  Authority: string;
  UseAuthority: boolean;
  RequireHttpsMetadata: boolean;
  HostServer: string;
  HostPort: number;
  ApiUrl: string;
  MapKey: string;
  ClientId: string;
}

interface GlobalEnvironment {
  process: Process;
}
