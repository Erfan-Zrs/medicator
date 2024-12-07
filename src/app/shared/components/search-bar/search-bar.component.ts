import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  private searchSubject = new Subject<string>();

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.searchSubject.pipe().subscribe((query) => {
      this.search.emit(query.trim());
    });
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search.emit(input.value);
  }
}
