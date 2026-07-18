import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { TrackService } from '../../core/services/track.service';
import { Track, TrackStatus } from '../../core/models/track.model';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './track-list.component.html'
})
export class TrackListComponent implements OnInit {
  tracks: Track[] = [];
  statusFilter: TrackStatus | '' = '';
  loading = false;
  error = '';

  readonly statusOptions: TrackStatus[] = ['Draft', 'Submitted', 'Distributed'];

  constructor(private trackService: TrackService) {}

  ngOnInit(): void {
    this.loadTracks();
  }

  onStatusChange(): void {
    this.loadTracks();
  }

  private loadTracks(): void {
    this.loading = true;
    this.error = '';
    this.trackService.getTracks(this.statusFilter || undefined).subscribe({
      next: (tracks) => {
        this.tracks = tracks;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load tracks. Please try again.';
        this.loading = false;
      }
    });
  }
}
