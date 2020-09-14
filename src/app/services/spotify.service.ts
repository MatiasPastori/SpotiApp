import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Me traje un operador map, OJO, estos solo andan con observables! (esas cosas que me contaron
// que son parecidas a las promesas. PERO MEJORES!
import { map } from 'rxjs/operators';

// El decorador este nos ahorra tener que importar el servicio en el app.module!
@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {
    console.log('Spotify Service Ready!');
  }

  // Nos dimos cuenta que en la URL siempre hay una base, y luego siguen una serie de parametros que son justamente
  // los que definen QUE es lo que quiero. A estos parametros los llamamos query
  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQCvuxmLYNcHOSsvTlm8vgCd2RdFPEKpFQeMdW4tv4HvjmLvyXPTfB-8ixDg3aVzfmH-kOnNIuPAyhWfG2c',
    });

    // Aca es donde vamos a hacer el manejo del tipo de requests!

    return this.http.get(url, { headers });
  }

  getNewReleases() {
    // Sin darle el token, nos tirara error!
    // Debemos modificar los headers de la peticion!
    // Dentro de las llaves para el constructor del httpHeader
    // van todos los headers que spotify necesita!

    return this.getQuery('browse/new-releases').pipe(
      map((newReleases: any) => newReleases.albums.items)
    );

    // return (
    //   this.http
    //     .get('https://api.spotify.com/v1/browse/new-releases', {
    //       headers,
    //     })
    //     // Lo que estoy haciendo es usar map, lo cual transforma la info que me trae la request y yo puedo elegir que datos retornar.
    //     .pipe(map((newReleases: any) => newReleases.albums.items))
    // );

    // Agregamos los headers como opciones de la request get.
    // retornamos todo eso, por lo tanto donde sea que usemos el servicio con este metodo, podemos suscribirnos!
  }

  // ATENCION el solo hecho de haber copypasteado nos da la pauta de que esto se puede hacer de una manera mejor. SIN REPETIR CODIGO!
  // Habra que ver como lo logramos :D
  // Listo, abstraimos la logica de construir la URL a otro metodo que justamente retorna el get a una URL Base
  // a la cual le concatenamos la query dependiendo del metodo que la llamo :D
  getArtists(termino: string) {
    return this.getQuery(
      `search?query=${termino}&type=artist&offset=0&limit=15`
    ).pipe(map((artistasResultado: any) => artistasResultado.artists.items));
  }

  getArtist(artistID: string) {
    return this.getQuery(`artists/${artistID}`);
  }

  getTopTracks(artistID: string) {
    return this.getQuery(`artists/${artistID}/top-tracks?country=us`).pipe(
      map((trackJSON: any) => trackJSON.tracks)
    );
  }
}
