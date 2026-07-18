import { Artist } from './artist.model';

export type TrackStatus = 'Draft' | 'Submitted' | 'Distributed';

export type DistributionStatus = 'Pending' | 'Live' | 'Rejected';

export interface Track {
  id: number;
  title: string;
  artistId: number;
  artistName: string;
  isrc: string;
  releaseDate: string;
  genre: string;
  status: TrackStatus;
}

export interface TrackDistribution {
  id: number;
  dspId: number;
  dspName: string;
  submittedAt: string;
  status: DistributionStatus;
}

export interface TrackDetails {
  id: number;
  title: string;
  isrc: string;
  releaseDate: string;
  genre: string;
  status: TrackStatus;
  artist: Artist;
  distributions: TrackDistribution[];
}
