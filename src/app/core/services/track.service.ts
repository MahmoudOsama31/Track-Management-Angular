import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Track, TrackDetails, TrackStatus } from '../models/track.model';

@Injectable({ providedIn: 'root' })
export class TrackService {
  private readonly baseUrl = `${environment.apiBaseUrl}/tracks`;

  constructor(private http: HttpClient) {}

  getTracks(status?: TrackStatus): Observable<Track[]> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<Track[]>(this.baseUrl, { params });
  }

  getTrackById(id: number): Observable<TrackDetails> {
    return this.http.get<TrackDetails>(`${this.baseUrl}/${id}`);
  }
}
