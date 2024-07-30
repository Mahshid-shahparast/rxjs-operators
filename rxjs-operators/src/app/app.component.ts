import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  AsyncSubject,
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  concat,
  concatMap,
  filter,
  forkJoin,
  map,
  of,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'rxjs-operatos';
  users = [
    {
      id: 1,
      name: 'John',
      isActive: true,
    },
    {
      id: 2,
      name: 'Jack',
      isActive: true,
    },
    {
      id: 3,
      name: 'Mike',
      isActive: true,
    },
  ];
  users$ = of(this.users);

  constructor() {}
  ngOnInit(): void {
    ////////////////   of   ///////////////////////
    // this.users$.subscribe((users) => {
    //   console.log('Of RxJs:', users);
    // });
    ///////////////////////// map ////////////////
    // let usersName$ = this.users$.pipe(
    //   map((users) => {
    //     return users.map((user) => user.name);
    //   })
    // );
    // usersName$.subscribe((result) => {
    //   console.log('map result:', result);
    // });
    /////////////////  filter //////////////////////
    //فیلتر مقادیری را بر اساس صادق بودن یک شرط که درون آن است برمیگرداند
    // let activeUsers$ = this.users$.pipe(
    //   filter((users) => {
    //     return users.every((user) => user.isActive);
    //   })
    // );
    // activeUsers$.subscribe((result) => {
    //   console.log('filter result:', result);
    // });
    /////////////////////////// subject ////////////////////
    // let subject: Subject<number> = new Subject<number>();
    // subject.subscribe((result) => {
    //   console.log('suject subscription 1:', result);
    // });
    // subject.next(1);
    // subject.subscribe((result) => {
    //   console.log('suject subscription 2:', result);
    // });
    ///////////////////////////  Behavior Subject //////////////////////
    // let behaviorSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    //   0
    // );
    // behaviorSubject.subscribe((result) => {
    //   console.log('behaviorSubject subscription 1:', result);
    // });
    // behaviorSubject.next(1);
    // behaviorSubject.subscribe((result) => {
    //   console.log('behaviorSubject subscription 2:', result);
    // });
    ///////////////////////////  Reply Subject //////////////////////
    // let replySubject: ReplaySubject<number> = new ReplaySubject<number>(2);
    // replySubject.subscribe((result) => {
    //   console.log('replySubject subscription 1:', result);
    // });
    // replySubject.next(0);
    // replySubject.next(1);
    // replySubject.next(2);
    // let myRecentNumber: number[] = [];
    // replySubject.subscribe((result) => {
    //   console.log('replySubject subscription 2:', result);
    //   myRecentNumber.push(result);
    //   console.log('myRecentNumber:', myRecentNumber);
    // });
    //////////////////////////// async subject ////////////////////////
    // let asyncSubject: AsyncSubject<number> = new AsyncSubject<number>();
    // asyncSubject.subscribe((result) => {
    //   console.log('behaviorSubject subscription 1:', result);
    // });
    // asyncSubject.next(1);
    // asyncSubject.subscribe((result) => {
    //   console.log('behaviorSubject subscription 2:', result);
    // });
    // asyncSubject.complete();

    ////////////////////////////// forkjoin  ////////////////////////
    /////////////// for parallel http request  ///////////////////
    ////////////////////// without forkjoin ///////////////////
    let deepness = '';
    let color = '';
    let name = '';
    this.getProperty('deep').subscribe((result: string) => {
      deepness = result;
    });
    this.getProperty('blue').subscribe((result: string) => {
      color = result;
    });
    this.getProperty('ocean').subscribe((result: string) => {
      name = result;
    });
    console.log('without forkjoin:', deepness, color, name);
    /////////////////////// with forkjoin ///////////////////
    forkJoin([
      this.getProperty('deep'),
      this.getProperty('blue'),
      this.getProperty('ocean'),
    ]).subscribe((results: [string, string, string]) => {
      const deepness = results[0];
      const color = results[1];
      const name = results[2];
      console.log('with forkJoin:', deepness, color, name);
    });

    ////////////////////// concatMap //////////////////
    /////////////// for sequential http request  ///////////////////

    /////////////////////// without concatMap /////////////

    this.getProperty('deep').subscribe((result: string) => {
      this.getProperty(result + ' blue').subscribe((result: string) => {
        this.getProperty(result + ' ocean').subscribe((result: string) => {
          console.log('without concat:', result);
        });
      });
    });
    //////////////////////////// with concatMap //////////////////
    this.getProperty('deep')
      .pipe(
        concatMap((result: string) => this.getProperty(result + ' blue')),
        concatMap((result: string) => this.getProperty(result + ' ocean'))
      )
      .subscribe((result) => console.log('with concatMap:', result));
  }

  getProperty(deepness: string): Observable<string> {
    return new Observable<string>((subscriber) => {
      setTimeout(() => {
        subscriber.next(deepness);
        subscriber.complete();
      }, 4000);
    });
  }
  //
}
