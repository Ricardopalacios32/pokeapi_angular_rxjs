import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-poke-details',
  standalone: true,
  imports: [],
  templateUrl: './poke-details.component.html',
  styleUrl: './poke-details.component.css'
})
export class PokeDetailsComponent {

  @Input()
  pokemonDetails: any

  @Output()
  close = new EventEmitter<void>()

  closeModal(){
    this.close.emit()
  }
}
