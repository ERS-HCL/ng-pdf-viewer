# Angular 6 PDF Viewer

An Angular component with service to provide the featres to work with PDF such as viewing or downloading from a PDF url or an REST api.

## How to use

First download or clone `ng-pdf-viewer` to your project's `app` folder or any other shared module that you mantain. 

Include `NgPdfViewerComponent` and `PdfViewerService` in `declarations` and `providers` respectively in your `AppModule` or in your shared module.

Use the `ng-pdf-viewer` component in your template where ever you want to use by projecting the HTML elements like button or link,

        <ng-pdf-viewer>
            <!-- Project the HTML elements like button ot link -->
            <button>Export PDF</button>         
        </ng-pdf-viewer>
        
## Component attributes

Following are the various attributes of the `ng-pdf-viewer` component,

### pdfBlog

`pdfBlob` accepts only a PDF blob directly, which can be passed from the parent component.

### caller

`caller` is the parent component class. 

### serviceCaller

`serviceCaller` is the method which is responsible for getting the PDF response from an API.

### pdfApi

`psdApi` is usefull when you dont want to make any service call by your won and in such case `ng-pdf-viewer` takes care of that. Only you have to provide the API url.

### xhrMethod

`xhrMethod` may `get`, `post` or `put` method and you pass these method as string.

### postBody

If the `xhrMethod` is `post` or `put` then some time you may need to provide the request body. So using `postBody` you will be able to provide the request body if it is necessary.

### pdfFileName

While downloading the PDF you may need to have the PDF file with some specific name and you can have an option i.e `pdfFileName` to provide the PDF file name.

### downloadPdf

If you want to provide an option to download the PDF then you just have to provide a boolean of `true` as `downloadPdf`. 

### openPdf

If you want open the PDF in the same page where you have want to display then just use `[downloadPdf] = "'SAME_PAGE'"`.

## Example

If you want to provide only API url and you want to provide an option to download the PDF,

        <ng-pdf-viewer [pdfApi]="'https://www.mocky.io/v2/5c04179d3300005100d01ccb'" [downloadPdf]="true">
                <button>Download Pdf</button>
        </ng-pdf-viewer>
        
If you want to provide an option to view the PDF in current page,

        <ng-pdf-viewer [pdfApi]="'https://www.mocky.io/v2/5c04179d3300005100d01ccb'" [openPdf]="'SAME_PAGE'">
                <button>Download Pdf</button>
        </ng-pdf-viewer>

## Author

learning.bikash@gmail.com

