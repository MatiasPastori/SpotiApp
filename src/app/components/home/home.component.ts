import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent {
  nuevosLanzamientos: any = [];

  loading: boolean;

  constructor(private spotfy: SpotifyService) {
    this.loading = true;
    this.spotfy.getNewReleases().subscribe((newReleases: any) => {
      console.log(newReleases);
      this.nuevosLanzamientos = newReleases;
      this.loading = false;
    });
  }
}
