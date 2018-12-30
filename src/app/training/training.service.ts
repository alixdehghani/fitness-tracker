import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';
export class TrainingService {
     exerciseChanged = new Subject<Exercise>();
    private availabExercise: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];
    private exesices: Exercise[]= [];
    private currentExercise: Exercise ;
    getAvailabExercise(){
        return [...this.availabExercise];
    }

    startExercise(idExerxise:string){
        this.currentExercise = this.availabExercise.find(ex => ex.id === idExerxise);
        this.exerciseChanged.next({...this.currentExercise});
    }

    getCurrentexercise(){
        return {...this.currentExercise};
    }
    completeExercise(){
        this.exesices.push({
            ...this.currentExercise,
            date: new Date(),
            state:'complate'
        });
        this.currentExercise = null;
        this.exerciseChanged.next(null);
    }
    canceledExercise(progress: number){
        this.exesices.push({
            ...this.currentExercise,
            duration: this.currentExercise.duration * (progress/100),
            calories: this.currentExercise.calories * (progress/100),  
            date: new Date(),
            state:'canceled'
        });
        this.currentExercise = null;
        this.exerciseChanged.next(null);
    }
    getCompletedOrCanceledExcercised(){
        return [...this.exesices];
    }
}