import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Grade } from '../models/grade.model';

@Injectable({
  providedIn: 'root',
})
export class GradesService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:4000/api';

  getGrades(symbol: string): Observable<Grade[]> {
    return this.http
      .get<Grade[]>(`${this.baseUrl}/grades`, { params: { symbol } })
      .pipe(
        map((grades) =>
          grades.map((g, index) => ({
            ...g,
            // enriquecer con datos inventados si no vienen
            targetPrice: g['targetPrice'] ?? 200 + index,
            analystName: g['analystName'] ?? `Analyst #${index + 1}`,
            confidenceLevel: g['confidenceLevel'] ?? 80 - index,
            notes:
              g['notes'] ??
              'This is a synthetic note to demonstrate Angular Material components and caching.',
            logoUrl: g['logoUrl'] ?? 'https://logo.clearbit.com/apple.com',
          }))
        )
      );
  }
}
