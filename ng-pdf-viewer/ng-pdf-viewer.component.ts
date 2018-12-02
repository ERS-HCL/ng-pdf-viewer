import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PdfViewerService } from './pdf-viewer.service';

@Component({
  selector: 'app-ng-pdf-viewer',
  templateUrl: './ng-pdf-viewer.component.html',
  styleUrls: ['./ng-pdf-viewer.component.css']
})
export class NgPdfViewerComponent implements OnInit {

  @Input()
  pdfBlog: any;
  @Input()
  caller: Component;
  @Input()
  serviceCaller: string;
  @Input()
  pdfApi: string;
  @Input()
  xhrMethod: string = 'get';
  @Input()
  postBody: any;
  @Input()
  pdfFileName: string = 'download';
  @Input()
  downloadPdf: boolean;
  @Input()
  openPdf: string;

  @Output()
  result: EventEmitter<any> =  new EventEmitter();

  constructor(private _pdfSvc: PdfViewerService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  exportPDF(){
    if(this.pdfBlog && !this.caller && this.openPdf !== 'SAME_PAGE'){
      this.viewOrDownloadPdf(this.downloadPdf, this.pdfBlog, this.pdfFileName);
    }else if(!this.pdfBlog && !this.caller && this.openPdf !== 'SAME_PAGE'){
      this._pdfSvc[`${this.xhrMethod}Pdf`](this.pdfApi, this.xhrMethod !== 'get' ? this.postBody : null, false).subscribe(pdfData => {
        this.viewOrDownloadPdf(this.downloadPdf, pdfData, this.pdfFileName);
      }, error => {
        this.onResult(error);
      });
    }else if(!this.pdfBlog && !this.caller && this.openPdf === 'SAME_PAGE'){
      this.openPdfInNewWindow();
    }else if(!this.pdfBlog && this.caller && !this.openPdf){
      this.caller[this.serviceCaller]().subscribe(pdfData => {
        this.viewOrDownloadPdf(this.downloadPdf, pdfData, this.pdfFileName);
      }, error => {
        this.onResult(error);
      });
    }else if(!this.pdfBlog && this.caller && this.openPdf === 'SAME_PAGE'){
      this.caller[this.serviceCaller]().subscribe(pdfData => {
        let pdfUrl = URL.createObjectURL(pdfData);
        this.pdfBlog = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
        this.onResult(true);
      }, error => {
        this.onResult(error);
      });
    }
  }

  viewOrDownloadPdf(downloadPdf: boolean, _pdf: Blob, expCsvFileNm: string){
    if(this.downloadPdf){
      this.save(_pdf, this.pdfFileName);
    }else{
      let fileURL = URL.createObjectURL(_pdf);
      window.open(fileURL);
    }
    this.onResult(true);
  }

  onResult(response: any): any{
    this.result.emit(response);
  }

  save(_pdf: Blob, expCsvFileNm: string){
    let expCsvFile: string = expCsvFileNm + '.pdf' || 'export.pdf';    
    if(navigator.msSaveBlob){
        navigator.msSaveBlob(_pdf, expCsvFile);
    }else{
        let _link: any = document.createElement('a');
        if(_link.download !== undefined){
            let _url: any = URL.createObjectURL(_pdf);
            _link.setAttribute('href', _url);
            _link.setAttribute('download', expCsvFile);
            _link.style.visibility = 'hidden';
            document.body.appendChild(_link);
            _link.click();
            document.body.removeChild(_link);
        }
    }
  }

  openPdfInNewWindow(){
    this._pdfSvc[`${this.xhrMethod}Pdf`](this.pdfApi, this.xhrMethod !== 'get' ? this.postBody : null, false).subscribe(pdfData => {
      let pdfUrl = URL.createObjectURL(pdfData);
      this.pdfBlog = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
      this.onResult(true);
    }, error => {
      this.onResult(error);
    });
  }
}