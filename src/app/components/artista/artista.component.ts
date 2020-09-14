import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [],
})
export class ArtistaComponent {
  // propiedades
  artista: any = {};
  topTracks: any[] = [];

  loading: boolean;

  // constructor
  constructor(private route: ActivatedRoute, private spotify: SpotifyService) {
    this.route.params.subscribe((params) => {
      console.log(params.id);
      this.getArtista(params.id);
      this.getTopTracks(params.id);
    });
  }

  // metodos
  getArtista(id: string) {
    this.loading = true;
    this.spotify.getArtist(id).subscribe((artist) => {
      console.log(artist);
      this.artista = artist;
      this.loading = false;
    });
  }

  getTopTracks(id: string) {
    this.spotify.getTopTracks(id).subscribe((topTracksResult) => {
      console.log(topTracksResult);
      this.topTracks = topTracksResult;
    });
  }
}
