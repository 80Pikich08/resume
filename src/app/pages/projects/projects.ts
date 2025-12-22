import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Data } from '../../services/data';

interface Project {
  id: number;
  title: string;
  description: string;
  role: string;
  technologies: string[];
  repo?: string;
  link?: string;
  docs?: string;
  certificate?: string;
  image?: string;
  presentation?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  projects$: Observable<Project[]>;

  constructor(private data: Data) {
    this.projects$ = this.data.getProjects();
  }

  trackById(index: number, project: Project): number {
    return project.id;
  }
}
