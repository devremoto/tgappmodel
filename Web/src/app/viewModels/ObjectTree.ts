export interface ObjectTree {
  key: string;
  defaultValue: string;
  value: string;
  path: string;
  obj: any;
  from: string;
  to: string;
  folder: string;
  newPropName: string;
  parent: ObjectTree | null;
  child: ObjectTree[];
}
