import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { GradeCardComponent } from '../../components/grade-card/grade-card.component';
import { GradeGridComponent } from '../../components/grade-grid/grade-grid.component';
import { Grade } from '../../models/grade.model';
import { GradesService } from '../../services/grades.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    GradeCardComponent,
    GradeGridComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(10px)' }),
            stagger(80, [
              animate(
                '220ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  private gradesService = inject(GradesService);
  private router = inject(Router);

  // signals
  grades = signal<Grade[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  viewMode = signal<'cards' | 'table'>('cards');
  symbol = signal<string>('AAPL');

  ngOnInit(): void {
    this.loadGrades();
  }

  loadGrades(): void {
    this.loading.set(true);
    this.error.set(null);

    this.gradesService.getGrades(this.symbol()).subscribe({
      next: (grades) => {
        this.grades.set(grades);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error loading grades. Please try again.');
        this.loading.set(false);
      },
    });
  }

  onChangeView(mode: 'cards' | 'table'): void {
    this.viewMode.set(mode);
  }

  onSelectGrade(index: number): void {
    this.router.navigate(['/grade', index]);
  }
}
