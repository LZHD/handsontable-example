import { Component } from '@angular/core';
import * as Handsontable from 'handsontable-pro';
import {HotTableRegisterer} from '@handsontable-pro/angular';
import 'handsontable-pro/languages/zh-CN';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HotTableRegisterer]
})
export class AppComponent {
  instance = 'hot';
  language = 'zh-CN';
  dataset: any[] = [
    {id: 1, name: 'Ted Right', address: 'Wall Street'},
    {id: 2, name: 'Frank Honest', address: 'Pennsylvania Avenue'},
    {id: 3, name: 'Joan Well', address: 'Broadway'},
    {id: 4, name: 'Gail Polite', address: 'Bourbon Street'},
    {id: 5, name: 'Michael Fair', address: 'Lombard Street'},
    {id: 6, name: 'Mia Fair', address: 'Rodeo Drive'},
    {id: 7, name: 'Cora Fair', address: 'Sunset Boulevard'},
    {id: 8, name: 'Jack Right', address: 'Michigan Avenue'},
  ];

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

  searchValue($event) {
    const hotInstance = this.hotRegisterer.getInstance(this.instance);
    const searchPlugin = hotInstance.getPlugin('Search');
    searchPlugin.query($event.target.value);
    hotInstance.render();
  }
}
