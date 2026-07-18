import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { TrackService } from '../../core/services/track.service';
import { TrackDetails } from '../../core/models/track.model';

@Component({
  selector: 'app-track-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './track-details.component.html'
})
export class TrackDetailsComponent implements OnInit {
  track: TrackDetails | null = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private trackService: TrackService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTrack(id);
  }

  private loadTrack(id: number): void {
    this.loading = true;
    this.error = '';
    this.trackService.getTrackById(id).subscribe({
      next: (track) => {
        this.track = track;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load track details. Please try again.';
        this.loading = false;
      }
    });
  }
}
