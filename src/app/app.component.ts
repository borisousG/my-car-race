import { Component } from '@angular/core';
import { Car } from './models/car.model';
import { Pilot } from './models/pilot.model';
import { Race } from './models/race.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-car-race';

  getRandomNumber() : number {
    return Math.round(Math.random() * (50 - 1) + 1);
  }

  startRace(race : Race) : void {
    if(race.status == 'new'){
      race.competitors.forEach( value => {
        value.start();
      });

      race.status = 'process';
    }
  }

  updateRace(race : Race) : void {
    if(race.status == 'process'){
      const RACE_DISTANCE = race.distance * race.laps;
      let finishedCars = 0;

      race.competitors.forEach( value => {
        value.move = () => {          
          if(value.traveled >= RACE_DISTANCE) {
            finishedCars++;
            value.traveled += 50;
          } else {
            value.traveled += this.getRandomNumber();
          }
        };

        if(value.status == 'moving'){
          value.move();
        }
      });

      if(race.competitors.length == finishedCars){
        race.status = 'finished';     
      }
    }

    console.table(race.competitors);
  }

  checkPositions(competitors : Car[]) : Car[]{
    return competitors.sort(((a : Car, b : Car) => b.traveled - a.traveled));
  }

  showPodium(race : Race) : void {
    this.updateRace(race);

    let podium : any[] = [];
    const ORDERLY_RACE : Car[] = this.checkPositions(race.competitors);
    ORDERLY_RACE.forEach( (value, index) => {
      let COMPETITOR : any = {
        position : index + 1, 
        country : value.pilot?.country,
        name : value.pilot?.name + ' ' + value.pilot?.lastName,
        carNumber : value.carNumber
      }
      podium.push(COMPETITOR)
    });

    console.table(podium);
  }

  constructor() {

    const PILOT_1 : Pilot = {
      id : 1,
      name : 'Mauricio',
      lastName : 'Pérez',
      country : 'México'
    }

    const PILOT_2 : Pilot = {
      id : 2,
      name : 'Juan',
      lastName : 'Urquiza',
      country : 'Colombia'
    }

    const PILOT_3 : Pilot = {
      id : 3,
      name : 'Daniel',
      lastName : 'Lozano',
      country : 'Argentina'
    }

    const PILOT_4 : Pilot = {
      id : 4,
      name : 'Michael',
      lastName : 'Smith',
      country : 'USA'
    }

    let auto1 : Car = {
      carNumber : 10,
      color : 'Rojo',
      traveled : 0,
      status : 'stopped',
      start() {
        this.status = 'moving';
      }
    }

    let auto2 : Car = {
      carNumber : 20,
      color : 'Verde',
      traveled : 0,
      status : 'stopped',
      start() {
        this.status = 'moving';
      }
    }

    let auto3 : Car = {
      carNumber : 30,
      color : 'Negro',
      traveled : 0,
      status : 'stopped',
      start() {
        this.status = 'moving';
      }
    }

    let auto4 : Car = {
      carNumber : 40,
      color : 'Amarillo',
      traveled : 0,
      status : 'stopped',
      start() {
        this.status = 'moving';
      }
    }

    let auto5 : Car = {
      carNumber : 50,
      color : 'Naranja',
      traveled : 0,
      status : 'stopped',
      start() {
        this.status = 'moving';
      }
    }

    auto1.pilot = PILOT_1;
    auto2.pilot = PILOT_2;
    auto3.pilot = PILOT_3;
    auto4.pilot = PILOT_4;

    let myRace : Race = {
      competitors : [auto1, auto2, auto3, auto4],
      laps : 2,
      distance : 150,
      status : 'new'
    }

    this.startRace(myRace);

    do {
      this.updateRace(myRace);  
    } while (myRace.status != 'finished');
   
    const ORDERLY_RACE : Car[] = this.checkPositions(myRace.competitors);
    const { carNumber : winnerCar, pilot : winnerPilot } = ORDERLY_RACE[0];

    const WINNER : string = `El ganador es: 
    Nacionalidad: ${winnerPilot?.country}
    Piloto: ${winnerPilot?.name} ${winnerPilot?.lastName}
    Car: ${winnerCar}`;

    console.log(WINNER);
  }
}
