import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Actor } from 'src/app/models/actor';
import { ActorCredits } from 'src/app/models/actorCredits';
import { FilteredMovies } from 'src/app/models/filteredMovies';
import { Movie } from 'src/app/models/movie';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiKey: String = "83a288f16dbbac1ab03c01357b00eeae";

  constructor(private httpClient: HttpClient) {}

  getActor(actorName: string | undefined, actorSurname: string | undefined){
   return this.httpClient.get<Actor>(`https://api.themoviedb.org/3/search/person?api_key=${this.apiKey}&query=${actorName}+${actorSurname}`); 
  }

  getActorIdByNameSurname(actorName: string | undefined): Observable<string> {
    console.log(actorName?.toLocaleLowerCase());
    return this.httpClient.get<Actor>(`https://api.themoviedb.org/3/search/person?api_key=${this.apiKey}&query=${actorName?.toLocaleLowerCase()}`)
      .pipe(
        map(actor => actor.results[0].id?.toString() || '')
      );
  }
 
  getActorCredits(actorId: number | undefined){
    return this.httpClient.get<ActorCredits>(`https://api.themoviedb.org/3/person/${actorId}?api_key=${this.apiKey}&append_to_response=credits`)
  }

  getMovieById(movieId: number | null) {
    return this.httpClient.get<Movie>(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.apiKey}&language=it-it`);
  }

  //method that sets poster url to original url if exists
  getPoster(posterPath: string | null) {
    if (!posterPath) {
      return '../assets/images/poster-missing.jpeg'; //set the local image for missing poster
    } else {
      //or get the image for local folder if null
      return `https://image.tmdb.org/t/p/original${posterPath}`; //build the entire url for poster
    }
  }

  getFilteredMovies(searchString : string) { //new method that takes the whole url query
    return this.httpClient.get<Movie[]>(searchString);
  }
}
