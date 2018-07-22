import { Component } from '@angular/core';
import * as Handsontable from 'handsontable-pro';
import {HotTableRegisterer} from '@handsontable-pro/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HotTableRegisterer]
})
export class AppComponent {
  instance: string = 'hot';
  dataset: any[] = Handsontable.helper.createSpreadsheetData(10, 10);

  constructor(private hotRegisterer: HotTableRegisterer) {}

  clearSelection() {
    const hotInstance = this.hotRegisterer.getInstance(this.instance);

    if (hotInstance) {
      hotInstance.emptySelectedCells();
      hotInstance.setDataAtCell(0, 0, 'new value');
    }
  }

  exportFile() {
    const hotInstance = this.hotRegisterer.getInstance(this.instance);
    const exportPlugin = hotInstance.getPlugin('exportFile');

    // export as a string
    exportPlugin.exportAsString('csv');

    // export as a blob object
    exportPlugin.exportAsBlob('csv');

    // export to downloadable file (named: MyFile.csv)
    exportPlugin.downloadFile('csv', {filename: 'MyFile'});

    // export as a string (with specified data range):
    exportPlugin.exportAsString('csv', {
      exportHiddenRows: true,     // default false
      exportHiddenColumns: true,  // default false
      columnHeaders: true,        // default false
      rowHeaders: true,           // default false
      columnDelimiter: ';',       // default ','
      range: [1, 1, 6, 6]         // [startRow, endRow, startColumn, endColumn]
    });
  }
}
