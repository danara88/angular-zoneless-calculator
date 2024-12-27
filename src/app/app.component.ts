import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  host: {
    class:
      'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5',
  },
})
export class AppComponent {
  title = 'zoneless-calculator';
}
