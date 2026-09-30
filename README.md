# Paperwise

Paperwise is a small, responsive PDF workspace built with plain HTML, CSS, and JavaScript. It includes 12 document tools and runs without a server or build step.

## Run locally

Serve the project folder over HTTP (recommended; PDF workers may be restricted on `file://` URLs):

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`. The libraries used for document processing are loaded from public CDNs, so an internet connection is needed to open the tools. No uploaded files are sent to a server.

## Included tools

- Merge PDFs and split selected page ranges into separate files.
- Reduce PDF size by converting pages to JPEG images. This can reduce quality and does not preserve selectable text or links.
- Convert PDF text to DOCX or XLSX, or create a PowerPoint presentation with each original PDF page as an image.
- Convert DOCX to text-based PDF, extract PPTX slide text into PDF, or export XLS/XLSX worksheet values to PDF.
- Add a text note to one or all PDF pages.
- Export PDF pages to JPG, or combine JPG/PNG images into a PDF.

Conversions that recreate documents from extracted text simplify complex layouts, formatting, and artwork. Scanned PDFs need OCR before their text can be extracted. The app explains these limitations before each conversion.

## Publish with GitHub Pages

This repository includes a GitHub Actions workflow that publishes the site whenever changes are pushed to `main`:

1. Push the project files to your GitHub repository.
2. In the repository, open **Settings → Pages** and set the build and deployment source to **GitHub Actions**.
3. Open the Pages URL shown in the repository settings after the workflow finishes.

All processing happens in the browser. There is no backend, upload endpoint, account, or server-side file storage to configure.
