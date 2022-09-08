import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent implements OnChanges {
  cropWidth: number = 75;
  @Input() rating: number = 0;
  @Output() returnRating: EventEmitter<number> = new EventEmitter();

  onStarsClick(): void {
    this.returnRating.emit(this.rating);
  }

  // Hooks
  ngOnChanges(): void {
    this.cropWidth = (this.rating * 75) / 5;
  }
}
