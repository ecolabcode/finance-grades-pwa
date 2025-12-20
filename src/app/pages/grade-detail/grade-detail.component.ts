import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Grade } from '../../models/grade.model';
import { GradesService } from '../../services/grades.service';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-grade-detail',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatExpansionModule,
    MatSliderModule,
    MatProgressBarModule,
    MatCardModule,
  ],
  templateUrl: './grade-detail.component.html',
  styleUrls: ['./grade-detail.component.scss'],
})
export class GradeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private gradesService = inject(GradesService);

  grade = signal<Grade | null>(null);
  showDetails = signal<boolean>(false);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  title = computed(() => {
    const g = this.grade();
    return g ? `${g.symbol} - ${g.gradingCompany}` : 'Detail';
  });

  ngOnInit(): void {
    const index = Number(this.route.snapshot.paramMap.get('index'));
    this.gradesService.getGrades('AAPL').subscribe({
      next: (grades) => {
        if (index >= 0 && index < grades.length) {
          this.grade.set(grades[index]);
        } else {
          this.error.set('Grade not found');
        }
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error loading grade detail');
        this.loading.set(false);
      },
    });
  }

  onBack(): void {
    this.router.navigate(['/']);
  }

  toggleDetails(): void {
    this.showDetails.set(!this.showDetails());
  }
}
