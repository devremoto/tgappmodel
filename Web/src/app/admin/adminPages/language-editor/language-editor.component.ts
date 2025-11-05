import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Language } from '../../../models/Language';
import { LanguageCustomService } from '../../../services/custom/Language';
import { Asset } from '../../../viewModels/Asset';
import { ObjectTree } from '../../../viewModels/ObjectTree';
import { LanguageEditorFormComponent } from './language-editor-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { InRoleDirective } from '../../../directives/inRoleDirective';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-editor',
  templateUrl: './language-editor.component.html',
  styleUrls: ['./language-editor.component.css'],

  imports: [LanguageEditorFormComponent, TranslateModule, InRoleDirective, FormsModule, CommonModule]

})
export class LanguageEditorComponent implements OnInit {
  fileDefault: Asset;
  jsonDefault: unknown;
  private _defaultLanguage: Language;
  json: unknown;
  folder: Asset;
  files: Asset[];
  folders: Asset[];
  tree: ObjectTree[] = [];
  file: Asset = new Asset();
  assets: Asset[];
  asset: Asset = { path: 'admin' };
  path: string[] = [];
  upFolder: Asset;

  constructor(private _languageService: LanguageCustomService, private _toasterService: ToastrService) { }

  ngOnInit() {
    this.getAssets();
  }

  private async loadDefaultLanguage(asset: any) {
    console.log(this._languageService.default)
    this._defaultLanguage = this._languageService.default;
    return await this._languageService
      .getTranslationFile(`${this._defaultLanguage.code}.json`)
      .toPromise();
  }

  folderUp() {

    const arrStr = `${this.asset.folder}${this.asset.path}`
    const arrPath = arrStr.split('/');
    this.upFolder = { path: '', folder: '/' };
    arrPath.splice(-1, 1)
    this.upFolder.folder = arrPath.join('/');
    this.upFolder.path = '';

  }

  async getAssets(asset?: Asset) {
    this.path = [];
    this.asset = asset || { path: '', folder: 'assets/i18n/' };
    this.folder = asset || { path: '', folder: '/' };
    this.jsonDefault = await this.loadDefaultLanguage(this.folder);
    this.tree = [];
    this.json = {};
    this.file = new Asset();
    this.folderUp()
    console.log(this.asset)
    this.assets = this._languageService.getAssets(``);
    console.log(this.assets)
    this.files = this.assets.filter(x => !x.isDir);
    this.folders = this.assets.filter(x => x.isDir);

  }

  load(item: Asset) {
    this.file = item;
    this.fileDefault = {
      folder: item.folder,
      path: this._defaultLanguage.code + '.json',
      isDir: false,
      content: JSON.stringify(this.jsonDefault, null, 5)
    };
    this._languageService.getTranslationFile(`${item.path}`).subscribe((result: any) => {
      this.tree = [];
      this.path = [];
      this.json = result;
      this.loadTree(result, this.jsonDefault, null);
    });
  }

  loadTree(root: any, defaultLang: any, parent: ObjectTree | null): any {
    const $this = this;
    Object.keys(root).forEach(function (key) {
      $this.path.push(key);
      const item = <ObjectTree>{
        key: key,
        from: $this._defaultLanguage.code,
        to: $this.file!.path!.replace('.json', '').split(' ')[0],
        path: $this.path.join('.'),
        parent: parent
      };
      if (root[key] && typeof root[key] === 'object') {
        // alert(JSON.stringify(root[key]))
        $this.loadTree(root[key], defaultLang ? defaultLang[key] : null, item);
      } else {
        item.obj = (<any>$this).json[item.path];
        item.value = root[key];
        item.defaultValue = defaultLang ? defaultLang[key] : root[key];
      }
      $this.path.splice($this.path.length - 1, 1);
      if (parent) {
        if (!parent.child) {
          parent.child = [];
        }
        parent.child.push(item);
      } else {
        $this.tree.push(item);
      }
    });

    //
  }

  save(file: Asset, fileDefault: Asset) {
    file.content = JSON.stringify(this.json, null, 5);
    fileDefault.content = JSON.stringify(this.jsonDefault, null, 5);

    this._languageService.saveAsset([file, fileDefault]).subscribe(
      () => {
        this._toasterService.success(
          this._languageService.translate.instant('TRANSLATOR.TOASTER.SAVE'),
          this._languageService.translate.instant('TRANSLATOR.TOASTER.TITLE_SUCCESS'),

        );
      },
      (error: any) => {
        this._toasterService.error(error, this._languageService.translate.instant('TRANSLATOR.TOASTER.TITLE_ERROR'));
      }
    );
  }

  download(file: any[]) {
    this._languageService.saveAsset(file);
  }
}
