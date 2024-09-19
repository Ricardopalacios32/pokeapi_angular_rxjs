import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { HeaderComponent } from './components/header/header.component';
import { PokeDetailsComponent } from "./components/poke-details/poke-details.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PokemonComponent, HeaderComponent, PokeDetailsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
