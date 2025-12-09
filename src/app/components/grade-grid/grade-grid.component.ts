import { DatePipe } from '@angular/common';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Grade } from '../../models/grade.model';

@Component({
  selector: 'app-grade-grid',
  standalone: true,
  imports: [MatTableModule, DatePipe],
  templateUrl: './grade-grid.component.html',
  styleUrls: ['./grade-grid.component.scss'],
})
export class GradeGridComponent {
  @Input() grades: Grade[] = [];
  @Output() select = new EventEmitter<number>();

  displayedColumns: string[] = [
    'symbol',
    'date',
    'gradingCompany',
    'previousGrade',
    'newGrade',
    'action',
  ];

  onRowClick(index: number) {
    this.select.emit(index);
  }
}
