import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PokeService } from '../../services/poke/poke.service';
import { PokeDetailsComponent } from "../poke-details/poke-details.component";

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule, HttpClientModule, PokeDetailsComponent],
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemonList: any[] = [];
  errorMessage: string = '';
  pokemondetails: any

  constructor(private pokeService: PokeService) {}

  ngOnInit(): void {
    this.getFirst100Pokemons();
  }

  getFirst100Pokemons() {
    this.pokeService.getFirst100Pokemons().subscribe(
      (data: any[]) => {
        console.log(data)
        this.pokemonList = data;
      },
      (error) => {
        this.errorMessage = 'Error fetching Pokémon data';
        console.error(error);
      }
    );
  }

  getDetails(pokemon : any){
    console.log(pokemon)
    this.pokemondetails = pokemon
  }

  closeModal() {
    this.pokemondetails = null;
  }
}
