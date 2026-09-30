"use strict";

const iconPaths = {
  merge: '<path d="M8 4v5a3 3 0 0 0 3 3h2a3 3 0 0 1 3 3v5"></path><path d="m13 17 3 3 3-3"></path><path d="m5 7 3-3 3 3"></path>',
  split: '<path d="M12 3v7"></path><path d="m9 7 3 3 3-3"></path><path d="M12 10 6 16"></path><path d="M12 10l6 6"></path><path d="M4 18v2h4"></path><path d="M20 18v2h-4"></path>',
  compress: '<path d="m8 3-5 5"></path><path d="M3 3v5h5"></path><path d="m16 3 5 5"></path><path d="M21 3v5h-5"></path><path d="m3 16 5 5"></path><path d="M3 21h5v-5"></path><path d="m21 16-5 5"></path><path d="M21 21h-5v-5"></path>',
  word: '<path d="M5 3h10l4 4v14H5z"></path><path d="M15 3v5h4"></path><path d="m8 12 1.3 5 1.5-3.2 1.5 3.2 1.3-5"></path>',
  slides: '<rect x="3" y="4" width="18" height="14" rx="2"></rect><path d="M12 18v3"></path><path d="M8 21h8"></path><path d="M8 9h8M8 13h5"></path>',
  sheet: '<rect x="4" y="3" width="16" height="18" rx="2"></rect><path d="M4 9h16M10 9v12M4 15h16"></path>',
  edit: '<path d="m14 5 5 5"></path><path d="M4 20h4l11-11a2.1 2.1 0 0 0-4-4L4 16z"></path><path d="M13 6 18 11"></path>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="m21 15-5-5L5 21"></path>',
  photos: '<rect x="3" y="4" width="15" height="16" rx="2"></rect><path d="m18 9 3 2v7a2 2 0 0 1-2 2h-2"></path><circle cx="8" cy="9" r="1.5"></circle><path d="m18 16-4-4-7 7"></path>',
  arrow: '<path d="M7 17 17 7"></path><path d="M7 7h10v10"></path>'
};

const tools = [
  { id: "merge-pdf", title: "Merge PDF", category: "organize", categoryLabel: "Organize", description: "Bring multiple PDFs together in the order you choose.", detail: "Put several PDF files into one document. Add files in the order you want them to appear.", icon: "merge", accept: ".pdf,application/pdf", multiple: true, tint: "#e8f3ee", color: "#176b55" },
  { id: "split-pdf", title: "Split PDF", category: "organize", categoryLabel: "Organize", description: "Separate pages into smaller, easier-to-share files.", detail: "Choose page numbers or ranges to save as separate PDF files. Use commas between ranges, like 1-3, 5. Enter “all” to save every page separately.", icon: "split", accept: ".pdf,application/pdf", multiple: false, tint: "#f0edf8", color: "#756b98" },
  { id: "compress-pdf", title: "Compress PDF", category: "edit", categoryLabel: "Edit & optimize", description: "Make a smaller PDF that is easier to share.", detail: "Create a lighter PDF by reducing page-image resolution. This visual compression can rasterize pages, so selectable text and links may not be preserved.", icon: "compress", accept: ".pdf,application/pdf", multiple: false, tint: "#e8f3ee", color: "#176b55" },
  { id: "pdf-to-word", title: "PDF to Word", category: "convert", categoryLabel: "Convert", description: "Turn text from a PDF into an editable Word file.", detail: "Extract readable text from your PDF and arrange it in a new Word document. Complex page layouts may need a little tidying.", icon: "word", accept: ".pdf,application/pdf", multiple: false, tint: "#e8eff8", color: "#4773a6" },
  { id: "pdf-to-powerpoint", title: "PDF to PowerPoint", category: "convert", categoryLabel: "Convert", description: "Place each PDF page on its own presentation slide.", detail: "Make a PowerPoint presentation from your PDF. Each slide contains a clear image of its original page.", icon: "slides", accept: ".pdf,application/pdf", multiple: false, tint: "#f8eee5", color: "#bd7a46" },
  { id: "pdf-to-excel", title: "PDF to Excel", category: "convert", categoryLabel: "Convert", description: "Move text from PDF pages into an Excel workbook.", detail: "Extract text from a PDF into a worksheet, using page layout to group text into rows. Scanned pages need OCR before their text can be extracted.", icon: "sheet", accept: ".pdf,application/pdf", multiple: false, tint: "#e8f3ee", color: "#3b8a65" },
  { id: "word-to-pdf", title: "Word to PDF", category: "convert", categoryLabel: "Convert", description: "Create a shareable PDF from a Word document.", detail: "Convert DOCX text into a simple, readable PDF. This browser-based conversion preserves document text, not advanced Word styling.", icon: "word", accept: ".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document", multiple: false, tint: "#e8eff8", color: "#4773a6" },
  { id: "powerpoint-to-pdf", title: "PowerPoint to PDF", category: "convert", categoryLabel: "Convert", description: "Save presentation text as a tidy PDF document.", detail: "Extract the text from each PPTX slide and lay it out in a PDF, one slide at a time. Slide artwork and styling are not recreated.", icon: "slides", accept: ".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation", multiple: false, tint: "#f8eee5", color: "#bd7a46" },
  { id: "excel-to-pdf", title: "Excel to PDF", category: "convert", categoryLabel: "Convert", description: "Turn spreadsheet rows into a clean PDF.", detail: "Export workbook values into a readable PDF, with each worksheet on its own pages. Complex spreadsheet formatting is simplified.", icon: "sheet", accept: ".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel", multiple: false, tint: "#e8f3ee", color: "#3b8a65" },
  { id: "edit-pdf", title: "Edit PDF", category: "edit", categoryLabel: "Edit & optimize", description: "Add a text note to the first page or every page.", detail: "Place a text note onto your PDF. Choose whether to add it to the first page or to every page.", icon: "edit", accept: ".pdf,application/pdf", multiple: false, tint: "#f9eee8", color: "#bd765e" },
  { id: "pdf-to-jpg", title: "PDF to JPG", category: "convert", categoryLabel: "Convert", description: "Save your PDF pages as easy-to-share JPG images.", detail: "Turn PDF pages into high-quality JPG images. Multiple images are bundled into one ZIP file.", icon: "image", accept: ".pdf,application/pdf", multiple: false, tint: "#f8eee5", color: "#bd7a46" },
  { id: "jpg-to-pdf", title: "JPG to PDF", category: "convert", categoryLabel: "Convert", description: "Combine JPG and PNG images into one PDF.", detail: "Add one or more JPG or PNG images to a PDF. Images are placed in the order you choose.", icon: "photos", accept: ".jpg,.jpeg,.png,image/jpeg,image/png", multiple: true, tint: "#f0edf8", color: "#756b98" }
];

