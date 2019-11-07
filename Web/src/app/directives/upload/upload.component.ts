import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FileItem, FileUploader } from 'ng2-file-upload';

import { Config } from '../../config';
import { FileModel } from '../../models/FileModel';

declare var $: any;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, AfterViewInit {
  _upload: UploadComponent;
  src: string;

  reader: FileReader;

  file: FileModel = new FileModel();
  item: FileItem = <FileItem>{};
  msg_error: string;
  @Input() id: string;
  @Input() name: string;
  @Input() path: string;
  @Input() width = 320;
  @Input() height = 240;
  @Input() cssClass: string;
  @Input() cssIcon: string;
  @Input() label: string;
  @Input() model: any;

  @Output() modelChange: any = new EventEmitter();
  @Output() change: any = new EventEmitter();
  @Output() complete: any = new EventEmitter();
  @Output() serverDelete: any = new EventEmitter();

  @ViewChild('input') element: ElementRef;
  @ViewChild('video') video: ElementRef;
  @ViewChild('image') image: ElementRef;
  @ViewChild('doc') doc: ElementRef;

  videoFilterExt = '|avi|mpeg|mp4|ogg|';
  imgFilterExt = '|jpg|png|jpeg|bmp|gif|';

  public uploader: FileUploader = new FileUploader({});
  config: any;
  constructor() {
    this.config = Config;
    this._upload = this;
    this.uploader.onAfterAddingFile = this.onAfterAddingFile.bind(this);
  }

  ngOnInit(): void {
    if (this.path) {
      this.loadFileFromPath();
    }
    if (!this.label) {
      this.label = 'Selecione um arquivo';
    }
  }

  ngAfterViewInit(): void { }

  updateData() {
    this.model = this.file.fileName;
    this.modelChange.emit(this.file.fileName);
  }

  loadFileFromPath(): any {
    const ext = this.path.slice(this.path.lastIndexOf('.') + 1);
    this.file = <FileModel>{
      fileName: this.path,
      name: this.name,
      id: this.id,
      size: 0,
      formattedSize: '',
      type: `application/${ext}`,
      extension: ext
    };
    this.checkFile(this.file);
    if (this.file.isImage) {
      this.src = `${this.config.siteUrl}/file/image/${this.path}?w=${this.width}&h=${this.height}`;
      this.loadFileSize('image');
    }
    if (this.file.isVideo) {
      this.src = `${this.config.siteUrl}/file/file/${this.path}`;
      this.loadFileSize('video');
    }
    if (this.file.isDoc) {
      this.src = `${this.config.siteUrl}/file/file/${this.path}`;
      this.loadFileSize('doc');
    }
  }

  onAfterAddingFile(fileItem: FileItem) {
    this._upload.item = fileItem;
    this._upload.file = <FileModel>{
      fileName: fileItem.file.name,
      name: this._upload.name,
      id: this._upload.id,
      size: fileItem.file.size,
      formattedSize: this._upload.formatSize(fileItem.file.size),
      type: fileItem.file.type
    };
    this._upload.checkFile(this._upload.item.file);
    this._upload.readFile(this._upload.item.file);
  }

  loadFileSize(type) {
    let doc: ElementRef = null;
    switch (type) {
      case 'doc':
        doc = this.doc;
        break;
      case 'image':
        doc = this.image;
        break;
      case 'video':
        doc = this.video;
        break;
    }
    if (!doc || (doc && !doc.nativeElement)) {
      setTimeout(() => {
        this._upload.loadFileSize(type);
      }, 300);
      return;
    }

    const file = doc.nativeElement;
    $(file).ready(function () {
      const info: any = performance.getEntriesByName(file.src || file.href);
      if (info && info.length === 0) {
        setTimeout(() => {
          this._upload.loadFileSize(type);
        }, 300);
        return;
      }
      if (type === 'doc') {
        file.download = this._upload.file.fileName;
      }
      if (info[0].transferSize) {
        this._upload.file.size = info[0].transferSize;
        this._upload.file.formattedSize = this._upload.formatSize(info[0].transferSize);
      }
    });
  }

  scaleImage(maxWidth, maxHeight) {
    const image = this.image.nativeElement;

    if (!image.clientWidth) {
      setTimeout(() => {
        this._upload.scaleImage(maxHeight, maxWidth);
      }, 300);
      return;
    }

    const ratioX = maxWidth / image.clientWidth;
    const ratioY = maxHeight / image.clientHeight;
    const ratio = Math.min(ratioX, ratioY);

    image.width = image.clientWidth * ratio;
  }

  click() {
    this.element.nativeElement.click();
  }

  checkFile(file) {
    this.file.isDoc = false;
    this.file.isImage = false;
    this.file.isVideo = false;
    if (this.isImage(file)) {
      return;
    } else if (this.isVideo(file)) {
      return;
    }
    this.file.isDoc = true;
  }

  isImage(file) {
    const type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
    const ext = '|' + file.ext + '|';
    this.file.isImage = this.imgFilterExt.indexOf(type) !== -1 || this.imgFilterExt.indexOf(ext) !== -1;
    return this.file.isImage;
  }

  isVideo(file) {
    const type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
    const ext = '|' + file.ext + '|';
    this.file.isVideo = this.videoFilterExt.indexOf(type) !== -1 || this.videoFilterExt.indexOf(ext) !== -1;
    return this.file.isVideo;
  }

  readFile(file) {
    file = $(this._upload.element.nativeElement);
    this.reader = new FileReader();
    this.reader.onloadend = this.onLoadFile.bind(this);
    this.reader.readAsDataURL(this.item._file);
  }

  onLoadFile() {
    if (this._upload.file.isVideo) {
      const video = $(this._upload.video.nativeElement);
      video.attr('src', this._upload.reader.result);
      return;
    }
    if (this._upload.file.isImage) {
      const img = $(this._upload.image.nativeElement);
      img.attr('src', this._upload.reader.result);
      this._upload.scaleImage(this._upload.width, this._upload.height);
    }

    if (this._upload.file.isDoc) {
      const doc = $(this._upload.doc.nativeElement);
      doc.attr('href', this._upload.reader.result);
      doc.attr('download', this._upload.file.fileName);
    }
  }

  formatSize(value) {
    const bite = 1024;
    if (value >= bite * 1000000) {
      return (value / (bite * 1000000)).toFixed(2) + ' Gb';
    } else if (value >= bite * 1000) {
      return (value / (bite * 1000)).toFixed(2) + ' Mb';
    } else if (value >= bite) {
      return (value / bite).toFixed(2) + ' Kb';
    }
    return (value / bite).toFixed(2) + ' bites';
  }
}
