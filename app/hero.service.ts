import { Injectable } from "@angular/core";
import { Headers, Http } from '@angular/http';

import { Hero } from "./hero";
// import { HEROES } from "./mock-heroes"; <-- this is mock heroes data
import 'rxjs/add/operator/toPromise';


@Injectable()

export class HeroService{

  private heroesUrl = 'api/heroes' // Url to web api

  constructor(private http: Http){}


  getHeroes(): Promise<Hero[]> {
    // return Promise.resolve(HEROES); <-- this is mock heroes the below is a real http get request
      return this.http.get(this.heroesUrl)
                      .toPromise()
                      .then(response => response.json().data as Hero[])
                      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
      console.error("An error occured", error) //for demo purposes only
      return Promise.reject(error.message || error)
  }


  // getHeroesSlowly(): Promise<Hero[]> {
  //   return new Promise<Hero[]>(resolve =>
  //     setTimeout(resolve, 2000)) // delay 2 seconds and is for test purposes
  //     .then(() => this.getHeroes());
  // }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
               .toPromise()
               .then(response => response.json().data as Hero)
               .catch(this.handleError);

  }
}
