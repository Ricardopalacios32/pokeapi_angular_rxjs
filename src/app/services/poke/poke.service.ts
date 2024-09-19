import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeService {

  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getFirst100Pokemons(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/pokemon?limit=217`).pipe(
      switchMap(response => {
        const pokemonObservables = response.results.map((pokemon: any) => this.getPokemonDetails(pokemon.url));
        return forkJoin<any[]>(pokemonObservables);
      })
    );
  }

  private getPokemonDetails(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(

      map(pokemon => ({
        name: pokemon.name,
        img: pokemon.sprites.front_default,
        types: pokemon.types.map((type: any) => type.type.name),
        height: pokemon.height,
        weight: pokemon.weight,
        speciesUrl: pokemon.species.url
      })),



      switchMap(pokemon => this.getPokemonDescription(pokemon.speciesUrl).pipe(
        map(description => ({
          ...pokemon,
          description
        }))
      ))
    );
  }

  private getPokemonDescription(url: string): Observable<string> {
    return this.http.get<any>(url).pipe(
      map(speciesData => {
        const flavorTextEntry = speciesData.flavor_text_entries.find((entry: any) => entry.language.name === 'es');
        return flavorTextEntry?.flavor_text ?? 'No hay descripcion';
      })
    );
  }
}
