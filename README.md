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


