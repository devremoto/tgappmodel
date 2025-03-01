export const environment = {
  production: true,
  ApiName: process.env["ApiName"],
  ImgFolder: process.env["ImgFolder"],
  Authority: process.env["Authority"],
  UseAuthority: process.env["UseAuthority"] ? true : false,
  RequireHttpsMetadata: process.env["RequireHttpsMetadata"] ? true : false,
  HostServer: process.env["HostServer"],
  HostPort: process.env["HostPort"],
  ApiUrl: process.env["ApiUrl"],
  MapKey: process.env["MapKey"],
  ClientId: process.env["ClientId"]
};
