import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Grade } from '../../models/grade.model';

@Component({
  selector: 'app-grade-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, DatePipe],
  templateUrl: './grade-card.component.html',
  styleUrls: ['./grade-card.component.scss'],
})
export class GradeCardComponent {
  @Input() grade!: Grade;
  @Input() index!: number;
  @Output() select = new EventEmitter<number>();

  onSelect() {
    this.select.emit(this.index);
  }
}
