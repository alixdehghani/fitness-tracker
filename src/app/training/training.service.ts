import { DocumentChangeAction } from '@angular/fire/firestore';
import { Exercise } from './exercise.model';
import { Subject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { UiService } from '../share/ui.service';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    exercisesFinishChanged = new Subject<Exercise[]>();

    private availabExercise: Exercise[] = [];
    private finishedExesices: Exercise[] = [];
    private currentExercise: Exercise;
    constructor(private db: AngularFirestore, private uiService: UiService) { }
    fbSubscription: Subscription[] = [];
    fechgetAvailabExercise() {
        this.uiService.loadingSpining.next(true);
        this.fbSubscription.push(this.db.collection("avalilable-exercise").snapshotChanges().pipe(map(resualtArray => {
            // throw (new Error);
            return resualtArray.map((doc: DocumentChangeAction<Exercise>) =>  { return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name ,
              duration: doc.payload.doc.data().duration,
              calories: doc.payload.doc.data().calories
            }
            });
        })).subscribe((exercise: Exercise[]) => {
            this.availabExercise = exercise;
            this.exercisesChanged.next([...this.availabExercise]);
            this.uiService.loadingSpining.next(false);
        }, error => {
            this.uiService.loadingSpining.next(false);
            this.uiService.openSnackbar('Fetch Error, please try again', null, 2000);
            this.exercisesChanged.next(null);
        }));
    }

    startExercise(idExerxise: string) {
        // this.db.doc('avalilable-exercise/'+ idExerxise).update({lastSelected: new Date()});
        this.currentExercise = this.availabExercise.find(ex => ex.id === idExerxise);
        this.exerciseChanged.next({ ...this.currentExercise });
    }

    getCurrentexercise() {
        return { ...this.currentExercise };
    }
    completeExercise() {
        this.addDataToDatabase({
            ...this.currentExercise,
            date: new Date(),
            state: 'complate'
        });
        this.currentExercise = null;
        this.exerciseChanged.next(null);
    }
    canceledExercise(progress: number) {
        this.addDataToDatabase({
            ...this.currentExercise,
            duration: this.currentExercise.duration * (progress / 100),
            calories: this.currentExercise.calories * (progress / 100),
            date: new Date(),
            state: 'canceled'
        });
        this.currentExercise = null;
        this.exerciseChanged.next(null);
    }
    fechCompletedOrCanceledExcercised() {
        this.uiService.loadingSpining.next(true);
        this.fbSubscription.push(this.db.collection('finishedExercise').valueChanges().subscribe((exercises: Exercise[]) => {
            this.finishedExesices = exercises;
            this.exercisesFinishChanged.next([...this.finishedExesices]);
            this.uiService.loadingSpining.next(false);
        }));
    }
    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercise').add(exercise);
    }
    canselSubscriptions() {
        this.fbSubscription.forEach(sub => sub.unsubscribe());
    }
}