const elements = {
  grid: document.querySelector("#tool-grid"),
  search: document.querySelector("#tool-search"),
  noResults: document.querySelector("#no-results"),
  dialog: document.querySelector("#tool-dialog"),
  title: document.querySelector("#dialog-title"),
  category: document.querySelector("#dialog-category"),
  description: document.querySelector("#dialog-description"),
  icon: document.querySelector("#dialog-icon"),
  options: document.querySelector("#tool-options"),
  input: document.querySelector("#file-input"),
  dropzone: document.querySelector("#dropzone"),
  dropzoneLimit: document.querySelector("#dropzone-limit"),
  fileList: document.querySelector("#file-list"),
  status: document.querySelector("#job-status"),
  process: document.querySelector("#process-button"),
  reset: document.querySelector("#reset-tool")
};

let activeTool = null;
let selectedFiles = [];
let activeFilter = "all";
let isProcessing = false;

function iconMarkup(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.edit}</svg>`;
}

function renderTools() {
  const query = elements.search.value.trim().toLowerCase();
  const visibleTools = tools.filter((tool) => {
    const matchesFilter = activeFilter === "all" || tool.category === activeFilter;
    const matchesQuery = `${tool.title} ${tool.description} ${tool.categoryLabel}`.toLowerCase().includes(query);
    return matchesFilter && matchesQuery;
  });

  elements.grid.replaceChildren(...visibleTools.map((tool) => {
    const card = document.createElement("button");
    card.className = "tool-card";
    card.type = "button";
    card.setAttribute("aria-label", `${tool.title}: ${tool.description}`);
    card.innerHTML = `<span class="tool-card-top"><span class="tool-icon" style="--icon-bg:${tool.tint};--icon-color:${tool.color}">${iconMarkup(tool.icon)}</span><span class="tool-arrow" aria-hidden="true">↗</span></span><h3>${tool.title}</h3><p>${tool.description}</p>`;
    card.addEventListener("click", () => openTool(tool));
    return card;
  }));
  elements.noResults.hidden = visibleTools.length > 0;
}

function buildOptions(tool) {
  if (tool.id === "split-pdf") {
    return '<div class="options-row"><label class="option-field" for="page-ranges">Pages to extract<input id="page-ranges" type="text" value="all" autocomplete="off" placeholder="e.g. 1-3, 5"></label><p class="option-hint">Each range becomes its own PDF. Page numbers start at 1.</p></div>';
  }
  if (tool.id === "compress-pdf") {
    return '<div class="options-row"><label class="option-field" for="compression-level">Image quality<select id="compression-level"><option value="balanced">Balanced — smaller file</option><option value="clear">Clear — higher quality</option><option value="small">Smallest — lower quality</option></select></label></div>';
  }
  if (tool.id === "edit-pdf") {
    return '<div class="options-row"><label class="option-field" for="edit-text">Text to add<input id="edit-text" type="text" maxlength="180" placeholder="Add a note to your PDF"></label><label class="option-field" for="edit-pages">Apply to<select id="edit-pages"><option value="first">First page only</option><option value="all">Every page</option></select></label></div>';
  }
  return "";
}

function openTool(tool) {
  activeTool = tool;
  selectedFiles = [];
  elements.title.textContent = tool.title;
  elements.category.textContent = tool.categoryLabel;
  elements.description.textContent = tool.detail;
  elements.icon.innerHTML = iconMarkup(tool.icon);
  elements.icon.style.setProperty("--icon-bg", tool.tint);
  elements.icon.style.setProperty("--icon-color", tool.color);
  elements.options.innerHTML = buildOptions(tool);
  elements.input.accept = tool.accept;
  elements.input.multiple = tool.multiple;
  elements.input.value = "";
  elements.dropzoneLimit.textContent = tool.multiple ? "Add multiple files · processed on your device" : "One file · processed on your device";
  elements.fileList.replaceChildren();
  clearStatus();
  elements.reset.hidden = true;
  setProcessState(false);
  elements.dialog.showModal();
  elements.input.focus({ preventScroll: true });
}

function clearStatus() {
  elements.status.className = "job-status";
  elements.status.replaceChildren();
}

function setProcessState(disabled, label) {
  elements.process.disabled = disabled;
  const buttonLabel = label || (selectedFiles.length ? "Start " + activeTool.title.toLowerCase() : "Choose files to continue");
  elements.process.replaceChildren(document.createTextNode(buttonLabel + " "));
  const arrow = document.createElement("span");
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "→";
  elements.process.append(arrow);
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function renderFileList() {
  elements.fileList.replaceChildren(...selectedFiles.map((file, index) => {
    const row = document.createElement("div");
    row.className = "file-item";
    const badge = document.createElement("span");
    badge.className = "file-badge";
    badge.textContent = file.name.split(".").pop().slice(0, 4).toUpperCase();
    const meta = document.createElement("span");
    meta.className = "file-meta";
    const name = document.createElement("span");
    name.className = "file-name";
    name.textContent = file.name;
    const size = document.createElement("span");
    size.className = "file-size";
    size.textContent = formatBytes(file.size);
    meta.append(name, size);
    const remove = document.createElement("button");
    remove.className = "remove-file";
    remove.type = "button";
    remove.setAttribute("aria-label", `Remove ${file.name}`);
    remove.textContent = "×";
    remove.addEventListener("click", () => {
      selectedFiles.splice(index, 1);
      renderFileList();
      clearStatus();
      setProcessState(selectedFiles.length === 0 || isProcessing);
    });
    row.append(badge, meta);
    if (selectedFiles.length > 1 && activeTool.multiple) {
      const move = document.createElement("button");
      move.className = "remove-file";
      move.type = "button";
      move.setAttribute("aria-label", `Move ${file.name} up`);
      move.title = "Move earlier";
      move.textContent = "↑";
      move.disabled = index === 0 || isProcessing;
      move.addEventListener("click", () => {
        [selectedFiles[index - 1], selectedFiles[index]] = [selectedFiles[index], selectedFiles[index - 1]];
        renderFileList();
      });
      const moveDown = document.createElement("button");
      moveDown.className = "remove-file";
      moveDown.type = "button";
      moveDown.setAttribute("aria-label", `Move ${file.name} down`);
      moveDown.title = "Move later";
      moveDown.textContent = "↓";
      moveDown.disabled = index === selectedFiles.length - 1 || isProcessing;
      moveDown.addEventListener("click", () => {
        [selectedFiles[index], selectedFiles[index + 1]] = [selectedFiles[index + 1], selectedFiles[index]];
        renderFileList();
      });
      row.append(move, moveDown);
    }
    row.append(remove);
    return row;
  }));
  setProcessState(selectedFiles.length === 0 || isProcessing, isProcessing ? "Working…" : undefined);
}

function fileMatchesTool(file, tool) {
  const extension = "." + file.name.split(".").pop().toLowerCase();
  if (tool.id === "jpg-to-pdf") return [".jpg", ".jpeg", ".png"].includes(extension);
  if (tool.id === "word-to-pdf") return extension === ".docx";
  if (tool.id === "powerpoint-to-pdf") return extension === ".pptx";
  if (tool.id === "excel-to-pdf") return [".xlsx", ".xls"].includes(extension);
  return extension === ".pdf";
}

function addFiles(fileList) {
  if (!activeTool) return;
  const incoming = Array.from(fileList);
  const validFiles = incoming.filter((file) => fileMatchesTool(file, activeTool));
  const rejected = incoming.length - validFiles.length;
  if (rejected) {
    elements.status.textContent = `Some files were skipped. Choose ${activeTool.accept.split(",").filter((type) => type.startsWith(".")).join(", ")} files.`;
    elements.status.className = "job-status is-error";
  } else {
    clearStatus();
  }
  if (!activeTool.multiple && validFiles.length) selectedFiles = [];
  for (const file of validFiles) {
    if (selectedFiles.some((existing) => existing.name === file.name && existing.size === file.size && existing.lastModified === file.lastModified)) continue;
    selectedFiles.push(file);
  }
  renderFileList();
  elements.reset.hidden = selectedFiles.length === 0;
}

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.hidden = true;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

async function deliverOutputs(outputs) {
  if (outputs.length === 1) {
    saveBlob(outputs[0].blob, outputs[0].name);
    return outputs[0].name;
  }
  if (typeof JSZip === "undefined") throw new Error("The ZIP helper could not be loaded. Check your internet connection and try again.");
  const archive = new JSZip();
  outputs.forEach((output) => archive.file(output.name, output.blob));
  const blob = await archive.generateAsync({ type: "blob" });
  const filename = `${baseName(selectedFiles[0].name)}-files.zip`;
  saveBlob(blob, filename);
  return filename;
}

function baseName(filename) {
  return filename.replace(/\.[^.]+$/, "").replace(/[^\p{L}\p{N}._-]+/gu, "-") || "document";
}

function requireLibrary(name, value) {
  if (!value) throw new Error(`${name} could not be loaded. Check your internet connection and reload the page.`);
  return value;
}

async function loadPdf(file) {
  const pdfjs = requireLibrary("The PDF reader", window.pdfjsLib);
  pdfjs.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";
  return pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
}

async function makePdfOutput(file, doc) {
  return { name: `${baseName(file.name)}-paperwise.pdf`, blob: new Blob([await doc.save()], { type: "application/pdf" }) };
}

async function mergePdfs(files) {
  const { PDFDocument } = requireLibrary("The PDF tools", window.PDFLib);
  const merged = await PDFDocument.create();
  for (let index = 0; index < files.length; index += 1) {
    elements.status.textContent = `Adding document ${index + 1} of ${files.length}…`;
    const source = await PDFDocument.load(await files[index].arrayBuffer());
    const pages = await merged.copyPages(source, source.getPageIndices());
    pages.forEach((page) => merged.addPage(page));
  }
  return [{ name: `${baseName(files[0].name)}-merged.pdf`, blob: new Blob([await merged.save()], { type: "application/pdf" }) }];
}

function parsePageGroups(input, pageCount) {
  const value = input.trim().toLowerCase();
  if (value === "all") return Array.from({ length: pageCount }, (_, index) => [index]);
  if (!value) throw new Error("Enter page numbers or ranges, such as 1-3, 5.");
  const selected = new Set();
  const groups = value.split(",").map((part) => {
    const match = part.trim().match(/^(\d+)(?:\s*-\s*(\d+))?$/);
    if (!match) throw new Error(`“${part.trim()}” is not a valid page number or range.`);
    const start = Number(match[1]);
    const end = Number(match[2] || match[1]);
    if (start < 1 || end < start || end > pageCount) throw new Error(`Page numbers must be between 1 and ${pageCount}.`);
    const group = [];
    for (let page = start; page <= end; page += 1) {
      if (selected.has(page)) throw new Error(`Page ${page} appears more than once.`);
      selected.add(page);
      group.push(page - 1);
    }
    return group;
  });
  return groups;
}

async function splitPdf(file) {
  const { PDFDocument } = requireLibrary("The PDF tools", window.PDFLib);
  const source = await PDFDocument.load(await file.arrayBuffer());
  const groups = parsePageGroups(document.querySelector("#page-ranges").value, source.getPageCount());
  const outputs = [];
  for (let index = 0; index < groups.length; index += 1) {
    elements.status.textContent = `Preparing PDF ${index + 1} of ${groups.length}…`;
    const result = await PDFDocument.create();
    const pages = await result.copyPages(source, groups[index]);
    pages.forEach((page) => result.addPage(page));
    outputs.push({ name: `${baseName(file.name)}-pages-${groups[index].map((page) => page + 1).join("-")}.pdf`, blob: new Blob([await result.save()], { type: "application/pdf" }) });
  }
  return outputs;
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("The browser could not create an image from this page.")), type, quality);
  });
}

async function renderPdfPage(pdf, pageNumber, scale) {
  const page = await pdf.getPage(pageNumber);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) throw new Error("Your browser could not prepare the page image.");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: context, viewport }).promise;
  return { canvas, page };
}

async function compressPdf(file) {
  const jspdf = requireLibrary("The PDF writer", window.jspdf).jsPDF;
  const level = document.querySelector("#compression-level").value;
  const settings = level === "small" ? { scale: 1.05, quality: 0.52 } : level === "clear" ? { scale: 1.75, quality: 0.82 } : { scale: 1.35, quality: 0.68 };
  const pdf = await loadPdf(file);
  const output = new jspdf({ unit: "pt", format: "a4", compress: true });
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    elements.status.textContent = `Compressing page ${pageNumber} of ${pdf.numPages}…`;
    const { canvas, page } = await renderPdfPage(pdf, pageNumber, settings.scale);
    const viewport = page.getViewport({ scale: 1 });
    const orientation = viewport.width > viewport.height ? "landscape" : "portrait";
    const width = viewport.width;
    const height = viewport.height;
    if (pageNumber > 1) output.addPage([width, height], orientation);
    else output.setPage(1);
    output.internal.pageSize.width = width;
    output.internal.pageSize.height = height;
    output.addImage(canvas.toDataURL("image/jpeg", settings.quality), "JPEG", 0, 0, width, height);
    canvas.width = 0;
    canvas.height = 0;
    page.cleanup();
  }
  const rasterized = output.output("blob");
  let blob = rasterized;
  if (rasterized.size >= file.size) {
    const { PDFDocument } = requireLibrary("The PDF tools", window.PDFLib);
    const originalBytes = await file.arrayBuffer();
    const optimized = new Blob([await (await PDFDocument.load(originalBytes)).save({ useObjectStreams: true })], { type: "application/pdf" });
    blob = optimized.size < file.size ? optimized : file;
  }
  const reduced = blob.size < file.size;
  return [{
    name: `${baseName(file.name)}-compressed.pdf`,
    blob,
    summary: reduced
      ? `Reduced from ${formatBytes(file.size)} to ${formatBytes(blob.size)}.`
      : `This PDF has no safely reducible content, so its original pages and selectable text were preserved (${formatBytes(file.size)}).`
  }];
}

async function extractPdfPages(file) {
  const pdf = await loadPdf(file);
  const pages = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    elements.status.textContent = `Reading page ${pageNumber} of ${pdf.numPages}…`;
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const rows = [];
    for (const item of content.items) {
      if (!("str" in item) || !item.str.trim()) continue;
      const x = item.transform[4];
      const y = item.transform[5];
      let row = rows.find((entry) => Math.abs(entry.y - y) < 3);
      if (!row) {
        row = { y, items: [] };
        rows.push(row);
      }
      row.items.push({ x, width: item.width || 0, text: item.str });
    }
    rows.sort((a, b) => b.y - a.y);
    pages.push(rows.map((row) => {
      const items = row.items.sort((a, b) => a.x - b.x);
      return items.reduce((line, entry, index) => {
        if (!index) return entry.text;
        const previous = items[index - 1];
        const separator = entry.x - (previous.x + previous.width) > 24 ? "\t" : " ";
        return line + separator + entry.text;
      }, "").trim();
    }).filter(Boolean));
    page.cleanup();
  }
  return pages;
}

async function pdfToWord(file) {
  const pages = await extractPdfPages(file);
  const docx = requireLibrary("The Word document writer", window.docx);
  const children = [];
  pages.forEach((lines, index) => {
    if (index) children.push(new docx.Paragraph({ children: [], pageBreakBefore: true }));
    for (const line of lines) children.push(new docx.Paragraph(line || " "));
  });
  if (!children.length) children.push(new docx.Paragraph("No selectable text was found in this PDF."));
  const documentFile = new docx.Document({ sections: [{ children }] });
  return [{ name: `${baseName(file.name)}-paperwise.docx`, blob: await docx.Packer.toBlob(documentFile) }];
}

async function pdfToPowerPoint(file) {
  const pptxgen = requireLibrary("The presentation writer", window.pptxgen || window.PptxGenJS);
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "Paperwise";
  pptx.subject = "Pages converted from PDF";
  const pdf = await loadPdf(file);
  const slideWidth = 13.333;
  const slideHeight = 7.5;
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    elements.status.textContent = `Preparing slide ${pageNumber} of ${pdf.numPages}…`;
    const { canvas, page } = await renderPdfPage(pdf, pageNumber, 1.5);
    const ratio = canvas.width / canvas.height;
    const width = Math.min(slideWidth, slideHeight * ratio);
    const height = width / ratio;
    const slide = pptx.addSlide();
    slide.background = { color: "FFFFFF" };
    slide.addImage({ data: canvas.toDataURL("image/jpeg", 0.88), x: (slideWidth - width) / 2, y: (slideHeight - height) / 2, w: width, h: height });
    canvas.width = 0;
    canvas.height = 0;
    page.cleanup();
  }
  const blob = await pptx.write({ outputType: "blob" });
  return [{ name: `${baseName(file.name)}-paperwise.pptx`, blob }];
}

async function pdfToExcel(file) {
  const xlsx = requireLibrary("The spreadsheet writer", window.XLSX);
  const pages = await extractPdfPages(file);
  const workbook = xlsx.utils.book_new();
  pages.forEach((lines, index) => {
    const rows = lines.map((line) => line.split("\t").map((cell) => cell.trim()).filter(Boolean));
    xlsx.utils.book_append_sheet(workbook, xlsx.utils.aoa_to_sheet(rows.length ? rows : [["No selectable text on this page"]]), `Page ${index + 1}`);
  });
  const data = xlsx.write(workbook, { bookType: "xlsx", type: "array" });
  return [{ name: `${baseName(file.name)}-paperwise.xlsx`, blob: new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }) }];
}

async function wordToPdf(file) {
  const mammoth = requireLibrary("The Word reader", window.mammoth);
  const jspdf = requireLibrary("The PDF writer", window.jspdf).jsPDF;
  const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
  return [textToPdfOutput(file, result.value, jspdf)];
}

async function extractPresentationText(file) {
  const zipLibrary = requireLibrary("The presentation reader", window.JSZip);
  const zip = await zipLibrary.loadAsync(file);
  const slideEntries = Object.keys(zip.files).map((name) => {
    const match = name.match(/^ppt\/slides\/slide(\d+)\.xml$/);
    return match ? { name, number: Number(match[1]) } : null;
  }).filter(Boolean).sort((a, b) => a.number - b.number);
  if (!slideEntries.length) throw new Error("No presentation slides were found in this PPTX file.");
  const slides = [];
  for (let index = 0; index < slideEntries.length; index += 1) {
    elements.status.textContent = `Reading slide ${index + 1} of ${slideEntries.length}…`;
    const xml = new DOMParser().parseFromString(await zip.file(slideEntries[index].name).async("string"), "application/xml");
    if (xml.querySelector("parsererror")) throw new Error("This presentation has invalid slide data and could not be read.");
    const paragraphs = Array.from(xml.getElementsByTagNameNS("http://schemas.openxmlformats.org/drawingml/2006/main", "p"));
    slides.push(paragraphs.map((paragraph) => Array.from(paragraph.getElementsByTagNameNS("http://schemas.openxmlformats.org/drawingml/2006/main", "t")).map((node) => node.textContent).join("")).filter(Boolean));
  }
  return slides;
}

function addWrappedText(pdf, text, options) {
  const margin = options.margin || 48;
  const lineHeight = options.lineHeight || 15;
  const maxWidth = pdf.internal.pageSize.getWidth() - margin * 2;
  const bottom = pdf.internal.pageSize.getHeight() - margin;
  let y = margin;
  const blocks = text.split(/\r?\n/);
  for (const block of blocks) {
    const lines = pdf.splitTextToSize(block || " ", maxWidth);
    for (const line of lines) {
      if (y + lineHeight > bottom) {
        pdf.addPage();
        y = margin;
      }
      pdf.text(line, margin, y);
      y += lineHeight;
    }
  }
}

function textToPdfOutput(file, text, JsPdf) {
  const pdf = new JsPdf({ unit: "pt", format: "a4" });
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  addWrappedText(pdf, text.trim() || "No readable text was found in this document.", { margin: 48, lineHeight: 14 });
  return { name: `${baseName(file.name)}-paperwise.pdf`, blob: pdf.output("blob") };
}

async function presentationToPdf(file) {
  const jspdf = requireLibrary("The PDF writer", window.jspdf).jsPDF;
  const slides = await extractPresentationText(file);
  const pdf = new jspdf({ unit: "pt", format: "a4" });
  slides.forEach((paragraphs, index) => {
    if (index) pdf.addPage();
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text(`Slide ${index + 1}`, 48, 52);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    addWrappedText(pdf, paragraphs.join("\n") || "No readable text on this slide.", { margin: 74, lineHeight: 16 });
  });
  return [{ name: `${baseName(file.name)}-paperwise.pdf`, blob: pdf.output("blob") }];
}

function safeCellText(value) {
  return value === null || value === undefined ? "" : String(value).replace(/\s+/g, " ").trim();
}

async function excelToPdf(file) {
  const xlsx = requireLibrary("The spreadsheet reader", window.XLSX);
  const jspdf = requireLibrary("The PDF writer", window.jspdf).jsPDF;
  const workbook = xlsx.read(await file.arrayBuffer(), { type: "array" });
  if (!workbook.SheetNames.length) throw new Error("No worksheets were found in this workbook.");
  const pdf = new jspdf({ unit: "pt", format: "a4" });
  workbook.SheetNames.forEach((sheetName, sheetIndex) => {
    if (sheetIndex) pdf.addPage();
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text(sheetName, 42, 44);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7);
    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, raw: false, blankrows: false });
    const width = pdf.internal.pageSize.getWidth() - 84;
    const yStart = 62;
    const lineHeight = 10;
    const margin = 42;
    let y = yStart;
    for (const row of rows) {
      const text = row.map(safeCellText).join("  |  ");
      const lines = pdf.splitTextToSize(text || " ", width);
      for (const line of lines) {
        if (y > pdf.internal.pageSize.getHeight() - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(line, margin, y);
        y += lineHeight;
      }
    }
  });
  return [{ name: `${baseName(file.name)}-paperwise.pdf`, blob: pdf.output("blob") }];
}

async function editPdf(file) {
  const text = document.querySelector("#edit-text").value.trim();
  if (!text) throw new Error("Type a note to add to your PDF.");
  const { PDFDocument, StandardFonts, rgb } = requireLibrary("The PDF tools", window.PDFLib);
  const pdf = await PDFDocument.load(await file.arrayBuffer());
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const applyToAll = document.querySelector("#edit-pages").value === "all";
  const pages = applyToAll ? pdf.getPages() : pdf.getPages().slice(0, 1);
  for (const page of pages) {
    const { width, height } = page.getSize();
    page.drawText(text, { x: 42, y: height - 52, size: 13, font, color: rgb(0.09, 0.35, 0.28), maxWidth: Math.max(40, width - 84) });
  }
  return [await makePdfOutput(file, pdf)];
}

async function pdfToJpg(file) {
  const pdf = await loadPdf(file);
  const outputs = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    elements.status.textContent = `Rendering image ${pageNumber} of ${pdf.numPages}…`;
    const { canvas, page } = await renderPdfPage(pdf, pageNumber, 1.7);
    const blob = await canvasToBlob(canvas, "image/jpeg", 0.9);
    outputs.push({ name: `${baseName(file.name)}-page-${pageNumber}.jpg`, blob });
    canvas.width = 0;
    canvas.height = 0;
    page.cleanup();
  }
  return outputs;
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`${file.name} could not be read as an image.`));
    };
    image.src = url;
  });
}

async function jpgToPdf(files) {
  const JsPdf = requireLibrary("The PDF writer", window.jspdf).jsPDF;
  let pdf = null;
  for (let index = 0; index < files.length; index += 1) {
    elements.status.textContent = `Adding image ${index + 1} of ${files.length}…`;
    const image = await loadImage(files[index]);
    const orientation = image.width > image.height ? "landscape" : "portrait";
    const pageWidth = 595.28;
    const pageHeight = 841.89;
    const width = orientation === "landscape" ? pageHeight : pageWidth;
    const height = orientation === "landscape" ? pageWidth : pageHeight;
    if (!pdf) pdf = new JsPdf({ unit: "pt", format: "a4", orientation, compress: true });
    else pdf.addPage("a4", orientation);
    const padding = 24;
    const scale = Math.min((width - padding * 2) / image.width, (height - padding * 2) / image.height);
    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;
    const format = files[index].type === "image/png" ? "PNG" : "JPEG";
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext("2d");
    if (!context) throw new Error(`Your browser could not prepare ${files[index].name} for the PDF.`);
    context.drawImage(image, 0, 0);
    const imageData = canvas.toDataURL(format === "PNG" ? "image/png" : "image/jpeg", 0.92);
    pdf.addImage(imageData, format, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
    canvas.width = 0;
    canvas.height = 0;
  }
  if (!pdf) throw new Error("Choose at least one JPG or PNG image.");
  return [{ name: `${baseName(files[0].name)}-paperwise.pdf`, blob: pdf.output("blob") }];
}

async function runTool() {
  const file = selectedFiles[0];
  switch (activeTool.id) {
    case "merge-pdf": return mergePdfs(selectedFiles);
    case "split-pdf": return splitPdf(file);
    case "compress-pdf": return compressPdf(file);
    case "pdf-to-word": return pdfToWord(file);
    case "pdf-to-powerpoint": return pdfToPowerPoint(file);
    case "pdf-to-excel": return pdfToExcel(file);
    case "word-to-pdf": return wordToPdf(file);
    case "powerpoint-to-pdf": return presentationToPdf(file);
    case "excel-to-pdf": return excelToPdf(file);
    case "edit-pdf": return editPdf(file);
    case "pdf-to-jpg": return pdfToJpg(file);
    case "jpg-to-pdf": return jpgToPdf(selectedFiles);
    default: throw new Error("This tool is not available yet.");
  }
}

async function processFiles() {
  if (!activeTool || !selectedFiles.length || isProcessing) return;
  isProcessing = true;
  clearStatus();
  elements.reset.hidden = true;
  setProcessState(true, "Working…");
  elements.status.textContent = "Preparing your files…";
  try {
    const outputs = await runTool();
    if (!outputs.length) throw new Error("No output files were created. Please check your input and try again.");
    const filename = await deliverOutputs(outputs);
    elements.status.className = "job-status is-success";
    const summary = outputs.map((output) => output.summary).filter(Boolean).join(" ");
    elements.status.replaceChildren(document.createTextNode(`${outputs.length === 1 ? `${filename} is ready.` : `${outputs.length} files are ready in ${filename}.`}${summary ? ` ${summary}` : ""}`));
    const download = document.createElement("button");
    download.className = "download-link";
    download.type = "button";
    download.textContent = `↓ Download ${outputs.length === 1 ? "again" : "ZIP"}`;
    download.addEventListener("click", async () => {
      const downloadedName = await deliverOutputs(outputs);
      elements.status.setAttribute("aria-label", `${downloadedName} downloaded`);
    });
    elements.status.append(download);
    elements.reset.hidden = false;
  } catch (error) {
    elements.status.className = "job-status is-error";
    elements.status.textContent = error instanceof Error ? error.message : "Something went wrong while processing the file. Please try again.";
    elements.reset.hidden = false;
  } finally {
    isProcessing = false;
    setProcessState(selectedFiles.length === 0);
  }
}

function resetTool() {
  selectedFiles = [];
  elements.input.value = "";
  elements.fileList.replaceChildren();
  clearStatus();
  elements.reset.hidden = true;
  setProcessState(true);
}

document.querySelectorAll(".filter-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    activeFilter = chip.dataset.filter;
    document.querySelectorAll(".filter-chip").forEach((item) => {
      const active = item === chip;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    renderTools();
  });
});

elements.search.addEventListener("input", renderTools);
elements.search.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    elements.search.value = "";
    renderTools();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName) && !elements.dialog.open) {
    event.preventDefault();
    elements.search.focus();
  }
});
elements.input.addEventListener("change", () => {
  addFiles(elements.input.files);
  elements.input.value = "";
});
elements.dropzone.addEventListener("dragover", (event) => {
  event.preventDefault();
  elements.dropzone.classList.add("is-dragging");
});
elements.dropzone.addEventListener("dragleave", (event) => {
  if (!elements.dropzone.contains(event.relatedTarget)) elements.dropzone.classList.remove("is-dragging");
});
elements.dropzone.addEventListener("drop", (event) => {
  event.preventDefault();
  elements.dropzone.classList.remove("is-dragging");
  addFiles(event.dataTransfer.files);
});
elements.process.addEventListener("click", processFiles);
elements.reset.addEventListener("click", resetTool);
document.querySelector("#close-dialog").addEventListener("click", () => elements.dialog.close());
document.querySelector("#back-to-tools").addEventListener("click", () => elements.dialog.close());
elements.dialog.addEventListener("cancel", (event) => {
  if (isProcessing) event.preventDefault();
});
elements.dialog.addEventListener("click", (event) => {
  if (event.target === elements.dialog && !isProcessing) elements.dialog.close();
});
elements.dialog.addEventListener("close", () => {
  selectedFiles = [];
  activeTool = null;
  isProcessing = false;
  elements.status.setAttribute("aria-label", "");
});

renderTools();
