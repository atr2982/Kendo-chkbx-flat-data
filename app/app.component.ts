import { Component } from "@angular/core";
import { CheckableSettings } from "@progress/kendo-angular-treeview";
import { of, Observable } from "rxjs";

@Component({
  selector: "my-app",
  styles: [
    `
      .right {
        margin-right: 5px;
      }
    `
  ],
  template: `
    <fieldset>
      <div *ngIf="checkMode == 'multiple'">
        <label class="k-form-field right">
          <input type="checkbox" id="enableCheck" class="k-checkbox" [(ngModel)]="enableCheck"/>
          <label class="k-checkbox-label" for="enableCheck">Enable Checkboxes</label>
        </label>
        <label class="k-form-field right">
          <input type="checkbox" id="checkChildren" class="k-checkbox" [(ngModel)]="checkChildren"/>
          <label class="k-checkbox-label" for="checkChildren">Check all children when parent is checked</label>
        </label>
        <label class="k-form-field right">
          <input type="checkbox" id="checkParents" class="k-checkbox" [(ngModel)]="checkParents"/>
          <label class="k-checkbox-label" for="checkParents">Check parent when children are all checked</label>
        </label>
        <label class="k-form-field right">
          <input type="checkbox" id="checkOnClick" class="k-checkbox" [(ngModel)]="checkOnClick"/>
          <label class="k-checkbox-label" for="checkOnClick">Check the node on click</label>
        </label>
      </div>
    </fieldset>

    <hr />

    <input
      [(ngModel)]="searchTerm"
      id="filter"
      #filter
      (keyup)="onkeyup(filter.value)"
      placeholder="Filter"
    />
    <kendo-treeview
      [nodes]="parsedData"

      kendoTreeViewFlatDataBinding
      textField="text"
      idField="id"
      parentIdField="parentId"

      [kendoTreeViewCheckable]="checkableSettings"
      [(checkedKeys)]="checkedKeys"
      [checkBy]="'text'"

      kendoTreeViewExpandable
      [(expandedKeys)]="expandedKeys"
      [expandBy]="'text'"
    >
    </kendo-treeview>

    <hr />

    <div style="margin: 10px 0">
      <div class="example-config">
        Checked keys: {{ checkedKeys.join(",") }}
      </div>
    </div>
  `
})
export class AppComponent {
  public checkedKeys: any[] = ['0xB0C0', '0xB0C1', '0xB0C2'];
  public expandedKeys: any[] = ['All', 'LTE', 'RRC'];

  public enableCheck = true;
  public checkChildren = false;
  public checkParents = false;
  public checkOnClick = true;
  public checkMode: any = "multiple";

  public get checkableSettings(): CheckableSettings {
    return {
      checkChildren: this.checkChildren,
      checkParents: this.checkParents,
      enabled: this.enableCheck,
      mode: this.checkMode,
      checkOnClick: this.checkOnClick
    };
  }

  public data: any[] = [
    { id: 1, text: "All" },
    { id: 2, text: "CDMA", parentId: 1 },
    { id: 3, text: "GNSS", parentId: 1 },
    { id: 4, text: "Common", parentId: 1 },
    { id: 5, text: "LTE", parentId: 1 },
    { id: 6, text: "WCDMA", parentId: 1 },
    { id: 7, text: "UMTS", parentId: 1 },
    { id: 8, text: "VERIZON", parentId: 1 },
    { id: 9, text: "Event", parentId: 5 },
    { id: 10, text: "MAC", parentId: 5 },
    { id: 11, text: "RLC", parentId: 5 },
    { id: 12, text: "PDCP", parentId: 5 },
    { id: 13, text: "RRC", parentId: 5 },
    { id: 14, text: "NAS", parentId: 5 },
    { id: 15, text: "LL1", parentId: 5 },
    { id: 16, text: "ML1", parentId: 5 },
    { id: 17, text: "Reserved", parentId: 5 },
    { id: 18, text: "VOLTE", parentId: 5 },
    { id: 19, text: "0xFFF0", parentId: 18 },
    { id: 20, text: "RTP", parentId: 19 },
    { id: 21, text: "SIP", parentId: 19 },
    { id: 22, text: "0xB0C0", parentId: 13 },
    { id: 23, text: "0xB0C1", parentId: 13 },
    { id: 24, text: "0xB0C2", parentId: 13 },
    { id: 25, text: "a1-Threshold", parentId: 22 },
    { id: 26, text: "a2-Threshold", parentId: 22 },
    { id: 27, text: "a3-Offset", parentId: 22 },
    { id: 28, text: "0xB0E1", parentId: 14 },
    { id: 29, text: "0xB0E2", parentId: 14 },
    { id: 30, text: "0xB0E3", parentId: 14 },
    { id: 31, text: "0xB0E4", parentId: 14 },
    { id: 32, text: "0xB0E5", parentId: 14 },
    { id: 33, text: "0xB0E6", parentId: 14 },
    { id: 34, text: "Access Barring Enabled", parentId: 23 },
    { id: 35, text: "Crs Ports", parentId: 23 },
    { id: 36, text: "DL Bandwidth", parentId: 23 },
    { id: 37, text: "Allowed Access", parentId: 24 },
    { id: 38, text: "Cell Identity", parentId: 24 },
    { id: 39, text: "DL Bandwidth", parentId: 24 },
  ];

  public parsedData: any[] = this.data;
  public searchTerm = "";

  public onkeyup(value: string): void {
    this.parsedData = this.search(this.data, value);
  }

  public search(items: any[], term: string): any[] {
    return items.reduce((acc, item) => {
      if (this.contains(item.text, term)) {
        acc.push(item);
      }
      return acc;
    }, []);
  }

  public contains(text: string, term: string): boolean {
    return text.toLowerCase().indexOf(term.toLowerCase()) >= 0;
  }
}
