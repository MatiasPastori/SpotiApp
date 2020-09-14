import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent {
  artistas: any = [];
  loading: boolean;
  // Inyectamos nuestro servicio de spotify
  constructor(private spotify: SpotifyService) {}

  buscar(termino: string) {
    this.loading = true;
    console.log(termino);

    this.spotify.getArtists(termino).subscribe((artistaResultado: any) => {
      console.log(artistaResultado);
      this.artistas = artistaResultado;
      this.loading = false;
    });
  }
}
