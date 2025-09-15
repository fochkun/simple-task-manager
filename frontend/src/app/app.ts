import { TuiRoot } from "@taiga-ui/core";
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeader } from "./shared/components/app-header/app-header";
	import {TuiElasticSticky} from '@taiga-ui/addon-mobile';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, AppHeader, TuiElasticSticky],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  protected readonly title = signal('frontend');
}
