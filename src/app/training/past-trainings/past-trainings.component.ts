import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TrainingService} from "../training.service";
import {MatTableDataSource} from "@angular/material/table";
import {Exercise} from "../exercise.model";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit(): void {
    this.dataSource.data = this.trainingService.getCompletedOrCanceledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {

  }

}