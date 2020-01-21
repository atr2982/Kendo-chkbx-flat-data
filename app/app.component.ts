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
  public checkedKeys: any[] = [];
  public expandedKeys: any[] = ["0"];

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
