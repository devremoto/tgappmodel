import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

import { Language } from '../../../models/Language';
import { LanguageCustomService } from '../../../services/custom/Language';
import { JsonTranslate } from '../../../viewModels/JsonTranslate';
import { ObjectTree } from '../../../viewModels/ObjectTree';
import { ToastrService } from 'ngx-toastr';

declare let $: any;

@Component({
  selector: 'app-language-editor-form',
  templateUrl: './language-editor-form.component.html',
  styleUrls: ['./language-editor-form.component.css']
})
export class LanguageEditorFormComponent implements OnInit {
  constructor(private _languageService: LanguageCustomService, private _toasterService: ToastrService) {
    this._languageService.getDefaultLanguage().subscribe(result => {
      this._defaultLanguage = result;
    });
  }
  _defaultLanguage: Language;

  @ViewChild('popContent') public popOver: NgbPopover;
  currentPop: NgbPopover;
  rootItem: ObjectTree = {
    path: '',
    from: '',
    to: '',
    parent: null,
    child: new Array<ObjectTree>()
  } as ObjectTree;
  @Input() items: ObjectTree[];
  @Input() jObject: any;
  @Input() jObjectDefault: any;
  @Output() modelChange: any = new EventEmitter();
  ngOnInit(): void { }

  updateModel(event: ObjectTree) {
    this.setPropertyValue(event);
    this.emit();
  }
  emit() {
    this.modelChange.emit(this.jObject);
  }

  getJsonElement(node: ObjectTree): JsonTranslate {
    const arr = node.path.split('.');
    let element = this.jObject;
    let elementDefault = this.jObjectDefault;

    if (arr.length > 0) {
      for (let i = 0; i < arr.length - 1; i++) {
        elementDefault = elementDefault[arr[i]];
        element = element[arr[i]];
      }
      return <JsonTranslate>{
        jsonDefault: elementDefault[arr[arr.length - 1]],
        translated: element[arr[arr.length - 1]]
      };
    }

    return <JsonTranslate>{
      jsonDefault: elementDefault,
      translated: element
    };
  }

  addObject(e: Event, node: ObjectTree, root = false) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!node.newPropName) {
      this._toasterService.error(
        this._languageService.translate.instant('TRANSLATOR.TOASTER.EMPTY_PROPERTY'),
        this._languageService.translate.instant('TRANSLATOR.TOASTER.TITLE_ERROR')
      );
      return;
    }

    if (!root) {
      this.setTree(node.child, node, root);
    } else {
      this.setTree(this.items, node, root);
    }
    this.emit();
    if (this.currentPop) {
      this.currentPop.close();
    }
  }

  setTree(tree: ObjectTree[], node: ObjectTree, root = false) {
    const child = <ObjectTree>{
      key: node.newPropName.toLocaleUpperCase(),
      path: `${node.path}.${node.newPropName.toLocaleUpperCase()}`,
      parent: root ? null : node,
      child: new Array<ObjectTree>(),
      from: node.from,
      to: node.to
    };

    const exists = tree.filter(x => x.key === child.key);
    if (!exists.length) {
      tree.push(child);
      const parentJson = this.getJsonElement(node);
      parentJson.translated[node.newPropName] = {};
      parentJson.jsonDefault[node.newPropName] = {};
    } else {
      this._toasterService.error(
        this._languageService.translate.instant('TRANSLATOR.TOASTER.ADD_ERROR', { key: child.key, path: node.path }),
        this._languageService.translate.instant('TRANSLATOR.TOASTER.TITLE_ERROR')
      );
    }
  }

  translate(item: ObjectTree) {
    this._languageService.translation(item.defaultValue, item.from, item.to).subscribe(result => {
      if (result) {
        item.value = result;
        this.setPropertyValue(item);
        this._toasterService.error(
          `<b>${result}</b>`, `${item.defaultValue} translated to ${item.to}`);
      }
    });
  }

  private setPropertyValue(item: ObjectTree) {
    const element = this.getJsonElement(item?.parent!);
    element.translated[item.key] = item.value;
    element.jsonDefault[item.key] = item.defaultValue;
  }

  addField(e: Event, parent: ObjectTree) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!parent || !parent.newPropName) {
      this._toasterService.error(
        this._languageService.translate.instant('TRANSLATOR.TOASTER.EMPTY_PROPERTY'),
        this._languageService.translate.instant('TRANSLATOR.TOASTER.TITLE_ERROR')

      );
      return;
    }
    const child = <ObjectTree>{
      key: parent.newPropName.toLocaleUpperCase(),
      path: `${parent.path}.${parent.newPropName.toLocaleUpperCase()}`,
      from: parent.from,
      to: parent.to,
      parent: parent,
      value: ''
    };
    const exists = parent.child.filter(x => x.key === child.key);
    if (exists.length === 0) {
      parent.child.push(child);
      const parentJson = this.getJsonElement(parent);
      parentJson.translated[parent.newPropName] = '';
      parentJson.jsonDefault[parent.newPropName] = '';
    } else {
      this._toasterService.error(
        this._languageService.translate.instant('TRANSLATOR.TOASTER.ADD_ERROR', { key: child.key, path: parent.path }),
        this._languageService.translate.instant('TRANSLATOR.TOASTER.TITLE_ERROR')
      );
    }
    this.emit();
    if (this.currentPop) {
      this.currentPop.close();
    }
  }

  closePopOver(): any {
    // if (this.popOver)
    //    this.popOver.close();
  }

  addPropClick(e: Event, pop: NgbPopover, item?: ObjectTree) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      this.currentPop = pop;
      if (item) {
        setTimeout(() => {
          $(`#${item.key}_pop`).focus()
        }, 1000);
      }

    }

    // if (this.popOver.isOpen)
    //    this.popOver.close();
  }
  copy(parent: ObjectTree) {
    const message = `{{ '${parent.path}' |  translate }}`;
    this.copyMessage(message);
    this._toasterService.success(message, 'key copied to clipboard');
  }

  copyJs(parent: ObjectTree) {
    const message = `this._languageService.translate.instant('${parent.path}')`;
    this.copyMessage(message);
    this._toasterService.success(message, 'key copied to clipboard');
  }
  remove(obj: ObjectTree, e?: Event) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const search = this.fidPathInTree(obj);
    if (search && search.parent) {
      const index = search.parent.child.indexOf(search);
      if (index > -1) {
        search.parent.child.splice(index, 1);
      }
    } else {
      const index = this.items.indexOf(search);
      if (index > -1) {
        this.items.splice(index, 1);
      }
    }
    const element = this.getJsonElement(obj.parent || obj);
    delete element.jsonDefault[obj.key];
    delete element.translated[obj.key];
    this.emit();
  }
  fidPathInTree(item: ObjectTree): ObjectTree {
    let result: ObjectTree | null = null;
    const $this = this;
    if (item.parent) {
      $(item.parent.child).each((obj: ObjectTree) => {
        if (item.path === obj.path) {
          result = obj;
          return false;
        } else if (obj.child) {
          return $this.fidPathInTree(obj);
        }
        return
      });
      if (result) {
        return result;
      }
    } else {
      result = item;
    }
    return result!;
  }
  copyMessage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  // getPopOver(id, index) {
  //   return eval(id + index);
  // }
}
