import { FileModel } from './FileModel';
export interface IUploadModel {
  files: Array<FileModel>;
}

export class UploadModel<T> implements IUploadModel {
  public entity: T;
  public files: Array<FileModel>;
}
