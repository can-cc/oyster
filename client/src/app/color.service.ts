import { Injectable } from '@angular/core';

const colors = ['#5e4230', '#dd5052', '#6f9dcd', '#5d3448', '#ccc631'];

@Injectable()
export class ColorService {
  sourceColorGetterIndex = 0;
  sourceColorMap: { [key: string]: string } = {};

  constructor() {}

  public getSourceColor(sourceName: string): string {
    if (this.sourceColorMap[sourceName]) {
      return this.sourceColorMap[sourceName];
    }

    const color = colors[this.sourceColorGetterIndex];
    this.sourceColorGetterIndex++;
    this.sourceColorMap[sourceName] = color;
    return color;
  }
}
