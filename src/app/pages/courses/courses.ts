import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { Data } from '../../services/data';

interface Course {
  id: number;
  title: string;
  platform: string;
  year: number;
  skills: string[];
  certificateImage?: string;
  link?: string;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class Courses {

  // 🔹 исходные данные
  courses$: Observable<Course[]>;

  // 🔹 отфильтрованные данные (для шаблона)
  filtered$: Observable<Course[]>;

  // 🔹 UI state
  search = '';
  platformFilter = 'All';
  sortBy: 'year_desc' | 'year_asc' | 'title_asc' = 'year_desc';

  platforms: string[] = [];
  selectedCourse: Course | null = null;

  constructor(private data: Data) {
    this.courses$ = this.data.getCourses();

    // формируем список платформ один раз
    this.courses$.subscribe(courses => {
      this.platforms = Array.from(
        new Set(courses.map(c => c.platform))
      ).sort();
    });

    // поток отфильтрованных курсов
    this.filtered$ = this.courses$.pipe(
      map(courses => this.applyFilters(courses))
    );
  }

  // ⚙️ фильтрация + сортировка
  private applyFilters(courses: Course[]): Course[] {
    let list = [...courses];

    if (this.platformFilter !== 'All') {
      list = list.filter(c => c.platform === this.platformFilter);
    }

    if (this.search.trim()) {
      const q = this.search.toLowerCase();
      list = list.filter(c =>
        c.title.toLowerCase().includes(q) ||
        (c.skills || []).join(' ').toLowerCase().includes(q)
      );
    }

    switch (this.sortBy) {
      case 'year_desc':
        list.sort((a, b) => b.year - a.year);
        break;
      case 'year_asc':
        list.sort((a, b) => a.year - b.year);
        break;
      case 'title_asc':
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return list;
  }

  // 🔄 перезапуск фильтрации (просто пересоздаём поток)
  updateFilters(): void {
    this.filtered$ = this.courses$.pipe(
      map(courses => this.applyFilters(courses))
    );
  }

  openModal(course: Course): void {
    this.selectedCourse = course;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.selectedCourse = null;
    document.body.style.overflow = '';
  }

  trackById(index: number, course: Course): number {
    return course.id;
  }
}
